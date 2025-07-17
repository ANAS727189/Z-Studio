import llvm from 'llvm-bindings';
import { TokenType } from './token.js';
import {
  ProgramNode, LetNode, PrintNode, InputNode, IfNode, WhileNode, ForNode, BreakNode,
  FunctionNode, CallNode, ReturnNode, BinOpNode, UnaryOpNode, NumberNode, StringNode,
  BooleanNode, VarNode, PrefixOpNode, PostfixOpNode, ExpressionStatementNode, AssignmentNode
} from './ast.js';

class LLVMGenerator {
  constructor() {
    // Verify required classes and methods
    if (!llvm.LLVMContext) throw new Error('llvm.LLVMContext is undefined');
    if (!llvm.Module) throw new Error('llvm.Module is undefined');
    if (!llvm.Type) throw new Error('llvm.Type is undefined');
    if (!llvm.PointerType) throw new Error('llvm.PointerType is undefined');
    if (!llvm.FunctionType) throw new Error('llvm.FunctionType is undefined');
    if (!llvm.IRBuilder) throw new Error('llvm.IRBuilder is undefined');
    if (!llvm.ArrayType) throw new Error('llvm.ArrayType is undefined');
    if (!llvm.GlobalVariable) throw new Error('llvm.GlobalVariable is undefined');
    if (!llvm.Constant) throw new Error('llvm.Constant is undefined');

    this.context = new llvm.LLVMContext();
    this.module = new llvm.Module('compiler', this.context);
    this.builder = null;
    this.symbolTable = {}; // {functionName: {varName: ptr}}
    this.loopExitBlocks = [];
    this.currentFunction = null;
    this.idCounter = 0;
    
    // Declare printf
    try {
      const int8Ty = llvm.Type.getInt8Ty(this.context);
      const int32Ty = llvm.Type.getInt32Ty(this.context);
      const voidptrTy = llvm.PointerType.get(int8Ty, 0);
      const printfTy = llvm.FunctionType.get(int32Ty, [voidptrTy], true);
      this.printf = llvm.Function.Create(
        printfTy, 
        llvm.Function.LinkageTypes.ExternalLinkage,
        'printf', 
        this.module
      );
    } catch (e) {
      console.error('Error declaring printf:', e.message);
      throw e;
    }

    // Declare scanf
    try {
      const int8Ty = llvm.Type.getInt8Ty(this.context);
      const int32Ty = llvm.Type.getInt32Ty(this.context);
      const voidptrTy = llvm.PointerType.get(int8Ty, 0);
      const scanfTy = llvm.FunctionType.get(int32Ty, [voidptrTy], true);
      this.scanf = llvm.Function.Create(
        scanfTy, 
        llvm.Function.LinkageTypes.ExternalLinkage,
        'scanf', 
        this.module
      );
    } catch (e) {
      console.error('Error declaring scanf:', e.message);
      throw e;
    }
  }

  getUniqueId() {
    return this.idCounter++;
  }

  visit_ProgramNode(node) {
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    this.symbolTable['global'] = {}; // Add global scope

    // Collect global variables (e.g., from LetNode outside functions)
    const mainStatements = node.statements.filter(stmt => !(stmt instanceof FunctionNode));
    for (const stmt of mainStatements) {
        if (stmt instanceof LetNode) {
            const globalVar = new llvm.GlobalVariable(
                this.module,
                doubleTy,
                false, // Not constant
                llvm.GlobalVariable.LinkageTypes.ExternalLinkage,
                llvm.ConstantFP.get(doubleTy, 0.0),
                stmt.name
            );
            this.symbolTable['global'][stmt.name] = globalVar;
        }
    }

    // Process function definitions
    const functionStatements = node.statements.filter(stmt => stmt instanceof FunctionNode);
    for (const funcStmt of functionStatements) {
        this.visit(funcStmt);
    }

    // Create main function
    const int32Ty = llvm.Type.getInt32Ty(this.context);
    const funcType = llvm.FunctionType.get(int32Ty, [], false);
    const mainFunc = llvm.Function.Create(funcType, llvm.Function.LinkageTypes.ExternalLinkage, 'main', this.module);
   const entry = llvm.BasicBlock.Create(this.context, `entry${this.getUniqueId()}`, mainFunc);
    this.builder = new llvm.IRBuilder(this.context);
    this.builder.SetInsertPoint(entry);
    this.currentFunction = 'main';
    this.symbolTable['main'] = {};

    // Process main statements
    for (const stmt of mainStatements) {
        this.visit(stmt);
    }

    const zeroConst = llvm.ConstantInt.get(int32Ty, 0);
    this.builder.CreateRet(zeroConst);
}

  visit_FunctionNode(node) {
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    const paramTypes = node.params.map(() => doubleTy);
    const funcType = llvm.FunctionType.get(doubleTy, paramTypes, false);
    const func = llvm.Function.Create(funcType, llvm.Function.LinkageTypes.ExternalLinkage, node.name, this.module);

    for (let i = 0; i < node.params.length; i++) {
      func.getArg(i).setName(node.params[i]);
    }

    node.params.forEach((param, i) => func.getArg(i).setName(param));
    const block = llvm.BasicBlock.Create(this.context, `entry${this.getUniqueId()}`, func);
    const savedBuilder = this.builder;
    const savedCurrentFunction = this.currentFunction;
    this.builder = new llvm.IRBuilder(this.context);
    this.builder.SetInsertPoint(block);
    this.currentFunction = node.name;
    this.symbolTable[node.name] = {};

    for (const param of node.params) {
      const ptr = this.builder.CreateAlloca(doubleTy, null, param);
      this.builder.CreateStore(func.getArg(node.params.indexOf(param)), ptr);
      this.symbolTable[node.name][param] = ptr;
    }

    for (const stmt of node.body) {
      this.visit(stmt);
    }

    this.builder = savedBuilder;
    this.currentFunction = savedCurrentFunction;
  }

  visit_ReturnNode(node) {
    const value = this.visit(node.expr);
    this.builder.CreateRet(value);
    this.builder.SetInsertPoint(null);  
  }

  visit_LetNode(node) {
    const value = this.visit(node.expr);
    const funcSymbolTable = this.symbolTable[this.currentFunction];
    if (!(node.name in funcSymbolTable)) {
      const doubleTy = llvm.Type.getDoubleTy(this.context);
      const ptr = this.builder.CreateAlloca(doubleTy, null, node.name);
      funcSymbolTable[node.name] = ptr;
    }
    this.builder.CreateStore(value, funcSymbolTable[node.name]);
  }

  visit_PrintNode(node) {
    if (node.is_string) {
      const strVal = node.expr.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const strWithNewline = strVal + '\n';
      const int8Ty = llvm.Type.getInt8Ty(this.context);
      const int32Ty = llvm.Type.getInt32Ty(this.context);
      const arrayTy = llvm.ArrayType.get(int8Ty, strWithNewline.length + 1);
      
      // Create constant array
      const chars = [];
      for (let i = 0; i < strWithNewline.length; i++) {
        chars.push(llvm.ConstantInt.get(int8Ty, strWithNewline.charCodeAt(i)));
      }
      chars.push(llvm.ConstantInt.get(int8Ty, 0)); // null terminator
      
      const strConst = llvm.ConstantArray.get(arrayTy, chars);
      const globalStr = new llvm.GlobalVariable(this.module, arrayTy, true, llvm.GlobalVariable.LinkageTypes.InternalLinkage, strConst, `str.${this.getUniqueId()}`);

      const zero = llvm.ConstantInt.get(int32Ty, 0);
      const strPtr = this.builder.CreateGEP(arrayTy, globalStr, [zero, zero], 'strptr');
      this.builder.CreateCall(this.printf, [strPtr]);
    } else {
      const value = this.visit(node.expr);
      const fmtStr = '%.2f\n';
      const int8Ty = llvm.Type.getInt8Ty(this.context);
      const int32Ty = llvm.Type.getInt32Ty(this.context);
      const arrayTy = llvm.ArrayType.get(int8Ty, fmtStr.length + 1);
      
      // Create format string constant
      const chars = [];
      for (let i = 0; i < fmtStr.length; i++) {
        chars.push(llvm.ConstantInt.get(int8Ty, fmtStr.charCodeAt(i)));
      }
      chars.push(llvm.ConstantInt.get(int8Ty, 0)); // null terminator
      
      const fmtConst = llvm.ConstantArray.get(arrayTy, chars);
      const globalFmt = new llvm.GlobalVariable(this.module, arrayTy, true, llvm.GlobalVariable.LinkageTypes.InternalLinkage, fmtConst, `fmt.${this.getUniqueId()}`);

      const zero = llvm.ConstantInt.get(int32Ty, 0);
      const fmtPtr = this.builder.CreateGEP(arrayTy, globalFmt, [zero, zero], 'fmtptr');
      this.builder.CreateCall(this.printf, [fmtPtr, value]);
    }
  }

