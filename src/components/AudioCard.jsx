import { Link } from 'react-router-dom';
import { Play, MoreVertical } from 'lucide-react';

const AudioCard = ({ audio, cardType = 'square', rank = 1 }) => {

  // Layout 1: Continue Watching (Rectangle aspect-video)
  if (cardType === 'rectangle') {
    const mockProgress = audio.progress || (20 + (audio.id * 17) % 65);
    const mockLeftTime = audio.leftTime || `${12 + (audio.id * 9) % 38}m left`;

    return (
      <Link to={`/audio/${audio.id}`} className="block w-full group relative">
        <div
          className="relative aspect-video rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#FF6B00]/10 transition-transform duration-300 ease-out shadow-md group-hover:scale-[1.05] group-hover:z-20 group-hover:border-[#FF6B00]/50 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.9),0_0_20px_rgba(255,107,0,0.4)]"
        >
          <img
            src={audio.bannerImage || audio.coverImage}
            alt={audio.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=640&auto=format&fit=crop';
            }}
          />

          {/* Always Visible Play Button at Bottom-Left */}
          <div className="absolute bottom-2 left-2 z-30">
            <button 
              className="w-8 h-8 rounded-full bg-black/50 border border-white/30 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform duration-300 hover:bg-[#FF6B00]/80 group-hover:scale-110 cursor-pointer"
            >
              <Play size={10} className="ml-0.5 text-white" fill="currentColor" />
            </button>
          </div>

          {/* Progress Bar at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10 overflow-hidden">
            <div
              className="h-full bg-[#FF6B00] transition-all duration-500 shadow-[0_0_10px_rgba(255,107,0,0.8)]"
              style={{ width: `${mockProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Title, leftTime and Dot Menu */}
        <div className="mt-1.5 flex items-start justify-between px-1">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-[11px] md:text-[12px] font-semibold text-white truncate group-hover:text-[#FF6B00] transition-colors">{audio.title}</h3>
            <p className="text-[9px] md:text-[10px] text-gray-400 mt-0.5 truncate">{mockLeftTime}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-gray-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </Link>
    );
  }

  // Layout 2: Trending Now (Square aspect-square with Overlapping Number)
  if (cardType === 'trending') {
    return (
      <Link to={`/audio/${audio.id}`} className="block w-full group relative mt-2 md:mt-0">
        {/* Large overlay Rank Number */}
        <div
          className="absolute -left-3 bottom-0 md:-left-6 md:bottom-3 z-20 text-6xl sm:text-[90px] font-black select-none pointer-events-none tracking-tighter leading-none"
          style={{
            WebkitTextStroke: '2px rgba(255,255,255,0.45)',
            color: '#02040a',
            textShadow: '0 0 10px rgba(0,0,0,0.8)'
          }}
        >
          {rank}
        </div>

        <div
          className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#FF6B00]/10 transition-transform duration-300 ease-out z-10 shadow-md group-hover:scale-[1.05] group-hover:z-30 group-hover:border-[#FF6B00]/50 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.9),0_0_20px_rgba(255,107,0,0.4)]"
        >
          <img
            src={audio.coverImage}
            alt={audio.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=480&auto=format&fit=crop';
            }}
          />

          {/* Top 10 Red Badge */}
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase shadow z-20">
            TOP 10
          </div>

          {/* Play Button Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
            <button 
              className="w-12 h-12 rounded-full bg-[#FF6B00]/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:scale-110 transition-transform cursor-pointer backdrop-blur-md border border-white/20"
            >
              <Play size={20} className="ml-1" fill="currentColor" />
            </button>
          </div>

          {/* Title Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 transition-opacity duration-300 z-20 pointer-events-none">
            <span className="text-[#FF6B00] text-[9px] font-bold uppercase tracking-wider mb-0.5">
              {audio.category || audio.genre || 'TRENDING'}
            </span>
            <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">
              {audio.title}
            </h4>
          </div>
        </div>

        <div className="mt-1.5 px-1 text-gray-300 font-semibold text-[11px] md:text-[12px] truncate group-hover:text-[#FF6B00] transition-colors relative z-10">
          {audio.title}
        </div>
      </Link>
    );
  }

  // Layout 3: Standard Square (Square aspect-square)
  const isNewMovie = audio.isNew || audio.id % 4 === 0;

  return (
    <Link to={`/audio/${audio.id}`} className="block w-full group relative">
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#FF6B00]/10 transition-transform duration-300 ease-out shadow-md group-hover:scale-[1.05] group-hover:z-20 group-hover:border-[#FF6B00]/50 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.9),0_0_20px_rgba(255,107,0,0.4)]"
      >
        <img
          src={audio.coverImage}
          alt={audio.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=480&auto=format&fit=crop';
          }}
        />

        {/* New Audio Badge */}
        {isNewMovie && (
          <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-black px-2 py-0.5 rounded shadow tracking-wide uppercase z-20">
            NEW RELEASE
          </div>
        )}

        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
          <button 
            className="w-12 h-12 rounded-full bg-[#FF6B00]/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:scale-110 transition-transform cursor-pointer backdrop-blur-md border border-white/20"
          >
            <Play size={20} className="ml-1" fill="currentColor" />
          </button>
        </div>

        {/* Title Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 transition-opacity duration-300 z-20 pointer-events-none">
          <span className="text-[#FF6B00] text-[9px] font-bold uppercase tracking-wider mb-0.5">
            {audio.category || audio.genre || 'AUDIO'}
          </span>
          <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">
            {audio.title}
          </h4>
        </div>
      </div>

      <div className="mt-1.5 px-1">
        <div className="text-gray-300 font-semibold text-[11px] md:text-[12px] truncate group-hover:text-[#FF6B00] transition-colors">
          {audio.title}
        </div>
        <div className="text-gray-500 text-[9px] md:text-[10px] truncate">
          {audio.director || 'Various Artists'}
        </div>
      </div>
    </Link>
  );
};

export default AudioCard;
