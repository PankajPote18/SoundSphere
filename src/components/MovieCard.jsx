import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { usePremiumModal } from '../context/PremiumModalContext';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { showModal } = usePremiumModal();

  return (
    <Link to={`/movie/${movie.id}`} className="block relative h-full">
      <motion.div 
        className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video shadow-lg group-hover:shadow-2xl z-10 border border-transparent group-hover:border-[#00A8E1]/30 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.05,
          zIndex: 50,
          transition: { duration: 0.3 }
        }}
      >
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {movie.isNew && (
            <span className="bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              New Movie
            </span>
          )}
        </div>



        {/* Hover State Info */}
        <motion.div 
          className="absolute inset-0 bg-bg-card p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {/* Mock Video Playing State on Hover */}
          {isHovered && (
             <div className="absolute inset-0 z-0">
                 <img src={movie.backdropUrl} className="w-full h-full object-cover opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/80 to-transparent"></div>
             </div>
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-800 border border-gray-500 text-white flex items-center justify-center hover:border-white transition">
                  <Plus size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-800 border border-gray-500 text-white flex items-center justify-center hover:border-white transition">
                  <ThumbsUp size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-800 border border-gray-500 text-white flex items-center justify-center hover:border-white transition">
                  <ThumbsDown size={16} />
                </button>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-800 border border-gray-500 text-white flex items-center justify-center hover:border-white transition">
                <Info size={16} />
              </button>
            </div>
            
            <div className="text-white text-sm font-semibold truncate">
              {movie.title}
            </div>
            
            <div className="flex items-center space-x-2 text-[11px] text-gray-300 mt-1">
              <span className="text-green-500 font-semibold">{movie.ageRating}</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="border border-gray-600 px-1 rounded text-[9px]">HD</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-1.5">
              {movie.genres.slice(0, 3).map((genre, idx) => (
                <span key={idx} className="text-[11px] text-gray-400 flex items-center">
                  {idx > 0 && <span className="w-1 h-1 rounded-full bg-gray-600 mx-1.5"></span>}
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="mt-3 px-1 text-gray-200 font-bold text-sm md:text-base truncate group-hover:text-[#00A8E1] transition-colors">
        {movie.title}
      </div>
    </Link>
  );
};

export default MovieCard;
