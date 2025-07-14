import React from 'react'
import { Card, CardContent, CardHeader } from "../ui/card"
import { Monitor, Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface OutputBoxProps {
  output?: string;
  isLoading: boolean;
  error?: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ output, isLoading, error }) => {
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
      <CardContent className="p-4 h-full overflow-auto">
        <div className="font-mono text-sm min-h-full" style={{ fontFamily: 'Fira Code, Monaco, Consolas, monospace' }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-2" />
                <div className="text-blue-400 text-sm">Executing code...</div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-400 whitespace-pre-wrap">{error}</div>
          ) : output ? (
            <div className="text-green-400 whitespace-pre-wrap">{output}</div>
          ) : (
            <div className="text-gray-500 flex items-center justify-center h-full">
              <div className="text-center">
                <Monitor className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <div className="text-sm">Output will appear here...</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputBox