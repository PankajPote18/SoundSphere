import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const MovieRow = ({ title, movies }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  return (
    <div 
      className="py-4 px-6 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end mb-3">
        <h2 className="text-xl font-bold text-white tracking-wide">{title}</h2>
        <Link to="#" className="ml-4 text-brand text-sm font-semibold flex items-center hover:text-white transition opacity-0 group-hover:opacity-100">
          See more <ChevronRight size={16} />
        </Link>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          slidesPerView={2}
          spaceBetween={10}
          slidesPerGroup={2}
          breakpoints={{
            640: { slidesPerView: 3, slidesPerGroup: 3 },
            768: { slidesPerView: 4, slidesPerGroup: 4 },
            1024: { slidesPerView: 5, slidesPerGroup: 5 },
            1280: { slidesPerView: 6, slidesPerGroup: 6 },
          }}
          className="!overflow-visible"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="!h-auto py-4">
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className={`absolute top-0 bottom-0 left-[-24px] z-40 w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-opacity duration-300 backdrop-blur-sm ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronLeft size={36} />
        </button>
        <button
          ref={nextRef}
          className={`absolute top-0 bottom-0 right-[-24px] z-40 w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-opacity duration-300 backdrop-blur-sm ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
