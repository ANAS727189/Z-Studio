import { TokenType } from './token.js';
import {
  ProgramNode, LetNode, PrintNode, InputNode, IfNode, WhileNode, ForNode, BreakNode,
  FunctionNode, CallNode, ReturnNode, BinOpNode, UnaryOpNode, NumberNode, StringNode,
  BooleanNode, VarNode, PrefixOpNode, PostfixOpNode, ExpressionStatementNode, AssignmentNode
} from './ast.js';

class CodeGenerator {
    constructor() {
        this.code = [];
        this.header = ['#include <stdio.h>', '#include <stdbool.h>'];
        this.symbols = new Set();
        this.functions = new Set();
        this.indentLevel = 0;
        this.functionDefinitions = [];
        this.globalVariables = new Set();
        this.localVariables = new Map();
        this.inFunction = false;
        this.currentFunction = 'global';
    }

    addCode(line) {
        const indent = '    '.repeat(this.indentLevel);
        this.code.push(indent + line);
    }

    addFunctionCode(line) {
        const indent = '    '.repeat(this.indentLevel);
        this.functionDefinitions.push(indent + line);
    }

    visit_ProgramNode(node) {
        this.currentFunction = 'global';
        
        // Separate functions and main statements
        const functionNodes = node.statements.filter(stmt => stmt instanceof FunctionNode);
        const mainStatements = node.statements.filter(stmt => !(stmt instanceof FunctionNode));
        
        // First pass: collect all variables
        for (const stmt of mainStatements) {
            this._collectVariables(stmt, 'global');
        }
        
        for (const funcNode of functionNodes) {
            this._collectVariables(funcNode, funcNode.name);
        }
        
        // Second pass: Generate function definitions
        for (const funcNode of functionNodes) {
            this.currentFunction = funcNode.name;
            this.visit(funcNode);
        }
        
        this.buildHeader();
        
        // Third pass: Generate main function
        this.currentFunction = 'global';
        this.code.push('int main(void) {');
        this.indentLevel++;
        this.inFunction = false;
        
        for (const stmt of mainStatements) {
            this.visit(stmt);
        }
        
        this.addCode('return 0;');
        this.indentLevel--;
        this.code.push('}');
    }

    buildHeader() {
        const headerParts = [...this.header];
        
        if (this.globalVariables.size > 0) {
            headerParts.push('');
            headerParts.push('// Global variable declarations');
            for (const varName of this.globalVariables) {
                headerParts.push(`double ${varName};`);
            }
        }
        
        if (this.functionDefinitions.length > 0) {
            headerParts.push('');
            headerParts.push('// Function definitions');
            headerParts.push(...this.functionDefinitions);
        }
        
        this.header = headerParts;
    }

    _collectVariables(node, scope) {
        if (!node) return;
        
        if (node instanceof LetNode || node instanceof InputNode) {
            if (scope === 'global') {
                this.globalVariables.add(node.name);
            } else {
                if (!this.localVariables.has(scope)) {
                    this.localVariables.set(scope, new Set());
                }
                this.localVariables.get(scope).add(node.name);
            }
        } else if (node instanceof AssignmentNode) {
            // Assignment can create variables
            if (scope === 'global') {
                this.globalVariables.add(node.name);
            } else {
                if (!this.localVariables.has(scope)) {
                    this.localVariables.set(scope, new Set());
                }
                this.localVariables.get(scope).add(node.name);
            }
            // Also check the expression
            this._collectVariables(node.expr, scope);
        } else if (node instanceof FunctionNode) {
            const funcScope = node.name;
            this.functions.add(funcScope);
            this.localVariables.set(funcScope, new Set(node.params));
            for (const stmt of node.body) {
                this._collectVariables(stmt, funcScope);
            }
        } else if (node instanceof IfNode) {
            this._collectVariables(node.condition, scope);
            for (const stmt of node.then_block) this._collectVariables(stmt, scope);
            if (node.else_block) for (const stmt of node.else_block) this._collectVariables(stmt, scope);
        } else if (node instanceof WhileNode) {
            this._collectVariables(node.condition, scope);
            for (const stmt of node.body) this._collectVariables(stmt, scope);
        } else if (node instanceof ForNode) {
            this._collectVariables(node.init, scope);
            this._collectVariables(node.condition, scope);
            this._collectVariables(node.increment, scope);
            for (const stmt of node.body) this._collectVariables(stmt, scope);
        } else if (node instanceof ExpressionStatementNode) {
            this._collectVariables(node.expr, scope);
        } else if (node instanceof CallNode) {
            for (const arg of node.args) {
                this._collectVariables(arg, scope);
            }
        } else if (node instanceof BinOpNode) {
            this._collectVariables(node.left, scope);
            this._collectVariables(node.right, scope);
        } else if (node instanceof UnaryOpNode || node instanceof PrefixOpNode || node instanceof PostfixOpNode) {
            this._collectVariables(node.expr, scope);
        } else if (node instanceof ReturnNode) {
            this._collectVariables(node.expr, scope);
        } else if (node instanceof PrintNode) {
            if (!node.is_string) {
                this._collectVariables(node.expr, scope);
            }
        }
    }

