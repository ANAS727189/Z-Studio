import { TokenType } from './token.js';
import {
  ProgramNode, LetNode, ArrayLiteralNode, ArrayAccessNode, ArrayAssignmentNode,
  PrintNode, InputNode, IfNode, WhileNode, ForNode, BreakNode,
  FunctionNode, CallNode, ReturnNode, BinOpNode, UnaryOpNode, NumberNode, StringNode,
  BooleanNode, VarNode, PrefixOpNode, PostfixOpNode, ExpressionStatementNode, AssignmentNode
} from './ast.js';

class LLVMGenerator {
  constructor() {
    this.moduleLines = [
      'declare i32 @printf(i8*, ...)',
      'declare i32 @scanf(i8*, ...)'
    ];
    this.globalLines = [];
    this.stringLines = [];
    this.functionLines = [];
    this.lines = [];
    this.symbolTable = new Map();
    this.globalVariables = new Set();
    this.globalInfo = new Map();
    this.localInfo = new Map();
    this.stringConstants = new Map();
    this.functionSignatures = new Map();
    this.loopExitLabels = [];
    this.currentFunction = null;
    this.tempCounter = 0;
    this.labelCounter = 0;
    this.stringCounter = 0;
    this.blockTerminated = false;
  }

  visit(node) {
    if (node instanceof ProgramNode) return this.visit_ProgramNode(node);
    if (node instanceof LetNode) return this.visit_LetNode(node);
    if (node instanceof ArrayLiteralNode) return this.visit_ArrayLiteralNode(node);
    if (node instanceof ArrayAccessNode) return this.visit_ArrayAccessNode(node);
    if (node instanceof ArrayAssignmentNode) return this.visit_ArrayAssignmentNode(node);
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
    if (node instanceof StringNode) return node.value;
    if (node instanceof VarNode) return this.visit_VarNode(node);
    if (node instanceof ExpressionStatementNode) return this.visit_ExpressionStatementNode(node);
    if (node instanceof AssignmentNode) return this.visit_AssignmentNode(node);
    throw new Error(`No LLVM visitor for ${node?.constructor?.name || 'unknown node'}`);
  }

  visit_ProgramNode(node) {
    const functions = node.statements.filter(stmt => stmt instanceof FunctionNode);
    const mainStatements = node.statements.filter(stmt => !(stmt instanceof FunctionNode));

    for (const fn of functions) {
      this.functionSignatures.set(fn.name, fn.params);
    }

    this.globalInfo = this.collectVariables(mainStatements, 'global');
    this.globalVariables = new Set(this.globalInfo.keys());
    for (const [name, info] of this.globalInfo.entries()) {
      this.globalLines.push(this.globalDeclaration(name, info));
    }

    for (const fn of functions) {
      this.visit(fn);
    }

    this.emitMain(mainStatements);
  }

  visit_FunctionNode(node) {
    const params = node.params.map(name => `double %arg.${this.clean(name)}`).join(', ');
    const locals = this.collectVariables(node.body, node.name);
    for (const param of node.params) {
      locals.set(param, { kind: 'double' });
    }

    this.startFunction(node.name);
    this.emit(`define double @${this.clean(node.name)}(${params}) {`);
    this.emitLabel('entry');
    this.symbolTable = new Map();
    this.localInfo = locals;

    for (const [name, info] of locals.entries()) {
      const ptr = `%${this.clean(name)}.addr`;
      this.symbolTable.set(name, ptr);
      if (info.kind === 'array') {
        this.emit(`${ptr} = alloca [${info.size} x double]`);
      } else if (info.kind === 'string') {
        this.emit(`${ptr} = alloca i8*`);
      } else {
        this.emit(`${ptr} = alloca double`);
      }
    }

    for (const param of node.params) {
      this.emit(`store double %arg.${this.clean(param)}, double* ${this.symbolTable.get(param)}`);
    }

    this.visitStatements(node.body);
    if (!this.blockTerminated) {
      this.emit('ret double 0.000000');
    }
    this.emit('}');
    this.finishFunction();
  }

  visit_LetNode(node) {
    const info = this.inferExpressionInfo(node.expr);
    const ptr = this.ensureVariable(node.name, info);
    this.storeExpression(ptr, info, node.expr, node.name);
  }

  visit_AssignmentNode(node) {
    const current = this.lookupVariable(node.name);
    this.storeExpression(current.ptr, current.info, node.expr, node.name);
  }

