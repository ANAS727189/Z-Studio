import { Code, Settings, FileText, Layers } from 'lucide-react';

export const IntroductionContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Welcome to Z Studio</h1>
    <p className="text-gray-300 text-lg mb-6">
      Z Studio is a complete development ecosystem for the Z-- programming language. Built by developers, 
      for developers, it combines a simple syntax with a powerful compiler and a modern web-based editor — 
      all in one unified project.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <Code className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Custom Language (Z--)</h3>
        <p className="text-gray-400">A clean, expressive, and minimal syntax with features like fun, let, and custom control structures.</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <Layers className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Compiler (From Scratch)</h3>
        <p className="text-gray-400">Includes Lexer → Parser → AST → C Code Generator → LLVM IR Generator.</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <Settings className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Online Code Editor</h3>
        <p className="text-gray-400">A beautiful web-based code editor to write and run Z-- code directly in the browser.</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <FileText className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Multi-language Support</h3>
        <p className="text-gray-400">Compile and test non-Z-- languages too via Judge0 API (C++, Python, Java, etc.).</p>
      </div>
    </div>
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-purple-800/30">
      <h3 className="text-lg font-semibold text-white mb-2">Built with ❤️ by Anas</h3>
    </div>
  </div>
);
