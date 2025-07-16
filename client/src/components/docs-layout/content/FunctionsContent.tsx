export const FunctionsContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Functions</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Function Definition</h3>
      <p className="text-gray-300 mb-4">Functions are defined using the <code className="bg-gray-800 px-2 py-1 rounded">fun</code> keyword.</p>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`fun functionName {
  arg = (param1, param2, ...)
  // function body
  return expression
}`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Example Function</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`fun solve {
  arg = (a, b)
  return a + b
}

// Function call
solve(5, 3);`}
        </pre>
      </div>
    </div>
  </div>
);