  visit_ArrayAssignmentNode(node) {
    const target = this.lookupVariable(node.name);
    if (target.info.kind !== 'array') {
      throw new Error(`${node.name} is not an array`);
    }
    const elementPtr = this.arrayElementPtr(node.name, target, this.visit(node.index));
    const value = this.visit(node.expr);
    this.emit(`store double ${value}, double* ${elementPtr}`);
  }

  visit_PrintNode(node) {
    if (node.is_string) {
      const value = node.expr instanceof StringNode ? node.expr.value : String(this.visit(node.expr));
      const strPtr = this.addString(`${value}\n`);
      this.emit(`call i32 (i8*, ...) @printf(i8* ${strPtr})`);
      return;
    }

    const value = this.expressionValue(node.expr);
    if (value.kind === 'string') {
      const fmtPtr = this.addString('%s\n');
      this.emit(`call i32 (i8*, ...) @printf(i8* ${fmtPtr}, i8* ${value.value})`);
    } else {
      const fmtPtr = this.addString('%.2f\n');
      this.emit(`call i32 (i8*, ...) @printf(i8* ${fmtPtr}, double ${value.value})`);
    }
  }

  visit_InputNode(node) {
    const ptr = this.ensureVariable(node.name);
    const fmtPtr = this.addString('%lf');
    const result = this.temp();
    const failed = this.temp();
    const failLabel = this.label('input_fail');
    const contLabel = this.label('input_cont');

    this.emit(`${result} = call i32 (i8*, ...) @scanf(i8* ${fmtPtr}, double* ${ptr})`);
    this.emit(`${failed} = icmp eq i32 ${result}, 0`);
    this.emit(`br i1 ${failed}, label %${failLabel}, label %${contLabel}`);
    this.blockTerminated = true;

    this.emitLabel(failLabel);
    this.emit(`store double 0.000000, double* ${ptr}`);
    const clearPtr = this.addString('%*s');
    this.emit(`call i32 (i8*, ...) @scanf(i8* ${clearPtr})`);
    this.emit(`br label %${contLabel}`);
    this.blockTerminated = true;

    this.emitLabel(contLabel);
  }

  visit_IfNode(node) {
    const cond = this.toBool(this.visit(node.condition));
    const thenLabel = this.label('if_then');
    const elseLabel = node.else_block ? this.label('if_else') : null;
    const contLabel = this.label('if_cont');

    this.emit(`br i1 ${cond}, label %${thenLabel}, label %${elseLabel || contLabel}`);
    this.blockTerminated = true;

    this.emitLabel(thenLabel);
    this.visitStatements(node.then_block);
    if (!this.blockTerminated) {
      this.emit(`br label %${contLabel}`);
      this.blockTerminated = true;
    }

    if (node.else_block) {
      this.emitLabel(elseLabel);
      this.visitStatements(node.else_block);
      if (!this.blockTerminated) {
        this.emit(`br label %${contLabel}`);
        this.blockTerminated = true;
      }
    }

    this.emitLabel(contLabel);
  }

  visit_WhileNode(node) {
    const condLabel = this.label('while_cond');
    const bodyLabel = this.label('while_body');
    const contLabel = this.label('while_cont');

    this.emit(`br label %${condLabel}`);
    this.blockTerminated = true;

    this.emitLabel(condLabel);
    const cond = this.toBool(this.visit(node.condition));
    this.emit(`br i1 ${cond}, label %${bodyLabel}, label %${contLabel}`);
    this.blockTerminated = true;

    this.emitLabel(bodyLabel);
    this.loopExitLabels.push(contLabel);
    this.visitStatements(node.body);
    this.loopExitLabels.pop();
    if (!this.blockTerminated) {
      this.emit(`br label %${condLabel}`);
      this.blockTerminated = true;
    }

    this.emitLabel(contLabel);
  }

  visit_ForNode(node) {
    this.visit(node.init);

    const condLabel = this.label('for_cond');
    const bodyLabel = this.label('for_body');
    const incrLabel = this.label('for_incr');
    const contLabel = this.label('for_cont');

    this.emit(`br label %${condLabel}`);
    this.blockTerminated = true;

    this.emitLabel(condLabel);
    const cond = this.toBool(this.visit(node.condition));
    this.emit(`br i1 ${cond}, label %${bodyLabel}, label %${contLabel}`);
    this.blockTerminated = true;

    this.emitLabel(bodyLabel);
    this.loopExitLabels.push(contLabel);
    this.visitStatements(node.body);
    this.loopExitLabels.pop();
    if (!this.blockTerminated) {
      this.emit(`br label %${incrLabel}`);
      this.blockTerminated = true;
    }

    this.emitLabel(incrLabel);
    this.visit(node.increment);
    if (!this.blockTerminated) {
      this.emit(`br label %${condLabel}`);
      this.blockTerminated = true;
    }

    this.emitLabel(contLabel);
  }

  visit_BreakNode() {
    const target = this.loopExitLabels[this.loopExitLabels.length - 1];
    if (!target) {
      throw new Error('break used outside of a loop');
    }
    this.emit(`br label %${target}`);
    this.blockTerminated = true;
  }

  visit_ReturnNode(node) {
    const value = this.expressionValue(node.expr).value;
    this.emit(`ret double ${value}`);
    this.blockTerminated = true;
  }

  visit_BinOpNode(node) {
    const stringValue = this.stringExpressionLiteral(node);
    if (stringValue !== null) {
      return this.addString(stringValue);
    }

    const left = this.visit(node.left);
    const right = this.visit(node.right);

    switch (node.op.tokenKind) {
      case TokenType.PLUS:
        return this.binary('fadd', left, right, 'addtmp');
      case TokenType.MINUS:
        return this.binary('fsub', left, right, 'subtmp');
      case TokenType.ASTERISK:
        return this.binary('fmul', left, right, 'multmp');
      case TokenType.SLASH:
        return this.binary('fdiv', left, right, 'divtmp');
      case TokenType.MOD:
        return this.binary('frem', left, right, 'modtmp');
      case TokenType.EQEQ:
        return this.compare('fcmp oeq', left, right);
      case TokenType.NOTEQ:
        return this.compare('fcmp one', left, right);
      case TokenType.LT:
        return this.compare('fcmp olt', left, right);
      case TokenType.LTEQ:
        return this.compare('fcmp ole', left, right);
      case TokenType.GT:
        return this.compare('fcmp ogt', left, right);
      case TokenType.GTEQ:
        return this.compare('fcmp oge', left, right);
      case TokenType.AND:
        return this.logical('and', left, right);
      case TokenType.OR:
        return this.logical('or', left, right);
      case TokenType.BITAND:
        return this.bitwise('and', left, right);
      case TokenType.BITOR:
        return this.bitwise('or', left, right);
      case TokenType.BITXOR:
        return this.bitwise('xor', left, right);
      default:
        throw new Error(`Unsupported binary operator: ${node.op.tokenKind}`);
    }
  }

  visit_UnaryOpNode(node) {
    const value = this.visit(node.expr);
    if (node.op.tokenKind === TokenType.MINUS) {
      const result = this.temp('negtmp');
      this.emit(`${result} = fsub double 0.000000, ${value}`);
      return result;
    }
    return value;
  }

  visit_PrefixOpNode(node) {
    const ptr = this.variablePointerFromUpdate(node.expr, 'prefix');
    const oldValue = this.load(ptr, 'oldval');
    const one = '1.000000';
    const result = this.temp(node.op.tokenKind === TokenType.PLUSPLUS ? 'inctmp' : 'dectmp');
    const op = node.op.tokenKind === TokenType.PLUSPLUS ? 'fadd' : 'fsub';
    this.emit(`${result} = ${op} double ${oldValue}, ${one}`);
    this.emit(`store double ${result}, double* ${ptr}`);
    return result;
  }

  visit_PostfixOpNode(node) {
    const ptr = this.variablePointerFromUpdate(node.expr, 'postfix');
    const oldValue = this.load(ptr, 'oldval');
    const one = '1.000000';
    const result = this.temp(node.op.tokenKind === TokenType.PLUSPLUS ? 'inctmp' : 'dectmp');
    const op = node.op.tokenKind === TokenType.PLUSPLUS ? 'fadd' : 'fsub';
    this.emit(`${result} = ${op} double ${oldValue}, ${one}`);
    this.emit(`store double ${result}, double* ${ptr}`);
    return oldValue;
  }

  visit_NumberNode(node) {
    return this.doubleLiteral(node.value);
  }

  visit_BooleanNode(node) {
    return node.value ? '1.000000' : '0.000000';
  }

  visit_VarNode(node) {
    const target = this.lookupVariable(node.name);
    if (target.info.kind === 'string') {
      return this.loadString(target.ptr, this.clean(node.name));
    }
    if (target.info.kind === 'array') {
      throw new Error(`Cannot use array ${node.name} without an index`);
    }
    return this.load(target.ptr, this.clean(node.name));
  }

  visit_ArrayAccessNode(node) {
    const target = this.lookupVariable(node.name);
    if (target.info.kind !== 'array') {
      throw new Error(`${node.name} is not an array`);
    }
    const elementPtr = this.arrayElementPtr(node.name, target, this.visit(node.index));
    return this.load(elementPtr, `${this.clean(node.name)}idx`);
  }

  visit_ArrayLiteralNode() {
    throw new Error('Array literals can only be used in let declarations or assignments');
  }

  visit_CallNode(node) {
    if (!this.functionSignatures.has(node.name)) {
      throw new Error(`Undefined function: ${node.name}`);
    }
    const args = node.args.map(arg => `double ${this.expressionValue(arg).value}`).join(', ');
    const result = this.temp('calltmp');
    this.emit(`${result} = call double @${this.clean(node.name)}(${args})`);
    return result;
  }

  visit_ExpressionStatementNode(node) {
    this.visit(node.expr);
  }

  emitMain(statements) {
    this.startFunction('main');
    this.symbolTable = new Map();
    this.emit('define i32 @main() {');
    this.emitLabel('entry');
    this.visitStatements(statements);
    if (!this.blockTerminated) {
      this.emit('ret i32 0');
    }
    this.emit('}');
    this.finishFunction();
  }

  visitStatements(statements) {
    for (const stmt of statements) {
      if (this.blockTerminated) break;
      this.visit(stmt);
    }
  }

  collectVariables(nodes, scope) {
    const variables = new Map();
    const remember = node => {
      if (!node || !node.name) return;
      const info = node.expr ? this.inferExpressionInfo(node.expr) : { kind: 'double' };
      if (!variables.has(node.name) || variables.get(node.name).kind === 'double') {
        variables.set(node.name, info);
      }
    };
    const walk = node => {
      if (!node) return;
      if (node instanceof LetNode || node instanceof AssignmentNode) {
        remember(node);
        if (node.expr) walk(node.expr);
      } else if (node instanceof ArrayAssignmentNode) {
        if (!variables.has(node.name)) {
          variables.set(node.name, { kind: 'array', size: 1 });
        }
        walk(node.index);
        walk(node.expr);
      } else if (node instanceof InputNode) {
        variables.set(node.name, { kind: 'double' });
      } else if (node instanceof IfNode) {
        walk(node.condition);
        node.then_block.forEach(walk);
        if (node.else_block) node.else_block.forEach(walk);
      } else if (node instanceof WhileNode) {
        walk(node.condition);
        node.body.forEach(walk);
      } else if (node instanceof ForNode) {
        walk(node.init);
        walk(node.condition);
        walk(node.increment);
        node.body.forEach(walk);
      } else if (node instanceof FunctionNode) {
        node.body.forEach(walk);
      } else if (node instanceof ExpressionStatementNode) {
        walk(node.expr);
      } else if (node instanceof ReturnNode || node instanceof UnaryOpNode || node instanceof PrefixOpNode || node instanceof PostfixOpNode || node instanceof PrintNode) {
        walk(node.expr);
      } else if (node instanceof BinOpNode) {
        walk(node.left);
        walk(node.right);
      } else if (node instanceof ArrayLiteralNode) {
        node.elements.forEach(walk);
      } else if (node instanceof ArrayAccessNode) {
        walk(node.index);
      } else if (node instanceof CallNode) {
        node.args.forEach(walk);
      }
    };
    nodes.forEach(walk);
    if (scope === 'global') {
      return variables;
    }
    return variables;
  }

  ensureVariable(name, info = { kind: 'double' }) {
    if (this.currentFunction === 'main') {
      if (!this.globalVariables.has(name)) {
        this.globalVariables.add(name);
        this.globalInfo.set(name, info);
        this.globalLines.push(this.globalDeclaration(name, info));
      }
      return `@${this.clean(name)}`;
    }
    if (!this.symbolTable.has(name)) {
      throw new Error(`Undefined variable: ${name}`);
    }
    return this.symbolTable.get(name);
  }

