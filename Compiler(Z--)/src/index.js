import Lexer from "./lexer.js";
import { TokenType, Token } from "./token.js";
import {Parser} from "./parser.js"
import fs from 'fs';


function main() {
    if (process.argv.length !== 3) {
        console.error('Error: Compiler needs source file as argument.');
        process.exit(1);
    }

    // let source = "+-Anas /*is (the) {best}*/ true 1234 0xFF 0.1234 0b10101010 false //comment  123" ;
    const source = fs.readFileSync(process.argv[2], 'utf8');
    let lexer = new Lexer(source);
     let token = lexer.getToken();
    while (token.tokenKind != TokenType.EOF) {
        console.log(`Token: ${token.tokenText}, Type: ${Token.getTokenTypeName(token.tokenKind)}`);
        token = lexer.getToken();
    }
    console.log(`Token: , Type: EOF, Line: ${token.line}, Col: ${token.column}`);
    lexer = new Lexer(source);
    let parser = new Parser(lexer);
    const ast = parser.program();
    console.log("Parser errors: ", parser.errors);
    console.dir(ast, { depth: null }); // Pretty print full AST


    // while(lexer.peek() != '\0') {
    //     console.log(lexer.currChar);
    //     lexer.nextChar();
    // }
}

main();