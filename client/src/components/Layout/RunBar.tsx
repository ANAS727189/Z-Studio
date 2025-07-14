import { Button } from '../ui/button'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "../../components/ui/select"

interface RunBarProps {
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  onCompile: () => void;
  isCompiling: boolean;
}

const RunBar = ({ selectedLanguage, onLanguageChange, onCompile, isCompiling }: RunBarProps) => {
  const languages = [
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'zmm', label: 'Z--' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' }
  ];

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Language:</label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={onCompile}
          className="flex items-center space-x-2"
          disabled={isCompiling}
        >
          {isCompiling ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Compiling...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Run Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
};


export default RunBar