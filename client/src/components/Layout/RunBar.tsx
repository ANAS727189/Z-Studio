import { Button } from '../ui/button'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "../../components/ui/select"
import { Badge } from '../ui/badge'
import { Play, Loader2, Settings } from 'lucide-react'

interface RunBarProps {
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  onCompile: () => void;
  isCompiling: boolean;
}

const RunBar = ({ selectedLanguage, onLanguageChange, onCompile, isCompiling }: RunBarProps) => {
  const languages = [
    { value: 'cpp', label: 'C++', color: 'bg-blue-500' },
    { value: 'c', label: 'C', color: 'bg-green-500' },
    { value: 'zmm', label: 'Z--', color: 'bg-purple-500' },
    { value: 'java', label: 'Java', color: 'bg-orange-500' },
    { value: 'python', label: 'Python', color: 'bg-yellow-500' },
    { value: 'javascript', label: 'JavaScript', color: 'bg-yellow-400' },
    { value: 'rust', label: 'Rust', color: 'bg-red-500' },
    { value: 'go', label: 'Go', color: 'bg-cyan-500' }
  ];

  const currentLanguage = languages.find(lang => lang.value === selectedLanguage);

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
                      <div className={`w-2 h-2 rounded-full ${lang.color}`} />
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {currentLanguage && (
            <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-400/30">
              <div className={`w-2 h-2 rounded-full ${currentLanguage.color} mr-2`} />
              {currentLanguage.label}
            </Badge>
          )}
        </div>
        
        <Button 
          onClick={onCompile}
          disabled={isCompiling}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCompiling ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Compiling...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RunBar