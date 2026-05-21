import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroCarousel = ({ movies }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
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
  let heightClass = "h-[55vh] md:h-[65vh] lg:h-[68vh]";
  if (deviceMode === 'mobile') {
    heightClass = "h-[50vh]";
  } else if (deviceMode === 'mobile-desktop') {
    heightClass = "h-[35vh]";
  }

  // Determine content container alignment dynamically
  let contentClass = "absolute bottom-0 left-0 w-full px-4 md:px-6 pb-6 md:pb-10 pt-16 z-20 flex items-end h-full";
  if (deviceMode === 'mobile') {
    contentClass = "absolute bottom-0 left-0 w-full px-4 pb-2 flex items-end h-full z-20";
  } else if (deviceMode === 'mobile-desktop') {
    contentClass = "absolute bottom-0 left-0 w-full px-6 pb-4 pt-10 z-20 flex items-end h-full";
  }

  // Determine title sizes dynamically
  let titleClass = "text-4xl md:text-5xl lg:text-7xl font-black text-white mb-2 md:mb-4 tracking-tight drop-shadow-2xl";
  if (deviceMode === 'mobile-desktop') {
    titleClass = "text-3xl font-black text-white mb-2 tracking-tight drop-shadow-xl";
  }

  return (
    <div className={`relative w-full ${heightClass} mt-24 md:-mt-20 group overflow-hidden px-4 md:px-0 pb-4 md:pb-0`}>
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
          el: '.custom-hero-pagination',
        }}
        className="w-full h-full rounded-2xl md:rounded-none overflow-hidden border border-white/10 md:border-none shadow-2xl shadow-black/50 md:shadow-none"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full bg-[#02040a]">
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-[#02040a]/40 to-transparent w-full md:w-2/3 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/40 to-transparent z-10"></div>
            </div>

            <div className={contentClass}>
              <div className="max-w-xl md:max-w-2xl mb-6 md:mb-0 w-full">
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <Link 
                    to={`/movie/${movie.id}`}
                    className={`flex-shrink-0 flex items-center justify-center bg-white text-black hover:bg-gray-200 font-bold rounded-lg transition shadow-lg cursor-pointer ${
                      deviceMode === 'mobile-desktop' 
                        ? 'px-4 py-1.5 text-xs' 
                        : 'px-3.5 md:px-8 py-1.5 md:py-3.5 text-xs md:text-base'
                    }`}
                  >
                    <span className={`mr-1 mb-0.5 ${deviceMode === 'mobile-desktop' ? 'text-sm' : 'text-sm md:text-lg'}`}>▷</span> Watch now
                  </Link>
                  <button 
                    className={`flex-shrink-0 flex items-center justify-center bg-[#1e2330]/80 border border-gray-600 hover:border-gray-400 text-white font-bold rounded-lg transition backdrop-blur-md cursor-pointer ${
                      deviceMode === 'mobile-desktop' 
                        ? 'px-4 py-1.5 text-xs' 
                        : 'px-3.5 md:px-6 py-1.5 md:py-3.5 text-xs md:text-base'
                    }`}
                  >
                    <Plus size={deviceMode === 'desktop' ? 18 : 14} className="mr-1.5" /> My list
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Pagination Container */}
        <div className="custom-hero-pagination absolute bottom-3 md:bottom-6 left-0 right-0 z-30 flex justify-center"></div>
      </Swiper>

      {/* Custom Bottom-Right Navigation Buttons for Desktop */}
      {deviceMode === 'desktop' && (
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center space-x-3">
          <button
            ref={(node) => setPrevEl(node)}
            className="w-10 h-10 rounded-full bg-black/40 border border-white/10 hover:bg-[#00A8E1] hover:border-[#00A8E1] flex items-center justify-center text-white transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            className="w-10 h-10 rounded-full bg-black/40 border border-white/10 hover:bg-[#00A8E1] hover:border-[#00A8E1] flex items-center justify-center text-white transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
