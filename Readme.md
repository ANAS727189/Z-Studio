# Z Studio

[![Release Version](https://img.shields.io/badge/v-1.0.0-blue.svg)](https://github.com/yourusername/Z-studio/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Z Studio** is a full‑stack development ecosystem for the **Z--** programming language—designed to deliver a seamless authoring, compilation, and execution experience. Whether you're writing language tutorials, building algorithms, or exploring new language features, Z Studio brings compiler theory and modern web‑IDE convenience together in one unified platform.

---

## ✨ Key Features

* 🔤 **Custom Language: Z--**

  * Minimal and expressive syntax with `start`/`end` blocks, `let` declarations, and first‑class functions (`fun`).
  * Built‑in control structures (`if`/`else`, `while`, `for`, `break`).
  * Static typing with type inference and support for integers, floats, booleans, and strings.

* 🛠️ **From‑Scratch Compiler**

  1. **Lexer** → 2. **Parser** → 3. **AST** → 4. **C Code Generator** → 5. **LLVM IR Generator**

  * Implements key compiler stages by hand for learning and extensibility.
  * Generates human‑readable C code for portability and LLVM IR for optimizations.
  * Dead‑code elimination and basic AST optimizations.

* 🌐 **Modern Web‑Based Editor**

  * Real‑time syntax highlighting for Z-- and popular languages (C++, Java, Python, JavaScript, Go, Rust).
  * Integrated console with stdin/stdout capture and error reporting.
  * Auto‑save, multi‑file support, and keyboard shortcuts.

* 🔌 **Server Backend**

  * Express‑powered API routes:

    * `/z-lang/compile` → compiles Z-- via the custom backend.
    * `/judge0/compile` → proxies to Judge0 for multi‑language compilation (C++, Java, Python, etc.).
  * Dead‑code filtering, request queuing, and secure sandboxing.

* 🔄 **Multi‑Language Support** via Judge0

  * Easily run, test, and share code in C, C++, Java, Python, JavaScript, Go, Rust, and more—right alongside Z-- programs.

---

## 🗂 Project Structure

```bash
Z-studio/
├── client/                 # React + Tailwind web IDE
├── server/                 # Node.js + Express backend routes & controllers
├── compiler/               # Z-- compiler modules (lexer, parser, AST, codegen)
├── docs/                   # Documentation site (Next.js) with architecture diagrams
├── LICENSE                 # Open‑source license
└── README.md               # Project overview and setup guide
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (>= 16.x)
* npm or pnpm

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/Z-studio.git
cd Z-studio

# Install dependencies
pm install        # installs client & server deps
cd client && npm install
cd ../compiler && npm install
```

### Run in Development

```bash
# Open three terminals or use a terminal multiplexer
# 1) Start compiler backend
cd compiler && npm run watch       # rebuilds on changes

# 2) Launch server API
git checkout main && cd ../server && npm run dev

# 3) Launch web IDE (client)
cd ../client && npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000) to start coding in Z--!

---

## 📖 Usage Examples

### Hello World (Z--):

```z--
start
  fun main {
    print("Hello, Z-- World!")
    return 0
  }
end
```

### Average Calculator:

```z--
start
  let a = 10
  let b = 20
  let avg = (a + b) / 2
  print("Average is: ")
  print(avg)
end
```

### Fibonacci Generator:

```z--
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

Contributions and feature requests are warmly welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 👨‍💻 Contributing

1. Fork the repository and create a new branch (`git checkout -b feature/my-feature`).
2. Commit your changes with meaningful messages (`git commit -m "feat: add awesome feature"`).
3. Push to your fork (`git push origin feature/my-feature`).
4. Open a Pull Request describing your changes.

Please ensure code style consistency and include tests where applicable.

---



## ✍️ Author

Built with passion by **Anas Khan** 💻

---

© 2025 Z Studio Contributors. All rights reserved.
