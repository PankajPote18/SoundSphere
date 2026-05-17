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
        const response = await fetch(`http://localhost:8000/api/movies`);
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
    <div className="min-h-screen pt-24 px-6 md:px-12 pb-20">
      
      {/* Search Input Area */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center bg-transparent border border-gray-600 rounded-full px-4 py-3 focus-within:border-[#00A8E1] transition-colors">
          <div className="text-[#00A8E1] mr-3">
            <Search size={24} />
          </div>
          <input 
            type="text"
            placeholder="Search audio or video..."
            className="w-full bg-transparent text-white text-lg outline-none placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-xl font-bold mb-6">Searches</h2>
        
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMovies.map(movie => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <h3 className="text-white font-bold text-sm truncate w-full">{movie.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchPage;
