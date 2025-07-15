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
}

const RunBar = ({ activeLanguage, selectedLanguage, onLanguageChange, onCompile, isCompiling }: RunBarProps) => {
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
    <div className="bg-[#0a0a0f] border-b border-[#1a1a24] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Settings className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-300">Language:</label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[180px] bg-[#0f0f17] border-[#1a1a24] text-gray-100 hover:bg-[#141421] focus:ring-purple-500/50">
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
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {currentLanguage && (
            <Badge 
              variant="outline" 
              className="bg-purple-900/20 text-purple-400 border-purple-400/30 px-3 py-1 font-mono text-xs"
            >
              <span className="mr-1">{currentLanguage.icon}</span>
              {currentLanguage.label}
            </Badge>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-[#1a1a24] rounded-lg">
            <Activity className="w-3 h-3 text-green-400" />
            <span className="text-xs text-gray-400">Editor Ready</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-[#1a1a24] rounded-lg">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="text-xs text-gray-400">Auto-save: ON</span>
          </div>
        </div>
        <Button 
          onClick={onCompile}
          disabled={isCompiling}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-none px-6 py-2 h-9 font-medium text-sm shadow-lg hover:shadow-green-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCompiling ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RunBar;