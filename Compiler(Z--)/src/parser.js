import { TokenType, Token } from "./token.js";
import * as ast from "./ast.js";
class Parser {
  constructor(lexer) {
    this.currToken = null; // Current token
    this.peekToken = null; // Next token
    this.lexer = lexer; // Lexer instance
    this.errors = [];
    this.symbols = new Set();
    this.functions = new Set();
    this.last_pos = [1, 0]; // [line, column]
    this.nextToken(); //for curr token
    this.nextToken(); // for peek token
  }
  reportError(message, token = null, suggestion = null) {
    const [line, column] =
      token && token.tokenKind !== TokenType.EOF
        ? [token.line, token.column]
        : this.last_pos;
    const error = `Parsing error at line ${line}, column ${column}: ${message}${
      suggestion ? ` [Suggestion: ${suggestion}]` : ""
    }`;
    this.errors.push(error);
  }

  // return true if the current token matches the given token kind
  checkToken(tokenKind) {
    return this.currToken && tokenKind === this.currToken.tokenKind;
  }

  //Return true if the next token matches the given token kind
  checkPeek(tokenKind) {
    return this.peekToken && tokenKind === this.peekToken.tokenKind;
  }

  abort(message) {
    throw new Error(
      `Parser Error: ${message} at line ${this.currToken.line}, column ${this.currToken.column}`
    );
  }

  nl() {
    while (this.checkToken(TokenType.NEWLINE)) {
      this.nextToken();
    }
  }

  match(tokenKind) {
    if (!this.checkToken(tokenKind)) {
      const wantName = Token.getTokenTypeName(tokenKind);
      const gotName = this.currToken
        ? Token.getTokenTypeName(this.currToken.tokenKind)
        : "EOF";
      this.reportError(`Expected ${wantName}, got ${gotName}`, this.currToken);

      return false;
    }
    this.nextToken();
    return true;
  }

  nextToken() {
    this.currToken = this.peekToken;
    this.peekToken = this.lexer.getToken();
    if (this.currToken && this.currToken.tokenKind !== TokenType.EOF) {
      this.last_pos = [this.currToken.line, this.currToken.column];
    }
  }

  recover() {
    if (this.currToken) this.nextToken();
    while (
      this.currToken &&
      ![
        TokenType.NEWLINE,
        TokenType.EOF,
        TokenType.END,
        TokenType.LET,
        TokenType.PRINT,
        TokenType.INPUT,
        TokenType.IF,
        TokenType.WHILE,
        TokenType.FOR,
        TokenType.BREAK,
        TokenType.FUN,
        TokenType.RETURN,
        TokenType.RBRACE,
      ].includes(this.currToken.tokenKind)
    ) {
      this.nextToken();
    }
  }
  program() {
    if (!this.match(TokenType.START)) {
      this.reportError(
        "Program must begin with start keyword.",
        this.currToken
      );
      return null;
    }
    this.nl();
    const statements = [];
    while (
      !this.checkToken(TokenType.END) &&
      this.currToken.tokenKind !== TokenType.EOF
    ) {
      const stmt = this.statement();
      if (stmt) statements.push(stmt);
      this.nl();
    }
    if (!this.match(TokenType.END)) {
      this.reportError("Program must end with end keyword.", this.currToken);
      return null;
    }
    this.nl();
    return new ast.ProgramNode(statements);
  }

