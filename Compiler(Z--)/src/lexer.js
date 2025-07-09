import {Token, TokenType} from "./token.js";

class Lexer {

    constructor(source){
        this.source = source;
        this.currChar = '';
        this.currPos = -1;
        this.line = 1;
        this.column = 0;
        this.errors = [];
        this.nextChar();
    }

    nextChar(){
        this.currPos += 1;
        if(this.currPos >= (this.source).length) {
            this.currChar = '\0';
        }else {
            this.currChar = this.source[this.currPos];
            if(this.currChar == '\n') {
                this.line++;
                this.column = 0;
            }else this.column++;
        }
    }

    peek(){
        if(this.currPos + 1 >= (this.source).length) {
            return '\0';
        }
        return this.source[this.currPos + 1];
    }

    abort() {
        console.error(`Unexpected character: ${this.currChar}`);
        this.currChar = '\0';
    }

    skipWhitespace() {
        while (this.currChar === ' ' || this.currChar === '\r' || this.currChar === '\t') {
            this.nextChar();
        }
    }

    reportError(message, line, column, suggestion) {
        const error = `Lexing error at line ${line}, column ${column}: ${message}${suggestion ? ` [Suggestion: ${suggestion}]` : ''}`;
        this.errors.push(error);
    }



    skipComments() {
        if (this.currChar === '/' && this.peek() === '/') {
        while (this.currChar !== '\n' && this.currChar !== '\0') {
            this.nextChar();
        }
        return true;
    } 
        else if (this.currChar === '/' && this.peek() === '*') {
            let tempPos = this.currPos + 2;
            let foundClosing = false;
            while (tempPos < this.source.length - 1) {
                if (this.source[tempPos] === '*' && this.source[tempPos + 1] === '/') {
                    foundClosing = true;
                    break;
                }
                tempPos++;
            }

            if (!foundClosing) {
                this.reportError('Unterminated comment', this.line, this.column, 'Close with */');
                return false;
            }

            this.nextChar();
            this.nextChar();

            while (!(this.currChar === '*' && this.peek() === '/')) {
                if (this.currChar === '\0') return false;
                this.nextChar();
            }
            this.nextChar();
            this.nextChar();
            return true;
    }
        return false;
    }

    
    skipAllWhiteSpacesandComments() {
        while (true) {
            this.skipWhitespace();
            if (!this.skipComments()) break;
        }
    }

    getToken() {
        this.skipAllWhiteSpacesandComments();

        const start_line = this.line;
        const start_column = this.column;
        let token;
         if (this.currChar === '\n') {
            token = new Token(this.currChar, TokenType.NEWLINE, start_line, start_column);
            this.nextChar();
            return token;
        }
         if (this.currChar === '\0') {
            token = new Token('', TokenType.EOF, start_line, start_column);
            return token;
        }
        
    if (this.currChar === '+') {
        if (this.peek() === '+') {
            this.nextChar();
            token = new Token('++', TokenType.PLUSPLUS, start_line, start_column);
        } else {
            token = new Token(this.currChar, TokenType.PLUS, start_line, start_column);
        }
        } else if (this.currChar === '-') {
        if (this.peek() === '-') {
            this.nextChar();
            token = new Token('--', TokenType.MINUSMINUS, start_line, start_column);
        } else {
            token = new Token(this.currChar, TokenType.MINUS, start_line, start_column);
        }
        } else if (this.currChar === '*') {
            token = new Token(this.currChar, TokenType.ASTERISK, start_line, start_column);
        } 
        else if (this.currChar === '/') {
            if (this.peek() === '/' || this.peek() === '*') {
                const skipped = this.skipComments();
                if (skipped) return this.getToken();
            }
            token = new Token(this.currChar, TokenType.SLASH, start_line, start_column);
        } else if (this.currChar === '=') {
        if (this.peek() === '=') {
            this.nextChar();
            token = new Token('==', TokenType.EQEQ, start_line, start_column);
        } else {
            token = new Token(this.currChar, TokenType.EQ, start_line, start_column);
        }
        } else if (this.currChar === '!') {
        if (this.peek() === '=') {
            this.nextChar();
            token = new Token('!=', TokenType.NOTEQ, start_line, start_column);
        } else {
            this.reportError(`Expected !=, got !${this.peek()}`, start_line, start_column, "Did you mean '!='?");
            token = new Token('Invalid operator', TokenType.ERROR, start_line, start_column);
            this.nextChar();
            return token;
        }
        } else if (this.currChar === '<') {
        if (this.peek() === '=') {
            this.nextChar();
            token = new Token('<=', TokenType.LTEQ, start_line, start_column);
        } else {
            token = new Token(this.currChar, TokenType.LT, start_line, start_column);
        }
        } else if (this.currChar === '>') {
        if (this.peek() === '=') {
            this.nextChar();
            token = new Token('>=', TokenType.GTEQ, start_line, start_column);
        } else {
            token = new Token(this.currChar, TokenType.GT, start_line, start_column);
        }
        }
        
        else if (this.currChar === '&') {
            if (this.peek() === '&') {
                this.nextChar();
                token = new Token('&&', TokenType.AND, start_line, start_column);
            } else {
                token = new Token('&', TokenType.BITAND, start_line, start_column);
            }
        }
        else if (this.currChar === '%') {
            token = new Token('%', TokenType.MOD, start_line, start_column);
        }
        else if (this.currChar === '^') {
            token = new Token('^', TokenType.BITXOR, start_line, start_column);
        }
        else if (this.currChar === '|') {
            if (this.peek() === '|') {
                this.nextChar();
                token = new Token('||', TokenType.OR, start_line, start_column);
            } else {
                token = new Token('|', TokenType.BITOR, start_line, start_column);
            }
        }
        else if (this.currChar === '{') {
        token = new Token(this.currChar, TokenType.LBRACE, start_line, start_column);
        } else if (this.currChar === '}') {
        token = new Token(this.currChar, TokenType.RBRACE, start_line, start_column);
        } else if (this.currChar === '(') {
        token = new Token(this.currChar, TokenType.LPAREN, start_line, start_column);
        } else if (this.currChar === ')') {
        token = new Token(this.currChar, TokenType.RPAREN, start_line, start_column);
        } else if (this.currChar === ',') {
        token = new Token(this.currChar, TokenType.COMMA, start_line, start_column);
        } else if (this.currChar === '\n') {
        token = new Token(this.currChar, TokenType.NEWLINE, start_line, start_column);
        } else if (this.currChar === '\0') {
        token = new Token('', TokenType.EOF, this.line - 1, this.column);
        } else if (this.currChar === '"') {
            this.nextChar();
            const startPos = this.currPos;
            while (this.currChar !== '"') {
                if (this.currChar === '\r' || this.currChar === '\n' || this.currChar === '\t') {
                this.reportError('Illegal character in string', this.line, this.column, 'Strings cannot contain newlines or tabs');
                token = new Token('Illegal string', TokenType.ERROR, this.line, this.column);
                this.nextChar();
                return token;
                }
                if (this.currChar === '\0') {
                this.reportError('Unterminated string', start_line, start_column, 'Close with "');
                token = new Token('Unterminated string', TokenType.ERROR, start_line, start_column);
                return token;
                }
                this.nextChar();
            }
            const tokText = this.source.slice(startPos, this.currPos);
            token = new Token(tokText, TokenType.STRING, start_line, start_column);
        } else if (this.currChar === '0' && /[xob]/i.test(this.peek())) {
        const baseChar = this.peek().toLowerCase();
        const startPos = this.currPos;

        this.nextChar(); 
        this.nextChar();

        let validDigits;
        if (baseChar === 'x') validDigits = /[0-9a-fA-F]/;
        else if (baseChar === 'b') validDigits = /[01]/;
        else if (baseChar === 'o') validDigits = /[0-7]/;

        if (!validDigits.test(this.currChar)) {
            this.reportError(`Invalid ${baseChar}-based number`, this.line, this.column, 'Check number format');
            token = new Token('Invalid number', TokenType.ERROR, start_line, start_column);
            return token;
        }

        while (validDigits.test(this.currChar)) {
            this.nextChar();
        }

    const tokText = this.source.slice(startPos, this.currPos);
    token = new Token(tokText, TokenType.NUMBER, start_line, start_column);
    return token;
    } else if(/\d/.test(this.currChar)) {
        // Base 10 number
        let startPos = this.currPos;
        while (/\d/.test(this.peek())) this.nextChar();
        if (this.peek() === '.') {
            this.nextChar();
            if (!/\d/.test(this.peek())) {
                this.reportError('Illegal number format', this.line, this.column, 'Decimals need digits after .');
                token = new Token('Invalid number', TokenType.ERROR, this.line, this.column);
                this.nextChar();
                return token;
            }
            while (/\d/.test(this.peek())) this.nextChar();
        }
        const tokText = this.source.slice(startPos, this.currPos + 1);
        token = new Token(tokText, TokenType.NUMBER, start_line, start_column);
        this.nextChar();
        return token;
    }
        else if (/[a-zA-Z]/.test(this.currChar)) {
            const startPos = this.currPos;
            while (/[a-zA-Z0-9]/.test(this.peek())) this.nextChar();
            this.nextChar(); 

            const tokText = this.source.slice(startPos, this.currPos);
            const lowerTok = tokText.toLowerCase();
            
            if (lowerTok === "true" || lowerTok === "false") {
                token = new Token(lowerTok, TokenType.BOOLEAN, start_line, start_column);
            } else {
                const keyword = Token.checkIfKeyword(tokText);
                token = new Token(tokText, keyword || TokenType.IDENT, start_line, start_column);
            }
            return token;
        } 
        else {
            this.reportError(`Unknown token: ${this.currChar}`, start_line, start_column, 'Check syntax');
            token = new Token('Unknown token', TokenType.ERROR, start_line, start_column);
            this.nextChar();
            return token;
        }

        this.nextChar();
        return token;
    }
    }

export default Lexer;