  lookupVariable(name) {
    if (this.symbolTable.has(name)) {
      return {
        ptr: this.symbolTable.get(name),
        info: this.localInfo.get(name) || { kind: 'double' }
      };
    }
    if (this.globalVariables.has(name)) {
      return {
        ptr: `@${this.clean(name)}`,
        info: this.globalInfo.get(name) || { kind: 'double' }
      };
    }
    throw new Error(`Undefined variable: ${name}`);
  }

  variablePointerFromUpdate(expr, kind) {
    if (!(expr instanceof VarNode)) {
      throw new Error(`${kind} operator can only be applied to variables`);
    }
    const target = this.lookupVariable(expr.name);
    if (target.info.kind !== 'double') {
      throw new Error(`${kind} operator can only be applied to numeric variables`);
    }
    return target.ptr;
  }

  binary(op, left, right, hint) {
    const result = this.temp(hint);
    this.emit(`${result} = ${op} double ${left}, ${right}`);
    return result;
  }

  compare(op, left, right) {
    const cmp = this.temp('cmptmp');
    const result = this.temp('booltmp');
    this.emit(`${cmp} = ${op} double ${left}, ${right}`);
    this.emit(`${result} = uitofp i1 ${cmp} to double`);
    return result;
  }

  logical(op, left, right) {
    const leftBool = this.toBool(left);
    const rightBool = this.toBool(right);
    const boolResult = this.temp(`${op}tmp`);
    const result = this.temp('booltmp');
    this.emit(`${boolResult} = ${op} i1 ${leftBool}, ${rightBool}`);
    this.emit(`${result} = uitofp i1 ${boolResult} to double`);
    return result;
  }

  bitwise(op, left, right) {
    const leftInt = this.temp('bitleft');
    const rightInt = this.temp('bitright');
    const intResult = this.temp('bittmp');
    const result = this.temp('bitfp');
    this.emit(`${leftInt} = fptosi double ${left} to i64`);
    this.emit(`${rightInt} = fptosi double ${right} to i64`);
    this.emit(`${intResult} = ${op} i64 ${leftInt}, ${rightInt}`);
    this.emit(`${result} = sitofp i64 ${intResult} to double`);
    return result;
  }

  toBool(value) {
    const result = this.temp('boolcond');
    this.emit(`${result} = fcmp one double ${value}, 0.000000`);
    return result;
  }

  load(ptr, hint) {
    const result = this.temp(hint);
    this.emit(`${result} = load double, double* ${ptr}`);
    return result;
  }

  loadString(ptr, hint) {
    const result = this.temp(hint);
    this.emit(`${result} = load i8*, i8** ${ptr}`);
    return result;
  }

  globalDeclaration(name, info) {
    const cleanName = this.clean(name);
    if (info.kind === 'array') {
      return `@${cleanName} = global [${info.size} x double] zeroinitializer`;
    }
    if (info.kind === 'string') {
      return `@${cleanName} = global i8* null`;
    }
    return `@${cleanName} = global double 0.000000`;
  }

  inferExpressionInfo(node) {
    if (node instanceof ArrayLiteralNode) {
      return { kind: 'array', size: Math.max(node.elements.length, 1) };
    }
    if (node instanceof StringNode) {
      return { kind: 'string' };
    }
    if (node instanceof VarNode) {
      try {
        return this.lookupVariable(node.name).info;
      } catch {
        return { kind: 'double' };
      }
    }
    if (node instanceof BinOpNode && node.op.tokenKind === TokenType.PLUS && this.stringExpressionLiteral(node) !== null) {
      return { kind: 'string' };
    }
    return { kind: 'double' };
  }

  expressionValue(node) {
    const info = this.inferExpressionInfo(node);
    if (info.kind === 'string') {
      return { kind: 'string', value: this.emitStringExpression(node) };
    }
    if (info.kind === 'array') {
      throw new Error('Array value requires an index');
    }
    return { kind: 'double', value: this.visit(node) };
  }

  storeExpression(ptr, info, expr, name) {
    if (info.kind === 'array') {
      if (!(expr instanceof ArrayLiteralNode)) {
        throw new Error(`Array ${name} can only be assigned from an array literal`);
      }
      this.storeArrayLiteral(ptr, info, expr);
      return;
    }
    if (info.kind === 'string') {
      const value = this.emitStringExpression(expr);
      this.emit(`store i8* ${value}, i8** ${ptr}`);
      const literal = this.stringExpressionLiteral(expr);
      if (literal !== null) {
        this.stringConstants.set(this.stringConstantKey(name), literal);
      }
      return;
    }
    const value = this.expressionValue(expr).value;
    this.emit(`store double ${value}, double* ${ptr}`);
  }

