import React from 'react'

interface OutputBoxProps {
  output?: string;
  isLoading: boolean;
  error?: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ output, isLoading, error }) => {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 flex flex-col">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Output</h3>
      </div>
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Running code...</div>
          </div>
        ) : error ? (
          <div className="text-red-600 whitespace-pre-wrap">{error}</div>
        ) : output ? (
          <div className="whitespace-pre-wrap">{output}</div>
        ) : (
          <div className="text-gray-400">Output will appear here...</div>
        )}
      </div>
    </div>
  );
};

export default OutputBox