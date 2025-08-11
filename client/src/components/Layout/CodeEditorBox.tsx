import React, { useState, useCallback, useMemo } from 'react';
import Editor from "@monaco-editor/react";
import type {OnMount} from "@monaco-editor/react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { editor as MonacoEditor } from 'monaco-editor';
import { 
  AlertCircle, 
  Code2, 
  Loader2, 
  Maximize2, 
  Minimize2,
  FileText,
  FolderOpen,
  Zap,
  Activity,
  CheckCircle2,
  X
} from "lucide-react";
import {
  draculaTheme,
  githubDarkTheme,
  githubLightTheme,
  solarizedDarkTheme,
  solarizedLightTheme,
  monokaiTheme,
  nightOwlTheme
} from '../../themes/page';

interface CodeEditorBoxProps {
  activeLanguage: string;
  files: { [fileName: string]: { code: string; language: string; isSaved: boolean } };
  activeFile: string;
  setActiveFile: (file: string) => void;
  onChange: (value: string | undefined) => void;
  theme: string;
  fontSize: number;
  showMinimap: boolean;
  wordWrap: boolean;
  lineNumbers: boolean;
  onAddFile: () => void;
  onSave: () => void;
  isAutoSave: boolean;
  onCloseFile: (fileName: string) => void;
  onRenameFile: (oldName: string, newName: string) => void;
}

const CodeEditorBox: React.FC<CodeEditorBoxProps> = ({ 
  activeLanguage, 
  files, 
  activeFile, 
  setActiveFile, 
  onChange, 
  theme,
  fontSize,
  showMinimap,
  wordWrap,
  lineNumbers,
  onAddFile,
  onSave,
  onCloseFile,
  onRenameFile
}) => {
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const langMap = useMemo(() => ({
    'cpp': 'cpp',
    'c': 'c',
    'zmm': 'z--',
    'java': 'java',
    'python': 'python',
    'javascript': 'javascript',
    'rust': 'rust',
    'go': 'go'
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

  const getMonacoLanguage = useCallback((lang: string): string => {
    return langMap[lang as keyof typeof langMap] || 'javascript';
  }, [langMap]);

  const handleEditorDidMount: OnMount = useCallback(
    (editor, monaco): void => {
      try {
        monaco.languages.register({ id: 'z--' });
        monaco.languages.setMonarchTokensProvider('z--', {
          tokenizer: {
            root: [
              [/(start|end|let)/, 'keyword'],
            ],
          },
        });

        
        monaco.editor.defineTheme('dracula', draculaTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.defineTheme('github-dark', githubDarkTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.defineTheme('github-light', githubLightTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.defineTheme('solarized-dark', solarizedDarkTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.defineTheme('solarized-light', solarizedLightTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.defineTheme('monokai', monokaiTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.defineTheme('night-owl', nightOwlTheme as MonacoEditor.IStandaloneThemeData);
        monaco.editor.setTheme(theme);

        setIsEditorReady(true);
        setEditorError(null);

        editor.onDidChangeCursorPosition((e) => {
          setCurrentLine(e.position.lineNumber);
          setCurrentColumn(e.position.column);
        });

        editor.addCommand(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
          () => {
            console.log('Save shortcut pressed');
            onSave();
          }
        );
      } catch (error) {
        console.error('Monaco Editor error:', error);
        setEditorError('Editor failed to initialize');
      }
    },
    [theme, onSave]
  );

  const handleStartRename = (file: string) => {
    setRenamingFile(file);
    setRenameValue(file);
  };

  const handleFinishRename = (oldName: string) => {
    onRenameFile(oldName, renameValue);
    setRenamingFile(null);
  };

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
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      verticalSliderSize: 12,
      horizontalSliderSize: 12
    },
    quickSuggestions: true,
    parameterHints: { enabled: true },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on' as const,
    tabCompletion: 'on' as const,
    wordBasedSuggestions: 'currentDocument' as const,
    theme: theme,
    padding: { top: 20, bottom: 20, left: 16, right: 16 },
    cursorBlinking: 'smooth' as const,
    cursorSmoothCaretAnimation: 'on' as const,
    smoothScrolling: true,
    contextmenu: true,
    mouseWheelZoom: true,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true,
      highlightActiveIndentation: true
    },
    renderWhitespace: 'selection' as const,
    renderControlCharacters: true,
    fontLigatures: true,
    fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, "Roboto Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    matchBrackets: 'always' as const,
    autoClosingBrackets: 'always' as const,
    autoClosingQuotes: 'always' as const,
    autoSurround: 'languageDefined' as const,
    codeLens: true,
    colorDecorators: true,
    dragAndDrop: true,
    formatOnPaste: true,
    formatOnType: true,
    hover: { enabled: true },
    links: true,
    occurrencesHighlight: 'singleFile' as const,
    peekWidgetDefaultFocus: 'tree' as const,
    quickSuggestionsDelay: 10,
    renderLineHighlight: 'all' as const,
    rulers: [],
    selectionHighlight: true,
    showFoldingControls: 'always' as const,
    showUnused: true,
    snippetSuggestions: 'top' as const,
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    useTabStops: true,
  }), [fontSize, showMinimap, wordWrap, lineNumbers, theme]);

  if (editorError) {
    return (
      <Card className={`h-full bg-[#0a0a0f] border-[#1a1a24] shadow-2xl ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        <CardHeader className="bg-[#0f0f17] border-b border-[#1a1a24] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-gray-100">Z Studio Editor</h3>
            </div>
            <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
              {languageLabels[activeLanguage as keyof typeof languageLabels] || activeLanguage.toUpperCase()}
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
      <CardHeader className="bg-gradient-to-r from-[#0f0f17] to-[#1a1a24] border-b border-[#1a1a24] pb-0">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-1 sm:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <h3 className="text-sm sm:text-lg font-semibold text-gray-100 tracking-tight">Z Studio Editor</h3>
            </div>
            <div className="flex items-center space-x-1 sm:flex">
              <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-300 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-300 cursor-pointer transition-colors"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-400/30 font-mono text-xs sm:text-sm px-2 sm:px-3 py-1">
              <span className="sm:hidden">{activeLanguage.toUpperCase()}</span>
              <span className="hidden sm:inline">{languageLabels[activeLanguage as keyof typeof languageLabels] || activeLanguage.toUpperCase()}</span>
            </Badge>
            <div className="flex items-center space-x-1 sm:flex">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Ready</span>
            </div>
            {!isEditorReady && (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 animate-spin" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-[#1a1a24] pb-0">
          <div className="flex items-center overflow-x-auto">
            {Object.keys(files).map(file => (
              <div
                key={file}
                className={`flex items-center px-2 sm:px-4 py-2 rounded-t-lg cursor-pointer ${activeFile === file ? 'bg-[#1a1a24] border-b-2 border-purple-500' : 'bg-[#0f0f17] hover:bg-[#141421]'}`}
                onClick={() => setActiveFile(file)}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                {renamingFile === file ? (
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleFinishRename(file);
                      }
                    }}
                    onBlur={() => handleFinishRename(file)}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                    className="bg-transparent border-none outline-none text-xs sm:text-sm text-gray-200 w-auto"
                  />
                ) : (
                  <span 
                    className="text-xs sm:text-sm text-gray-200"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleStartRename(file);
                    }}
                  >
                    {file}
                  </span>
                )}
                {activeFile === file && !files[file].isSaved && <div className="w-2 h-2 bg-purple-400 rounded-full ml-1 sm:ml-2"></div>}
                <X 
                  className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-red-400 ml-1 sm:ml-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseFile(file);
                  }}
                />
              </div>
            ))}
            <div
              className="flex items-center px-2 sm:px-4 py-2 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors"
              onClick={onAddFile}
            >
              <span className="text-2xl">+</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowExplorer(!showExplorer)}
              className={`h-6 sm:h-8 px-2 sm:px-3 text-xs cursor-pointer hover:bg-[#1a1a24] transition-colors ${showExplorer ? 'text-purple-400 bg-[#1a1a24]' : 'text-gray-400 hover:text-gray-200'} hidden sm:flex`}
            >
              <FolderOpen className="w-3 h-3 mr-1" />
              Explorer
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-6 sm:h-8 px-2 sm:px-3 text-xs text-gray-400 cursor-pointer hover:text-gray-200 hover:bg-[#1a1a24] transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full relative">
        <div className="flex h-full">
          {showExplorer && (
            <div className="w-64 bg-[#0f0f17] border-r border-[#1a1a24] p-4 hidden sm:block">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-200">Explorer</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowExplorer(false)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-200"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#1a1a24] cursor-pointer">
                  <FolderOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">src</span>
                </div>
                {Object.keys(files).map(file => (
                  <div
                    key={file}
                    className={`flex items-center space-x-2 p-2 pl-6 rounded ${activeFile === file ? 'bg-[#1a1a24] border-l-2 border-purple-500' : 'hover:bg-[#1a1a24]'} cursor-pointer`}
                    onClick={() => setActiveFile(file)}
                  >
                    <FileText className="w-4 h-4 text-purple-400" />
                    {renamingFile === file ? (
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleFinishRename(file);
                          }
                        }}
                        onBlur={() => handleFinishRename(file)}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                        className="bg-transparent border-none outline-none text-sm text-gray-200 flex-1"
                      />
                    ) : (
                      <span 
                        className="text-sm text-gray-200 flex-1"
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          handleStartRename(file);
                        }}
                      >
                        {file}
                      </span>
                    )}
                    <X 
                      className="w-4 h-4 text-gray-400 hover:text-red-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseFile(file);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getMonacoLanguage(activeLanguage)}
                theme={theme}
                value={files[activeFile]?.code}
                onChange={onChange}
                onMount={handleEditorDidMount}
                loading={
                  <div className="flex items-center justify-center h-full bg-[#0a0a0f]">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
                      <p className="text-gray-400 text-sm">Loading Z Studio Editor...</p>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-500">Powered by Z Studio</span>
                      </div>
                    </div>
                  </div>
                }
                options={editorOptions}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-[#0f0f17] border-t border-[#1a1a24] px-2 sm:px-4 py-2 z-10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span className="text-gray-400">Ready</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-gray-400">Ln {currentLine}, Col {currentColumn}</span>
                <span className="text-gray-400 hidden sm:inline">UTF-8</span>
                <span className="text-purple-400 font-medium">{getMonacoLanguage(activeLanguage).toUpperCase()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <div className="flex items-center space-x-2 sm:space-x-4 sm:flex">
                <span className="text-gray-400">Spaces: 2</span>
                <span className="text-gray-400">Tab Size: 2</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Z Studio</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorBox;