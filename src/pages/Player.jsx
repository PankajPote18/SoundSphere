import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, ArrowLeft, SkipBack, SkipForward, StepBack, StepForward } from 'lucide-react';
import { usePremiumModal } from '../context/PremiumModalContext';
import '../styles/player.css';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const mockEpisodes = [
  { id: 1, title: "Lanterns and Lost Directions", durationSeconds: 780, date: "Jan 2026" },
  { id: 2, title: "The Map Vendor's Riddle", durationSeconds: 960, date: "Jan 2026" },
  { id: 3, title: "Cameras in the Alley Sky", durationSeconds: 1080, date: "Feb 2026" },
  { id: 4, title: "Shadows of the Forgotten", durationSeconds: 840, date: "Feb 2026" },
  { id: 5, title: "Whispers in the Dark", durationSeconds: 1100, date: "Mar 2026" },
  { id: 6, title: "The Final Note", durationSeconds: 1250, date: "Mar 2026" }
];

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = usePremiumModal();
  
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);

  // Player State
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play by default on Player page
  const [currentTime, setCurrentTime] = useState(0);
  
  const currentEpisode = episodes[currentEpisodeIndex] || null;
  const duration = currentEpisode?.durationSeconds || 0;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const timerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAudio = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/audios/${id}`);
        if (!response.ok) throw new Error("Audio not found");
        const data = await response.json();
        setAudio(data);
        
        // Setup episodes
        setEpisodes(mockEpisodes);
        setCurrentEpisodeIndex(0);
        setCurrentTime(0);
        
        // Auto-play checks premium
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user || !user.isSubscribed) {
          setIsPlaying(false);
          showModal();
        } else {
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [id]);

  // Audio simulation timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            // Auto next episode if available
            if (currentEpisodeIndex < episodes.length - 1) {
              setCurrentEpisodeIndex(prevIdx => prevIdx + 1);
              return 0;
            }
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, duration, currentEpisodeIndex, episodes.length]);

  const handlePlayToggle = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || !user.isSubscribed) {
      showModal();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds) => {
    setCurrentTime((prev) => {
      const newTime = prev + seconds;
      if (newTime < 0) return 0;
      if (newTime > duration) return duration;
      return newTime;
    });
  };

  const handlePrev = () => {
    if (currentTime > 5) {
      setCurrentTime(0);
    } else if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setCurrentTime(duration);
      setIsPlaying(false);
    }
  };

  const handleEpisodeClick = (index) => {
    if (index === currentEpisodeIndex) {
      handlePlayToggle();
    } else {
      setCurrentEpisodeIndex(index);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center text-xl">Loading...</div>;
  if (!audio) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center text-xl">Audio not found</div>;

  return (
    <div className="w-full bg-[#050505] text-white min-h-screen pb-40">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#FF6B00]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white tracking-tight">
            Sound<span className="text-[#FF6B00]">Sphere</span>
          </span>
        </div>
        
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-300 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-xs md:text-sm cursor-pointer border border-white/10 hover:border-[#FF6B00]/50 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)]">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>
      </div>

      <div className="max-w-[1000px] mx-auto pt-28 px-4 md:px-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
        
        {/* Left: Cover Art (Large and Premium) */}
        <div className="w-full max-w-[320px] md:max-w-[400px] flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-[#FF6B00]/20 blur-[80px] rounded-full group-hover:bg-[#FF6B00]/30 transition-all duration-700 pointer-events-none"></div>
          <div className="w-full aspect-[4/5] md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 relative z-10">
            <img 
              src={audio.coverImage || audio.bannerImage} 
              alt={audio.title}
              className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=480&auto=format&fit=crop' }}
            />
          </div>
        </div>

        {/* Right: Audio Details */}
        <div className="w-full flex-1 flex flex-col justify-center text-center md:text-left py-4">
          <div className="mb-2 inline-flex items-center justify-center md:justify-start">
            <span className="bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,107,0,0.2)]">
              {audio.category || audio.genre || 'ORIGINAL SERIES'}
            </span>
            <span className="ml-3 text-sm text-gray-400 font-semibold flex items-center">
              ⭐ {audio.rating || '9.5'} Rating
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mt-4 mb-3 text-white tracking-tight leading-tight">
            {currentEpisode ? currentEpisode.title : audio.title}
          </h1>
          <h2 className="text-gray-400 text-lg md:text-xl font-medium mb-6 md:mb-8">
            {audio.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-4">
            {audio.description || 'A fascinating audio journey. Tune in to experience the latest sounds and stories. Designed for the immersive listener.'}
          </p>
        </div>

      </div>

      {/* Episodes List Section */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 mt-16 md:mt-24 mb-10">
        <h3 className="text-[#FF6B00] font-bold border-b border-[#FF6B00]/30 pb-3 w-full mb-6 text-xl tracking-wide uppercase">Episodes</h3>
        <div className="flex flex-col gap-3">
          {episodes.map((ep, idx) => {
            const isActive = idx === currentEpisodeIndex;
            return (
              <div key={ep.id} onClick={() => handleEpisodeClick(idx)} className={`p-4 md:p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border group ${isActive ? 'bg-[#FF6B00]/10 border-[#FF6B00]/40 shadow-[0_0_20px_rgba(255,107,0,0.15)]' : 'bg-[#0A0A0A] border-white/5 hover:bg-white/5 hover:border-white/20'}`}>
                <div className="pr-4 flex-1">
                  <h4 className={`text-sm md:text-lg font-bold mb-1 line-clamp-1 ${isActive ? 'text-[#FF6B00]' : 'text-gray-200 group-hover:text-white transition-colors'}`}>
                    {ep.id}. {ep.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">{Math.floor(ep.durationSeconds / 60)} min • {ep.date}</p>
                </div>
                <button className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${isActive ? 'bg-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.6)]' : 'bg-white/10 group-hover:bg-[#FF6B00] group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]'}`}>
                  {isActive && isPlaying ? <Pause size={20} fill="currentColor" className="text-white" /> : <Play size={20} fill="currentColor" className={`text-white ${isActive && isPlaying ? '' : 'ml-1'}`} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Player Controls (Full width panel) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-t border-[#FF6B00]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
        {/* Progress Bar (Full width across the absolute top of the bottom bar) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 group cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = clickX / rect.width;
          setCurrentTime(percentage * duration);
        }}>
          <div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] shadow-[0_0_10px_rgba(255,107,0,0.8)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Current Track Info (Left) */}
          <div className="flex-1 w-full flex items-center gap-4 hidden md:flex">
            <img 
              src={audio.coverImage || audio.bannerImage} 
              alt={audio.title}
              className="w-14 h-14 rounded-md object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm line-clamp-1">{currentEpisode ? currentEpisode.title : audio.title}</span>
              <span className="text-gray-400 text-xs font-medium">{audio.title}</span>
            </div>
          </div>

          {/* Player Buttons (Center) */}
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-6 md:space-x-8">
              <button 
                onClick={() => handleSkip(-10)} 
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                title="-10 Seconds"
              >
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={handlePrev} 
                disabled={currentEpisodeIndex === 0 && currentTime < 5}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#FF6B00] disabled:opacity-30 disabled:hover:text-white transition-colors cursor-pointer"
                title="Previous Episode"
              >
                <StepBack size={24} fill="currentColor" />
              </button>
              
              <button 
                onClick={handlePlayToggle}
                className="w-14 h-14 flex items-center justify-center bg-white text-black hover:bg-[#FF6B00] hover:text-white rounded-full font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:scale-105 cursor-pointer"
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
              
              <button 
                onClick={handleNext} 
                disabled={currentEpisodeIndex === episodes.length - 1}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-[#FF6B00] disabled:opacity-30 disabled:hover:text-white transition-colors cursor-pointer"
                title="Next Episode"
              >
                <StepForward size={24} fill="currentColor" />
              </button>

              <button 
                onClick={() => handleSkip(10)} 
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                title="+10 Seconds"
              >
                <SkipForward size={20} />
              </button>
            </div>
            
            {/* Mobile Time */}
            <div className="flex md:hidden items-center justify-between w-full max-w-[300px] mt-2">
               <span className="text-xs text-gray-400 font-medium">{formatTime(currentTime)}</span>
               <span className="text-xs text-gray-400 font-medium">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Time & Extras (Right) */}
          <div className="flex-1 w-full justify-end items-center gap-4 hidden md:flex">
             <span className="text-xs text-gray-400 font-medium tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Player;
