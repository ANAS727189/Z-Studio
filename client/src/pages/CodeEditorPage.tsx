import { InputBox, OutputBox, CodeEditorBox, RunBar, Navbar } from '../components/page';
import { useState, useCallback, useMemo } from 'react';
import axiosInstance from '../utils/axiosInstance';

type LanguageKey = 'cpp' | 'c' | 'zmm' | 'java' | 'python' | 'javascript' | 'rust' | 'go';

const defaultCodeMap: Record<LanguageKey, string> = {
  'cpp': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  'c': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  'zmm': 'start\nfun main{\n  print("Hello, World!")\n}end\n',
  'java': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  'python': 'print("Hello, World!")',
  'javascript': 'console.log("Hello, World!");',
  'rust': 'fn main() {\n    println!("Hello, World!");\n}',
  'go': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
};

const fileExtensionMap: Record<LanguageKey, string> = {
  'cpp': 'cpp',
  'c': 'c',
  'zmm': 'zmm',
  'java': 'java',
  'python': 'py',
  'javascript': 'js',
  'rust': 'rs',
  'go': 'go',
};

const CodeEditorPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('cpp');
  const [files, setFiles] = useState<{ [fileName: string]: { code: string; language: LanguageKey } }>({
    'main.cpp': { code: defaultCodeMap['cpp'], language: 'cpp' },
  });
  const [activeFile, setActiveFile] = useState('main.cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState('');
  const [compileTime, setCompileTime] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [theme, setTheme] = useState('dracula');
  const [fontSize, setFontSize] = useState(14);
  const [showMinimap, setShowMinimap] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);

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
    const file = files[activeFile];
    if (!file) {
      setError('No active file selected');
      return;
    }
    const language = file.language;
    setIsCompiling(true);
    setError('');
    setOutput('');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (language === 'zmm') {
        const res = await axiosInstance.post('/zlang/compile', { code: file.code });
        const { programOutput } = res.data;
        setOutput(programOutput);
        setCompileTime(0);
        setMemoryUsage(0);
      } else {
        const language_id = languageIdMap[language];
        if (!language_id) {
          throw new Error(`No Judge0 mapping for language "${language}"`);
        }
        const res = await axiosInstance.post('/judge0/compile', {
          language_id,
          source_code: file.code,
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
  }, [activeFile, files, input]);

  const handleChangeActiveFileLanguage = useCallback((newLanguage: LanguageKey) => {
    setFiles(prevFiles => {
      // const oldFile = prevFiles[activeFile];
      const newExtension = fileExtensionMap[newLanguage];
      const oldExtension = activeFile.split('.').pop();
      let newFileName = activeFile;
      if (oldExtension !== newExtension) {
        newFileName = activeFile.replace(/\.[^.]+$/, `.${newExtension}`);
        if (prevFiles[newFileName]) {
          // If the new file name already exists, keep the old name
          newFileName = activeFile;
        } else {
          // Remove the old file entry if renamed
          delete prevFiles[activeFile];
        }
      }
      const updatedFiles = {
        ...prevFiles,
        [newFileName]: {
          code: defaultCodeMap[newLanguage], // Reset to default code
          language: newLanguage,
        },
      };
      setActiveFile(newFileName); // Update active file to new name if renamed
      return updatedFiles;
    });
    setSelectedLanguage(newLanguage); // Sync selectedLanguage for new files
    setOutput('');
    setError('');
  }, [activeFile]);

  const handleAddFile = useCallback(() => {
    const extension = fileExtensionMap[selectedLanguage];
    let count = 1;
    let newFileName = `main-${count}.${extension}`;
    while (files[newFileName]) {
      count++;
      newFileName = `main-${count}.${extension}`;
    }
    setFiles(prevFiles => ({
      ...prevFiles,
      [newFileName]: { code: defaultCodeMap[selectedLanguage], language: selectedLanguage },
    }));
    setActiveFile(newFileName);
  }, [selectedLanguage, files]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(files[activeFile]?.code || '');
  }, [files, activeFile]);

  const handleReset = useCallback(() => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [activeFile]: {
        ...prevFiles[activeFile],
        code: defaultCodeMap[prevFiles[activeFile].language],
      },
    }));
  }, [activeFile]);

  const editorLayout = useMemo(() => (
    <div className="flex-1 p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 min-h-0">
      <div className="col-span-1 lg:col-span-2 flex flex-col min-h-0">
        <CodeEditorBox
          activeLanguage={files[activeFile]?.language || 'cpp'}
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          onChange={(value) => setFiles(prev => ({
            ...prev,
            [activeFile]: { ...prev[activeFile], code: value ?? '' },
          }))}
          theme={theme}
          fontSize={fontSize}
          showMinimap={showMinimap}
          wordWrap={wordWrap}
          lineNumbers={lineNumbers}
          onAddFile={handleAddFile}
        />
      </div>
      <div className="col-span-1 flex flex-col lg:grid lg:grid-rows-2 gap-3 sm:gap-6 min-h-0">
        <div className="flex-1 min-h-0 h-64 sm:h-auto">
          <InputBox input={input} onChange={setInput} />
        </div>
        <div className="flex-1 min-h-0 h-64 sm:h-auto">
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
  ), [files, activeFile, input, output, isCompiling, error, theme, fontSize, showMinimap, wordWrap, lineNumbers, handleAddFile]);

  return (
    <div className="h-screen flex flex-col bg-[#060111] overflow-hidden">
      <Navbar
        handleCopy={handleCopy}
        handleReset={handleReset}
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showMinimap={showMinimap}
        setShowMinimap={setShowMinimap}
        wordWrap={wordWrap}
        setWordWrap={setWordWrap}
        lineNumbers={lineNumbers}
        setLineNumbers={setLineNumbers}
      />
      <RunBar
        activeLanguage={files[activeFile]?.language || 'cpp'}
        selectedLanguage={selectedLanguage}
        onLanguageChange={(value) => handleChangeActiveFileLanguage(value as LanguageKey)}
        onCompile={handleCompile}
        isCompiling={isCompiling}
      />
      {editorLayout}
    </div>
  );
};

export default CodeEditorPage;