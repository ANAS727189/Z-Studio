import { InputBox, OutputBox, CodeEditorBox, RunBar, Navbar } from '../components/page'
import { useState, useCallback, useMemo } from 'react';
import axiosInstance from '../utils/axiosInstance';

const CodeEditorPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState('');
  const [compileTime, setCompileTime] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  const languageIdMap: Record<string, number> = {
  c: 104,
  cpp: 105, 
  java: 91,
  javascript: 102,
  python: 109, 
  go: 107,      
  rust: 108,         
};

  const handleCompile = useCallback(async () => {
    setIsCompiling(true);
    setError('');
    setOutput('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (selectedLanguage === 'zmm') {
       const res = await axiosInstance.post('/zlang/compile', {
          code: code,
        });
        const { 
          programOutput, 
        } = res.data;
        setOutput(programOutput);
        setCompileTime(0);
        setMemoryUsage(0);
      } else {
       const language_id = languageIdMap[selectedLanguage];
        if (!language_id) {
          throw new Error(`No Judge0 mapping for language “${selectedLanguage}”`);
        }

        const res = await axiosInstance.post('/judge0/compile', {
          language_id,
          source_code: code,
          stdin: input,
        });

        const { output: judge0Output, success } = res.data;
        if (!success) {
          throw new Error(judge0Output.stderr || 'Unknown compile/runtime error');
        }

        setOutput(judge0Output.stdout);
        setCompileTime(judge0Output.time);
        setMemoryUsage(judge0Output.memory);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError('Compilation failed: ' + msg);
    } finally {
      setIsCompiling(false);
    }
  }, [selectedLanguage, code, input]);

  const handleLanguageChange = useCallback((lang: string) => {
    setSelectedLanguage(lang);
    // Reset code
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


const editorLayout = useMemo(() => (
  <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
    {/* Code Editor spans 2 columns on md+ */}
    <div className="col-span-1 md:col-span-2 flex flex-col min-h-0">
      <CodeEditorBox 
        language={selectedLanguage}
        code={code}
        onChange={handleCodeChange}
      />
    </div>

    {/* Input/Output stacked, equal height */}
    <div className="col-span-1 flex flex-col gap-6 min-h-0">
      <div className="flex-1 min-h-0">
        <InputBox 
          input={input}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="flex-1 min-h-0">
        <OutputBox 
          output={output}
          isLoading={isCompiling}
          compileTime={compileTime}
          memoryUsage={memoryUsage}
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