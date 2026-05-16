import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Plus, Info, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HeroCarousel = ({ movies }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative w-full h-[85vh] lg:h-[95vh] -mt-20 group">
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
            <div className="absolute inset-0 w-full h-full flex justify-end">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                className="w-full md:w-[70%] h-full object-cover object-right"
              />
              {/* Overlays to make text readable and blend with rows */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/90 to-transparent w-full md:w-[60%] z-10"></div>
              <div className="absolute inset-0 banner-gradient z-10"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 pb-16 md:pb-24 pt-32 z-20 flex items-center h-full">
              <div className="max-w-xl md:max-w-2xl mt-20">
                {/* Series/Movie Badge */}
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[#00A8E1] font-bold text-lg md:text-xl tracking-tight">Nexora</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 mb-3 shadow-sm uppercase tracking-widest leading-tight">
                  {movie.title}
                </h1>

                {/* Language / Trending */}
                <div className="flex flex-col space-y-2 mb-6">
                   <p className="text-gray-300 font-medium text-xs md:text-sm">
                     English | Hindi | Tamil | Telugu <br/> Malayalam | Kannada
                   </p>
                   {movie.isTrending && (
                     <div className="flex items-center space-x-2 text-green-500 font-bold text-sm">
                       <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-green-500 text-[10px]">↗</span>
                       <span>#5 in India</span>
                     </div>
                   )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Link 
                    to={`/movie/${movie.id}`}
                    className="flex flex-col items-center justify-center px-6 py-2 bg-gray-700/80 hover:bg-gray-600 backdrop-blur-md text-white font-bold rounded-lg transition text-center"
                  >
                    <span className="text-xs font-medium text-gray-200">Join Nexora</span>
                    <span className="text-base">Watch now</span>
                  </Link>
                  <button className="flex items-center justify-center w-12 h-12 bg-gray-700/80 backdrop-blur-md text-white rounded-full hover:bg-gray-600 transition group">
                    <Plus size={24} />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-gray-700/80 backdrop-blur-md text-white rounded-full hover:bg-gray-600 transition group">
                    <Info size={24} />
                  </button>
                </div>
                
                {/* Footnote */}
                <div className="flex items-center text-gray-300 text-xs font-semibold">
                   <Lock size={12} className="mr-2 text-yellow-500" />
                   Watch with a Nexora membership
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
