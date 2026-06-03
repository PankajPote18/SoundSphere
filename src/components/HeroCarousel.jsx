import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroCarousel = ({ audios }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [deviceMode, setDeviceMode] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const isMobileDevice = isMobileUA || (isTouchDevice && window.screen.width < 1024);
      const width = window.innerWidth;

      if (isMobileDevice || width < 768) {
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

  if (!audios || audios.length === 0) return null;

  // Cap the thumbnails to 6 to fit well in the carousel
  const carouselMovies = audios.slice(0, 6);

  let heightClass = "h-[65vh] md:h-[70vh] lg:h-[75vh]";
  if (deviceMode === 'mobile') {
    heightClass = "h-[55vh] min-h-[450px]";
  } else if (deviceMode === 'mobile-desktop') {
    heightClass = "h-[45vh] min-h-[350px]";
  }

  let contentClass = "absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-20 pb-28 md:pb-32 pt-16 z-20 flex items-end h-full";
  if (deviceMode === 'mobile') {
    contentClass = "absolute bottom-0 left-0 w-full px-5 pb-32 flex items-end h-full z-20";
  }

  let titleClass = "text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl uppercase leading-none";
  if (deviceMode === 'mobile') {
    titleClass = "text-4xl font-black text-white mb-3 tracking-tight drop-shadow-xl uppercase leading-none";
  }

  return (
    <div className={`relative w-full ${heightClass} group bg-transparent px-4 md:px-6 lg:px-10 mt-20 md:mt-24`}>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none z-0 hidden md:block"></div>

      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#0A0A0A]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {carouselMovies.map((audio) => {
            // Mock title splitting for visual effect if title has space, otherwise leave as is
            const titleParts = audio.title.split(' ');
            const titleFirst = titleParts[0];
            const titleRest = titleParts.slice(1).join(' ');

            return (
              <SwiperSlide key={audio.id} className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={audio.bannerImage || audio.coverImage}
                    alt={audio.title}
                    className="w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-[10000ms] ease-linear group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1920&auto=format&fit=crop';
                    }}
                  />
                  {/* Dark Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#020202] from-20% via-[#020202]/80 via-50% to-transparent w-full md:w-[85%] z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] from-10% via-[#020202]/40 via-40% to-transparent z-10"></div>
                </div>

                <div className={contentClass}>
                  <div className="max-w-xl md:max-w-2xl w-full">
                    <p className="text-gray-300 font-bold tracking-[0.2em] text-xs md:text-sm mb-3 md:mb-4 uppercase flex items-center">
                      ORIGINAL AUDIO SERIES
                    </p>
                    
                    <h1 className={titleClass}>
                      {titleRest ? (
                        <>
                          <span className="block">{titleFirst}</span>
                          <span className="block">{titleRest}</span>
                        </>
                      ) : (
                        <span className="block">{titleFirst}</span>
                      )}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mt-6 md:mt-8">
                      <Link
                        to={`/audio/${audio.id}`}
                        className="flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:scale-105 px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base cursor-pointer"
                      >
                        <Play size={18} fill="currentColor" className="mr-2" /> Play Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Bottom Navigation */}
        {carouselMovies.length > 0 && (
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 w-full z-30 pointer-events-none">
            
            {/* Center: Dash Pagination */}
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 flex items-center space-x-2 pointer-events-auto">
              {carouselMovies.map((audio, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={audio.id}
                    onClick={() => swiperInstance?.slideToLoop(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-8 bg-[#FF6B00]' : 'w-4 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Right: Navigation Arrows (Hidden on Mobile) */}
            <div className="hidden md:flex absolute right-6 md:right-12 lg:right-20 bottom-0 transform translate-y-1/2 items-center space-x-2 pointer-events-auto">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-white/10 border border-white/30 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md cursor-pointer"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-white/10 border border-white/30 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md cursor-pointer"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;