    visit_LetNode(node) {
        const exprCode = this.visit(node.expr);
        const code = `${node.name} = ${exprCode};`;
        if (this.inFunction) this.addFunctionCode(code);
        else this.addCode(code);
    }

    visit_AssignmentNode(node) {
        const exprCode = this.visit(node.expr);
        if (!exprCode) return; 
        
        const currentScope = this.currentFunction;
        const localVars = this.localVariables.get(currentScope) || new Set();
        
        let varExists = false;
        if (currentScope === 'global') {
            varExists = this.globalVariables.has(node.name);
        } else {
            varExists = localVars.has(node.name) || this.globalVariables.has(node.name);
        }
        
        if (!varExists) {
            console.error(`Undefined variable: ${node.name}`);
        }
        
        const code = `${node.name} = ${exprCode};`;
        if (this.inFunction) {
            this.addFunctionCode(code);
        } else {
            this.addCode(code);
        }
    }

    visit_VarNode(node) {
        if (this.currentFunction === 'global') {
            if (!this.globalVariables.has(node.name)) {
                console.error(`Undefined variable: ${node.name}`);
                return node.name;
            }
        } else {
            const localVars = this.localVariables.get(this.currentFunction) || new Set();
            if (!localVars.has(node.name) && !this.globalVariables.has(node.name)) {
                console.error(`Undefined variable: ${node.name}`);
                return node.name;
            }
        }
        return node.name;
    }

    // Rest of the methods remain the same...
    visit_PrintNode(node) {
        let code;
        if (node.is_string) {
            const escaped = node.expr.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            code = `printf("${escaped}\\n");`;
        } else {
            const exprCode = this.visit(node.expr);
            code = `printf("%.2f\\n", ${exprCode});`;
        }
        if (this.inFunction) this.addFunctionCode(code);
        else this.addCode(code);
    }

    visit_ExpressionStatementNode(node) {
        if (node.expr instanceof CallNode) {
            const exprCode = this.visit(node.expr);
            const code = `${exprCode};`;
            if (this.inFunction) this.addFunctionCode(code);
            else this.addCode(code);
        } else if (!(node.expr instanceof VarNode)) {
            const exprCode = this.visit(node.expr);
            const code = `${exprCode};`;
            if (this.inFunction) this.addFunctionCode(code);
            else this.addCode(code);
        }
    }

    visit_InputNode(node) {
        this.addCode(`if (scanf("%lf", &${node.name}) != 1) {`);
        this.indentLevel++;
        this.addCode(`${node.name} = 0;`);
        this.addCode('scanf("%*s");');
        this.indentLevel--;
        this.addCode('}');
    }

    visit_IfNode(node) {
        const condCode = this.visit(node.condition);
        const code = `if (${condCode}) {`;
        if (this.inFunction) this.addFunctionCode(code);
        else this.addCode(code);
        this.indentLevel++;
        for (const stmt of node.then_block) {
            this.visit(stmt);
        }
        this.indentLevel--;
        if (this.inFunction) this.addFunctionCode('}');
        else this.addCode('}');
        if (node.else_block) {
            if (this.inFunction) this.addFunctionCode('else {');
            else this.addCode('else {');
            this.indentLevel++;
            for (const stmt of node.else_block) {
                this.visit(stmt);
            }
            this.indentLevel--;
            if (this.inFunction) this.addFunctionCode('}');
            else this.addCode('}');
        }
    }

    visit_WhileNode(node) {
        const condCode = this.visit(node.condition);
        const code = `while (${condCode}) {`;
        if (this.inFunction) this.addFunctionCode(code);
        else this.addCode(code);
        this.indentLevel++;
        for (const stmt of node.body) {
            this.visit(stmt);
        }
        this.indentLevel--;
        if (this.inFunction) this.addFunctionCode('}');
        else this.addCode('}');
    }


visit_ForNode(node) {
    // Generate init code separately
    if (node.init instanceof LetNode) {
        const exprCode = this.visit(node.init.expr);
        const initCode = `${node.init.name} = ${exprCode}`;
        const condCode = this.visit(node.condition);
        const incrCode = this.visit(node.increment);
        
        if (this.inFunction) {
            this.addFunctionCode(`for (${initCode}; ${condCode}; ${incrCode}) {`);
        } else {
            this.addCode(`for (${initCode}; ${condCode}; ${incrCode}) {`);
        }
    } else if (node.init instanceof AssignmentNode) {
        const exprCode = this.visit(node.init.expr);
        const initCode = `${node.init.name} = ${exprCode}`;
        const condCode = this.visit(node.condition);
        const incrCode = this.visit(node.increment);
        
        if (this.inFunction) {
            this.addFunctionCode(`for (${initCode}; ${condCode}; ${incrCode}) {`);
        } else {
            this.addCode(`for (${initCode}; ${condCode}; ${incrCode}) {`);
        }
    }
    
    this.indentLevel++;
    for (const stmt of node.body) {
        this.visit(stmt);
    }
    this.indentLevel--;
    
    if (this.inFunction) {
        this.addFunctionCode('}');
    } else {
        this.addCode('}');
    }
}
    visit_BreakNode() {
        this.addCode('break;');
    }

    visit_FunctionNode(node) {
        const params = node.params.map(p => `double ${p}`).join(', ');
        this.addFunctionCode(`double ${node.name}(${params}) {`);
        this.indentLevel++;
        
        const localVars = this.localVariables.get(node.name);
        for (const varName of localVars) {
            if (!node.params.includes(varName)) {
                this.addFunctionCode(`double ${varName};`);
            }
        }
        
        this.inFunction = true;
        for (const stmt of node.body) {
            this.visit(stmt);
        }
        this.inFunction = false;
        this.indentLevel--;
        this.addFunctionCode('}');
        this.addFunctionCode('');
    }

    visit_CallNode(node) {
        const args = node.args.map(arg => this.visit(arg)).join(', ');
        return `${node.name}(${args})`;
    }

    visit_ReturnNode(node) {
        const exprCode = this.visit(node.expr);
        this.addFunctionCode(`return ${exprCode};`);
    }

visit_BinOpNode(node) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    const opMap = {
        [TokenType.PLUS]: '+',
        [TokenType.MINUS]: '-',
        [TokenType.ASTERISK]: '*',
        [TokenType.SLASH]: '/',
        [TokenType.EQEQ]: '==',
        [TokenType.NOTEQ]: '!=',
        [TokenType.LT]: '<',
        [TokenType.GT]: '>',
        [TokenType.LTEQ]: '<=',
        [TokenType.GTEQ]: '>=',
        [TokenType.AND]: '&&',
        [TokenType.OR]: '||',
        [TokenType.MOD]: '%' 
    };
    
    const opText = opMap[node.op.tokenKind] || '';
    
    // Handle modulo operator specially - cast to int
    if (node.op.tokenKind === TokenType.MOD) {
        return `((int)${left} % (int)${right})`;
    }
    
    return `(${left} ${opText} ${right})`;
}

    visit_UnaryOpNode(node) {
        const expr = this.visit(node.expr);
        return `${node.op.tokenKind === TokenType.MINUS ? '-' : '+'}${expr}`;
    }

    visit_PrefixOpNode(node) {
        const expr = this.visit(node.expr);
        const op = node.op.tokenKind === TokenType.PLUSPLUS ? '++' : '--';
        return `${op}${expr}`;
    }

    visit_PostfixOpNode(node) {
        const expr = this.visit(node.expr);
        const op = node.op.tokenKind === TokenType.PLUSPLUS ? '++' : '--';
        return `${expr}${op}`;
    }

    visit_NumberNode(node) {
        return node.value.toString();
    }

    visit_StringNode(node) {
        return `"${node.value}"`;
    }

    visit_BooleanNode(node) {
        return node.value ? '1.0' : '0.0';
    }

    visit(node) {
        if (!node) {
            console.error('Warning: Attempting to visit null node');
            return null;
        }
        
        const method = `visit_${node.constructor.name}`;
        if (this[method]) {
            return this[method](node);
        }
        throw new Error(`No visit method for ${node.constructor.name}`);
    }

    generate() {
        return [...this.header, '', ...this.code].join('\n');
    }
}

export { CodeGenerator };