import fs from "fs";
import path from "path";
import Lexer from "../src/lexer.js";
import { Parser } from "../src/parser.js";

const dir = "./test-code";

const files = fs
  .readdirSync(dir)
  .filter(f => f.endsWith(".z--"));

const validFiles = files.filter(
  f => !f.startsWith("invalid")
);

const invalidFiles = files.filter(
  f => f.startsWith("invalid")
);

describe("Valid Z-- programs", () => {

  test.each(validFiles)(
    "compiles %s",
    (file) => {

      const src = fs.readFileSync(
        path.join(dir, file),
        "utf8"
      );

      const parser = new Parser(
        new Lexer(src)
      );

      const tree = parser.program();

      expect(tree).not.toBeNull();
      expect(parser.errors).toEqual([]);
    }
  );

});

describe("Invalid Z-- programs", () => {

  test.each(invalidFiles)(
    "rejects %s",
    (file) => {

      const src = fs.readFileSync(
        path.join(dir, file),
        "utf8"
      );

      const parser = new Parser(
        new Lexer(src)
      );

      parser.program();

      expect(
        parser.errors.length
      ).toBeGreaterThan(0);

    }
  );

});