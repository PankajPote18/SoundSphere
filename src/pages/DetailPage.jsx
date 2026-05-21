import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ThumbsDown, Share2, Video } from 'lucide-react';
import MovieRow from '../components/MovieRow';
import { usePremiumModal } from '../context/PremiumModalContext';

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showModal } = usePremiumModal();

  const handleWatchClick = (e) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || !user.isSubscribed) {
      e.preventDefault();
      showModal();
      return;
    }

    // Request fullscreen on mobile/touch devices to enable native landscape lock
    const isMobile = window.innerWidth < 1024 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobile && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log("Auto-fullscreen on click failed:", err);
      });
    }
  };

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
    <div className="w-full bg-bg-dark text-white pt-24 pb-16 px-4 md:px-12 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
        
        {/* Left Column: Poster Card */}
        <div className="w-full md:w-1/2 shrink-0 flex justify-center md:justify-start">
          <div className="w-full aspect-video bg-bg-card rounded-xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
            <img 
              src={movie.backdropUrl || movie.posterUrl} 
              alt={movie.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark gradient overlay at bottom for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#02040a]/90 to-transparent"></div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-2/3 flex flex-col pt-4 md:pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">
            {movie.title}
          </h1>

          {/* Badges & Genres */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-[#00A8E1]/10 text-[#00A8E1] border border-[#00A8E1]/30 rounded-lg font-semibold text-sm">
              {movie.ageRating || 'U/A 13+'}
            </span>
            
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre, idx) => (
                <span key={idx} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mb-10">
            <p className="text-gray-400 text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/player/${movie.id}`} 
              onClick={handleWatchClick}
              className="flex items-center justify-center px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
            >
              <Play size={18} fill="currentColor" className="mr-2" />
              Watch now
            </Link>
            
            <button className="flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
              <Plus size={18} className="mr-2" />
              Watchlist
            </button>
          </div>
        </div>

      </div>

      {/* More Like This Section */}
      {related && related.length > 0 && (
        <div className="max-w-7xl mx-auto mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-gray-400 font-bold tracking-widest text-sm uppercase">More Like This</h2>
            <button className="text-[#00A8E1] text-sm font-semibold hover:text-white transition cursor-pointer">See all</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {related.map((relMovie, idx) => (
              <div key={idx} className="flex flex-col group cursor-pointer">
                {/* Video Aspect Card */}
                <div className="aspect-video bg-bg-card rounded-xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#00A8E1]/30 shadow-lg shadow-black/65">
                  <img src={relMovie.backdropUrl || relMovie.posterUrl} alt={relMovie.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Title and Subtitle */}
                <h3 className="text-white font-bold text-sm truncate group-hover:text-[#00A8E1] transition-colors">{relMovie.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{relMovie.year} • {relMovie.genres[0]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default DetailPage;
