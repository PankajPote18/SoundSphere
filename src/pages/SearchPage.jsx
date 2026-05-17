import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Using existing movie endpoint for now, fetching everything and filtering locally
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/movies`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies for search:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = query 
    ? movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    : movies.slice(0, 24); // Show some defaults initially

  return (
    <div className="w-full min-h-screen bg-[#0f1115] pt-24 px-4 md:px-12 pb-20">
      
      <div className="max-w-7xl mx-auto">
        {/* Search Input Area */}
        <div className="max-w-4xl mb-12">
          <div className="flex items-center bg-[#1a1d24] rounded-xl px-4 py-3 border-none">
            <div className="text-gray-500 mr-3">
              <Search size={22} />
            </div>
            <input 
              type="text"
              placeholder="Search audio or video..."
              className="w-full bg-transparent text-white text-lg outline-none placeholder-gray-600"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        {/* Trending Now Row */}
        {!query && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-400 font-bold tracking-widest text-sm uppercase">Trending Now</h2>
              <button className="text-teal-400 text-sm font-semibold hover:text-teal-300 transition">See all</button>
            </div>
            
            {/* Horizontal Scroll Row for Trending */}
            <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
              {[
                { title: 'Street Session', sub: 'Video • 18 min', color: 'border-purple-500' },
                { title: 'Lo-fi Evening', sub: 'Music • 1 hr 12 min', color: 'border-orange-500' },
                { title: 'City Time Lapse', sub: 'Video • 6 min', color: 'border-blue-500' },
                { title: 'Live: Morning', sub: 'Radio • On air now', color: 'border-teal-500' },
                { title: 'Tech Podcast', sub: 'Audio • 45 min', color: 'border-red-500' },
              ].map((item, idx) => (
                <div key={idx} className="shrink-0 w-36 sm:w-44 flex flex-col group cursor-pointer">
                  {/* Square Card */}
                  <div className="aspect-square bg-[#111827] rounded-2xl border border-gray-800 relative overflow-hidden flex flex-col items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                       <div className={`absolute top-0 right-0 w-full h-full border ${item.color} rounded-full scale-150`}></div>
                    </div>
                    
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${item.color}`}>
                      <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-current rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title and Subtitle */}
                  <h3 className="text-white font-bold text-sm truncate">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results / Recommended Grid */}
        <div>
          <h2 className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-6">
            {query ? 'Search Results' : 'Recommended'}
          </h2>
          
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie, idx) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="flex flex-col group cursor-pointer">
                  {/* Square Card */}
                  <div className="aspect-square bg-[#111827] rounded-2xl border border-gray-800 relative overflow-hidden flex flex-col items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                    
                    {/* Render poster image if we want it, or keep the circular design. The user requested white color boxes in reference to the grid. 
                        Let's render the poster image with rounded corners to match standard movies. */}
                    <img src={movie.posterUrl} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                  </div>
                  
                  {/* Title and Subtitle */}
                  <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{movie.year} • Video</p>
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
