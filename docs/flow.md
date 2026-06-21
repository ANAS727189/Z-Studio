# Z Studio - Execution Flow

## Table of Contents
1. [Big Picture Flow](#big-picture-flow)
2. [Detailed Compiler Flow](#detailed-compiler-flow)
3. [Detailed Server Flow](#detailed-server-flow)
4. [Data Transformations at Each Step](#data-transformations-at-each-step)
5. [Glossary](#glossary)

---

## Big Picture Flow

This is the journey of a Z-- program from the user's keyboard to execution.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           THE JOURNEY OF Z-- CODE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [User]                                                                 │
│     │                                                                   │
│     │ types "start\n  let x = 5\n  print(x)\nend"                       │
│     │                                                                   │
│     ▼                                                                   │
│  ┌─────────────┐                                                         │
│  │   Browser   │  (React + Monaco Editor)                               │
│  └──────┬──────┘                                                         │
│         │                                                                │
│         │ POST /api/zlang/compile                                        │
│         │ { "code": "..." }                                             │
│         │                                                                │
│         ▼                                                                │
│  ┌─────────────┐                                                         │
│  │ Go Server   │  (Validates, orchestrates)                            │
│  └──────┬──────┘                                                         │
│         │                                                                │
│         │ writes input.z--                                              │
│         │ runs: node compiler.js input.z-- output                       │
│         │                                                                │
│         ▼                                                                │
│  ┌──────────────────────────────────────┐                               │
│  │         Z-- COMPILER                 │                               │
│  │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~       │                               │
│  │  LEXER → PARSER → AST               │                               │
│  │       ↓         ↓       ↓            │                               │
│  │   Tokens    Tree    C Code + LLVM   │                               │
│  └──────┬───────────────────────────────┘                               │
│         │                                                                │
│         │ outputs: output.c, output.ll                                 │
│         │                                                                │
│         │ runs: lli output.ll                                           │
│         ▼                                                                │
│  ┌─────────────┐                                                         │
│  │ lli (LLVM)  │  Executes the program                                 │
│  └──────┬──────┘                                                         │
│         │                                                                │
│         │ stdout: "5.00"                                                │
│         │                                                                │
│         ◄─────────────────────────────────────────────                  │
│  Go Server                                                                │
│         │                                                                │
│         │ { "success": true, "programOutput": "5.00" }                 │
│         │                                                                │
│         ◄──────────────────────────────────────────────                 │
│  Browser                                                                  │
│         │                                                                │
│         │ displays "5.00" in console                                    │
│         │                                                                │
│  [User sees output]                                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Compiler Flow

This is the internal workings of the Z-- compiler.

### Phase 1: Lexical Analysis (Lexer)

**Component:** `Compiler/src/lexer.js`

**Purpose:** Convert raw text into a list of tokens.

**What is a token?** A token is a categorized piece of text.
- Text: `let x = 5`
- Tokens: `LET(keyword)`, `x(identifier)`, `=(operator)`, `5(number)`

**How it works:**

```
1. Start at position 0 of the source code string

2. Skip whitespace and comments

3. Look at current character:
   - Is it a letter? Read until non-alphanumeric → IDENT or KEYWORD
   - Is it a digit? Read until non-digit → NUMBER (check for ., 0x, 0b, 0o)
   - Is it a quote? Read until closing quote → STRING
   - Is it +? Check next char for ++ → PLUS or PLUSPLUS
   - Is it -? Check next char for -- → MINUS or MINUSMINUS
   - Is it =? Check next char for == → EQ or EQEQ
   - ... (other operators)
   - Is it {, }, (, ), [, ], ,? → Single-char token
   - Is it newline? → NEWLINE token
   - Unknown? → ERROR token

4. Return the token, advance to next position

5. Repeat until EOF (end of file)
```

**Token types defined in** `Compiler/src/token.js`:

```
Keywords (101-113):
  START, END, LET, PRINT, INPUT, IF, ELSE, WHILE, FOR, BREAK, FUN, ARG, RETURN

Operators (201-213):
  EQ(=), PLUS(+), MINUS(-), ASTERISK(*), SLASH(/)
  EQEQ(==), NOTEQ(!=), LT(<), GT(>), LTEQ(<=), GTEQ(>=)
  PLUSPLUS(++), MINUSMINUS(--)

Logical & Bitwise (214-219):
  AND(&&), OR(||), BITAND(&), BITOR(|), BITXOR(^), MOD(%)

Delimiters (301-307):
  LBRACE({), RBRACE(}), LPAREN((), RPAREN()))
  COMMA(,), LBRACKET([), RBRACKET(])

Literals:
  NUMBER(1, 42, 3.14)
  STRING("hello")
  BOOLEAN(true, false)
  IDENT(variable names)
```

**Example:**

Input:
```
let x = 42
```

Tokens produced:
```
[LET("let"), IDENT("x"), EQ("="), NUMBER("42"), NEWLINE("
")]
```

---

### Phase 2: Syntax Analysis (Parser)

**Component:** `Compiler/src/parser.js`

**Purpose:** Verify the token sequence follows Z-- grammar rules and build an AST.

**Method:** Recursive Descent Parsing

Each grammar construct has a function:
- `program()` - expects `start ... end`
- `statement()` - handles all statement types
- `expression()` - handles expressions
- `comparison()` - handles ==, !=, <, >, etc.
- `additive()` - handles + and -
- `term()` - handles *, /, %
- `unary()` - handles ++, --, +x, -x
- `primary()` - handles numbers, strings, identifiers, parentheses

**Grammar rules (simplified):**

```
program      → "start" statement* "end"
statement    → let_stmt | assign_stmt | array_assign | print | input | 
               if_stmt | while_stmt | for_stmt | break | fun_def | return | expr_stmt

let_stmt     → "let" IDENT [ "=" expression ]
assign_stmt  → IDENT "=" expression
array_assign → IDENT "[" expression "]" "=" expression

print        → "print" (STRING | expression)
input        → "input" "(" IDENT ")"

if_stmt      → "if" expression "{" statement* "}" 
               ["else" ("{" statement* "}" | if_stmt)]

while_stmt   → "while" expression "{" statement* "}"
for_stmt     → "for" (let_stmt | assign) "," expression "," increment "{" statement* "}"
increment    → IDENT ("=" expression | "++" | "--")

break        → "break"
fun_def      → "fun" IDENT "{" "arg" "=" "(" [IDENT (, IDENT)*] ")" statement* "}"
return       → "return" [expression]

expression   → logical_or
logical_or   → logical_and ( "||" logical_and )*
logical_and  → bitwise_or ( "&&" bitwise_or )*
bitwise_or   → bitwise_xor ( "|" bitwise_xor )*
bitwise_xor  → bitwise_and ( "^" bitwise_and )*
bitwise_and  → comparison ( "&" comparison )*
comparison   → additive ( ("=="|"!="|"<"|">"|"<="|">=") additive )*
additive     → term ( ("+"|"-") term )*
term         → unary ( ("*"|"/"|"%") unary )*
unary        → ("++"|"--"|"-"|"+") unary | primary
primary      → NUMBER | STRING | BOOLEAN | IDENT | 
               IDENT "(" [expression (, expression)*] ")" |
               IDENT "[" expression "]" |
               "[" [expression (, expression)*] "]" |
               "(" expression ")"
```

**Example:**

Input tokens:
```
[LET("let"), IDENT("x"), EQ("="), NUMBER("5"), PLUS("+"), NUMBER("3"), NEWLINE]
```

Parser produces AST:
```
LetNode
  |-- name: "x"
  |-- expr: BinOpNode
        |-- left: NumberNode(5)
        |-- op: PLUS
        |-- right: NumberNode(3)
```

---

### Phase 3: AST Representation

**Component:** `Compiler/src/ast.js`

**Purpose:** Define the tree structure that represents the program.

**All AST node types:**

```
ProgramNode
  |-- statements: ASTNode[]   (list of all statements)

LetNode
  |-- name: string
  |-- expr: ASTNode

AssignmentNode
  |-- name: string
  |-- expr: ASTNode

ArrayAssignmentNode
  |-- name: string
  |-- index: ASTNode
  |-- expr: ASTNode

PrintNode
  |-- expr: ASTNode
  |-- is_string: boolean

InputNode
  |-- name: string

IfNode
  |-- condition: ASTNode
  |-- then_block: ASTNode[]
  |-- else_block: ASTNode[] | null

WhileNode
  |-- condition: ASTNode
  |-- body: ASTNode[]

ForNode
  |-- init: ASTNode
  |-- condition: ASTNode
  |-- increment: ASTNode
  |-- body: ASTNode[]

BreakNode
  |-- (no data)

FunctionNode
  |-- name: string
  |-- params: string[]
  |-- body: ASTNode[]

CallNode
  |-- name: string
  |-- args: ASTNode[]

ReturnNode
  |-- expr: ASTNode

BinOpNode
  |-- left: ASTNode
  |-- op: TokenType
  |-- right: ASTNode

UnaryOpNode
  |-- op: TokenType
  |-- expr: ASTNode

PrefixOpNode
  |-- op: TokenType  (++ or --)
  |-- expr: ASTNode

PostfixOpNode
  |-- op: TokenType
  |-- expr: ASTNode

NumberNode
  |-- value: number

StringNode
  |-- value: string

BooleanNode
  |-- value: boolean

VarNode
  |-- name: string

ArrayLiteralNode
  |-- elements: ASTNode[]

ArrayAccessNode
  |-- name: string
  |-- index: ASTNode

ExpressionStatementNode
  |-- expr: ASTNode
```

---

### Phase 4: Code Generation

The code generation phase uses the **Visitor Pattern**. Each node type has a `visit_*` method.

**Why visitor pattern?**
Imagine walking through a tree. At each node, you do something specific:
- NumberNode → emit the number
- BinOpNode → emit left, operator, right
- PrintNode → emit printf call

This keeps the code organized and extensible.

#### Code Generator 1: C Code Generator

**Component:** `Compiler/src/visitor.js`

**Purpose:** Translate AST to C source code.

**Strategy:**

1. **Two-pass compilation:**
   - First pass: Collect all variables and their types
   - Second pass: Generate code

2. **Global vs Local:**
   - `visit_ProgramNode` separates function definitions from main code
   - Global variables go at the top
   - Functions emit to `functionDefinitions` array
   - Main code goes into `int main(void) { ... }`

3. **Variable tracking:**
   - `globalVariables`: Set of global variable names
   - `localVariables`: Map of function name → Set of local variables
   - `globalVariableTypes`: Type info for globals
   - `localVariableTypes`: Type info per function

4. **Type inference:**
   - Arrays: `[1, 2, 3]` → type `array`, size 3
   - Strings: `"hello"` → type `string`
   - Numbers/operations: type `double` (all numbers are doubles in Z--)

5. **Code emission:**
   - `addCode(line)` → adds to main code body
   - `addFunctionCode(line)` → adds to function definition

**Example output:**

Input Z--:
```
start
  let x = 5 + 3
  print(x)
end
```

Output C:
```c
#include <stdio.h>
#include <stdbool.h>

double x;

double add(double a, double b) {
    return (a + b);
}

int main(void) {
    x = (5 + 3);
    printf("%.2f
", x);
    return 0;
}
```

**Key mappings:**

| Z-- | C Output |
|-----|----------|
| `let x = 5` | `double x = 5;` |
| `x = x + 1` | `x = (x + 1);` |
| `print(42)` | `printf("%.2f\n", 42);` |
| `print("hi")` | `printf("hi\n");` |
| `input(x)` | `if (scanf("%lf", &x) != 1) { x = 0; scanf("%*s"); }` |
| `if (x > 5) { ... }` | `if ((x > 5)) { ... }` |
| `while (x > 0) { ... }` | `while ((x > 0)) { ... }` |
| `for (i = 1, ...) { ... }` | `for (i = 1; ...; ...) { ... }` |
| `return x` | `return x;` |
| `[1, 2, 3]` (array) | `{ 1, 2, 3 }` (C array literal) |
| `x[0]` | `x[0]` |
| `x[0] = 5` | `x[0] = (5);` |
| `nums[0] = 42` (global array) | `nums[0] = (42);` |
| `++x` | `++x` |
| `x--` | `x--` |
| `a + b * c` | `(a + (b * c))` (with precedence) |

#### Code Generator 2: LLVM IR Generator

**Component:** `Compiler/src/llvm.js`

**Purpose:** Translate AST to LLVM Intermediate Representation.

**LLVM IR concepts you need to understand:**

1. **Instructions:** Basic operations like `add`, `load`, `store`, `call`
2. **Registers/Temporaries:** `%tmp.0`, `%tmp.1` - intermediate values
3. **Labels:** `entry:`, `if.then.0:` - jump targets
4. **Types:** `double`, `i32`, `i8*`, `i64`, `i1` (boolean)
5. **Basic Blocks:** Sequences of instructions ending with a terminator (branch/return)
6. **Functions:** Defined with `define`, called with `call`

**Strategy:**

1. **Global variables:** `@x = global double 0.000000`
2. **String constants:** `@.str.0 = private unnamed_addr constant [5 x i8] c"hi\00"`
3. **Functions:** `define double @funcName(double %arg.a, ...) { ... }`
4. **Local variables:** `%x.addr = alloca double` (allocate on stack)
5. **Load/Store:** `%val = load double, double* %x.addr`

**Example:**

Input LLVM IR for `let x = 5 + 3`:
```llvm
@x = global double 0.000000

define i32 @main() {
entry:
  %addtmp = fadd double 5.000000, 3.000000
  store double %addtmp, double* @x
  ret i32 0
}
```

**Example: Conditional (if/else) in LLVM IR:**

```llvm
; if x > 5 then print("big") else print("small")
  %cond = fcmp ogt double %x, 5.000000
  br i1 %cond, label %if.then.0, label %if.else.1

if.then.0:
  call i32 (i8*, ...) @printf(i8* getelementptr ... @.str.big)
  br label %if.end.2

if.else.1:
  call i32 (i8*, ...) @printf(i8* getelementptr ... @.str.small)
  br label %if.end.2

if.end.2:
  ret i32 0
```

**Example: Loop (while) in LLVM IR:**

```llvm
; while x > 0 { x = x - 1; }
  br label %while.cond.0

while.cond.0:
  %cond = fcmp ogt double %x, 0.000000
  br i1 %cond, label %while.body.1, label %while.end.2

while.body.1:
  %dec = fsub double %x, 1.000000
  store double %dec, double* %x.addr
  br label %while.cond.0

while.end.2:
  ret i32 0
```

**Key helpers in LLVM generator:**

- `temp(hint)` → generates `%hint.N` (e.g., `%addtmp.0`)
- `label(prefix)` → generates `prefix.N` (e.g., `if.then.0`)
- `emit(line)` → adds an instruction line
- `clean(name)` → sanitizes names for LLVM
- `doubleLiteral(value)` → converts to "5.000000" format

---

## Detailed Server Flow

### Z-- Compilation Flow (Go Server Side)

**Entry point:** `server/src/controllers/zlang.controllers.go`

**Step-by-step:**

1. **HTTP Request Arrives**
   ```
   POST /api/zlang/compile
   Content-Type: application/json
   Body: {"code": "start\n  let x = 5\n  print(x)\nend"}
   ```

2. **Read JSON Body**
   - `httpx.ReadJSONBody(r)` parses the request body
   - Extracts the `code` field

3. **Validate Request**
   - `schema.ValidateZLangPayload(body)` checks:
     - Is `code` present?
     - Is `code` a string?
     - Is code non-empty?
   - Returns error response if invalid

4. **Execute Compiler**
   - `c.Service.Run(code)` runs the compiler
   
5. **Service Layer** (`zlang.service.go`):
   - Creates temp directory: `/tmp/zlang-XXXXXX/`
   - Writes code to `/tmp/zlang-XXXXXX/input.z--`
   - Runs: `node [compiler-path] /tmp/zlang-XXXXXX/input.z-- /tmp/zlang-XXXXXX/output`
   - Waits for compiler to finish
   - Finds `lli` in system PATH
   - Runs: `lli /tmp/zlang-XXXXXX/output.ll`
   - Captures stdout (program output) and stderr (errors)
   - Cleans up temp files

6. **Handle Result**
   - If compile error: Return 400 with error details
   - If success: Return 200 with output

7. **HTTP Response**
   ```json
   {
     "success": true,
     "compilerOutput": "5.00\n",
     "programOutput": ""
   }
   ```

### Judge0 Flow (Other Languages)

When the user writes Python/C++/Java code:

1. **HTTP Request**
   ```
   POST /api/judge0/compile
   {"source_code": "print('hello')", "language_id": 71}
   ```

2. **Proxy to Judge0**
   - Go server forwards request to Judge0 API
   - Judge0 runs the code in a sandbox
   - Returns result

---

## Data Transformations at Each Step

### Complete Z-- Example

**Input (Z--):**
```z--
start
  let n = 5
  let result = 1
  while n > 1 {
    result = result * n
    n = n - 1
  }
  print(result)
end
```

**After Lexer (Tokens):**
```
[START, LET, IDENT("n"), EQ, NUMBER("5"), NEWLINE,
 LET, IDENT("result"), EQ, NUMBER("1"), NEWLINE,
 WHILE, IDENT("n"), GT, NUMBER("1"), LBRACE, NEWLINE,
 IDENT("result"), EQ, IDENT("result"), ASTERISK, IDENT("n"), NEWLINE,
 IDENT("n"), EQ, IDENT("n"), MINUS, NUMBER("1"), NEWLINE,
 RBRACE, NEWLINE,
 PRINT, IDENT("result"), NEWLINE,
 END]
```

**After Parser (AST):**
```
ProgramNode [
  LetNode("n", NumberNode(5)),
  LetNode("result", NumberNode(1)),
  WhileNode(
    BinOpNode(VarNode("n"), GT, NumberNode(1)),
    [
      AssignmentNode("result", BinOpNode(VarNode("result"), ASTERISK, VarNode("n"))),
      AssignmentNode("n", BinOpNode(VarNode("n"), MINUS, NumberNode(1)))
    ]
  ),
  PrintNode(VarNode("result"))
]
```

**After C Generator (C Code):**
```c
#include <stdio.h>
#include <stdbool.h>

double n;
double result;

int main(void) {
    n = 5;
    result = 1;
    while ((n > 1)) {
        result = (result * n);
        n = (n - 1);
    }
    printf("%.2f\n", result);
    return 0;
}
```

**After LLVM Generator (LLVM IR):**
```llvm
declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@n = global double 0.000000
@result = global double 0.000000

define i32 @main() {
entry:
  store double 5.000000, double* @n
  store double 1.000000, double* @result
  br label %while.cond.0

while.cond.0:
  %cond.1 = fcmp ogt double %n, 1.000000
  br i1 %cond.1, label %while.body.2, label %while.end.3

while.body.2:
  %multmp.4 = fmul double %result, %n
  store double %multmp.4, double* @result
  %subtmp.5 = fsub double %n, 1.000000
  store double %subtmp.5, double* @n
  br label %while.cond.0

while.end.3:
  call i32 (i8*, ...) @printf(i8* getelementptr ... @.str)
  ret i32 0
}

@.str = private unnamed_addr constant [4 x i8] c"%.2f\00"
```

**Final Output (after lli execution):**
```
120.00
```

---

## Glossary

Here are key terms explained in simple language:

**AST (Abstract Syntax Tree):** A tree data structure that represents the structure of your code. Each node is a part of the code (like an operation or variable).

**Bytecode:** A low-level, platform-independent code that can be executed by a virtual machine.

**C Compiler (gcc/clang):** A program that translates C code into machine code (executable files).

**Client:** The frontend application (browser-based) that users interact with.

**Compiler:** A program that translates code from one language to another. Z Studio has a custom compiler for Z--.

**Executor (lli):** A program that runs LLVM IR code directly without needing to compile to machine code first.

**Frontend:** The user-facing part of an application (in Z Studio, the React web app).

**Intermediate Representation (IR):** A middle-ground code format between high-level languages and machine code. LLVM IR is one such format.

**LLVM:** A collection of compiler tools and libraries. In Z Studio, we use LLVM for its IR format and interpreter (lli).

**Monaco Editor:** The code editor component that powers VS Code, providing syntax highlighting, autocomplete, etc.

**Parser:** The compiler stage that reads tokens and builds the syntax tree.

**Server:** The backend application (written in Go) that handles HTTP requests.

**Token:** A categorized piece of source code (e.g., a keyword, number, or operator).

**Virtual Machine (VM):** A software implementation of a computer system. LLVM's "virtual machine" is really just a way to represent code that any real machine can execute.

**Web IDE:** A code editor that runs in the browser, like a simplified version of VS Code in your web browser.
