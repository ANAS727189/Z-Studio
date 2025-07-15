import React from 'react'
import { Card, CardContent, CardHeader } from "../ui/card"
import { Monitor, Loader2, AlertCircle, CheckCircle, Copy, Download, Clock, MemoryStick } from "lucide-react"

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
    if (isLoading) return "Executing...";
    if (error) return "Execution Error";
    if (output) return "Output";
    return "Standard Output";
  };

  const getStatusColor = () => {
    if (isLoading) return "text-blue-400";
    if (error) return "text-red-400";
    if (output) return "text-green-400";
    return "text-gray-400";
  };

  const handleCopy = () => {
    const textToCopy = error || output || '';
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Card className="h-full bg-[#0f0f17] border-[#1a1a24] shadow-lg">
      <CardHeader className="bg-[#1a1a24] border-b border-[#2a2a34] py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <h3 className={`text-sm font-semibold ${getStatusColor()}`}>
              {getStatusText()}
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            {(output || error) && (
              <button
                onClick={handleCopy}
                className="p-1 text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34] rounded transition-colors"
                title="Copy output"
              >
                <Copy className="w-3 h-3" />
              </button>
            )}
            <button
              className="p-1 text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34] rounded transition-colors"
              title="Download output"
            >
              <Download className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        <div className="relative h-full">
          <div className="p-3 sm:p-4 h-full overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 animate-spin mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-400 text-xs sm:text-sm">Executing code...</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="hidden sm:inline">This may take a few moments...</span>
                    <span className="sm:hidden">Please wait...</span>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="font-mono text-xs sm:text-sm text-red-400 whitespace-pre-wrap leading-relaxed bg-red-900/10 p-2 sm:p-3 rounded-lg border border-red-400/20">
                {error}
              </div>
            ) : output ? (
              <div className="font-mono text-xs sm:text-sm text-gray-100 whitespace-pre-wrap leading-relaxed bg-[#1a1a24] p-2 sm:p-3 rounded-lg border border-[#2a2a34]">
                {output}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Monitor className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-400 text-xs sm:text-sm">
                    <span className="hidden sm:inline">Output will appear here...</span>
                    <span className="sm:hidden">Output here...</span>
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    <span className="hidden sm:inline">Click "Run Code" to execute</span>
                    <span className="sm:hidden">Click "Run" to execute</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Stats Footer */}
      {!isLoading && (compileTime !== undefined || memoryUsage !== undefined) && (
        <div className="bg-[#1a1a24] border-t border-[#2a2a34] px-3 sm:px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {compileTime !== undefined && (
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="hidden sm:inline">Execution: {compileTime}s</span>
                  <span className="sm:hidden">{compileTime}s</span>
                </div>
              )}
              {memoryUsage !== undefined && (
                <div className="flex items-center space-x-1 text-gray-400">
                  <MemoryStick className="w-3 h-3" />
                  <span className="hidden sm:inline">Memory: {memoryUsage}KB</span>
                  <span className="sm:hidden">{memoryUsage}KB</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-400">Ready</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OutputBox;