export const ControlFlowContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Control Flow</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">if-else Statement</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`if condition {
  // statements
} else {
  // statements
}`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">while Loop</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`while condition {
  // statements
}`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">for Loop</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`for init, condition, increment {
  // statements
}

// Example:
for a = 2, a < 10, a++ {
  print(a)
}`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">break Keyword</h3>
      <p className="text-gray-300 mb-4">Used to exit loops prematurely.</p>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`start
  let n = 10
  while n > 0 {
    if n == 5 {
      break
    }
    print(n)
    n = n - 1
  }
end`}
        </pre>
      </div>
    </div>
  </div>
);