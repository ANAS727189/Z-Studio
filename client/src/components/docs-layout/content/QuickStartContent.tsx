export const QuickStartContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Quick Start</h1>
    <h3 className="text-xl font-semibold text-white mb-4">Run the Full Stack</h3>
    <div className="space-y-4 mb-6">
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-2">1. Start the Frontend</h4>
        <div className="bg-black p-3 rounded">
          <code className="text-green-400">npm run dev</code>
        </div>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-2">2. Start the Server</h4>
        <div className="bg-black p-3 rounded">
          <code className="text-green-400">npm run start</code>
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-800/30">
      <h3 className="text-lg font-semibold text-white mb-2">🎉 You're Ready!</h3>
      <p className="text-gray-300">Your Z Studio environment is now running. Open your browser and start coding with Z--!</p>
    </div>
  </div>
);