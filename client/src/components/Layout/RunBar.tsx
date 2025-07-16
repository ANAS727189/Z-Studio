import { Button } from '../ui/button';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "../../components/ui/select";
import { Badge } from '../ui/badge';
import { Play, Loader2, Settings, Activity, Zap } from 'lucide-react';

interface RunBarProps {
  activeLanguage: string;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  onCompile: () => void;
  isCompiling: boolean;
  isAutoSave: boolean;
  onToggleAutoSave: () => void;
}

const RunBar = ({ activeLanguage, selectedLanguage, onLanguageChange, onCompile, isCompiling, isAutoSave, onToggleAutoSave }: RunBarProps) => {
  const languages = [
    { value: 'cpp', label: 'C++', color: 'bg-blue-500', icon: '🔷' },
    { value: 'c', label: 'C', color: 'bg-green-500', icon: '🔗' },
    { value: 'zmm', label: 'Z--', color: 'bg-purple-500', icon: '⚡' },
    { value: 'java', label: 'Java', color: 'bg-orange-500', icon: '☕' },
    { value: 'python', label: 'Python', color: 'bg-yellow-500', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript', color: 'bg-yellow-400', icon: '🟨' },
    { value: 'rust', label: 'Rust', color: 'bg-red-500', icon: '🦀' },
    { value: 'go', label: 'Go', color: 'bg-cyan-500', icon: '🔵' }
  ];
  const currentLanguage = languages.find(lang => lang.value === activeLanguage);

  return (
    <div className="bg-[#0a0a0f] border-b border-[#1a1a24] px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Settings className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-300">Language:</label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[140px] sm:w-[180px] bg-[#0f0f17] border-[#1a1a24] text-gray-100 hover:bg-[#141421] focus:ring-purple-500/50">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f17] border-[#1a1a24]">
                {languages.map(lang => (
                  <SelectItem 
                    key={lang.value} 
                    value={lang.value}
                    className="text-gray-100 hover:bg-[#1a1a24] focus:bg-[#1a1a24] focus:text-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{lang.icon}</span>
                      <span className="text-sm">{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {currentLanguage && (
            <Badge 
              variant="outline" 
              className="bg-purple-900/20 text-purple-400 border-purple-400/30 px-2 sm:px-3 py-1 font-mono text-xs sm:block hidden"
            >
              <span className="mr-1">{currentLanguage.icon}</span>
              <span className="hidden sm:inline">{currentLanguage.label}</span>
              <span className="sm:hidden">{currentLanguage.value}</span>
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-[#1a1a24] rounded-lg">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="text-xs text-gray-400">Editor Ready</span>
            </div>
            <div 
              className="flex items-center space-x-2 px-3 py-1 bg-[#1a1a24] rounded-lg cursor-pointer hover:bg-[#2a2a34] transition-colors"
              onClick={onToggleAutoSave}
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-gray-400">Auto-save: {isAutoSave ? 'ON' : 'OFF'}</span>
            </div>
          </div>
          
          <Button 
            onClick={onCompile}
            disabled={isCompiling}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-none px-4 sm:px-6 py-2 h-8 sm:h-9 font-medium text-xs sm:text-sm shadow-lg hover:shadow-green-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-auto sm:ml-0"
          >
            {isCompiling ? (
              <>
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                <span className="hidden sm:inline">Running...</span>
                <span className="sm:hidden">Run</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Run Code</span>
                <span className="sm:hidden">Run</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RunBar;