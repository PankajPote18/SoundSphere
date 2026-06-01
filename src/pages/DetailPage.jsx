import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, ArrowLeft } from 'lucide-react';
import AudioRow from '../components/AudioRow';
import { usePremiumModal } from '../context/PremiumModalContext';

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

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = usePremiumModal();
  
  const [audio, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Player State
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const currentEpisode = episodes[currentEpisodeIndex] || null;
  const duration = currentEpisode?.durationSeconds || 0;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const timerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/audios/${id}`);
        if (!response.ok) throw new Error("Audio not found");
        const data = await response.json();
        setMovie(data);
        
        // Setup episodes
        setEpisodes(mockEpisodes);
        setCurrentEpisodeIndex(0);
        setCurrentTime(0);
        setIsPlaying(false);

        const res2 = await fetch(`${import.meta.env.VITE_API_URL}/api/audios`);
        if (res2.ok) {
          const all = await res2.json();
          setRelated(all.slice(0, 15));
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Audio simulation timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
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
  }, [isPlaying, duration]);

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
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      setCurrentTime(0);
      setIsPlaying(true);
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

  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    setCurrentTime(percentage * duration);
  };

  if (loading) return <div className="min-h-screen bg-bg-dark text-white flex items-center justify-center text-xl">Loading...</div>;
  if (!audio) return <div className="min-h-screen bg-bg-dark text-white flex items-center justify-center text-xl">Audio not found</div>;

  return (
    <div className="w-full bg-[#050505] text-white pt-20 md:pt-24 pb-16 px-4 md:px-8 lg:px-12 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white transition-colors mb-4 md:mb-6 bg-[#0A0A0A] px-4 py-2 rounded-full text-xs md:text-sm border border-[#FF6B00]/10 hover:border-[#FF6B00]/50 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] w-fit cursor-pointer">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>

        {/* Top Section: Player */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12 bg-[#0A0A0A] p-5 md:p-6 lg:p-10 rounded-3xl md:rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF6B00]/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>

          {/* Left: Cover Art */}
          <div className="flex-shrink-0 w-full md:w-[300px] lg:w-[300px] xl:w-[350px] mx-auto relative z-10">
            <img 
              src={audio.coverImage || audio.bannerImage} 
              alt={audio.title}
              className="w-full aspect-square md:aspect-[4/5] object-cover rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=480&auto=format&fit=crop' }}
            />
          </div>

          {/* Center: Details & Controls */}
          <div className="flex-1 flex flex-col justify-center relative z-10 py-1 md:py-2">
            <h1 className="text-2xl md:text-4xl xl:text-5xl font-black mb-2 md:mb-3 text-white tracking-tight leading-tight line-clamp-2 md:line-clamp-none">{currentEpisode ? currentEpisode.title : audio.title}</h1>
            <p className="text-gray-400 text-xs md:text-sm xl:text-base leading-relaxed mb-4 md:mb-6 max-w-2xl line-clamp-3 md:line-clamp-none">
              {audio.description || 'A fascinating audio journey. Tune in to experience the latest sounds and stories that feel like magic and end like a puzzle.'}
            </p>

            {/* Play Button - Large only for desktop, mobile uses inline controls */}
            <button onClick={handlePlayToggle} className="hidden lg:flex bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white px-6 py-2.5 rounded-full font-bold w-fit mb-6 md:mb-8 shadow-[0_0_15px_rgba(255,107,0,0.4)] hover:shadow-[0_0_25px_rgba(255,107,0,0.7)] items-center hover:scale-105 transition-all cursor-pointer text-sm">
              {isPlaying ? <Pause size={16} fill="currentColor" className="mr-2" /> : <Play size={16} fill="currentColor" className="mr-2" />} 
              {isPlaying ? 'Pause' : `Play ${audio.title}`}
            </button>

            {/* Playback Progress */}
            <div className="mb-4 md:mb-6 max-w-xl w-full">
              <div className="flex items-center justify-between text-[10px] md:text-xs font-semibold text-gray-400 mb-1.5 md:mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div onClick={handleProgressBarClick} className="w-full h-1.5 md:h-2 bg-white/10 rounded-full cursor-pointer relative group">
                <div className="h-full bg-white/30 rounded-full absolute top-0 left-0 w-full transition-all group-hover:bg-white/40"></div>
                <div className="h-full bg-[#FF6B00] rounded-full absolute top-0 left-0 shadow-[0_0_10px_rgba(255,107,0,0.8)]" style={{width: `${progressPercent}%`}}></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between md:justify-start space-x-1 md:space-x-4 max-w-xl w-full">
              <button onClick={() => handleSkip(-10)} className="text-white hover:text-[#FF6B00] transition bg-white/5 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm font-semibold hover:bg-[#FF6B00]/10 border border-white/5 cursor-pointer flex-1 md:flex-none text-center">-10</button>
              <button onClick={handlePrev} disabled={currentEpisodeIndex === 0} className="text-white disabled:opacity-30 disabled:hover:text-white disabled:hover:bg-white/5 disabled:cursor-not-allowed hover:text-[#FF6B00] transition bg-white/5 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm font-semibold hover:bg-[#FF6B00]/10 border border-white/5 cursor-pointer flex-1 md:flex-none text-center">Prev</button>
              <button 
                onClick={handlePlayToggle}
                className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white w-14 md:w-24 h-8 md:h-10 rounded-full flex items-center justify-center font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:scale-105 transition-all border border-[#FF6B00]/50 cursor-pointer text-[10px] md:text-sm flex-none"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleNext} disabled={currentEpisodeIndex === episodes.length - 1} className="text-white disabled:opacity-30 disabled:hover:text-white disabled:hover:bg-white/5 disabled:cursor-not-allowed hover:text-[#FF6B00] transition bg-white/5 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm font-semibold hover:bg-[#FF6B00]/10 border border-white/5 cursor-pointer flex-1 md:flex-none text-center">Next</button>
              <button onClick={() => handleSkip(10)} className="text-white hover:text-[#FF6B00] transition bg-white/5 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm font-semibold hover:bg-[#FF6B00]/10 border border-white/5 cursor-pointer flex-1 md:flex-none text-center">+10</button>
            </div>
          </div>

          {/* Right: Episodes / Playlist */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10 pt-5 md:pt-6 lg:pt-0 lg:pl-6 xl:pl-8 relative z-10">
            <h3 className="text-[#FF6B00] font-bold border-b-2 border-[#FF6B00] pb-1 md:pb-2 w-fit mb-3 md:mb-4 text-xs md:text-sm tracking-wide">Episodes</h3>
            <p className="text-[10px] md:text-xs font-semibold text-gray-400 mb-3 md:mb-4">All {episodes.length} Episodes</p>
            
            <div className="space-y-2 md:space-y-3 max-h-[250px] md:max-h-[350px] overflow-y-auto pr-2 hide-scrollbar">
              {episodes.map((ep, idx) => {
                const isActive = idx === currentEpisodeIndex;
                return (
                  <div key={ep.id} onClick={() => handleEpisodeClick(idx)} className={`p-2.5 md:p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border group ${isActive ? 'bg-[#FF6B00]/10 border-[#FF6B00]/30 shadow-[0_0_15px_rgba(255,107,0,0.1)]' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                    <div className="pr-2">
                      <h4 className={`text-[11px] md:text-sm font-bold mb-1 line-clamp-2 ${isActive ? 'text-[#FF6B00]' : 'text-gray-200 group-hover:text-white'}`}>
                        E{ep.id}. {ep.title}
                      </h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400">{Math.floor(ep.durationSeconds / 60)}m • Ep {ep.id} • {ep.date}</p>
                    </div>
                    <button className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${isActive ? 'bg-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.5)]' : 'bg-white/10 group-hover:bg-[#FF6B00]/80'}`}>
                      {isActive && isPlaying ? <Pause size={12} fill="currentColor" className="text-white" /> : <Play size={12} fill="currentColor" className={`text-white ${isActive && isPlaying ? '' : 'ml-0.5'}`} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: More Like This */}
        {related && related.length > 0 && (
          <div className="mt-8 md:mt-12 lg:mt-16 bg-transparent">
            <AudioRow title="More Like This" audios={related} cardType="square" />
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailPage;