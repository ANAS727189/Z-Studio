import Lexer from '../src/lexer.js';
import { TokenType } from '../src/token.js';


describe('Lexer', () => {
  test('single + token', () => {
    const src = '+';
    const lexer = new Lexer(src);
    const tok = lexer.getToken();
    expect(tok.tokenKind).toBe(TokenType.PLUS);
    expect(tok.tokenText).toBe('+');
    // After PLUS, should get EOF
    const eof = lexer.getToken();
    expect(eof.tokenKind).toBe(TokenType.EOF);
  });

  test('++ becomes PLUSPLUS', () => {
    const lexer = new Lexer('++');
    const tok = lexer.getToken();
    expect(tok.tokenKind).toBe(TokenType.PLUSPLUS);
    expect(tok.tokenText).toBe('++');
    expect(lexer.getToken().tokenKind).toBe(TokenType.EOF);
  });

  test('skips whitespace and comments', () => {
    const src = '  // comment line 123 ';
    const lexer = new Lexer(src);
    const tok = lexer.getToken();
    expect(tok.tokenKind).toBe(TokenType.EOF);
    expect(tok.tokenText).toBe('');
    expect(lexer.getToken().tokenKind).toBe(TokenType.EOF);
  });

  test('recognizes string literals', () => {
    const lexer = new Lexer('"hello"');
    const tok = lexer.getToken();
    expect(tok.tokenKind).toBe(TokenType.STRING);
    expect(tok.tokenText).toBe('hello');
  });
});
