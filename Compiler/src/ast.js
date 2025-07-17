
class ASTNode {
    constructor() {}
}

class ProgramNode extends ASTNode {
    constructor(statements) {
        super();
        this.statements = statements;
    }
}

class AssignmentNode extends ASTNode {
    constructor(name, expr) {
        super();
        this.name = name; 
        this.expr = expr;  
    }
}

class LetNode extends ASTNode {
    constructor(name, expr) {
        super();
        this.name = name;
        this.expr = expr;
    }
}

class PrintNode extends ASTNode {
    constructor(expr, is_string = false) {
        super();
        this.expr = expr;
        this.is_string = is_string;
    }
}

class InputNode extends ASTNode {
    constructor(name) {
        super();
        this.name = name;
    }
}

class IfNode extends ASTNode {
    constructor(condition, then_block, else_block = null) {
        super();
        this.condition = condition;
        this.then_block = then_block;
        this.else_block = else_block;
    }
}

class PrefixOpNode extends ASTNode {
    constructor(op, expr) {
        super();
        this.op = op;     // TokenType.PLUSPLUS or MINUSMINUS
        this.expr = expr; 
    }
}

class PostfixOpNode extends ASTNode {
    constructor(op, expr) {
        super();
        this.op = op; 
        this.expr = expr;
    }
}


class WhileNode extends ASTNode {
    constructor(condition, body) {
        super();
        this.condition = condition;
        this.body = body;
    }
}

class ForNode extends ASTNode {
    constructor(init, condition, increment, body) {
        super();
        this.init = init;
        this.condition = condition;
        this.increment = increment;
        this.body = body;
    }
}

class BreakNode extends ASTNode {
    constructor() {
        super();
    }
}

// In FunctionNode:
// this.params: string[]
// this.body: ASTNode[]
class FunctionNode extends ASTNode {
    constructor(name, params, body) {
        super();
        this.name = name;
        this.params = params;
        this.body = body;
    }
}



class CallNode extends ASTNode {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args;
    }
}

class ReturnNode extends ASTNode {
    constructor(expr) {
        super();
        this.expr = expr;
    }
}

class BinOpNode extends ASTNode {
    constructor(left, op, right) {
        super();
        this.left = left;
        this.op = op;
        this.right = right;
    }
}

class UnaryOpNode extends ASTNode {
    constructor(op, expr) {
        super();
        this.op = op;
        this.expr = expr;
    }
}

class NumberNode extends ASTNode {
    constructor(value) {
        super();
        this.value = parseFloat(value);
    }
}

class StringNode extends ASTNode {
    constructor(value) {
        super();
        this.value = value;
    }
}

class BooleanNode extends ASTNode {
    constructor(value) {
        super();
        this.value = value === 'true';
    }
}

class VarNode extends ASTNode {
    constructor(name) {
        super();
        this.name = name;
    }
}

class ExpressionStatementNode extends ASTNode {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

export {
    ProgramNode, AssignmentNode, LetNode, PrintNode, InputNode, IfNode, WhileNode, ForNode, BreakNode,
    FunctionNode, CallNode, PrefixOpNode, PostfixOpNode, ReturnNode, BinOpNode, UnaryOpNode, 
    NumberNode, StringNode, BooleanNode, VarNode, ExpressionStatementNode
};