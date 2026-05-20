import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Plus, Info, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePremiumModal } from '../context/PremiumModalContext';

const HeroCarousel = ({ movies }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const navigate = useNavigate();
  const { showModal } = usePremiumModal();

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[95vh] -mt-20 group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        navigation={{ prevEl, nextEl }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/50 inline-block mx-1"></span>`;
          },
        }}
        className="w-full h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full bg-[#0a0f1c]">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1920&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent w-full md:w-2/3 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/70 to-transparent z-10"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-full px-4 md:px-16 pb-6 md:pb-24 pt-20 z-20 flex items-end h-full">
              <div className="max-w-xl md:max-w-2xl mb-2 md:mb-0 w-full">

                {/* Badge */}
                <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#00A8E1] text-white text-[9px] md:text-xs font-bold rounded shadow-md uppercase tracking-widest mb-2 md:mb-4">
                  <span className="mr-1">⚡</span> NEW SERIES • 2026
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4 leading-tight tracking-tight drop-shadow-lg">
                  {movie.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-col space-y-1 mb-4 md:mb-6 text-xs md:text-sm text-gray-300 font-medium">
                  <div className="flex flex-wrap items-center space-x-1 md:space-x-2">
                     <span>{movie.ageRating || 'U/A 13+'}</span>
                     <span>•</span>
                     <span>English</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-xs md:text-base leading-relaxed max-w-xl mb-6 md:mb-8 line-clamp-2 md:line-clamp-none">
                  {movie.description || "An epic journey across uncharted continents — testing the limits of endurance, loyalty, and the human spirit. When everything is at stake, who do you trust?"}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 md:gap-4">
                  <Link 
                    to={`/movie/${movie.id}`}
                    className="flex-1 max-w-[160px] md:max-w-none flex items-center justify-center px-4 md:px-8 py-2 md:py-3.5 bg-white text-black hover:bg-gray-200 font-bold rounded transition text-sm md:text-base shadow-lg"
                  >
                    <span className="text-lg md:text-xl mr-1.5 md:mr-2 mb-0.5">▷</span> Watch now
                  </Link>
                  <button className="flex-1 max-w-[160px] md:max-w-none flex items-center justify-center px-4 md:px-6 py-2 md:py-3.5 bg-[#1e2330]/80 border border-gray-600 hover:border-gray-400 text-white font-bold rounded transition backdrop-blur-md text-sm md:text-base">
                    <Plus size={18} className="mr-1.5 md:mr-2" /> My list
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        ref={(node) => setPrevEl(node)}
        className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg hover:scale-110 disabled:opacity-30"
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>
      <button
        ref={(node) => setNextEl(node)}
        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg hover:scale-110 disabled:opacity-30"
      >
        <ChevronRight size={48} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default HeroCarousel;
