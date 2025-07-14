import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Editor from "@monaco-editor/react"

interface CodeEditorBoxProps {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
  theme?: string;
}

const CodeEditorBox: React.FC<CodeEditorBoxProps> = ({ language, code, onChange, theme = 'vs-dark' }) => {
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const langMap = useMemo(() => ({
    'cpp': 'cpp',
    'c': 'c',
    'zmm': 'javascript',
    'java': 'java',
    'python': 'python',
    'javascript': 'javascript',
    'rust': 'rust',
    'go': 'go'
  }), []);

  const defaultCodeMap = useMemo(() => ({
    'cpp': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    'c': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    'zmm': 'start\nfun main{\n  print("Hello, World!")\n}end\n',
    'java': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    'python': 'print("Hello, World!")',
    'javascript': 'console.log("Hello, World!");',
    'rust': 'fn main() {\n    println!("Hello, World!");\n}',
    'go': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}'
  }), []);

  const getMonacoLanguage = useCallback((lang: string): string => {
    return langMap[lang as keyof typeof langMap] || 'javascript';
  }, [langMap]);

  const getDefaultCode = useCallback((lang: string): string => {
    return defaultCodeMap[lang as keyof typeof defaultCodeMap] || defaultCodeMap['javascript'];
  }, [defaultCodeMap]);

  // Set default code only when language changes and code is empty
  useEffect(() => {
    if (!code) {
      onChange(getDefaultCode(language));
    }
  }, [language, code, onChange, getDefaultCode]);

  const handleEditorDidMount = useCallback((): void => {
    try {
      setIsEditorReady(true);
      setEditorError(null);
    } catch (error) {
      setEditorError('Editor failed to initialize');
      console.error('Monaco Editor error:', error);
    }
  }, []);

  const handleEditorChange = useCallback((value: string | undefined): void => {
    try {
      onChange(value);
    } catch (error) {
      console.error('Editor change error:', error);
    }
  }, [onChange]);

  const editorOptions = useMemo(() => ({
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: 'on' as const,
    lineNumbers: 'on' as const,
    glyphMargin: true,
    folding: true,
    lineNumbersMinChars: 3,
    scrollbar: {
      vertical: 'auto' as const,
      horizontal: 'auto' as const
    },
    quickSuggestions: true,
    parameterHints: { enabled: false },
    suggestOnTriggerCharacters: false,
    acceptSuggestionOnEnter: 'off' as const,
    tabCompletion: 'on' as const,
    wordBasedSuggestions: 'off' as const
  }), []);

  if (editorError) {
    return (
      <div className="flex-1 h-auto bg-gray-900 rounded-lg overflow-auto">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Code Editor</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">{language.toUpperCase()}</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-400 mb-2">Editor failed to load</p>
            <p className="text-gray-400 text-sm">Please refresh the page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Code Editor</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">{language.toUpperCase()}</span>
          {!isEditorReady && (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>
      <Editor
        height="100%"
        language={getMonacoLanguage(language)}
        theme={theme}
        value={code || getDefaultCode(language)}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-400 text-sm">Loading editor...</p>
            </div>
          </div>
        }
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditorBox