import { TokenType } from './token.js';
import {
  ProgramNode, LetNode, PrintNode, InputNode, IfNode, WhileNode, ForNode, BreakNode,
  FunctionNode, CallNode, ReturnNode, BinOpNode, UnaryOpNode, NumberNode, StringNode,
  BooleanNode, VarNode, PrefixOpNode, PostfixOpNode
} from './ast.js';

class CodeGenerator {
  constructor() {
    this.code = [];
    this.header = ['#include <stdio.h>', '#include <stdbool.h>'];
    this.symbols = new Set();
    this.functions = new Set();
  }

  visit_ProgramNode(node) {
    // Collect function definitions first
    const functionNodes = node.statements.filter(stmt => stmt instanceof FunctionNode);
    for (const funcNode of functionNodes) {
      this.visit(funcNode);
    }

    this.code.push('int main(void) {');
    this._collectVariables(node);
    const mainStatements = node.statements.filter(stmt => !(stmt instanceof FunctionNode));
    for (const stmt of mainStatements) {
      this.visit(stmt);
    }
    this.code.push('return 0;');
    this.code.push('}');
  }

  _collectVariables(node) {
    if (node instanceof ProgramNode) {
      for (const stmt of node.statements) {
        this._collectVariables(stmt);
      }
    } else if (node instanceof LetNode) {
      if (!this.symbols.has(node.name)) {
        this.header.push(`double ${node.name};`);
        this.symbols.add(node.name);
      }
    } else if (node instanceof InputNode) {
      if (!this.symbols.has(node.name)) {
        this.header.push(`double ${node.name};`);
        this.symbols.add(node.name);
      }
    } else if (node instanceof FunctionNode) {
      if (!this.functions.has(node.name)) {
        this.functions.add(node.name);
        const params = node.params.map(p => `double ${p}`).join(', ');
        this.header.push(`double ${node.name}(${params});`);
      }
      for (const stmt of node.body) {
        this._collectVariables(stmt);
      }
    } else if (node instanceof IfNode) {
      this._collectVariables(node.condition);
      for (const stmt of node.then_block) this._collectVariables(stmt);
      if (node.else_block) for (const stmt of node.else_block) this._collectVariables(stmt);
    } else if (node instanceof WhileNode || node instanceof ForNode) {
      this._collectVariables(node.condition);
      for (const stmt of node.body) this._collectVariables(stmt);
      if (node instanceof ForNode) {
        this._collectVariables(node.init);
        this._collectVariables(node.increment);
      }
    } else if (node instanceof BinOpNode) {
      this._collectVariables(node.left);
      this._collectVariables(node.right);
    } else if (node instanceof UnaryOpNode) {
      this._collectVariables(node.expr);
    } else if (node instanceof PrefixOpNode || node instanceof PostfixOpNode) {
      this._collectVariables(node.expr);
    } else if (node instanceof CallNode) {
      for (const arg of node.args) this._collectVariables(arg);
    } else if (node instanceof ReturnNode) {
      this._collectVariables(node.expr);
    }
  }

  visit_LetNode(node) {
    const exprCode = this.visit(node.expr);
    this.code.push(`${node.name} = ${exprCode};`);
  }

  visit_PrintNode(node) {
    if (node.is_string) {
      const escaped = node.expr.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      this.code.push(`printf("${escaped}\\n");`);
    } else {
      const exprCode = this.visit(node.expr);
      this.code.push(`printf("%.2f\\n", ${exprCode});`);
    }
  }

  visit_InputNode(node) {
    this.code.push(`if (scanf("%lf", &${node.name}) != 1) {`);
    this.code.push(`${node.name} = 0;`);
    this.code.push('scanf("%*s");');
    this.code.push('}');
  }

  visit_IfNode(node) {
    const condCode = this.visit(node.condition);
    this.code.push(`if (${condCode}) {`);
    for (const stmt of node.then_block) {
      this.visit(stmt);
    }
    this.code.push('}');
    if (node.else_block) {
      this.code.push('else {');
      for (const stmt of node.else_block) {
        this.visit(stmt);
      }
      this.code.push('}');
    }
  }

  visit_WhileNode(node) {
    const condCode = this.visit(node.condition);
    this.code.push(`while (${condCode}) {`);
    for (const stmt of node.body) {
      this.visit(stmt);
    }
    this.code.push('}');
  }

  visit_ForNode(node) {
    const initCode = this.visit(node.init);
    const condCode = this.visit(node.condition);
    const incrCode = this.visit(node.increment);
    this.code.push(`for (${initCode} ${condCode}; ${incrCode}) {`);
    for (const stmt of node.body) {
      this.visit(stmt);
    }
    this.code.push('}');
  }

  visit_BreakNode() {
    this.code.push('break;');
  }

  visit_FunctionNode(node) {
    const params = node.params.map(p => `double ${p}`).join(', ');
    this.code.unshift(`double ${node.name}(${params}) {`);
    for (const stmt of node.body) {
      this.visit(stmt);
    }
    this.code.push('}');
  }

  visit_CallNode(node) {
    const args = node.args.map(arg => this.visit(arg)).join(', ');
    return `${node.name}(${args})`;
  }

  visit_ReturnNode(node) {
    const exprCode = this.visit(node.expr);
    this.code.push(`return ${exprCode};`);
  }

  visit_BinOpNode(node) {
    const left = this.visit(node.left);
    const right = this.visit(node.right);
    // console.log('BinOpNode op kind:', node.op.tokenKind);
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
      [TokenType.OR]: '||'
    };
    const opText = opMap[node.op.tokenKind] || '';
    return `(${left} ${opText} ${right})`;
  }

  visit_UnaryOpNode(node) {
    const expr = this.visit(node.expr);
    return `${node.op.tokenKind === TokenType.MINUS ? '-' : '+'}${expr}`;
  }

  visit_PrefixOpNode(node) {
    const expr = this.visit(node.expr);
    return `${node.op.tokenKind === TokenType.PLUSPLUS ? '++' : '--'}${expr}`;
  }

  visit_PostfixOpNode(node) {
    const expr = this.visit(node.expr);
    return `${expr}${node.op.tokenKind === TokenType.PLUSPLUS ? '++' : '--'}`;
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

  visit_VarNode(node) {
    return node.name;
  }

  visit(node) {
    const method = `visit_${node.constructor.name}`;
    if (this[method]) return this[method](node);
    throw new Error(`No visit method for ${node.constructor.name}`);
  }

  generate() {
    return [...this.header, ...this.code].join('\n');
  }
}

export { CodeGenerator };