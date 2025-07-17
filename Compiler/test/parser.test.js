import Lexer from '../src/lexer.js';
import { Parser } from '../src/parser.js';
import * as ast from '../src/ast.js';
import { TokenType, Token } from '../src/token.js';

describe('Parser', () => {
  function parse(src) {
    const lexer = new Lexer(src.trim());
    const parser = new Parser(lexer);
    return parser.program();
  }

  test('parses empty program', () => {
    // minimal valid program: start / end
    const root = parse('start\nend');
    expect(root).toBeInstanceOf(ast.ProgramNode);
    expect(root.statements).toHaveLength(0);
  });

  test('parses let assignment', () => {
    const root = parse(`
      start
        let x = 42
      end
    `);
    expect(root.statements).toHaveLength(1);
    const letNode = root.statements[0];
    expect(letNode).toBeInstanceOf(ast.LetNode);
    expect(letNode.name).toBe('x');
    expect(letNode.expr).toBeInstanceOf(ast.NumberNode);
    expect(letNode.expr.value).toBe(42);
  });

  test('parses print string', () => {
    const root = parse(`
      start
        print "Hello, Z--"
      end
    `);
    const p = root.statements[0];
    expect(p).toBeInstanceOf(ast.PrintNode);
    expect(p.expr.value).toBe('Hello, Z--');
    expect(p.is_string).toBe(true);
  });

  test('errors on missing start', () => {
    const lexer = new Lexer('let x = 1');
    const parser = new Parser(lexer);
    const tree = parser.program();
    expect(tree).toBeNull();
    expect(parser.errors.length).toBeGreaterThan(0);
    expect(
    parser.errors.some(msg => /Program must begin with start/.test(msg))
    ).toBe(true);
  });

  test("errors on missing parenthesis in input", () => {
  const input = `
    start
      input a
    end
  `;
  const lexer = new Lexer(input.trim());
  let token = lexer.getToken();
  console.log("Tokens:");
  while (token.tokenKind !== TokenType.EOF) {
    console.log(`Token: ${token.tokenText}, Type: ${Token.getTokenTypeName(token.tokenKind)}, Line: ${token.line}, Col: ${token.column}`);
    token = lexer.getToken();
  }
  console.log(`Token: , Type: EOF, Line: ${token.line}, Col: ${token.column}`);
  const parser = new Parser(new Lexer(input.trim()));
  const tree = parser.program();
  console.log("Parser errors:", parser.errors);
  console.log("Tree:", tree ? JSON.stringify(tree, null, 2) : null);
  expect(tree).toBeInstanceOf(ast.ProgramNode);
  expect(tree.statements).toHaveLength(0);
  expect(parser.errors.length).toBeGreaterThan(0);
  expect(
    parser.errors.some(msg => /Expected LPAREN/.test(msg) || msg.includes("requires parentheses"))
  ).toBe(true);
});
});
