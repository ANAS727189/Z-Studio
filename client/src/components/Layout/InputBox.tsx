import React from 'react'
import { Card, CardContent, CardHeader } from "../ui/card"
import { Terminal, FileText } from "lucide-react"

interface InputBoxProps {
  input: string;
  onChange: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ input, onChange }) => {
  return (
    <Card className="h-full bg-[#0a0a0f] border-[#1a1a24] shadow-2xl">
      <CardHeader className="bg-[#0f0f17] border-b border-[#1a1a24] pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-semibold text-gray-100">Input</h3>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <textarea
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your input here..."
          className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm text-gray-100 placeholder-gray-500 focus:placeholder-gray-400 transition-colors duration-200"
          style={{ 
            minHeight: '200px',
            fontFamily: 'Fira Code, Monaco, Consolas, monospace'
          }}
        />
      </CardContent>
    </Card>
  );
};

export default InputBox