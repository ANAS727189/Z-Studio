# Z Studio

[![Release Version](https://img.shields.io/badge/v-1.0.0-blue.svg)](https://github.com/yourusername/Z-studio/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Z Studio** is a full-stack development ecosystem for the **Z--** programming language designed to deliver a seamless authoring, compilation, and execution experience. Whether you're writing language tutorials, building algorithms, or exploring new language features, Z Studio brings compiler theory and modern web-IDE convenience together in one unified platform.

---

## Key Features

* **Custom Language: Z--**
  * Minimal and expressive syntax with `start`/`end` blocks, `let` declarations, and first-class functions (`fun`).
  * Built-in control structures (`if`/`else`, `else if`, `while`, `for`, `break`).
  * Static typing with type inference and support for integers, floats, booleans, and strings.
  * Rich literals: decimal, hexadecimal (`0x`), binary (`0b`), octal (`0o`).
  * Unary operators: `++`, `--`, and unary minus (`-x`).
  * Arrays with index-based read/write, string concatenation.

* **From-Scratch Compiler**
  1. Lexer -> 2. Parser -> 3. AST -> 4. C Code Generator -> 5. LLVM IR Generator
  * Implements key compiler stages by hand for learning and extensibility.
  * Generates human-readable C code for portability and LLVM IR for optimizations.
  * Dead-code elimination and basic AST optimizations.

* **Modern Web-Based Editor**
  * Real-time syntax highlighting for Z-- and popular languages (C++, Java, Python, JavaScript, Go, Rust).
  * Integrated console with stdin/stdout capture and error reporting.
  * Auto-save, multi-file support, and keyboard shortcuts.

* **Server Backend**
  * Go-powered API routes:
    * `/z-lang/compile` -> compiles Z-- via the custom backend.
    * `/judge0/compile` -> proxies to Judge0 for multi-language compilation (C++, Java, Python, Go etc.).
  * Dead-code filtering, request queuing, and secure sandboxing.

* **Multi-Language Support** via Judge0
  * Easily run, test, and share code in C, C++, Java, Python, JavaScript, Go, Rust, and more.

---

## Project Structure

Z-studio/
  client/    # React + Tailwind web IDE
  server/    # Go backend API routes
  compiler/  # Z-- compiler modules (lexer, parser, AST, codegen)
  docs/      # Documentation site with architecture diagrams

---

## Getting Started

### Prerequisites

* Node.js (>= 16.x)
* Go (>= 1.22)
* npm or pnpm

### Clone and Install

git clone https://github.com/yourusername/Z-studio.git
cd Z-studio
npm install
cd client && npm install
cd ../compiler && npm install

### Run in Development

# 1) Start compiler backend
cd compiler && npm run watch

# 2) Launch server API
cd ../server && go run ./src/main.go

# 3) Launch web IDE (client)
cd ../client && npm run dev

Open http://localhost:3000 to start coding in Z--!

---

## Z-- Language Reference

### Program Structure

Every Z-- program starts with `start` and ends with `end`.

start
  // statements...
end

### Variable Declaration

let name = value        // with initial value
let name                // without initial value (null until assigned)

### Data Types

* Integer - let n = 42
* Float - let f = 3.14
* String - let s = "hello"
* Boolean - let flag = true

### Numeric Literals

let decimal = 42       // base 10
let hex     = 0x2A     // hexadecimal
let binary  = 0b101010 // binary
let octal   = 0o52     // octal

### Operators

Arithmetic: + - * / %

Unary:
  ++x    // pre-increment
  x--    // post-decrement
  -x     // unary minus (negation)

Comparison: == != < <= > >=

Logical & Bitwise: && || & | ^ %

### Control Flow

if / else:
  if condition {
    // ...
  } else {
    // ...
  }

else if:
  if score >= 90 {
    print("A")
  } else if score >= 75 {
    print("B")
  } else {
    print("C")
  }

while:
  while n > 0 {
    print(n)
    n = n - 1
  }

for:
  for i = 1, i <= 10, i++ {
    print(i)
  }

break - exit a loop early:
  while n > 0 {
    if n == 5 { break }
    print(n)
    n = n - 1
  }

### Functions

fun add {
  arg = (a, b)
  return a + b
}

let result = add(3, 4)

Recursive example:
  fun fib {
    arg = (n)
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
  }

### Arrays

let nums = [2, 4, 6, 8]
print(nums[0])        // read
values[1] = 5         // write

Indexing is 0-based.

### Strings

let msg = "Hello"
let full = msg + ", Z--"
print(full)

### Input

let n
print("Enter a number:")
input(n)

---

## Usage Examples

### Hello World (Z--):

start
  fun main {
    print("Hello, Z-- World!")
    return 0
  }
end

### Average Calculator:

start
  let a = 10
  let b = 20
  let avg = (a + b) / 2
  print("Average is: ")
  print(avg)
end

### Fibonacci Generator:

start
  let n
  print("How many Fibonacci numbers?")
  input(n)
  let a = 0, b = 1
  while n > 0 {
    print(a)
    let c = a + b
    a = b
    b = c
    n = n - 1
  }
end

### Grade Checker (else if):

start
  let score = 82
  if score >= 90 {
    print("A")
  } else if score >= 75 {
    print("B")
  } else {
    print("C")
  }
end

### Unary Operators:

start
  let x = 3
  ++x
  x--
  let y = -x
  print(y)
end

### Numeric Literals (hex, binary, octal):

start
  let decimal = 42
  let hex = 0x10
  let binary = 0b1010
  let octal = 0o7
  let total = decimal + hex + binary + octal
  total = total - 5
  print(total)
end

### Arrays:

start
  let nums = [2, 4, 6, 8]
  print(nums[0] + nums[1] + nums[2] + nums[3])

  let values = [1, 1, 1]
  values[1] = 5
  values[2] = values[1] + 4
  print(values[0] + values[1] + values[2])
end

### String Concatenation:

start
  let greeting = "Hello, " + "Z--"
  print(greeting)
end

### Recursive Fibonacci:

start
  fun fib {
    arg = (n)
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
  }
  print(fib(6))
end

---

Contributions and feature requests are warmly welcome!

## Contributing

1. Fork the repository and create a new branch.
2. Commit your changes with meaningful messages.
3. Push to your fork.
4. Open a Pull Request.

Built with love by **Anas**

2025 Z Studio Contributors. All rights reserved.
