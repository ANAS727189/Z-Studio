import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Editor from "@monaco-editor/react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { 
  AlertCircle, 
  Code2, 
  Loader2, 
  Maximize2, 
  Minimize2,
  Copy,
  RotateCcw,
  FileText,
  Palette,
  Type,
  Grid3x3,
  WrapText,
} from "lucide-react"
import draculaTheme from "../../themes/dracula.json";

interface CodeEditorBoxProps {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
  theme?: string;
}

const CodeEditorBox: React.FC<CodeEditorBoxProps> = ({ 
  language, 
  code, 
  onChange, 
  theme = 'dracula' 
}) => {
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showMinimap, setShowMinimap] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [showSettings, setShowSettings] = useState(false);

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

  const languageLabels = useMemo(() => ({
    'cpp': 'C++',
    'c': 'C',
    'zmm': 'Z--',
    'java': 'Java',
    'python': 'Python',
    'javascript': 'JavaScript',
    'rust': 'Rust',
    'go': 'Go'
  }), []);

  const themeOptions = useMemo(() => [
  { value: 'dracula', label: 'Dracula', bg: '#282a36' },
  { value: 'vs-dark', label: 'Dark', bg: '#1e1e1e' },
  { value: 'vs-light', label: 'Light', bg: '#ffffff' },
  { value: 'hc-black', label: 'High Contrast', bg: '#000000' },
  { value: 'monokai', label: 'Monokai', bg: '#272822' },
  { value: 'solarized-dark', label: 'Solarized Dark', bg: '#002b36' },
  { value: 'solarized-light', label: 'Solarized Light', bg: '#fdf6e3' },
  { value: 'github-dark', label: 'GitHub Dark', bg: '#0d1117' },
  { value: 'github-light', label: 'GitHub Light', bg: '#ffffff' },
  { value: 'one-dark', label: 'One Dark', bg: '#282c34' },
  { value: 'tokyo-night-dark', label: 'Tokyo Night Dark', bg: '#1a1b26' },
  { value: 'tokyo-night-light', label: 'Tokyo Night Light', bg: '#d5d6db' },
], []);


  const getMonacoLanguage = useCallback((lang: string): string => {
    return langMap[lang as keyof typeof langMap] || 'javascript';
  }, [langMap]);

  const getDefaultCode = useCallback((lang: string): string => {
    return defaultCodeMap[lang as keyof typeof defaultCodeMap] || defaultCodeMap['javascript'];
  }, [defaultCodeMap]);


  useEffect(() => {
    if (!code) {
      const defaultCode = getDefaultCode(language);
      onChange(defaultCode);
    }
  }, [language, code, onChange, getDefaultCode]);

  const handleEditorDidMount = useCallback((editor, monaco): void => {
    try {
      monaco.editor.defineTheme('dracula', draculaTheme);
      monaco.editor.setTheme(currentTheme); 
      setIsEditorReady(true);
      setEditorError(null);
      
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        console.log('Save shortcut pressed');
      });
    } catch (error) {
      setEditorError('Editor failed to initialize');
      console.error('Monaco Editor error:', error);
    }
  }, [currentTheme]);

  const handleEditorChange = useCallback((value: string | undefined): void => {
    try {
      onChange(value);
    } catch (error) {
      console.error('Editor change error:', error);
    }
  }, [onChange]);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code || '');
  }, [code]);

  const handleResetCode = useCallback(() => {
    const defaultCode = getDefaultCode(language);
    onChange(defaultCode);
  }, [language, onChange, getDefaultCode]);

  const handleThemeChange = useCallback((newTheme: string) => {
    setCurrentTheme(newTheme);
  }, []);

  const editorOptions = useMemo(() => ({
    fontSize: fontSize,
    minimap: { enabled: showMinimap },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: wordWrap ? 'on' as const : 'off' as const,
    lineNumbers: lineNumbers ? 'on' as const : 'off' as const,
    glyphMargin: true,
    folding: true,
    lineNumbersMinChars: 3,
    scrollbar: {
      vertical: 'auto' as const,
      horizontal: 'auto' as const,
      useShadows: false,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    quickSuggestions: true,
    parameterHints: { enabled: true },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on' as const,
    tabCompletion: 'on' as const,
    wordBasedSuggestions: 'currentDocument' as const,
    theme: currentTheme,
    padding: { top: 16, bottom: 16 },
    cursorBlinking: 'smooth' as const,
    cursorSmoothCaretAnimation: 'on' as const,
    smoothScrolling: true,
    contextmenu: true,
    mouseWheelZoom: true,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    },
    renderWhitespace: 'selection' as const,
    renderControlCharacters: true,
    fontLigatures: true,
    fontFamily: 'JetBrains Mono, Fira Code, Consolas, "Courier New", monospace'
  }), [fontSize, showMinimap, wordWrap, lineNumbers, currentTheme]);

  if (editorError) {
    return (
      <Card className={`h-full bg-[#0a0a0f] border-[#1a1a24] shadow-2xl ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        <CardHeader className="bg-[#0f0f17] border-b border-[#1a1a24] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-gray-100">Code Editor</h3>
            </div>
            <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
              {languageLabels[language as keyof typeof languageLabels] || language.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2 font-medium">Editor failed to load</p>
            <p className="text-gray-400 text-sm">Please refresh the page</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`h-full bg-[#0a0a0f] border-[#1a1a24] shadow-2xl overflow-hidden transition-all duration-200 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Enhanced Header */}
      <CardHeader className="bg-gradient-to-r from-[#0f0f17] to-[#1a1a24] border-b border-[#1a1a24] pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-gray-100">Code Editor</h3>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-400/30 font-mono text-xs">
              {languageLabels[language as keyof typeof languageLabels] || language.toUpperCase()}
            </Badge>
            {!isEditorReady && (
              <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
            )}
          </div>
        </div>
        
        {/* Toolbar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyCode}
              className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#1a1a24]"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetCode}
              className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#1a1a24]"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
            
            <div className="w-px h-4 bg-[#1a1a24]"></div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowMinimap(!showMinimap)}
              className={`h-7 px-2 text-xs hover:bg-[#1a1a24] ${showMinimap ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Grid3x3 className="w-3 h-3 mr-1" />
              Map
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setWordWrap(!wordWrap)}
              className={`h-7 px-2 text-xs hover:bg-[#1a1a24] ${wordWrap ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <WrapText className="w-3 h-3 mr-1" />
              Wrap
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLineNumbers(!lineNumbers)}
              className={`h-7 px-2 text-xs hover:bg-[#1a1a24] ${lineNumbers ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <FileText className="w-3 h-3 mr-1" />
              Lines
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-1 px-2 py-1 bg-[#1a1a24] rounded">
              <Type className="w-3 h-3 text-gray-400" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                className="h-5 w-5 p-0 text-xs text-gray-400 hover:text-gray-200"
              >
                -
              </Button>
              <span className="text-xs text-gray-400 w-6 text-center">{fontSize}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="h-5 w-5 p-0 text-xs text-gray-400 hover:text-gray-200"
              >
                +
              </Button>
            </div>
            
            {/* Theme Selector */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSettings(!showSettings)}
                className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#1a1a24]"
              >
                <Palette className="w-3 h-3 mr-1" />
                Theme
              </Button>
              
              {showSettings && (
                <div className="absolute right-0 top-8 bg-[#1a1a24] border border-[#2a2a34] rounded-md shadow-lg z-10 min-w-[120px]">
                  {themeOptions.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      onClick={() => {
                        handleThemeChange(themeOption.value);
                        setShowSettings(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-[#2a2a34] ${
                        currentTheme === themeOption.value ? 'text-purple-400' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded border border-gray-600" 
                          style={{ backgroundColor: themeOption.bg }}
                        ></div>
                        <span>{themeOption.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#1a1a24]"
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-full relative">
        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0f0f17] border-t border-[#1a1a24] px-3 py-1 z-10">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Ln 1, Col 1</span>
              <span>UTF-8</span>
              <span>{getMonacoLanguage(language).toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Spaces: 2</span>
              <span className="text-green-400">●</span>
            </div>
          </div>
        </div>
        
        <div className="h-full pb-6">
          <Editor
            height="100%"
            language={getMonacoLanguage(language)}
            theme={currentTheme}
            value={code || getDefaultCode(language)}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            loading={
              <div className="flex items-center justify-center h-full bg-[#0a0a0f]">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Loading editor...</p>
                </div>
              </div>
            }
            options={editorOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorBox;