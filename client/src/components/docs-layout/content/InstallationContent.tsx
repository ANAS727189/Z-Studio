export const InstallationContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Installation</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
      <ul className="text-gray-300 space-y-2">
        <li>• Node.js (v14 or higher)</li>
        <li>• npm or yarn</li>
        <li>• Git</li>
      </ul>
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">Clone the Repository</h3>
    <div className="bg-black p-4 rounded-lg border border-gray-800 mb-6">
      <code className="text-green-400">
        git clone https://github.com/yourusername/Z-studio.git<br />
        cd Z-studio
      </code>
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">Project Structure</h3>
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 mb-6">
      <pre className="text-gray-300 text-sm">
{`Z-studio/
├── client/           # Web code editor (client)
├── server/           # Backend server (routes Z-- and Judge0 calls)
├── compiler(z--)/    # Z-- compiler: Lexer, Parser, AST, CodeGen
├── docs/             # Language reference, examples, roadmap
└── README.md`}
      </pre>
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">Install Dependencies</h3>
    <div className="bg-black p-4 rounded-lg border border-gray-800 mb-6">
      <code className="text-green-400">npm install  # Install dependencies for each part</code>
    </div>
  </div>
);