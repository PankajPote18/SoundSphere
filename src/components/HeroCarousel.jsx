import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Plus, Info, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePremiumModal } from '../context/PremiumModalContext';

const HeroCarousel = ({ movies }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const navigate = useNavigate();
  const { showModal } = usePremiumModal();
  const [deviceMode, setDeviceMode] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      const isUADataMobile = navigator.userAgentData?.mobile;
      const isIOSDesktopMode = (navigator.platform === 'MacIntel' || navigator.userAgent.includes('Macintosh')) && navigator.maxTouchPoints > 1;
      const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      
      const isMobileDevice = isMobileUA || isUADataMobile || isIOSDesktopMode || (isTouchDevice && window.screen.width < 1024);
      const width = window.innerWidth;
      
      if (isMobileDevice) {
        if (width < 768) {
          setDeviceMode('mobile');
        } else {
          setDeviceMode('mobile-desktop');
        }
      } else {
        setDeviceMode('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!movies || movies.length === 0) return null;

  // Determine heights dynamically
  let heightClass = "h-[60vh] md:h-[75vh] lg:h-[85vh]";
  if (deviceMode === 'mobile') {
    heightClass = "h-[60vh]";
  } else if (deviceMode === 'mobile-desktop') {
    heightClass = "h-[30vh]";
  }

  // Determine content container alignment dynamically
  let contentClass = "absolute bottom-0 left-0 w-full px-4 md:px-16 pb-6 md:pb-24 pt-20 z-20 flex items-end h-full";
  if (deviceMode === 'mobile') {
    contentClass = "absolute bottom-0 left-0 w-full px-4 pb-6 pt-20 z-20 flex items-end h-full";
  } else if (deviceMode === 'mobile-desktop') {
    contentClass = "absolute bottom-0 left-0 w-full px-4 md:px-16 pb-0 pt-20 z-20 flex items-center h-full";
  }

  // Determine title sizes dynamically
  let titleClass = "text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight tracking-tight drop-shadow-lg";
  if (deviceMode === 'mobile') {
    titleClass = "text-4xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-lg";
  } else if (deviceMode === 'mobile-desktop') {
    titleClass = "text-3xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-lg";
  }

  return (
    <div className={`relative w-full ${heightClass} -mt-20 group`}>
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

            <div className={contentClass}>
              <div className="max-w-xl md:max-w-2xl mb-2 md:mb-0 w-full">

                {/* Badge */}
                <div className={`inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#00A8E1] text-white text-[9px] md:text-xs font-bold rounded shadow-md uppercase tracking-widest ${deviceMode === 'mobile-desktop' ? 'mb-2' : 'mb-2 md:mb-4'}`}>
                  <span className="mr-1">⚡</span> NEW SERIES • 2026
                </div>

                {/* Title */}
                <h1 className={titleClass}>
                  {movie.title}
                </h1>

                {/* Metadata */}
                <div className={`flex flex-col space-y-1 text-xs md:text-sm text-gray-300 font-medium ${deviceMode === 'mobile-desktop' ? 'mb-4' : 'mb-4 md:mb-6'}`}>
                  <div className="flex flex-wrap items-center space-x-1 md:space-x-2">
                     <span>{movie.ageRating || 'U/A 13+'}</span>
                     <span>•</span>
                     <span>English</span>
                  </div>
                </div>



                {/* Action Buttons */}
                <div className="flex items-center gap-3 md:gap-4">
                  <Link 
                    to={`/movie/${movie.id}`}
                    className={`flex-1 flex items-center justify-center bg-white text-black hover:bg-gray-200 font-bold rounded transition shadow-lg ${
                      deviceMode === 'mobile-desktop' 
                        ? 'max-w-[140px] px-4 py-2 text-sm' 
                        : 'max-w-[160px] md:max-w-none px-4 md:px-8 py-2 md:py-3.5 text-sm md:text-base'
                    }`}
                  >
                    <span className={`mr-1.5 mb-0.5 ${deviceMode === 'mobile-desktop' ? 'text-base' : 'text-lg md:text-xl'}`}>▷</span> Watch now
                  </Link>
                  <button 
                    className={`flex-1 flex items-center justify-center bg-[#1e2330]/80 border border-gray-600 hover:border-gray-400 text-white font-bold rounded transition backdrop-blur-md ${
                      deviceMode === 'mobile-desktop' 
                        ? 'max-w-[140px] px-4 py-2 text-sm' 
                        : 'max-w-[160px] md:max-w-none px-4 md:px-6 py-2 md:py-3.5 text-sm md:text-base'
                    }`}
                  >
                    <Plus size={deviceMode === 'mobile-desktop' ? 16 : 18} className="mr-1.5 md:mr-2" /> My list
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Only shown on PC/Laptop view */}
      {deviceMode === 'desktop' && (
        <>
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
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
