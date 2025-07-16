export const SyntaxContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Z-- Syntax & Basics</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Program Structure</h3>
      <p className="text-gray-300 mb-4">Every Z-- program begins with <code className="bg-gray-800 px-2 py-1 rounded">start</code> and ends with <code className="bg-gray-800 px-2 py-1 rounded">end</code>.</p>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`start
  // Your code here
end`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`// Single-line comment

/* 
   Multi-line
   comment
*/`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
      <ul className="text-gray-300 space-y-2">
        <li>• Blocks are enclosed in curly braces <code className="bg-gray-800 px-2 py-1 rounded">{ }</code></li>
        <li>• Semicolons are not required</li>
        <li>• Strings are enclosed in double quotes <code className="bg-gray-800 px-2 py-1 rounded">" "</code></li>
        <li>• Use <code className="bg-gray-800 px-2 py-1 rounded">input(var)</code> for user input</li>
        <li>• Use <code className="bg-gray-800 px-2 py-1 rounded">print()</code> for output</li>
      </ul>
    </div>
  </div>
);