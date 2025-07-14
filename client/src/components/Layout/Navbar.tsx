import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Code2, Zap, AlertCircle } from 'lucide-react'

const RANDOM_CAT_API_KEY = import.meta.env.VITE_RANDOM_CAT_API;
const API_URI = import.meta.env.VITE_RANDOM_CAT_API_URI;

const Navbar = () => {
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    } catch(err) {
      console.log(`Error in fetching cat image logo: `, err);
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRandomImage();
  }, [getRandomImage]);

  return (
    <nav className="bg-gradient-to-r from-[#0a0a0f] via-[#1a1a24] to-[#0a0a0f] border-b border-[#1a1a24] shadow-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Zap className="w-8 h-8 text-purple-400" />
                <div className="absolute inset-0 w-8 h-8 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <h1 
                className="text-2xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
                style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
                onClick={() => navigate('/')}
              >
                Z Studio
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300 font-medium">Online Code Editor</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
                  <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-purple-400/30 animate-spin"></div>
                </div>
              ) : imageUri && !error ? (
                <div className="relative group">
                  <img 
                    src={imageUri} 
                    alt="Z Studio Logo" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-300"
                    onError={() => setError('Failed to load image')}
                  />
                  <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center border-2 border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-300">
                    {error ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <span className="text-xs font-bold text-purple-400">Z</span>
                    )}
                  </div>
                </div>
              )}
              
              <button 
                onClick={getRandomImage}
                className="text-xs text-gray-400 hover:text-purple-400 transition-colors duration-200"
                disabled={isLoading}
                title="Get new cat image"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar