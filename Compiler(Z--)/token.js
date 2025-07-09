
const TokenType = {
    EOF: -1,
    NEWLINE: 0,
    NUMBER: 1,
    IDENT: 2,
    STRING: 3,
    BOOLEAN: 4,
    ERROR: 999,
    // Keywords
    START: 101,
    END: 102,
    LET: 103,
    PRINT: 104,
    INPUT: 105,
    IF: 106,
    ELSE: 107,
    WHILE: 108,
    FOR: 109,
    BREAK: 110,
    FUN: 111,
    ARG: 112,
    RETURN: 113,
    // Operators
    EQ: 201,
    PLUS: 202,
    MINUS: 203,
    ASTERISK: 204,
    SLASH: 205,
    EQEQ: 206,
    NOTEQ: 207,
    LT: 208,
    GT: 209,
    LTEQ: 210,
    GTEQ: 211,
    PLUSPLUS: 212,
    MINUSMINUS: 213,

    // Logical and Bitwise Operators
    AND: 214,        // &&
    OR: 215,         // ||
    MOD: 216,        // %
    BITAND: 217,     // &
    BITOR: 218,      // |
    BITXOR: 219,     // ^


    // Delimiters
    LBRACE: 301,
    RBRACE: 302,
    LPAREN: 303,
    RPAREN: 304,
    COMMA: 305
};

class Token{
    constructor(tokenText, tokenKind, line, column) {
        this.tokenText = tokenText;
        this.tokenKind = tokenKind;
        this.line = line;
        this.column = column;
    }

    static checkIfKeyword(TokenText) {
        for (let token in TokenType) {
            const value = TokenType[token];
            if (value >= 101 && value <= 113 && token.toLowerCase() === TokenText.toLowerCase()) {
                return value;
            }
        }
        return null;
    }


    static getTokenTypeName(value) {
        return Object.keys(TokenType).find(key => TokenType[key] === value);
    }
}

export {
    TokenType, 
    Token
}