  statement() {
    if (this.checkToken(TokenType.ERROR)) {
      this.nextToken();
      return null;
    }
    if (this.checkToken(TokenType.NEWLINE)) {
      this.nextToken();
      return null;
    }

    if (this.checkToken(TokenType.IDENT) && this.checkPeek(TokenType.EQ)) {
      const name = this.currToken.tokenText;
      this.nextToken(); // Consume IDENT
      this.nextToken(); // Consume EQ
      const expr = this.expression();
      if (!expr) return null;
      return new ast.AssignmentNode(name, expr);
    }

    //   if (this.checkToken(TokenType.IDENT) && this.checkPeek(TokenType.LPAREN)) {
    // const name = this.currToken.tokenText;
    // this.nextToken(); // Consume IDENT
    // if (!this.match(TokenType.LPAREN)) {
    //     this.reportError('Expected ( after function name', this.currToken, 'Add ( for function call');
    //     this.recover();
    //     return null;
    // }
    // const args = [];
    // if (!this.checkToken(TokenType.RPAREN)) {
    //     do {
    //         const arg = this.expression();
    //         if (!arg) {
    //             this.reportError('Expected argument expression', this.currToken, 'Provide a valid expression');
    //             this.recover();
    //             return null;
    //         }
    //         args.push(arg);
    //     } while (this.checkToken(TokenType.COMMA) && this.nextToken());
    // }
    // if (!this.match(TokenType.RPAREN)) {
    //     this.reportError('Expected ) after arguments', this.currToken, 'Close argument list with )');
    //     this.recover();
    //     return null;
    // }
    // if (!this.functions.has(name)) {
    //     this.reportError(`Undefined function ${name}`, this.currToken, 'Define function with fun');
    //     this.recover();
    //     return null;
    // }
    // return new ast.CallNode(name, args);
    //     }

    if (
      this.checkToken(TokenType.PLUSPLUS) ||
      this.checkToken(TokenType.MINUSMINUS) ||
      this.checkToken(TokenType.IDENT) ||
      this.checkToken(TokenType.LPAREN) ||
      this.checkToken(TokenType.NUMBER) ||
      this.checkToken(TokenType.STRING) ||
      this.checkToken(TokenType.BOOLEAN)
    ) {
      const expr = this.expression();
      if (!expr) return null;
      return new ast.ExpressionStatementNode(expr);
    }


if (this.checkToken(TokenType.LET)) {
  this.nextToken();
  const var_name = this.currToken ? this.currToken.tokenText : "";
  this.symbols.add(var_name);
  if (!this.match(TokenType.IDENT)) return null;
  if (this.checkToken(TokenType.EQ)) {
    this.nextToken();
    const expr = this.expression();
    if (!expr) return null;
    return new ast.LetNode(var_name, expr);
  } else {
    return new ast.LetNode(var_name, new ast.NumberNode(0));
  }
}
    if (this.checkToken(TokenType.PRINT)) {
      this.nextToken();

      if (this.checkToken(TokenType.STRING)) {
        const strNode = new ast.StringNode(this.currToken.tokenText);
        this.nextToken();
        return new ast.PrintNode(strNode, true);
      }

      const expr = this.expression();
      if (!expr) return null;
      const isString = expr instanceof ast.StringNode;
      return new ast.PrintNode(expr, isString);
    }
    if (this.checkToken(TokenType.INPUT)) {
      this.nextToken();
      if (!this.checkToken(TokenType.LPAREN)) {
        this.reportError(
          "Expected LPAREN in input statement - input requires parentheses",
          this.currToken,
          "Add '(' after input"
        );
        this.recover();
        return null;
      }
      this.nextToken();
      if (!this.checkToken(TokenType.IDENT)) {
        this.reportError(
          "Expected identifier in input statement",
          this.currToken,
          "Add a valid variable name"
        );
        this.recover();
        return null;
      }
      const name = this.currToken.tokenText;
      this.nextToken();
      if (!this.checkToken(TokenType.RPAREN)) {
        this.reportError(
          "Input statement requires parentheses",
          this.currToken,
          "Add ')' after identifier"
        );
        this.recover();
        return null;
      }
      this.nextToken();
      return new ast.InputNode(name);
    }
    if (this.checkToken(TokenType.IF)) {
      this.nextToken();
      const condition = this.comparison();
      if (!condition) {
        this.recover();
        return null;
      }
      if (!this.match(TokenType.LBRACE)) return null;
      this.nl();
      const then_block = [];
      while (!this.checkToken(TokenType.RBRACE)) {
        if (this.checkToken(TokenType.EOF)) {
          this.reportError("EOF before }", null, "Close IF block with }");
          return null;
        }
        const stmt = this.statement();
        if (stmt) then_block.push(stmt);
        this.nl();
      }
      this.match(TokenType.RBRACE);
      let else_block = null;
      if (this.checkToken(TokenType.ELSE)) {
        this.nextToken();
        if (!this.match(TokenType.LBRACE)) return null;
        this.nl();
        else_block = [];
        while (!this.checkToken(TokenType.RBRACE)) {
          if (this.checkToken(TokenType.EOF)) {
            this.reportError("EOF before }", null, "Close ELSE block with }");
            return null;
          }
          const stmt = this.statement();
          if (stmt) else_block.push(stmt);
          this.nl();
        }
        this.match(TokenType.RBRACE);
      }
      return new ast.IfNode(condition, then_block, else_block);
    }
    if (this.checkToken(TokenType.WHILE)) {
      this.nextToken();
      const condition = this.comparison();
      if (!condition) {
        this.recover();
        return null;
      }
      if (!this.match(TokenType.LBRACE)) return null;
      this.nl();
      const body = [];
      while (!this.checkToken(TokenType.RBRACE)) {
        if (this.checkToken(TokenType.EOF)) {
          this.reportError("EOF before }", null, "Close WHILE block with }");
          return null;
        }
        const stmt = this.statement();
        if (stmt) body.push(stmt);
        this.nl();
      }
      this.match(TokenType.RBRACE);
      return new ast.WhileNode(condition, body);
    }

if (this.checkToken(TokenType.FOR)) {
  this.nextToken();
  // Parse init as either "let var = expr" or "var = expr"
  let init;
  if (this.checkToken(TokenType.LET)) {
    this.nextToken();
    const varName = this.currToken ? this.currToken.tokenText : "";
    this.symbols.add(varName);
    if (!this.match(TokenType.IDENT)) return null;
    if (!this.match(TokenType.EQ)) return null;
    const expr = this.expression();
    if (!expr) return null;
    init = new ast.LetNode(varName, expr);
  } else if (this.checkToken(TokenType.IDENT)) {
    const varName = this.currToken.tokenText;
    this.nextToken();
    if (!this.match(TokenType.EQ)) return null;
    const expr = this.expression();
    if (!expr) return null;
    init = new ast.AssignmentNode(varName, expr);
  } else {
    this.reportError("Expected variable declaration or assignment in for loop", this.currToken);
    return null;
  }
  
  if (!this.match(TokenType.COMMA)) return null;
  const condition = this.comparison();
  if (!condition) return null;
  if (!this.match(TokenType.COMMA)) return null;
  
  // Parse increment as assignment or postfix operation
  let increment;
  if (this.checkToken(TokenType.IDENT)) {
    const varName = this.currToken.tokenText;
    this.nextToken();
    if (this.checkToken(TokenType.EQ)) {
      this.nextToken();
      const expr = this.expression();
      if (!expr) return null;
      increment = new ast.AssignmentNode(varName, expr);
    } else if (this.checkToken(TokenType.PLUSPLUS) || this.checkToken(TokenType.MINUSMINUS)) {
      const opToken = this.currToken;
      this.nextToken();
      increment = new ast.PostfixOpNode(opToken, new ast.VarNode(varName));
    } else {
      this.reportError("Expected assignment or increment/decrement in for loop", this.currToken);
      return null;
    }
  } else {
    this.reportError("Expected variable in for loop increment", this.currToken);
    return null;
  }
  
  if (!this.match(TokenType.LBRACE)) return null;
  this.nl();
  const body = [];
  while (!this.checkToken(TokenType.RBRACE)) {
    if (this.checkToken(TokenType.EOF)) {
      this.reportError("EOF before }", null, "Close FOR block with }");
      return null;
    }
    const stmt = this.statement();
    if (stmt) body.push(stmt);
    this.nl();
  }
  this.match(TokenType.RBRACE);
  return new ast.ForNode(init, condition, increment, body);
}
    if (this.checkToken(TokenType.BREAK)) {
      this.nextToken();
      return new ast.BreakNode();
    }
    if (this.checkToken(TokenType.FUN)) {
      this.nextToken();
      const name = this.currToken ? this.currToken.tokenText : "";
      this.functions.add(name);
      if (!this.match(TokenType.IDENT)) {
        this.reportError(
          "Expected function name",
          this.currToken,
          "Use a valid identifier"
        );
        this.recover();
        return null;
      }
      if (!this.match(TokenType.LBRACE)) {
        this.reportError(
          "Expected { after function name",
          this.currToken,
          "Open function with {"
        );
        this.recover();
        return null;
      }
      this.nl();
      if (!this.match(TokenType.ARG)) {
        this.reportError(
          "Expected arg keyword in function",
          this.currToken,
          "Add arg = (params)"
        );
        this.recover();
        return null;
      }
      if (!this.match(TokenType.EQ)) {
        this.reportError(
          "Expected = after arg",
          this.currToken,
          "Add = before (params)"
        );
        this.recover();
        return null;
      }
      if (!this.match(TokenType.LPAREN)) {
        this.reportError(
          "Expected ( for parameters",
          this.currToken,
          "Add ( before parameter list"
        );
        this.recover();
        return null;
      }
      const params = [];
      if (!this.checkToken(TokenType.RPAREN)) {
        do {
          if (!this.checkToken(TokenType.IDENT)) {
            this.reportError(
              "Expected parameter name",
              this.currToken,
              "Use a valid identifier"
            );
            this.recover();
            return null;
          }
          const param = this.currToken.tokenText;
          this.symbols.add(param);
          params.push(param);
          this.nextToken();
          if (this.checkToken(TokenType.COMMA)) {
            this.nextToken();
          } else {
            break;
          }
        } while (true);
      }
      if (!this.match(TokenType.RPAREN)) {
        this.reportError(
          "Expected ) after parameters",
          this.currToken,
          "Close parameter list with )"
        );
        this.recover();
        return null;
      }
      this.nl();
      const body = [];
      while (
        !this.checkToken(TokenType.RBRACE) &&
        !this.checkToken(TokenType.EOF)
      ) {
        const stmt = this.statement();
        if (stmt) body.push(stmt);
        else this.recover();
        this.nl();
      }
      if (!this.match(TokenType.RBRACE)) {
        this.reportError(
          "Expected } to close function",
          this.currToken,
          "Close function block with }"
        );
        this.recover();
        return null;
      }
      return new ast.FunctionNode(name, params, body);
    }
    if (this.checkToken(TokenType.RETURN)) {
      return this.return_statement();
    }
    this.reportError(
      `Invalid statement at ${
        this.currToken ? this.currToken.tokenText : "None"
      }`,
      this.currToken,
      "Check for valid keywords (e.g., let, print, if)"
    );
    this.recover();
    return null;
  }

  assignment() {
    if (!this.checkToken(TokenType.IDENT)) return null;
    const varName = this.currToken.tokenText;
    this.nextToken();

    if (
      this.checkToken(TokenType.PLUSPLUS) ||
      this.checkToken(TokenType.MINUSMINUS)
    ) {
      const opToken = this.currToken;
      this.nextToken();
      return new ast.PostfixOpNode(opToken, new ast.VarNode(varName));
    }
    if (!this.match(TokenType.EQ)) return null;
    const rhs = this.expression();
    return rhs ? new ast.LetNode(varName, rhs) : null;
  }
  return_statement() {
    if (!this.match(TokenType.RETURN)) return null;
    if (
      this.checkToken(TokenType.NEWLINE) ||
      this.checkToken(TokenType.RBRACE) ||
      this.checkToken(TokenType.EOF)
    ) {
      return new ast.ReturnNode(new ast.NumberNode(0));
    }

    const expr = this.expression();
    if (!expr) {
      this.reportError(
        "Expected expression after return",
        this.currToken,
        "Provide a valid expression"
      );
      return new ast.ReturnNode(new ast.NumberNode(0)); // Return default instead of null
    }

    return new ast.ReturnNode(expr);
  }
  isComparisonOperator() {
    return [
      TokenType.EQEQ,
      TokenType.NOTEQ,
      TokenType.LT,
      TokenType.GT,
      TokenType.LTEQ,
      TokenType.GTEQ,
    ].includes(this.currToken?.tokenKind);
  }
  comparison() {
    const left = this.expression();
    if (!left) return null;
    if (this.isComparisonOperator()) {
      const op = this.currToken;
      this.nextToken();
      const right = this.expression();
      if (!right) return null;
      return new ast.BinOpNode(left, op, right);
    }
    return left;
  }

