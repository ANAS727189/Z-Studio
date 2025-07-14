import { useEffect, useState, useCallback } from 'react'

  const RANDOM_CAT_API_KEY = "live_4z2oJ8qXZ8pVimHOlrHaF4CghzdnwBPqJtoxSk7iPTpVXT9w7UKfrqeSEWb06zaW";
  const API_URI = "https://api.thecatapi.com/v1/images/search";

const Navbar = () => {
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [RANDOM_CAT_API_KEY, API_URI]);

  useEffect(() => {
    getRandomImage();
  }, [getRandomImage]);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
            ) : imageUri && !error ? (
              <img 
                src={imageUri} 
                alt="Z Studio Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                onError={() => setError('Failed to load image')}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xs font-bold">Z</span>
              </div>
            )}
            <h1 className="text-2xl font-bold tracking-tight">Z Studio</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-75">Online Code Editor</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar