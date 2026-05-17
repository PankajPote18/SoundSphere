import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ThumbsDown, Share2, Video } from 'lucide-react';
import MovieRow from '../components/MovieRow';

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/movies/${id}`);
        if (!response.ok) {
           throw new Error("Movie not found");
        }
        const data = await response.json();
        
        setMovie(data);
        setRelated(data.related || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-bg-dark text-white flex items-center justify-center text-xl">Loading...</div>;
  if (!movie) return <div className="min-h-screen bg-bg-dark text-white flex items-center justify-center text-xl">Movie not found</div>;

  return (
    <div className="min-h-screen bg-[#0f1115]">
      {/* Cinematic Hero */}
      <div className="relative w-full h-[90vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Enhanced Gradient overlays for darker blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/90 to-transparent w-full md:w-3/4 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 pt-32 px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-32">
          <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
            
            {/* Left Column: Title, Meta, Actions */}
            <div className="flex flex-col w-full md:w-[55%] shrink-0">
              {/* Badges */}
              <div className="flex items-center space-x-3 mb-4 text-sm font-medium">
                {movie.isNew && (
                  <span className="bg-[#00A8E1] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                    New Release
                  </span>
                )}
                {movie.isTrending && (
                  <span className="text-[#00A8E1] font-bold flex items-center bg-[#00A8E1]/10 px-2.5 py-1 rounded border border-[#00A8E1]/20">
                    <span className="mr-1">↗</span> Trending #9
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-xl tracking-wide">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center space-x-3 text-sm md:text-base text-gray-300 mb-8 font-medium">
                <span className="text-green-400 font-semibold border border-green-400/30 px-2 py-0.5 rounded">{movie.ageRating || 'U/A 13+'}</span>
                <span>{movie.year}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                <span>{movie.duration}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                <span className="flex items-center space-x-2">
                  {movie.genres.map((genre, idx) => (
                    <span key={idx} className="flex items-center">
                      {idx > 0 && <span className="mx-2 text-gray-500">•</span>}
                      {genre}
                    </span>
                  ))}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-row items-center space-x-4">
                <button className="flex-1 max-w-[200px] flex items-center justify-center px-6 py-4 bg-[#00A8E1] text-white font-bold rounded-lg hover:bg-[#008bc0] transition text-lg shadow-[0_0_20px_rgba(0,168,225,0.4)] hover:scale-105 transform duration-200">
                  <Play size={24} fill="currentColor" className="mr-2" />
                  Watch Now
                </button>
                <button className="flex-1 max-w-[200px] flex items-center justify-center px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition text-lg shadow-lg hover:scale-105 transform duration-200">
                  <Plus size={24} className="mr-2" />
                  Watchlist
                </button>
              </div>
            </div>
            
            {/* Right Column: Description & Cast */}
            <div className="flex flex-col w-full md:w-[40%] bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5">
              <h3 className="text-white text-lg font-bold mb-3 border-b border-white/10 pb-2">About this movie</h3>
              <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed font-medium">
                {movie.description}
              </p>
              
              <div className="flex flex-col space-y-3">
                <div className="text-sm">
                  <span className="text-gray-400 mr-3 font-medium">Cast:</span>
                  <span className="text-gray-200">{movie.cast.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="px-2 py-1 border border-gray-600 rounded text-[10px] text-gray-400 font-bold bg-black/50">CC</span>
                  <span className="px-2 py-1 border border-gray-600 rounded text-[10px] text-gray-400 font-bold bg-black/50">AD</span>
                  <span className="px-2 py-1 border border-gray-600 rounded text-[10px] text-gray-400 font-bold bg-black/50">4K UHD</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
