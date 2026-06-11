import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft } from 'lucide-react';
import AudioRow from '../components/AudioRow';
import { moviesApi } from '../services/api';

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

  const [audio, setAudio] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAudio = async () => {
      setLoading(true);
      try {
        const data = await moviesApi.getOne(id);
        setAudio(data);
        setEpisodes(mockEpisodes);

        try {
          const all = await moviesApi.getAll();
          setRelated(all.filter(a => a.id !== id).slice(0, 15));
        } catch (e) {
          console.error("Error fetching related:", e);
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [id]);

  const handlePlayNavigate = () => {
    navigate(`/player/${id}`);
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

        {/* Top Section: Overview */}
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

          {/* Center: Details */}
          <div className="flex-1 flex flex-col justify-center relative z-10 py-1 md:py-2">
            <h1 className="text-2xl md:text-4xl xl:text-5xl font-black mb-2 md:mb-3 text-white tracking-tight leading-tight line-clamp-2 md:line-clamp-none">{audio.title}</h1>
            <p className="text-gray-400 text-xs md:text-sm xl:text-base leading-relaxed mb-6 max-w-2xl">
              {audio.description || 'A fascinating audio journey. Tune in to experience the latest sounds and stories that feel like magic and end like a puzzle.'}
            </p>

            <button onClick={handlePlayNavigate} className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold w-fit shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] flex items-center hover:scale-105 transition-all cursor-pointer text-sm md:text-base border border-[#FF6B00]/50">
              <Play size={20} fill="currentColor" className="mr-2" /> Play Now
            </button>
          </div>

          {/* Right: Episodes List */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10 pt-5 md:pt-6 lg:pt-0 lg:pl-6 xl:pl-8 relative z-10">
            <h3 className="text-[#FF6B00] font-bold border-b-2 border-[#FF6B00] pb-1 md:pb-2 w-fit mb-3 md:mb-4 text-xs md:text-sm tracking-wide">Episodes</h3>
            <p className="text-[10px] md:text-xs font-semibold text-gray-400 mb-3 md:mb-4">All {episodes.length} Episodes</p>

            <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 hide-scrollbar">
              {episodes.map((ep) => (
                <div key={ep.id} onClick={handlePlayNavigate} className="p-2.5 md:p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border bg-transparent border-transparent hover:bg-white/5 group">
                  <div className="pr-2">
                    <h4 className="text-[11px] md:text-sm font-bold mb-1 line-clamp-2 text-gray-200 group-hover:text-white">
                      E{ep.id}. {ep.title}
                    </h4>
                    <p className="text-[9px] md:text-[10px] text-gray-400">{Math.floor(ep.durationSeconds / 60)}m • Ep {ep.id} • {ep.date}</p>
                  </div>
                  <button className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer bg-white/10 group-hover:bg-[#FF6B00] group-hover:shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                    <Play size={12} fill="currentColor" className="text-white ml-0.5" />
                  </button>
                </div>
              ))}
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