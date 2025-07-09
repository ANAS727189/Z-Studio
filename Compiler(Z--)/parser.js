import { TokenType, Token } from './token.js';
import Lexer from './lexer.js';
import * as ast from './ast.js';


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
        const [line, column] = token && token.tokenKind !== TokenType.EOF ? [token.line, token.column] : this.last_pos;
        const error = `Parsing error at line ${line}, column ${column}: ${message}${suggestion ? ` [Suggestion: ${suggestion}]` : ''}`;
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
        throw new Error(`Parser Error: ${message} at line ${this.currToken.line}, column ${this.currToken.column}`);
    }

    nl() {
        this.match(TokenType.NEWLINE);
        while(this.checkToken(TokenType.NEWLINE)) {
            this.nextToken();
        }
    }

    match(tokenKind) {
        if(!this.checkToken(tokenKind)) {
            this.reportError(`Expected ${kind}, got ${this.currToken ? this.currToken.kind : 'None'}`, this.currToken, `Check syntax for ${kind}`);
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
        while (this.currToken && ![
        TokenType.NEWLINE, TokenType.EOF, TokenType.END, TokenType.LET, TokenType.PRINT,
        TokenType.INPUT, TokenType.IF, TokenType.WHILE, TokenType.FOR, TokenType.BREAK,
        TokenType.FUN, TokenType.RETURN, TokenType.RBRACE
        ].includes(this.currToken.tokenKind)) {
            this.nextToken();
        }
    }


    program() {
        if (!this.match(TokenType.START)) {
            this.reportError('Program must begin with start keyword.', this.currToken);
            return null;
        }
        this.nl();
        const statements = [];
        while (!this.checkToken(TokenType.END) && this.currToken.tokenKind !== TokenType.EOF) {
            const stmt = this.statement();
            if (stmt) statements.push(stmt);
            this.nl();
        }
        if (!this.match(TokenType.END)) {
            this.reportError('Program must end with end keyword.', this.currToken);
            return null;
        }
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

        if(this.checkToken(TokenType.LET)) {
            this.nextToken();
            const var_name = this.currToken ? this.currToken.text : '';
            this.symbols.add(var_name);
            if (!this.match(TokenType.IDENT)) return null;
            if (!this.match(TokenType.EQ)) return null;
            const expr = this.expression();
            if (!expr) return null;
            return new ast.LetNode(var_name, expr);
        }
    }
}


export { Parser };