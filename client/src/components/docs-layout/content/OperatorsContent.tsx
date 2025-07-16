export const OperatorsContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Operators</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Logical & Bitwise Operators</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Logical AND</h4>
          <code className="text-green-400">&&</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Logical OR</h4>
          <code className="text-green-400">||</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Bitwise OR</h4>
          <code className="text-green-400">|</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Bitwise AND</h4>
          <code className="text-green-400">&</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Bitwise XOR</h4>
          <code className="text-green-400">^</code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Modulo</h4>
          <code className="text-green-400">%</code>
        </div>
      </div>
    </div>
  </div>
);