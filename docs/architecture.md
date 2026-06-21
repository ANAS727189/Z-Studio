# Z Studio - System Architecture

## Table of Contents
1. [What is Z Studio?](#what-is-z-studio)
2. [High-Level Overview](#high-level-overview)
3. [The Three Pillars](#the-three-pillars)
4. [Understanding the Compiler](#understanding-the-compiler)
5. [What is LLVM?](#what-is-llvm)
6. [Why LLVM?](#why-llvm)
7. [Complete Data Flow](#complete-data-flow)
8. [Directory Structure](#directory-structure)
9. [Key Technologies](#key-technologies)

---

## What is Z Studio?

Z Studio is a full-stack development platform for a custom programming language called **Z--**. It provides:

- A web-based code editor where you can write Z-- programs
- A compiler that translates Z-- code into executable form
- A server that connects the editor to the compiler
- Support for multiple languages via Judge0 integration

Think of it like an online coding playground, similar to Replit or CodePen, but specifically built for the Z-- language that the creator (that's ofcourse me) built from scratch.

---

## High-Level Overview

```
+-------------------+     HTTP/JSON      +-------------------+     exec       +-------------------+
|                   |  ---------------->  |                   |  ------------>  |                   |
|   Web IDE         |                     |   Go Server       |                 |   Z-- Compiler    |
|   (React Client)  | <----------------  |   (Backend API)   | <-------------- |   (Node.js)       |
|                   |   Response          |                   |   C/LLVM IR     |                   |
+-------------------+                     +-------------------+                 +-------------------+
        |                                                                              |
        |                                                                              |
        |                              +-------------------+                          |
        |                              |                   |                          |
        |                              |   Judge0 API      |<-------------------------|
        |                              |   (Multi-lang)    |    Other languages
        |                              |                   |
        |                              +-------------------+
        |                                      
        |                                      
        v                                      
+-------------------+                          
|                   |                          
|   Browser         |                          
|   (User writes     |                          
|    code here)     |                          
|                   |                          
+-------------------+                          
```

**Simple explanation:** The user types Z-- code in the browser. The browser sends it to the Go server. The Go server runs the compiler, gets the result, and sends it back.

---

## The Three Pillars

Z Studio has three main parts (like a three-legged stool):

### 1. Client (Frontend) - `client/`
**What it does:** The web interface where you write code.

- Built with React (a JavaScript framework for building web apps)
- Uses Monaco Editor (the same editor that powers VS Code) for code editing
- Provides syntax highlighting (colors different parts of code)
- Has a terminal/console to show program output
- Lets you switch between Z-- and other languages (Python, C++, Java, etc.)

**Key files:**
- `client/src/App.tsx` - Main application component
- `client/src/pages/` - Different pages (editor, home, etc.)
- `client/src/components/` - Reusable UI pieces

### 2. Server (Backend) - `server/`
**What it does:** The brain that connects everything. It receives code from the browser and decides what to do with it.

- Written in Go (a fast, reliable programming language)
- Provides API endpoints (addresses the frontend can send data to)
- Handles Z-- compilation by calling the Node.js compiler
- Proxies other languages to Judge0 (an online judge/compiler service)
- Has rate limiting (prevents abuse)
- Has security middleware (CORS, error recovery)

**Key paths:**
- `POST /api/zlang/compile` - Compiles Z-- code
- `POST /api/judge0/compile` - Compiles other languages

**Key files:**
- `server/src/main.go` - Entry point, starts the server
- `server/src/app/app.go` - Sets up routes and middleware
- `server/src/controllers/` - Handles HTTP requests
- `server/src/services/` - Business logic (compiling, etc.)
- `server/src/routes/` - URL routing definitions

### 3. Compiler - `Compiler/`
**What it does:** Translates Z-- code into something a computer can run.

This is the heart of the project - a from-scratch compiler built in JavaScript. It takes Z-- code and produces two outputs:
1. **C code** (human-readable C program)
2. **LLVM IR** (low-level intermediate representation)

**Key files:**
- `Compiler/src/lexer.js` - Breaks code into tokens
- `Compiler/src/parser.js` - Understands code structure
- `Compiler/src/ast.js` - Defines the syntax tree nodes
- `Compiler/src/visitor.js` - Generates C code from AST
- `Compiler/src/llvm.js` - Generates LLVM IR from AST
- `Compiler/src/index.js` - Main compiler pipeline

---

## Understanding the Compiler

A compiler is a program that translates code from one language to another. Think of it like a translator who converts English sentences into Spanish.

In this case, the compiler translates **Z-- code** into **C code** and **LLVM IR**.

### Why Two Outputs?

1. **C Code (.c file):** 
   - Human-readable
   - Good for understanding what the Z-- code does
   - Can be compiled with any C compiler (gcc, clang)
   
2. **LLVM IR (.ll file):**
   - Lower-level, optimized representation
   - Can be executed directly using `lli` (LLVM interpreter)
   - Faster execution

### The Compiler Pipeline (5 Stages)

```
Z-- Source Code
       |
       v
  +----------+
  |  LEXER   |  Stage 1: Tokenization
  +----------+
       |
       v
  Tokens (list of words/symbols)
       |
       v
  +----------+
  |  PARSER  |  Stage 2: Parsing
  +----------+
       |
       v
  AST (Abstract Syntax Tree)
       |
       v
  +---------------------+
  | CODE GENERATORS     |  Stages 3, 4, 5
  | (C + LLVM visitors) |
  +---------------------+
       |
       +------------------+
       |                  |
       v                  v
  +-----------+    +-----------+
  | C Output  |    | LLVM IR   |
  | (.c file) |    | (.ll file)|
  +-----------+    +-----------+
```

#### Stage 1: Lexer (Lexical Analysis)

**Purpose:** Break raw text into meaningful pieces called "tokens".

**Input:** `let x = 5 + 3`
**Output:** 
- Token: `let` (keyword)
- Token: `x` (identifier)
- Token: `=` (operator)
- Token: `5` (number)
- Token: `+` (operator)
- Token: `3` (number)

**Real-world analogy:** When you read a sentence, your brain automatically breaks it into words. The lexer does this for code.

**File:** `Compiler/src/lexer.js`

Key features:
- Recognizes keywords: `start`, `end`, `let`, `print`, `input`, `if`, `else`, `while`, `for`, `break`, `fun`, `arg`, `return`
- Recognizes operators: `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `&`, `|`, `^`, `++`, `--`
- Recognizes literals: numbers (42, 3.14), strings ("hello"), booleans (true, false)
- Recognizes numeric bases: decimal (42), hex (0x2A), binary (0b1010), octal (0o52)
- Handles comments (// and /* */)
- Handles arrays: `[1, 2, 3]`

#### Stage 2: Parser (Syntax Analysis)

**Purpose:** Understand the structure of the code and build a tree representation.

**Input:** Tokens from the lexer
**Output:** AST (Abstract Syntax Tree)

**Real-world analogy:** A grammar checker. It ensures sentences follow the rules of the language.

**File:** `Compiler/src/parser.js`

The parser uses **recursive descent parsing** - a method where each grammar rule becomes a function. For example:
- `expression()` handles expressions
- `statement()` handles statements
- `comparison()` handles comparison operations
- `unary()` handles unary operators like `++` and `--`

Parser duties:
- Validates syntax
- Builds the AST
- Tracks variable declarations (symbols)
- Tracks function definitions
- Handles operator precedence (multiplication before addition)
- Handles associativity (left-to-right for most operators)
- Error recovery (continues parsing after errors)

#### Stage 3-5: AST and Code Generation

The AST is a tree where each node represents a part of the code.

**Example AST for `let x = 5 + 3`:**

```
LetNode
  |-- name: "x"
  |-- expr: BinOpNode
        |-- left: NumberNode(5)
        |-- op: PLUS
        |-- right: NumberNode(3)
```

**File:** `Compiler/src/ast.js` defines all node types.

**Code Generators** (visitors) walk the AST and generate output:

**C Code Generator** (`Compiler/src/visitor.js`):
- Visits each AST node and emits C code
- Handles variable scoping (global vs function-local)
- Manages type declarations
- Generates proper C syntax with indentation

**LLVM Generator** (`Compiler/src/llvm.js`):
- Visits each AST node and emits LLVM IR instructions
- Uses Static Single Assignment (SSA) form
- Manages temporary variables (%tmp.0, %tmp.1, etc.)
- Handles control flow with labels

---

## What is LLVM?

**LLVM** stands for **Low Level Virtual Machine**. But it's not really a "virtual machine" anymore - it's a compiler infrastructure project.

### Key Concept: Intermediate Representation (IR)

LLVM uses an intermediate representation that sits between high-level code (like C or Z--) and machine code (binary instructions for your CPU).

```
High-level Code (Z--) → LLVM IR → Machine Code (x86, ARM, etc.)
                        (Platform-independent)
```

### What does LLVM IR look like?

```llvm
; This is LLVM IR code
define double @add(double %a, double %b) {
entry:
  %result = fadd double %a, %b
  ret double %result
}
```

It looks strange, but it's designed to be:
- Language-independent
- Easy to optimize
- Easy to convert to machine code

### LLVM Tools

- **`llvm-as`**: Assembles .ll text into .bc bytecode
- **`llc`**: Compiles LLVM IR to native machine code
- **`lli`**: Interprets/executes LLVM IR directly (what Z Studio uses!)

### Why LLVM IR for Z--?

1. **No C compiler needed:** The web server can run Z-- code without needing gcc
2. **Fast execution:** `lli` executes IR much faster than interpreting the AST
3. **Optimization opportunities:** LLVM can optimize the code
4. **Portability:** Same IR works on Windows, Mac, Linux

---

## Why LLVM?

You might wonder: "Why not just run the C code? Why add LLVM?"

### The Problem with C

To run C code, you need:
1. A C compiler (gcc, clang, msvc)
2. The compiler must be installed on the server
3. Cross-platform compilation is complex
4. Compilation adds latency (wait for compile, then run)

### The LLVM Solution

1. **No C compiler needed:** `lli` is a single executable
2. **Fast:** No compilation step - just interpret the IR
3. **Cross-platform:** Same .ll file runs anywhere with lli
4. **Modern:** LLVM is used by production compilers (Clang, Rust, Swift)

### The Hybrid Approach

Z Studio generates **both** C and LLVM IR:
- C code = documentation / debugging / alternative compilation path
- LLVM IR = primary execution path (fast, no dependencies)

---

## Complete Data Flow

### When You Run Z-- Code in the Web IDE

```
[1] USER TYPES CODE
    Browser: User writes Z-- in Monaco Editor
    
[2] CLICK RUN
    Browser sends POST request:
    POST /api/zlang/compile
    Body: { "code": "start\n  let x = 5\n  print(x)\nend" }
    
[3] SERVER RECEIVES
    Go server at server/src/controllers/zlang.controllers.go:
    - Reads JSON body
    - Validates the code (schema check)
    - Calls ZLangService.Run()
    
[4] TEMP SETUP
    ZLangService (server/src/services/zlang.service.go):
    - Creates temporary directory: /tmp/zlang-abc123/
    - Writes code to: /tmp/zlang-abc123/input.z--
    - Sets output path: /tmp/zlang-abc123/output
    
[5] COMPILATION (Node.js)
    Runs: node compilerPath /tmp/zlang-abc123/input.z-- /tmp/zlang-abc123/output
    
    Inside the compiler (Compiler/src/index.js):
    
    a) LEXER:
       - Reads input.z--
       - Produces tokens
       - Example tokens: [START, LET, IDENT("x"), EQ, NUMBER(5), PRINT, ...]
    
    b) PARSER:
       - Takes tokens
       - Produces AST
       - Example AST:
         ProgramNode [
           LetNode("x", NumberNode(5)),
           PrintNode(VarNode("x"))
         ]
    
    c) CODE GENERATION (parallel):
       
       C Generator (visitor.js):
       - Walks AST
       - Produces:
         #include <stdio.h>
         double x;
         int main() {
           x = 5;
           printf("%.2f\n", x);
           return 0;
         }
       
       LLVM Generator (llvm.js):
       - Walks AST
       - Produces:
         declare i32 @printf(...)
         @x = global double 0.000000
         define i32 @main() {
         entry:
           store double 5.000000, double* @x
           call i32 @printf(...)
           ret i32 0
         }
    
    d) WRITE FILES:
       - output.c (C code)
       - output.ll (LLVM IR)
    
[6] EXECUTION
    ZLangService finds `lli` (LLVM interpreter) in system PATH
    Runs: lli /tmp/zlang-abc123/output.ll
    
    lli:
    - Reads the .ll file
    - Executes the instructions
    - Produces: 5.00 (the printed output)

[7] CLEANUP
    - Deletes temp directory
    - Returns output to server
    
[8] SERVER RESPONDS
    Go server sends JSON response:
    {
      "success": true,
      "compilerOutput": "5.00",
      "programOutput": ""
    }
    
[9] BROWSER DISPLAYS
    User sees "5.00" in the output console
```

---

## Directory Structure

```
Z-Studio/
├── client/                          # Frontend - React Web IDE
│   ├── src/
│   │   ├── App.tsx                 # Main app component
│   │   ├── pages/                  # Page components
│   │   ├── components/             # Reusable UI
│   │   ├── lib/                    # Libraries and configs
│   │   ├── utils/                  # Helper functions
│   │   ├── themes/                 # Styling
│   │   └── index.css               # Global styles
│   ├── public/                     # Static assets
│   ├── index.html                  # HTML entry point
│   ├── vite.config.ts              # Build configuration
│   └── package.json                # Dependencies
│
├── server/                          # Backend - Go API
│   ├── src/
│   │   ├── main.go                 # Server entry point
│   │   ├── app/
│   │   │   └── app.go              # App setup, wiring
│   │   ├── config/
│   │   │   └── config.go           # Configuration loading
│   │   ├── controllers/
│   │   │   ├── zlang.controllers.go   # Z-- compilation handler
│   │   │   └── judge0.controllers.go  # Judge0 proxy handler
│   │   ├── services/
│   │   │   ├── zlang.service.go       # Compiler execution logic
│   │   │   ├── judge0.service.go      # Judge0 API calls
│   │   │   └── rate_limiter.go        # Rate limiting
│   │   ├── routes/
│   │   │   ├── zlang.routes.go        # Z-- API routes
│   │   │   ├── judge0.routes.go       # Judge0 API routes
│   │   │   └── base.routes.go         # Health check routes
│   │   ├── middlewares/
│   │   │   └── middlewares.go         # CORS, logging, recovery
│   │   ├── httpx/
│   │   │   └── httpx.go               # HTTP helpers
│   │   └── schema/
│   │       ├── zlang.schema.go        # Request validation
│   │       └── judge0.schema.go       # Judge0 request format
│   └── Dockerfile
│
├── Compiler/                        # Z-- Compiler (Node.js)
│   ├── src/
│   │   ├── index.js                # Main compiler entry
│   │   ├── lexer.js                # Tokenizer (text → tokens)
│   │   ├── token.js                # Token types and Token class
│   │   ├── parser.js               # Parser (tokens → AST)
│   │   ├── ast.js                  # AST node definitions
│   │   ├── visitor.js              # C code generator
│   │   └── llvm.js                 # LLVM IR generator
│   ├── test/                       # Test files
│   │   └── integration.test.js     # Integration tests
│   ├── test-code/                  # 27 Z-- test programs
│   ├── compile-samples/            # Generated .c and .ll files
│   └── package.json                # Dependencies
│
├── docs/                            # Documentation
│   ├── architecture.png            # Architecture diagram
│   ├── compiler-architecture.png   # Compiler diagram
│   ├── lang.doc                    # Language specification
│   └── README.md                   # (This file)
│
├── docker-compose.yml              # Docker orchestration
├── Readme.md                       # Project README
└── SECURITY.md                     # Security policy
```

---

## Key Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | React + TypeScript | Web user interface |
| Frontend Build | Vite | Fast development server |
| Styling | Tailwind CSS | Utility-first CSS |
| Code Editor | Monaco Editor | VS Code's editor component |
| Backend | Go (Golang) | API server |
| Compiler | JavaScript (Node.js) | Z-- compilation |
| LLVM | LLVM IR + lli | Code execution |
| Containerization | Docker | Deployment |
| Testing | Vitest | Unit/integration tests |

---

## Summary

Z Studio is a classic three-tier application:

1. **Presentation Tier:** React SPA providing the IDE experience
2. **Application Tier:** Go server handling requests and orchestration
3. **Processing Tier:** Node.js compiler translating Z-- to C/LLVM IR

The unique aspect is the **compiler** - it's not using an existing language toolchain but built from scratch to understand Z-- syntax and generate optimized output via LLVM.

This architecture cleanly separates concerns:
- The frontend doesn't need to know how compilation works
- The backend doesn't need to know Z-- syntax
- The compiler focuses solely on translation
