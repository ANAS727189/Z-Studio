export const ServerArchContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Server Architecture</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
      <p className="text-gray-300 mb-4">
        The server acts as a bridge between the web editor, Z-- compiler, and Judge0 API. It handles API requests, 
        compiles Z-- code, and routes non-Z-- language requests to Judge0 for processing.
      </p>
      <img src="/server-structure.png" alt="Server Architecture" />
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Key Components</h3>
      <ul className="text-gray-300 space-y-2">
        <li>• <strong>API Routes</strong>: Manages compilation requests for Z-- and other languages.</li>
        <li>• <strong>Z-- Compiler Integration</strong>: Executes the Z-- compiler backend.</li>
        <li>• <strong>Judge0 API</strong>: Provides multi-language compilation support.</li>
      </ul>
    </div>
  </div>
);