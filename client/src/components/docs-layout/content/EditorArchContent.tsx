export const EditorArchContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Editor Architecture</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">System Overview</h3>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
       <img src="/code-editor-architecture.png"/>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Judge0 Integration</h3>
      <p className="text-gray-300 mb-4">
        The server also calls Judge0 API for compiling C++, Java, Python, JS, and other languages, 
        providing multi-language support in the same interface.
      </p>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h4 className="text-white font-semibold mb-2">Supported Languages</h4>
        <div className="flex flex-wrap gap-2">
          {['C++', 'Java', 'Python', 'JavaScript', 'C', 'Go', 'Rust'].map(lang => (
            <span key={lang} className="bg-purple-600 text-white px-2 py-1 rounded text-sm">{lang}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);