  expression() {
    let node = this.term();
    if (!node) return null;
    while (
      this.checkToken(TokenType.PLUS) ||
      this.checkToken(TokenType.MINUS)
    ) {
      const op = this.currToken;
      this.nextToken();
      const term = this.term();
      if (!term) return null;
      node = new ast.BinOpNode(node, op, term);
    }
    return node;
  }

  term() {
    let node = this.unary();
    if (!node) return null;
    while (
      this.checkToken(TokenType.ASTERISK) ||
      this.checkToken(TokenType.SLASH) ||
      this.checkToken(TokenType.MOD)
    ) {
      const op = this.currToken;
      this.nextToken();
      const unary = this.unary();
      if (!unary) return null;
      node = new ast.BinOpNode(node, op, unary);
    }
    return node;
  }

  unary() {
    if (
      this.checkToken(TokenType.PLUSPLUS) ||
      this.checkToken(TokenType.MINUSMINUS)
    ) {
      const opToken = this.currToken;
      this.nextToken(); // consume ++ or --
      const inner = this.unary(); // allow chaining: ++(++x)
      return new ast.PrefixOpNode(opToken, inner);
    }
    // next: unary + and -
    if (this.checkToken(TokenType.PLUS) || this.checkToken(TokenType.MINUS)) {
      const opToken = this.currToken;
      this.nextToken();
      const prim = this.primary();
      return new ast.UnaryOpNode(opToken, prim);
    }
    // fallback to numbers/idents/paren
    return this.primary();
  }
  primary() {
    let node = null;
    if (this.checkToken(TokenType.ERROR)) {
      this.nextToken();
      return null;
    }
    if (this.checkToken(TokenType.NUMBER)) {
      node = new ast.NumberNode(this.currToken.tokenText);
      this.nextToken();
    } else if (this.checkToken(TokenType.STRING)) {
      node = new ast.StringNode(this.currToken.tokenText);
      this.nextToken();
    } else if (this.checkToken(TokenType.BOOLEAN)) {
      node = new ast.BooleanNode(this.currToken.tokenText);
      this.nextToken();
    } else if (this.checkToken(TokenType.IDENT)) {
      const name = this.currToken.tokenText;
      this.nextToken();
      if (this.checkToken(TokenType.LPAREN)) {
        this.nextToken(); // Consume LPAREN
        const args = [];
        if (!this.checkToken(TokenType.RPAREN)) {
          do {
            const arg = this.expression();
            if (!arg) {
              this.reportError(
                "Expected argument expression",
                this.currToken,
                "Provide a valid expression"
              );
              this.recover();
              return null;
            }
            args.push(arg);
            // Fixed: Check for comma and consume it properly
            if (this.checkToken(TokenType.COMMA)) {
              this.nextToken();
            } else {
              break;
            }
          } while (true);
        }
        if (!this.match(TokenType.RPAREN)) {
          this.reportError(
            "Expected ) after arguments",
            this.currToken,
            "Close argument list with )"
          );
          this.recover();
          return null;
        }
        // Don't check if function exists here - let code generator handle it
        node = new ast.CallNode(name, args);
      } else {
        node = new ast.VarNode(name);
      }
    } else if (this.checkToken(TokenType.LPAREN)) {
      this.nextToken();
      node = this.expression();
      if (!node) return null;
      if (!this.match(TokenType.RPAREN)) {
        this.reportError(
          "Expected ) after expression",
          this.currToken,
          "Close expression with )"
        );
        return null;
      }
    } else {
      this.reportError(
        `Unexpected token ${this.currToken?.tokenText || "None"}`,
        this.currToken,
        "Expected number, string, boolean, or identifier"
      );
      this.nextToken();
      return null;
    }
    // Postfix operators
    while (
      this.checkToken(TokenType.PLUSPLUS) ||
      this.checkToken(TokenType.MINUSMINUS)
    ) {
      const opToken = this.currToken;
      this.nextToken();
      node = new ast.PostfixOpNode(opToken, node);
    }
    return node;
  }
}
export { Parser };
