export const VariablesContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Variables & Data Types</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Variable Declaration</h3>
      <p className="text-gray-300 mb-4">Use <code className="bg-gray-800 px-2 py-1 rounded">let</code> to declare variables of any type. Type is inferred based on the assigned value.</p>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`let number = 12       // integer
let name = "Alice"    // string
let score = 95.5      // float
let isActive = true   // boolean`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Supported Data Types</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Integer</h4>
          <code className="text-green-400">let count = 42</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">String</h4>
          <code className="text-green-400">let message = "Hello"</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Float</h4>
          <code className="text-green-400">let pi = 3.14</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Boolean</h4>
          <code className="text-green-400">let flag = true</code>
        </div>
      </div>
    </div>
  </div>
);