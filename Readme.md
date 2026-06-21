# Z Studio

[![Release Version](https://img.shields.io/badge/v-1.0.0-blue.svg)](https://github.com/yourusername/Z-studio/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Z Studio** is a full-stack development ecosystem for the **Z--** programming language designed to deliver a seamless authoring, compilation, and execution experience. Whether you're writing language tutorials, building algorithms, or exploring new language features, Z Studio brings compiler theory and modern web-IDE convenience together in one unified platform.

---

## Demo

<p align="center">
  <a href="https://www.youtube.com/watch?v=fw6ugNq17QU">
    <img src="https://img.youtube.com/vi/fw6ugNq17QU/maxresdefault.jpg" width="80%">
  </a>
</p>

---

## Key Features

**Custom Language: Z--**
* Minimal and expressive syntax with `start`/`end` blocks, `let` declarations, and first-class functions (`fun`).
* Built-in control structures (`if`/`else`, `else if`, `while`, `for`, `break`).
* Static typing with type inference and support for integers, floats, booleans, and strings.
* Rich literals: decimal, hexadecimal (`0x`), binary (`0b`), octal (`0o`).
* Unary operators: `++`, `--`, and unary minus (`-x`).
* Arrays with index-based read/write, string concatenation.


**From-Scratch Compiler**
1. Lexer ➔ 2. Parser ➔ 3. AST ➔ 4. C Code Generator ➔ 5. LLVM IR Generator


* Implements key compiler stages by hand for learning and extensibility.
* Generates human-readable C code for portability and LLVM IR for optimizations.
* Dead-code elimination and basic AST optimizations.


**Modern Web-Based Editor**
* Real-time syntax highlighting for Z-- and popular languages (C++, Java, Python, JavaScript, Go, Rust).
* Integrated console with stdin/stdout capture and error reporting.
* Auto-save, multi-file support, and keyboard shortcuts.


**Server Backend**
* Go-powered API routes:
* `/z-lang/compile` ➔ compiles Z-- via the custom backend.
* `/judge0/compile` ➔ proxies to Judge0 for multi-language compilation (C++, Java, Python, Go etc.).
* Dead-code filtering, request queuing, and secure sandboxing.


**Multi-Language Support** via Judge0
* Easily run, test, and share code in C, C++, Java, Python, JavaScript, Go, Rust, and more.



---

## Project Structure

```text
Z-studio/
├── client/      # React + Tailwind web IDE
├── server/      # Go backend API routes
├── compiler/    # Z-- compiler modules (lexer, parser, AST, codegen)
└── docs/        # Documentation site with architecture diagrams

```

---

## Getting Started

### Prerequisites

* **Node.js** (>= 16.x)
* **Go** (>= 1.22)
* **npm** or **pnpm**

### Clone and Install

```bash
git clone https://github.com/yourusername/Z-studio.git
cd Z-studio
npm install

cd client && npm install
cd ../compiler && npm install

```

### Run in Development

**1. Start compiler backend**

```bash
cd compiler && npm run watch

```

**2. Launch server API**

```bash
cd ../server && go run ./src/main.go

```

**3. Launch web IDE (client)**

```bash
cd ../client && npm run dev

```

Open `http://localhost:3000` to start coding in Z--!

---

## Language Reference

For the complete Z-- language specification, see the dedicated reference:

> **📖 [Z-- Language Reference (zmm-lang.md)](docs/zmm-lang.md)**
>
> Covers: program structure, data types, numeric literals, all operators, control flow,
> functions, arrays, strings, and 10 annotated sample programs.

The language reference is maintained separately to keep this README focused on
project setup and usage.

---


## Usage Examples

### Hello World

```text
start
  fun main {
    print("Hello, Z-- World!")
    return 0
  }
end

```

### Average Calculator

```text
start
  let a = 10
  let b = 20
  let avg = (a + b) / 2
  print("Average is: ")
  print(avg)
end

```

### Fibonacci Generator

```text
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

```

### Recursive Fibonacci

```text
start
  fun fib {
    arg = (n)
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
  }
  print(fib(6))
end

```

### Unary Operators

```text
start
  let x = 3
  ++x
  x--
  let y = -x
  print(y)
end

```

### Arrays

```text
start
  let nums = [2, 4, 6, 8]
  print(nums[0] + nums[1] + nums[2] + nums[3])

  let values = [1, 1, 1]
  values[1] = 5
  values[2] = values[1] + 4
  print(values[0] + values[1] + values[2])
end

```

---

## Contributing

Contributions and feature requests are warmly welcome!

1. **Fork** the repository and create a new branch.
2. **Commit** your changes with meaningful messages.
3. **Push** to your fork.
4. Open a **Pull Request**.

---

## ✍️ Author

Built with love & passion by **Anas** 💻

---

© 2025 Z Studio Contributors. All rights reserved.
