import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [audios, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Using existing audio endpoint for now, fetching everything and filtering locally
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/audios`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching audios for search:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = query 
    ? audios.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    : audios.slice(0, 24); // Show some defaults initially

  return (
    <div className="w-full bg-bg-dark pt-16 md:pt-24 px-4 md:px-12 pb-16 min-h-[calc(100vh-80px)]">
      
      <div className="max-w-7xl mx-auto">
        {/* Search Input Area */}
        <div className="max-w-4xl mb-8 md:mb-12 mt-2 md:mt-0">
          <div className="flex items-center bg-[#0A0A0A] border border-[#FF6B00]/20 focus-within:border-[#FF6B00]/80 focus-within:shadow-[0_0_20px_rgba(255,107,0,0.3)] focus-within:bg-[#0A0A0A] rounded-full px-5 py-3.5 transition-all duration-300">
            <div className="text-[#FF6B00] mr-3.5">
              <Search size={22} />
            </div>
            <input 
              type="text"
              placeholder="Search songs, podcasts, albums..."
              className="w-full bg-transparent text-white text-lg outline-none placeholder-gray-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        {/* Results / Recommended Grid */}
        <div>
          <h2 className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-6">
            {query ? 'Search Results' : 'Recommended'}
          </h2>
          
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((audio) => (
                <Link to={`/audio/${audio.id}`} key={audio.id} className="flex flex-col group cursor-pointer">
                  {/* Audio Aspect Card (Square) */}
                  <div className="aspect-square bg-[#0A0A0A] rounded-xl border border-[#FF6B00]/10 relative overflow-hidden flex flex-col items-center justify-center mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:border-[#FF6B00]/50 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.9),0_0_20px_rgba(255,107,0,0.4)]">
                    <img 
                      src={audio.bannerImage || audio.coverImage} 
                      alt={audio.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=640&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent z-10"></div>
                  </div>
                  
                  {/* Title and Subtitle */}
                  <h3 className="text-white font-bold text-sm truncate group-hover:text-[#FF6B00] transition-colors">{audio.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{audio.director || 'Various Artists'} • {audio.duration || '3:45'}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SearchPage;
