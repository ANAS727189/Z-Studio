export const ProjectStructureContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Project Structure</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <pre className="text-gray-300 text-sm">
{`Z-studio/
├── client/           # Web code editor (client)
├── server/           # Backend server (routes Z-- and Judge0 calls)
├── compiler(z--)/    # Z-- compiler: Lexer, Parser, AST, CodeGen
├── docs/             # Language reference, examples, roadmap
└── README.md`}
      </pre>
      <p className="text-gray-300 mt-4">
        Each directory contains specific components of the Z Studio ecosystem, ensuring modularity and scalability.
      </p>
    </div>
  </div>
);