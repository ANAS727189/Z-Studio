import { describe, expect, test } from 'vitest';
import Lexer from '../src/lexer.js';
import { Parser } from '../src/parser.js';
import { LLVMGenerator } from '../src/llvm.js';

function generate(source) {
  const parser = new Parser(new Lexer(source.trim()));
  const ast = parser.program();
  expect(parser.errors).toHaveLength(0);

  const generator = new LLVMGenerator();
  generator.visit(ast);
  return generator.generate();
}

describe('LLVMGenerator', () => {
  test('generates textual LLVM IR without native bindings', () => {
    const ir = generate(`
      start
        let x = 5 + 7
        print(x)
      end
    `);

    expect(ir).toContain('declare i32 @printf(i8*, ...)');
    expect(ir).toContain('@x = global double 0.000000');
    expect(ir).toContain('define i32 @main()');
    expect(ir).toContain('fadd double 5.000000, 7.000000');
    expect(ir).toContain('call i32 (i8*, ...) @printf');
  });

  test('generates functions and calls', () => {
    const ir = generate(`
      start
        fun inc {
          arg = (a)
          return a + 1
        }

        print(inc(2))
      end
    `);

    expect(ir).toContain('define double @inc(double %arg.a)');
    expect(ir).toContain('ret double %addtmp');
    expect(ir).toContain('call double @inc(double 2.000000)');
  });
});
