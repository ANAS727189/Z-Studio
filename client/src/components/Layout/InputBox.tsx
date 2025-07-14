import React from 'react'

interface InputBoxProps {
  input: string;
  onChange: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ input, onChange }) => {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 flex flex-col">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Input</h3>
      </div>
      <textarea
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your input here..."
        className="flex-1 p-4 border-none outline-none resize-none font-mono text-sm"
      />
    </div>
  );
};


export default InputBox