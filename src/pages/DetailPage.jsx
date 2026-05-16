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
    <div className="min-h-screen bg-bg-dark pb-20">
      {/* Cinematic Hero */}
      <div className="relative w-full h-[80vh] md:h-[90vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient overlays for cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent w-full md:w-2/3"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 pt-24 md:pt-32 px-6 md:px-12 flex flex-col justify-center">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {movie.title}
            </h1>

            {/* Top actions (Watch trailer, Watchlist, Like, Not for me, Share) */}
            <div className="flex items-center space-x-6 mb-8 text-gray-300">
               <button className="flex flex-col items-center hover:text-white transition group">
                 <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-1 group-hover:bg-gray-700">
                    <Video size={20} />
                 </div>
                 <span className="text-xs font-medium">Watch trailer</span>
               </button>
               <button className="flex flex-col items-center hover:text-white transition group">
                 <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-1 group-hover:bg-gray-700">
                    <Plus size={20} />
                 </div>
                 <span className="text-xs font-medium">Watchlist</span>
               </button>
               <button className="flex flex-col items-center hover:text-white transition group">
                 <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-1 group-hover:bg-gray-700">
                    <ThumbsUp size={20} />
                 </div>
                 <span className="text-xs font-medium">Like</span>
               </button>
               <button className="flex flex-col items-center hover:text-white transition group">
                 <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-1 group-hover:bg-gray-700">
                    <ThumbsDown size={20} />
                 </div>
                 <span className="text-xs font-medium">Not for me</span>
               </button>
               <button className="flex flex-col items-center hover:text-white transition group">
                 <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mb-1 group-hover:bg-gray-700">
                    <Share2 size={20} />
                 </div>
                 <span className="text-xs font-medium">Share</span>
               </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-12">
              {/* Main Action Buttons */}
              <div className="flex flex-col space-y-3 mb-8 w-full md:w-80 shrink-0">
                <button className="w-full flex items-center justify-center px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition">
                  <Play size={20} fill="currentColor" className="mr-2" />
                  Play
                </button>
                <button className="w-full flex items-center justify-center px-6 py-4 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">
                  Go ad free
                </button>
                <button className="w-full flex items-center justify-center px-6 py-4 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">
                  More ways to watch
                </button>
              </div>
              
              {/* Details Side */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-brand mb-6 text-sm font-semibold">
                  <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center">
                      <span className="text-black text-[10px]">✓</span>
                  </div>
                  <span>Included with Nexora</span>
                </div>

                {/* Badges and Details */}
                <div className="flex items-center space-x-3 mb-4 text-sm font-medium">
                  {movie.isNew && (
                    <span className="bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                      New Movie
                    </span>
                  )}
                  {movie.isTrending && (
                    <span className="text-green-500 font-bold flex items-center">
                      <span className="mr-1">↗</span> #9 in India
                    </span>
                  )}
                </div>

                <p className="text-gray-200 text-base md:text-lg mb-4 line-clamp-4">
                  {movie.description}
                </p>

                <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-400 mb-2">
                  {movie.genres.map((genre, idx) => (
                    <span key={idx} className="flex items-center font-medium text-gray-300">
                      {idx > 0 && <span className="mx-2 text-gray-600">•</span>}
                      {genre}
                    </span>
                  ))}
                  <span className="mx-2 text-gray-600">•</span>
                  <span>{movie.year}</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span>{movie.duration}</span>
                </div>

                <div className="text-sm text-gray-400 mb-4">
                  <span className="mr-2">Cast:</span>
                  <span className="text-gray-200 font-medium">{movie.cast.join(', ')}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-[10px] text-gray-400">A</span>
                  <span className="w-6 h-6 border border-gray-500 rounded flex items-center justify-center text-[10px] text-gray-400">CC</span>
                  <span className="w-8 h-6 border border-gray-500 rounded flex items-center justify-center text-[10px] text-gray-400">AD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-12 mt-4 md:mt-8 border-b border-gray-800">
         <div className="flex space-x-8 text-lg font-medium">
            <button className="pb-4 border-b-2 border-white text-white">Related</button>
            <button className="pb-4 text-gray-400 hover:text-white transition">Details</button>
         </div>
      </div>

      {/* Related Content */}
      <div className="mt-8 relative z-20">
        <MovieRow title="Customers also watched" movies={related} />
      </div>
    </div>
  );
};

export default DetailPage;