  visit_ExpressionStatementNode(node) {
    this.visit(node.expr);
}

visit_AssignmentNode(node) {
    const value = this.visit(node.expr);
    const funcSymbolTable = this.symbolTable[this.currentFunction];
    if (!(node.name in funcSymbolTable)) {
        const doubleTy = llvm.Type.getDoubleTy(this.context);
        const ptr = this.builder.CreateAlloca(doubleTy, null, node.name);
        funcSymbolTable[node.name] = ptr;
    }
    this.builder.CreateStore(value, funcSymbolTable[node.name]);
}

  visit_InputNode(node) {
    const fmtStr = '%lf';
    const int8Ty = llvm.Type.getInt8Ty(this.context);
    const int32Ty = llvm.Type.getInt32Ty(this.context);
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    const arrayTy = llvm.ArrayType.get(int8Ty, fmtStr.length + 1);
    
    // Create format string constant
    const chars = [];
    for (let i = 0; i < fmtStr.length; i++) {
      chars.push(llvm.ConstantInt.get(int8Ty, fmtStr.charCodeAt(i)));
    }
    chars.push(llvm.ConstantInt.get(int8Ty, 0)); // null terminator
    
    const fmtConst = llvm.ConstantArray.get(arrayTy, chars);
    const globalFmt = new llvm.GlobalVariable(this.module, arrayTy, true, llvm.GlobalVariable.LinkageTypes.InternalLinkage, fmtConst, `fmt_scanf.${this.getUniqueId()}`);

    const zero = llvm.ConstantInt.get(int32Ty, 0);
    const fmtPtr = this.builder.CreateGEP(arrayTy, globalFmt, [zero, zero], 'fmtptr');

    const funcSymbolTable = this.symbolTable[this.currentFunction];
    if (!(node.name in funcSymbolTable)) {
      const ptr = this.builder.CreateAlloca(doubleTy, null, node.name);
      funcSymbolTable[node.name] = ptr;
    }

    const result = this.builder.CreateCall(this.scanf, [fmtPtr, funcSymbolTable[node.name]]);
    const zeroVal = llvm.ConstantInt.get(int32Ty, 0);
    const cmp = this.builder.CreateICmpEQ(result, zeroVal, 'cmptmp');

    const func = this.module.getFunction(this.currentFunction) || this.module.getFunction('main');
    const thenBlock = llvm.BasicBlock.Create(this.context, `input_fail${this.getUniqueId()}`, func);
    const mergeBlock = llvm.BasicBlock.Create(this.context, `input_cont${this.getUniqueId()}`, func);
    this.builder.CreateCondBr(cmp, thenBlock, mergeBlock);

    this.builder.SetInsertPoint(thenBlock);
    this.builder.CreateStore(llvm.ConstantFP.get(doubleTy, 0.0), funcSymbolTable[node.name]);
    
    // Clear input buffer
    const clearFmt = '%*s';
    const clearArrayTy = llvm.ArrayType.get(int8Ty, clearFmt.length + 1);
    const clearChars = [];
    for (let i = 0; i < clearFmt.length; i++) {
      clearChars.push(llvm.ConstantInt.get(int8Ty, clearFmt.charCodeAt(i)));
    }
    clearChars.push(llvm.ConstantInt.get(int8Ty, 0));
    
    const clearConst = llvm.ConstantArray.get(clearArrayTy, clearChars);
    const globalClear = new llvm.GlobalVariable(this.module, clearArrayTy, true, llvm.GlobalVariable.LinkageTypes.InternalLinkage, clearConst, `fmt_clear.${this.getUniqueId()}`);
    const clearPtr = this.builder.CreateGEP(clearArrayTy, globalClear, [zero, zero], 'clearptr');
    this.builder.CreateCall(this.scanf, [clearPtr]);
    this.builder.CreateBr(mergeBlock);

    this.builder.SetInsertPoint(mergeBlock);
  }

 visit_IfNode(node) {
    const condV = this.visit(node.condition);
    const fn = this.module.getFunction(this.currentFunction) || this.module.getFunction('main');
    const thenBB = llvm.BasicBlock.Create(this.context, `then${this.getUniqueId()}`, fn);
    const elseBB = node.else_block ? llvm.BasicBlock.Create(this.context, `else${this.getUniqueId()}`, fn) : null;
    const contBB = llvm.BasicBlock.Create(this.context, `ifcont${this.getUniqueId()}`, fn);

    const zero = llvm.ConstantFP.get(llvm.Type.getDoubleTy(this.context), 0.0);
    const cmp = this.builder.CreateFCmpONE(condV, zero, `cmp${this.getUniqueId()}`);
    this.builder.CreateCondBr(cmp, thenBB, elseBB || contBB);

    this.builder.SetInsertPoint(thenBB);
    let thenHasReturn = false;
    for (const stmt of node.then_block) {
        this.visit(stmt);
        if (stmt instanceof ReturnNode) {
            thenHasReturn = true;
            break;
        }
    }
    if (!thenHasReturn) {
        this.builder.CreateBr(contBB);
    }
     let elseHasReturn = false;
    if (elseBB) {
        this.builder.SetInsertPoint(elseBB);
        for (const stmt of node.else_block) {
            this.visit(stmt);
            if(stmt instanceof ReturnNode) {
                elseHasReturn = true;
                break;
            }
        }
        if (!elseHasReturn) {
            this.builder.CreateBr(contBB);
        }
    }

    // Only set insertion point to contBB if it will be used
    if (!thenHasReturn || !elseBB || (elseBB && !elseHasReturn)) {
        this.builder.SetInsertPoint(contBB);
    }
}


  visit_WhileNode(node) {
    const func = this.module.getFunction(this.currentFunction) || this.module.getFunction('main');
    const condBB = llvm.BasicBlock.Create(this.context, `while_cond${this.getUniqueId()}`, func);
    const bodyBlock = llvm.BasicBlock.Create(this.context, `while_body${this.getUniqueId()}`, func);
    const mergeBlock = llvm.BasicBlock.Create(this.context, `while_cont${this.getUniqueId()}`, func);

    this.builder.CreateBr(condBB);
    this.builder.SetInsertPoint(condBB);
    const cond = this.visit(node.condition);
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    const zero = llvm.ConstantFP.get(doubleTy, 0.0);
    const condBool = this.builder.CreateFCmpONE(cond, zero, 'whilecond');
    this.builder.CreateCondBr(condBool, bodyBlock, mergeBlock);

    this.builder.SetInsertPoint(bodyBlock);
    this.loopExitBlocks.push(mergeBlock);
    for (const stmt of node.body) {
      this.visit(stmt);
    }
    this.loopExitBlocks.pop();
    this.builder.CreateBr(condBB);

    this.builder.SetInsertPoint(mergeBlock);
  }

  visit_ForNode(node) {
    this.visit(node.init);

    const func = this.module.getFunction(this.currentFunction) || this.module.getFunction('main');
    const condBB = llvm.BasicBlock.Create(this.context, `for_cond${this.getUniqueId()}`, func);
    const bodyBB = llvm.BasicBlock.Create(this.context, `for_body${this.getUniqueId()}`, func);
    const incrBB = llvm.BasicBlock.Create(this.context, `for_incr${this.getUniqueId()}`, func);
    const contBB = llvm.BasicBlock.Create(this.context, `for_cont${this.getUniqueId()}`, func);

    this.builder.CreateBr(condBB);
    this.builder.SetInsertPoint(condBB);
    const cond = this.visit(node.condition);
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    const zero = llvm.ConstantFP.get(doubleTy, 0.0);
    const condBool = this.builder.CreateFCmpONE(cond, zero, 'forcond');
    this.builder.CreateCondBr(condBool, bodyBB, contBB);

    this.builder.SetInsertPoint(bodyBB);
    this.loopExitBlocks.push(contBB);
    for (const stmt of node.body) {
      this.visit(stmt);
    }
    this.loopExitBlocks.pop();
    this.builder.CreateBr(incrBB);

    this.builder.SetInsertPoint(incrBB);
    this.visit(node.increment);
    this.builder.CreateBr(condBB);

    this.builder.SetInsertPoint(contBB);
  }

  visit_BreakNode() {
    if (this.loopExitBlocks.length === 0) {
      console.error('Break outside loop');
      return;
    }
    const exitBlock = this.loopExitBlocks[this.loopExitBlocks.length - 1];
    this.builder.CreateBr(exitBlock);
    
    const func = this.module.getFunction(this.currentFunction) || this.module.getFunction('main');
    const afterBB = llvm.BasicBlock.Create(this.context, `after_break${this.getUniqueId()}`, func);
    this.builder.SetInsertPoint(afterBB);
  }

 visit_BinOpNode(node) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    const doubleTy = llvm.Type.getDoubleTy(this.context);

    switch (node.op.tokenKind) {
        case TokenType.PLUS:
            return this.builder.CreateFAdd(left, right, 'addtmp');
        case TokenType.MINUS:
            return this.builder.CreateFSub(left, right, 'subtmp');
        case TokenType.ASTERISK:
            return this.builder.CreateFMul(left, right, 'multmp');
        case TokenType.SLASH:
            return this.builder.CreateFDiv(left, right, 'divtmp');
        case TokenType.MOD: // Add this case
            return this.builder.CreateFRem(left, right, 'modtmp');
        case TokenType.EQEQ:
            const eq = this.builder.CreateFCmpOEQ(left, right, 'eqtmp');
            return this.builder.CreateUIToFP(eq, doubleTy, 'booltmp');
        case TokenType.NOTEQ:
            const ne = this.builder.CreateFCmpONE(left, right, 'netmp');
            return this.builder.CreateUIToFP(ne, doubleTy, 'booltmp');
        case TokenType.LT:
            const lt = this.builder.CreateFCmpOLT(left, right, 'lttmp');
            return this.builder.CreateUIToFP(lt, doubleTy, 'booltmp');
        case TokenType.LTEQ:
            const le = this.builder.CreateFCmpOLE(left, right, 'letmp');
            return this.builder.CreateUIToFP(le, doubleTy, 'booltmp');
        case TokenType.GT:
            const gt = this.builder.CreateFCmpOGT(left, right, 'gttmp');
            return this.builder.CreateUIToFP(gt, doubleTy, 'booltmp');
        case TokenType.GTEQ:
            const ge = this.builder.CreateFCmpOGE(left, right, 'getmp');
            return this.builder.CreateUIToFP(ge, doubleTy, 'booltmp');
        case TokenType.AND:
            const leftBool = this.builder.CreateFCmpONE(left, llvm.ConstantFP.get(doubleTy, 0.0), 'leftbool');
            const rightBool = this.builder.CreateFCmpONE(right, llvm.ConstantFP.get(doubleTy, 0.0), 'rightbool');
            const andResult = this.builder.CreateAnd(leftBool, rightBool, 'andtmp');
            return this.builder.CreateUIToFP(andResult, doubleTy, 'booltmp');
        case TokenType.OR:
            const leftBoolOr = this.builder.CreateFCmpONE(left, llvm.ConstantFP.get(doubleTy, 0.0), 'leftboolor');
            const rightBoolOr = this.builder.CreateFCmpONE(right, llvm.ConstantFP.get(doubleTy, 0.0), 'rightboolor');
            const orResult = this.builder.CreateOr(leftBoolOr, rightBoolOr, 'ortmp');
            return this.builder.CreateUIToFP(orResult, doubleTy, 'booltmp');
        default:
            console.error(`Unsupported operator: ${node.op.tokenKind}`);
            return llvm.ConstantFP.get(doubleTy, 0.0);
    }
}

  visit_UnaryOpNode(node) {
    const expr = this.visit(node.expr);
    if (node.op.tokenKind === TokenType.MINUS) {
      return this.builder.CreateFNeg(expr, 'negtmp');
    }
    return expr;
  }

  visit_PrefixOpNode(node) {
    const varNode = node.expr;
    if (!(varNode instanceof VarNode)) {
      console.error('Prefix operator can only be applied to variables');
      const doubleTy = llvm.Type.getDoubleTy(this.context);
      return llvm.ConstantFP.get(doubleTy, 0.0);
    }
    const varName = varNode.name;
    const funcSymbolTable = this.symbolTable[this.currentFunction];
    if (!(varName in funcSymbolTable)) {
      console.error(`Undefined variable: ${varName}`);
      const doubleTy = llvm.Type.getDoubleTy(this.context);
      return llvm.ConstantFP.get(doubleTy, 0.0);
    }
    const ptr = funcSymbolTable[varName];
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    const oldValue = this.builder.CreateLoad(doubleTy, ptr, 'oldval');
    const one = llvm.ConstantFP.get(doubleTy, 1.0);
    const newValue = node.op.tokenKind === TokenType.PLUSPLUS
      ? this.builder.CreateFAdd(oldValue, one, 'inctmp')
      : this.builder.CreateFSub(oldValue, one, 'dectmp');
    this.builder.CreateStore(newValue, ptr);
    return newValue;
  }

  visit_PostfixOpNode(node) {
    const varNode = node.expr;
    if (!(varNode instanceof VarNode)) {
      console.error('Postfix operator can only be applied to variables');
      const doubleTy = llvm.Type.getDoubleTy(this.context);
      return llvm.ConstantFP.get(doubleTy, 0.0);
    }
    const varName = varNode.name;
    const funcSymbolTable = this.symbolTable[this.currentFunction];
    if (!(varName in funcSymbolTable)) {
      console.error(`Undefined variable: ${varName}`);
      const doubleTy = llvm.Type.getDoubleTy(this.context);
      return llvm.ConstantFP.get(doubleTy, 0.0);
    }
    const ptr = funcSymbolTable[varName];
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    const oldValue = this.builder.CreateLoad(doubleTy, ptr, 'oldval');
    const one = llvm.ConstantFP.get(doubleTy, 1.0);
    const newValue = node.op.tokenKind === TokenType.PLUSPLUS
      ? this.builder.CreateFAdd(oldValue, one, 'inctmp')
      : this.builder.CreateFSub(oldValue, one, 'dectmp');
    this.builder.CreateStore(newValue, ptr);
    return oldValue;
  }

  visit_NumberNode(node) {
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    return llvm.ConstantFP.get(doubleTy, node.value);
  }

  visit_BooleanNode(node) {
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    return llvm.ConstantFP.get(doubleTy, node.value ? 1.0 : 0.0);
  }

  visit_VarNode(node) {
    const funcSymbolTable = this.symbolTable[this.currentFunction] || {};
    const globalSymbolTable = this.symbolTable['global'] || {};
    const ptr = funcSymbolTable[node.name] || globalSymbolTable[node.name];
    if (!ptr) {
        console.error(`Undefined variable: ${node.name}`);
        const doubleTy = llvm.Type.getDoubleTy(this.context);
        return llvm.ConstantFP.get(doubleTy, 0.0);
    }
    const doubleTy = llvm.Type.getDoubleTy(this.context);
    return this.builder.CreateLoad(doubleTy, ptr, node.name);
}

  visit_CallNode(node) {
    const func = this.module.getFunction(node.name);
    if (!func) {
      console.error(`Undefined function: ${node.name}`);
      const doubleTy = llvm.Type.getDoubleTy(this.context);
      return llvm.ConstantFP.get(doubleTy, 0.0);
    }
    const args = node.args.map(arg => this.visit(arg));
    return this.builder.CreateCall(func, args, 'calltmp');
  }

  visit(node) {
    if (node instanceof ProgramNode) return this.visit_ProgramNode(node);
    if (node instanceof LetNode) return this.visit_LetNode(node);
    if (node instanceof PrintNode) return this.visit_PrintNode(node);
    if (node instanceof InputNode) return this.visit_InputNode(node);
    if (node instanceof IfNode) return this.visit_IfNode(node);
    if (node instanceof WhileNode) return this.visit_WhileNode(node);
    if (node instanceof ForNode) return this.visit_ForNode(node);
    if (node instanceof BreakNode) return this.visit_BreakNode(node);
    if (node instanceof FunctionNode) return this.visit_FunctionNode(node);
    if (node instanceof CallNode) return this.visit_CallNode(node);
    if (node instanceof ReturnNode) return this.visit_ReturnNode(node);
    if (node instanceof BinOpNode) return this.visit_BinOpNode(node);
    if (node instanceof UnaryOpNode) return this.visit_UnaryOpNode(node);
    if (node instanceof PrefixOpNode) return this.visit_PrefixOpNode(node);
    if (node instanceof PostfixOpNode) return this.visit_PostfixOpNode(node);
    if (node instanceof NumberNode) return this.visit_NumberNode(node);
    if (node instanceof BooleanNode) return this.visit_BooleanNode(node);
    if (node instanceof VarNode) return this.visit_VarNode(node);
    if (node instanceof ExpressionStatementNode) return this.visit_ExpressionStatementNode(node); 
    if (node instanceof AssignmentNode) return this.visit_AssignmentNode(node); 
    console.error(`Unknown node type: ${node.constructor.name}`);
    return null;
}

  generate() {
    return this.module.print();
  }
}

export { LLVMGenerator };