  storeArrayLiteral(ptr, info, expr) {
    for (let i = 0; i < info.size; i++) {
      const element = expr.elements[i] || new NumberNode(0);
      const elementPtr = this.arrayElementPtrFromRaw(ptr, info, this.doubleLiteral(i));
      this.emit(`store double ${this.expressionValue(element).value}, double* ${elementPtr}`);
    }
  }

  arrayElementPtr(name, target, indexValue) {
    return this.arrayElementPtrFromRaw(target.ptr, target.info, indexValue, this.clean(name));
  }

  arrayElementPtrFromRaw(ptr, info, indexValue, hint = 'array') {
    const index = this.temp(`${hint}idx`);
    const elementPtr = this.temp(`${hint}ptr`);
    this.emit(`${index} = fptosi double ${indexValue} to i64`);
    this.emit(`${elementPtr} = getelementptr inbounds [${info.size} x double], [${info.size} x double]* ${ptr}, i32 0, i64 ${index}`);
    return elementPtr;
  }

  emitStringExpression(node) {
    const literal = this.stringExpressionLiteral(node);
    if (literal !== null) {
      return this.addString(literal);
    }
    if (node instanceof VarNode) {
      const target = this.lookupVariable(node.name);
      if (target.info.kind !== 'string') {
        throw new Error(`${node.name} is not a string`);
      }
      return this.loadString(target.ptr, this.clean(node.name));
    }
    throw new Error('String expression must be a string literal, string variable, or literal concatenation');
  }

  stringExpressionLiteral(node) {
    if (node instanceof StringNode) {
      return node.value;
    }
    if (node instanceof VarNode) {
      const scoped = this.stringConstants.get(this.stringConstantKey(node.name));
      if (scoped !== undefined) return scoped;
      return this.stringConstants.get(`global:${node.name}`) ?? null;
    }
    if (node instanceof BinOpNode && node.op.tokenKind === TokenType.PLUS) {
      const left = this.stringExpressionLiteral(node.left);
      const right = this.stringExpressionLiteral(node.right);
      if (left !== null && right !== null) {
        return left + right;
      }
    }
    return null;
  }

  stringConstantKey(name) {
    const scope = this.currentFunction === 'main' ? 'global' : this.currentFunction || 'global';
    return `${scope}:${name}`;
  }

  addString(value) {
    const name = `@.str.${this.stringCounter++}`;
    const { body, length } = this.llvmString(value);
    this.stringLines.push(`${name} = private unnamed_addr constant [${length} x i8] c"${body}"`);
    return `getelementptr inbounds ([${length} x i8], [${length} x i8]* ${name}, i32 0, i32 0)`;
  }

  llvmString(value) {
    let body = '';
    let length = 1;
    for (const char of value) {
      const code = char.charCodeAt(0);
      length++;
      if (code === 10) body += '\\0A';
      else if (code === 9) body += '\\09';
      else if (code === 34) body += '\\22';
      else if (code === 92) body += '\\5C';
      else if (code < 32 || code > 126) body += `\\${code.toString(16).toUpperCase().padStart(2, '0')}`;
      else body += char;
    }
    body += '\\00';
    return { body, length };
  }

  startFunction(name) {
    this.currentFunction = name;
    this.lines = [];
    this.blockTerminated = false;
  }

  finishFunction() {
    this.functionLines.push(...this.lines, '');
    this.currentFunction = null;
    this.lines = [];
  }

  emit(line) {
    this.lines.push(line);
  }

  emitLabel(label) {
    this.lines.push(`${label}:`);
    this.blockTerminated = false;
  }

  temp(hint = 'tmp') {
    return `%${hint}.${this.tempCounter++}`;
  }

  label(prefix) {
    return `${prefix}.${this.labelCounter++}`;
  }

  clean(name) {
    return String(name).replace(/[^A-Za-z0-9_$.-]/g, '_');
  }

  doubleLiteral(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
      throw new Error(`Invalid numeric literal: ${value}`);
    }
    return number.toFixed(6);
  }

  generate() {
    return [
      ...this.moduleLines,
      '',
      ...this.globalLines,
      ...this.stringLines,
      '',
      ...this.functionLines
    ].join('\n');
  }
}

export { LLVMGenerator };
