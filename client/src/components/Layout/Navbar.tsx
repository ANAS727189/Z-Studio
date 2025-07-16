import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCcw, Settings, User, Copy, RotateCcw, Grid3x3, WrapText, FileText, Type, Palette, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const RANDOM_CAT_API_KEY = import.meta.env.VITE_RANDOM_CAT_API;
const API_URI = import.meta.env.VITE_RANDOM_CAT_API_URI;

interface NavbarProps {
  handleCopy: () => void;
  handleReset: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  showMinimap: boolean;
  setShowMinimap: (value: boolean) => void;
  wordWrap: boolean;
  setWordWrap: (value: boolean) => void;
  lineNumbers: boolean;
  setLineNumbers: (value: boolean) => void;
}

const Navbar = ({
  handleCopy,
  handleReset,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  showMinimap,
  setShowMinimap,
  wordWrap,
  setWordWrap,
  lineNumbers,
  setLineNumbers
}: NavbarProps) => {
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const getRandomImage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${API_URI}`, {
        headers: {
          'x-api-key': RANDOM_CAT_API_KEY
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setImageUri(data[0]?.url || "");
    } catch (err) {
      console.log(`Error in fetching cat image logo: `, err);
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRandomImage();
  }, [getRandomImage]);

  const themeOptions = [
    { value: 'dracula', label: 'Dracula', bg: '#282a36' },
    { value: 'vs-dark', label: 'Dark', bg: '#1e1e1e' },
    { value: 'vs-light', label: 'Light', bg: '#ffffff' },
    { value: 'hc-black', label: 'High Contrast', bg: '#000000' },
    { value: 'monokai', label: 'Monokai', bg: '#272822' },
    { value: 'solarized-dark', label: 'Solarized Dark', bg: '#002b36' },
    { value: 'solarized-light', label: 'Solarized Light', bg: '#fdf6e3' },
    { value: 'github-dark', label: 'GitHub Dark', bg: '#0d1117' },
    { value: 'github-light', label: 'GitHub Light', bg: '#ffffff' },
    { value: 'night-owl', label: 'Night Owl', bg: '#011627' }
  ];

  return (
    <nav className="bg-[#0f0f17] border-b border-[#1a1a24] px-4 py-2 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:bg-[#1a1a24] px-3 py-2 rounded-lg transition-colors duration-200 group"
            >
              <div className="relative">
                {isLoading ? (
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a24] flex items-center justify-center">
                    <RefreshCcw className="w-4 h-4 text-purple-400 animate-spin" />
                  </div>
                ) : imageUri && !error ? (
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#2a2a34] group-hover:border-purple-400/50 transition-colors">
                    <img 
                      src={imageUri} 
                      alt="Z Studio Logo" 
                      className="w-full h-full object-cover"
                      onError={() => setError('Failed to load image')}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    {error ? (
                      <AlertCircle className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white font-bold text-sm">Z</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold text-lg leading-tight" style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}>
                  Z Studio
                </span>
                <span className="text-purple-400 text-xs font-medium">
                  Code Editor
                </span>
              </div>
            </button>
          </div>
          <div>
            <span 
            className='text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer'
            onClick={() => navigate('/docs')}>Docs</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-[#1a1a24] rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-gray-400">Ready</span>
          </div>
          <div className="relative">
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a24] rounded-lg transition-colors"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="w-4 h-4 cursor-pointer" />
            </button>
            {isSettingsOpen && (
              <div className="absolute right-0 top-10 bg-[#1a1a24] border border-[#2a2a34] rounded-lg shadow-xl z-20 w-64 md:w-[480px] p-4">
                {/* Mobile Layout (Single Column) */}
                <div className="md:hidden">
                  {/* Actions */}
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-500 mb-2">Actions</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleCopy();
                        setIsSettingsOpen(false);
                      }}
                      className="w-full justify-start text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]"
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      Copy Code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleReset();
                        setIsSettingsOpen(false);
                      }}
                      className="w-full justify-start text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]"
                    >
                      <RotateCcw className="w-3 h-3 mr-2" />
                      Reset Code
                    </Button>
                  </div>

                  {/* View Options */}
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-500 mb-2">View</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMinimap(!showMinimap)}
                      className={`w-full justify-start text-xs ${showMinimap ? 'text-purple-400 bg-[#2a2a34]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]'}`}
                    >
                      <Grid3x3 className="w-3 h-3 mr-2" />
                      Minimap {showMinimap ? 'On' : 'Off'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWordWrap(!wordWrap)}
                      className={`w-full justify-start text-xs ${wordWrap ? 'text-purple-400 bg-[#2a2a34]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]'}`}
                    >
                      <WrapText className="w-3 h-3 mr-2" />
                      Word Wrap {wordWrap ? 'On' : 'Off'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLineNumbers(!lineNumbers)}
                      className={`w-full justify-start text-xs ${lineNumbers ? 'text-purple-400 bg-[#2a2a34]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]'}`}
                    >
                      <FileText className="w-3 h-3 mr-2" />
                      Line Numbers {lineNumbers ? 'On' : 'Off'}
                    </Button>
                  </div>

                  {/* Font Size */}
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-500 mb-2">Font Size</h4>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-[#2a2a34] rounded-md">
                      <Type className="w-3 h-3 text-gray-400" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                        className="h-6 w-6 p-0 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#3a3a44]"
                      >
                        -
                      </Button>
                      <span className="text-xs text-gray-400 w-8 text-center font-mono">{fontSize}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                        className="h-6 w-6 p-0 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#3a3a44]"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div>
                    <h4 className="text-xs text-gray-500 mb-2">Theme</h4>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]"
                      >
                        <Palette className="w-3 h-3 mr-2" />
                        {themeOptions.find(opt => opt.value === theme)?.label || 'Select Theme'}
                        <ChevronDown className="w-3 h-3 ml-auto" />
                      </Button>
                      <div className="mt-1 max-h-40 overflow-y-auto bg-[#2a2a34] rounded-lg">
                        {themeOptions.map((themeOption) => (
                          <button
                            key={themeOption.value}
                            onClick={() => {
                              setTheme(themeOption.value);
                              setIsSettingsOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-[#3a3a44] transition-colors ${
                              theme === themeOption.value ? 'text-purple-400 bg-[#3a3a44]' : 'text-gray-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-4 h-4 rounded border border-gray-600" 
                                  style={{ backgroundColor: themeOption.bg }}
                                ></div>
                                <span>{themeOption.label}</span>
                              </div>
                              {theme === themeOption.value && (
                                <CheckCircle2 className="w-3 h-3 text-purple-400" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout (Two Columns) */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Actions */}
                      <div>
                        <h4 className="text-xs text-gray-500 mb-3 font-medium">Actions</h4>
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleCopy();
                              setIsSettingsOpen(false);
                            }}
                            className="w-full justify-start text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34] h-8"
                          >
                            <Copy className="w-3 h-3 mr-2" />
                            Copy Code
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleReset();
                              setIsSettingsOpen(false);
                            }}
                            className="w-full justify-start text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34] h-8"
                          >
                            <RotateCcw className="w-3 h-3 mr-2" />
                            Reset Code
                          </Button>
                        </div>
                      </div>

                      {/* View Options */}
                      <div>
                        <h4 className="text-xs text-gray-500 mb-3 font-medium">View Options</h4>
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowMinimap(!showMinimap)}
                            className={`w-full justify-start text-xs h-8 ${showMinimap ? 'text-purple-400 bg-[#2a2a34]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]'}`}
                          >
                            <Grid3x3 className="w-3 h-3 mr-2" />
                            Minimap {showMinimap ? 'On' : 'Off'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setWordWrap(!wordWrap)}
                            className={`w-full justify-start text-xs h-8 ${wordWrap ? 'text-purple-400 bg-[#2a2a34]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]'}`}
                          >
                            <WrapText className="w-3 h-3 mr-2" />
                            Word Wrap {wordWrap ? 'On' : 'Off'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLineNumbers(!lineNumbers)}
                            className={`w-full justify-start text-xs h-8 ${lineNumbers ? 'text-purple-400 bg-[#2a2a34]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34]'}`}
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            Line Numbers {lineNumbers ? 'On' : 'Off'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Font Size */}
                      <div>
                        <h4 className="text-xs text-gray-500 mb-3 font-medium">Font Size</h4>
                        <div className="flex items-center space-x-2 px-3 py-2 bg-[#2a2a34] rounded-md">
                          <Type className="w-3 h-3 text-gray-400" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                            className="h-6 w-6 p-0 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#3a3a44]"
                          >
                            -
                          </Button>
                          <span className="text-xs text-gray-400 w-8 text-center font-mono">{fontSize}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                            className="h-6 w-6 p-0 text-xs text-gray-400 hover:text-gray-200 hover:bg-[#3a3a44]"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Theme Selection */}
                      <div>
                        <h4 className="text-xs text-gray-500 mb-3 font-medium">Theme</h4>
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs text-gray-400 hover:text-gray-200 hover:bg-[#2a2a34] h-8"
                          >
                            <Palette className="w-3 h-3 mr-2" />
                            {themeOptions.find(opt => opt.value === theme)?.label || 'Select Theme'}
                            <ChevronDown className="w-3 h-3 ml-auto" />
                          </Button>
                          <div className="mt-1 max-h-48 overflow-y-auto bg-[#2a2a34] rounded-lg">
                            {themeOptions.map((themeOption) => (
                              <button
                                key={themeOption.value}
                                onClick={() => {
                                  setTheme(themeOption.value);
                                  setIsSettingsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs hover:bg-[#3a3a44] transition-colors ${
                                  theme === themeOption.value ? 'text-purple-400 bg-[#3a3a44]' : 'text-gray-400'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div 
                                      className="w-4 h-4 rounded border border-gray-600" 
                                      style={{ backgroundColor: themeOption.bg }}
                                    ></div>
                                    <span>{themeOption.label}</span>
                                  </div>
                                  {theme === themeOption.value && (
                                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-[#1a1a24] rounded-lg hover:bg-[#2a2a34] transition-colors cursor-pointer">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 hidden sm:inline">Guest</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;