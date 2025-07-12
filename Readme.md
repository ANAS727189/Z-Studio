
# Z-studio
**Z-studio** is a complete development ecosystem for the Z-- programming language. Built by developers, for developers, it combines a simple syntax with a powerful compiler and a modern web-based editor — all in one unified project.

## ✨ Features

- 🔤 **Custom Language (`Z--`)**  
  A clean, expressive, and minimal syntax with features like `fun`, `let`, and custom control structures.

- 🧠 **Compiler (From Scratch)**  
  Includes Lexer → Parser → AST → C Code Generator → LLVM IR Generator.

- 🧪 **Online Code Editor**  
  A beautiful web-based code editor to write and run Z-- code directly in the browser.

- 🔌 **Server Backend**  
  Connects the editor to the Z-- compiler and Judge0 API for multi-language support (C++, Python, Java, etc.).

- 🧾 **Multi-language Support via Judge0**  
  Compile and test non-Z-- languages too, right from the same interface.

---

## 🗂 Project Structure

```bash
Z-studio/
├── client/        # Web code editor (client)
├── server/          # Backend server (routes Z-- and Judge0 calls)
├── compiler(z--)/        # Z-- compiler: Lexer, Parser, AST, CodeGen
├── docs/            # Language reference, examples, roadmap
└── README.md
````

---

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/Z-studio.git
   cd Z-studio
   ```

2. Install dependencies for each part (compiler, frontend, server, etc.)

3. Run the full stack:

   * `npm run dev` (frontend)
   * `node server.js` (server)
   * `node src/index.js` (compiler backend)

---

## 📖 Documentation

Check the [`docs/`](./docs) folder for language syntax, sample programs, and architecture details.

---

## 🧠 Roadmap

* [x] Lexer
* [x] Parser → AST
* [ ] C Code Generation
* [ ] LLVM IR generation
* [ ] Full IDE integration
* [ ] CLI support

---

## 👨‍💻 Author

Built with love by **Anas Khan** 💻

> "Z-- is the language I always wished I had when learning to code."

---

