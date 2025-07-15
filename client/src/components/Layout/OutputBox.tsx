import React from 'react'
import { Card, CardContent, CardHeader } from "../ui/card"
import { Monitor, Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface OutputBoxProps {
  output?: string;
  isLoading: boolean;
  compileTime?: number;
  memoryUsage?: number;
  error?: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ output, isLoading, error, compileTime, memoryUsage }) => {
  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
    if (error) return <AlertCircle className="w-4 h-4 text-red-400" />;
    if (output) return <CheckCircle className="w-4 h-4 text-green-400" />;
    return <Monitor className="w-4 h-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (isLoading) return "Running...";
    if (error) return "Error";
    if (output) return "Success";
    return "Output";
  };

  return (
    <Card className="h-full bg-[#0a0a0f] border-[#1a1a24] shadow-2xl">
      <CardHeader className="bg-[#0f0f17] border-b border-[#1a1a24] pb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <h3 className="text-sm font-semibold text-gray-100">{getStatusText()}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex-1 font-mono text-sm whitespace-pre-wrap" style={{ fontFamily: 'Fira Code, Monaco, Consolas, monospace' }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-2" />
                <div className="text-blue-400 text-sm">Executing code...</div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : output ? (
            <div className="text-green-400">{output}</div>
          ) : (
            <div className="text-gray-500 flex items-center justify-center h-full">
              <div className="text-center">
                <Monitor className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <div className="text-sm">Output will appear here...</div>
              </div>
            </div>
          )}
        </div>
        {/* Compile stats */}
        {!isLoading && (compileTime !== undefined || memoryUsage !== undefined) && (
          <div className="mt-2 text-xs text-gray-400 flex justify-end space-x-4">
            {compileTime !== undefined && (
              <span>Time: {compileTime}s</span>
            )}
            {memoryUsage !== undefined && (
              <span>Memory: {memoryUsage}KB</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OutputBox;
