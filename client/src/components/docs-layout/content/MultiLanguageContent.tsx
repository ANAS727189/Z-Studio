export const MultiLanguageContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Multi-language Support</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <p className="text-gray-300 mb-4">
        Z Studio leverages the Judge0 API to support multiple programming languages alongside Z--. This allows 
        developers to experiment with different languages within the same interface.
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