import Lexer from "./lexer.js";
import {Parser} from "./parser.js"
import fs from 'fs';
import { Emitter} from "./emit.js";
import { CodeGenerator } from "./visitor.js";
import {LLVMGenerator} from "./llvm.js";

function main() {
    // if (process.argv.length !== 3) {
    //     console.error('Error: Compiler needs source file as argument.');
    //     process.exit(1);
    // }

     if (process.argv.length !== 4) { // Expect input and output paths
        console.error('Error: Compiler needs input and output file paths as arguments.');
        process.exit(1);
    }


    // let source = "+-Anas /*is (the) {best}*/ true 1234 0xFF 0.1234 0b10101010 false //comment  123" ;
    // const source = fs.readFileSync(process.argv[2], 'utf8');
    // let lexer = new Lexer(source);
    //  let token = lexer.getToken();
    // while (token.tokenKind != TokenType.EOF) {
    //     console.log(`Token: ${token.tokenText}, Type: ${Token.getTokenTypeName(token.tokenKind)}`);
    //     token = lexer.getToken();
    // }
    // console.log(`Token: , Type: EOF, Line: ${token.line}, Col: ${token.column}`);
    // lexer = new Lexer(source);
    // const emitter = new Emitter('output.c');
    // let parser = new Parser(lexer);
    // const ast = parser.program();
    // console.log("Parser errors: ", parser.errors);
    //  if (parser.errors.length > 0) {
    //     console.error('Parser encountered errors. Compilation aborted.');
    //     process.exit(1);
    // }
    
    // if (!ast) {
    //     console.error('Failed to parse program. AST is null.');
    //     process.exit(1);
    // }
    // console.dir(ast, { depth: null }); // Pretty print full AST
    
    //  try {
    //     const c_generator = new CodeGenerator();
    //     c_generator.visit(ast);
    //     emitter.header = c_generator.header.join('\n');
    //     emitter.code = c_generator.code.join('\n');
    //     emitter.writeFile();
    //     console.log('C code generated to output.c');

    //     const llvmGen = new LLVMGenerator();
    //     llvmGen.visit(ast);
    //     const irCode = llvmGen.generate();
    //     fs.writeFileSync("output.ll", irCode); 
    //     console.log("LLVM IR code written to output.ll");
    // } catch (error) {
    //     console.error('Code generation failed:', error.message);
    //     process.exit(1);
    // }

    // run as - node ../../../Compiler(Z--)/src/index.js /tmp/temp-uuid.z-- /tmp/output-uuid.

     const source = fs.readFileSync(process.argv[2], 'utf8');
    const outputBase = process.argv[3];
    const emitter = new Emitter(`${outputBase}.c`);
    let lexer = new Lexer(source);
    const parser = new Parser(lexer);
    const ast = parser.program();

     if (parser.errors.length > 0) {
    console.error('Parser encountered errors. Compilation aborted.');
    console.error(parser.errors.join('\n'));
    process.exit(1);
  }
  
  if (!ast) {
    console.error('Failed to parse program. AST is null.');
    process.exit(1);
  }

  try {
    const c_generator = new CodeGenerator();
    c_generator.visit(ast);
    emitter.header = c_generator.header.join('\n');
    emitter.code = c_generator.code.join('\n');
    emitter.writeFile();
    console.log(`C code generated to ${outputBase}.c`);

    const llvmGen = new LLVMGenerator();
    llvmGen.visit(ast);
    const irCode = llvmGen.generate();
    fs.writeFileSync(`${outputBase}.ll`, irCode); 
    console.log(`LLVM IR code written to ${outputBase}.ll`);
  } catch (error) {
    console.error('Code generation failed:', error.message);
    process.exit(1);
  }

    // while(lexer.peek() != '\0') {
    //     console.log(lexer.currChar);
    //     lexer.nextChar();
    // }
}

main();