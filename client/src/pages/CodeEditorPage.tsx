import { InputBox, OutputBox, CodeEditorBox, RunBar, Navbar } from '../components/page'
import { useState, useCallback, useMemo } from 'react';

const CodeEditorPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState('');

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    setError('');
    setOutput('');
    
    try {
      // Simulate compilation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock output based on language
      if (selectedLanguage === 'zmm') {
        setOutput('Hello, World!\n\nZ-- Language executed successfully!');
      } else {
        setOutput('Hello, World!\n\nProgram executed successfully!');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('Compilation failed: ' + err.message);
      } else {
        setError('Compilation failed: ' + String(err));
      }
    } finally {
      setIsCompiling(false);
    }
  }, [selectedLanguage]);

  const handleLanguageChange = useCallback((lang: string) => {
    setSelectedLanguage(lang);
    // Reset code to trigger default code loading in CodeEditorBox
    setCode('');
    setOutput('');
    setError('');
  }, []);

  const handleCodeChange = useCallback((value: string | undefined) => {
    setCode(value ?? '');
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  // Memoize the layout to prevent unnecessary re-renders
  const editorLayout = useMemo(() => (
    <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
      {/* Left Column - Code Editor */}
      <div className="flex flex-col flex-1 min-h-0">
        <CodeEditorBox 
          language={selectedLanguage}
          code={code}
          onChange={handleCodeChange}
        />
      </div>
      
      {/* Right Column - Input/Output */}
      <div className="flex flex-col space-y-6 min-h-0">
        <div className="flex-1">
          <InputBox 
            input={input}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex-1 min-h-0">
          <OutputBox 
            output={output}
            isLoading={isCompiling}
            error={error}
          />
        </div>
      </div>
    </div>
  ), [selectedLanguage, code, input, output, isCompiling, error, handleCodeChange, handleInputChange]);

  return (
    <div className="h-screen flex flex-col bg-[#060111] overflow-hidden">
      <Navbar />
      
      <RunBar 
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onCompile={handleCompile}
        isCompiling={isCompiling}
      />
      
      {editorLayout}
    </div>
  );
};

export default CodeEditorPage;