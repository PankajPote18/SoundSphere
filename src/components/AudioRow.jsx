import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AudioCard from './AudioCard';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const AudioRow = ({ title, audios, cardType = 'square' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!audios || audios.length === 0) return null;

  // Determine Swiper view counts based on rectangle vs. square card proportions
  const isRectangle = cardType === 'rectangle';
  const slidesSettings = isRectangle
    ? {
      defaultSlides: 2.2,
      defaultGroup: 1,
      breakpoints: {
        320: { slidesPerView: 2.2, slidesPerGroup: 2, spaceBetween: 8 },
        480: { slidesPerView: 2.8, slidesPerGroup: 2, spaceBetween: 10 },
        640: { slidesPerView: 3.8, slidesPerGroup: 3, spaceBetween: 10 },
        768: { slidesPerView: 4.5, slidesPerGroup: 3, spaceBetween: 12 },
        1024: { slidesPerView: 5.5, slidesPerGroup: 4, spaceBetween: 12 },
        1280: { slidesPerView: 6.2, slidesPerGroup: 5, spaceBetween: 14 },
        1536: { slidesPerView: 7.2, slidesPerGroup: 6, spaceBetween: 16 },
      },
    }
    : {
      defaultSlides: 3.2,
      defaultGroup: 2,
      breakpoints: {
        320: { slidesPerView: 3.2, slidesPerGroup: 3, spaceBetween: 8 },
        480: { slidesPerView: 4.2, slidesPerGroup: 4, spaceBetween: 10 },
        640: { slidesPerView: 5.2, slidesPerGroup: 4, spaceBetween: 10 },
        768: { slidesPerView: 6.5, slidesPerGroup: 5, spaceBetween: 12 },
        1024: { slidesPerView: 7.5, slidesPerGroup: 6, spaceBetween: 12 },
        1280: { slidesPerView: 8.5, slidesPerGroup: 7, spaceBetween: 14 },
        1536: { slidesPerView: 9.5, slidesPerGroup: 8, spaceBetween: 16 },
      },
    };

  return (
    <div
      className="py-1 px-4 md:px-12 relative row-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-1.5 md:mb-2 w-full">
        <h2 className="text-base font-semibold md:text-lg text-white tracking-wide">{title}</h2>
        <Link to="#" className="text-brand hover:text-white transition-colors text-[10px] md:text-xs font-semibold flex items-center whitespace-nowrap flex-shrink-0">
          See All <ChevronRight size={12} className="ml-0.5" />
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
          slidesPerView={slidesSettings.defaultSlides}
          spaceBetween={12}
          slidesPerGroup={slidesSettings.defaultGroup}
          breakpoints={slidesSettings.breakpoints}
          className="!py-4"
        >
          {audios.map((audio, index) => (
            <SwiperSlide key={audio.id} className="!h-auto py-2 !overflow-visible">
              <AudioCard
                audio={audio}
                cardType={cardType}
                rank={index + 1}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons (Desktop only) */}
        <button
          ref={prevRef}
          className={`absolute top-0 bottom-0 left-0 z-40 w-12 bg-black/60 hover:bg-black/95 hidden md:flex items-center justify-center text-white transition-opacity duration-300 backdrop-blur-sm rounded-l-xl cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ChevronLeft size={28} />
        </button>
        <button
          ref={nextRef}
          className={`absolute top-0 bottom-0 right-0 z-40 w-12 bg-black/60 hover:bg-black/95 hidden md:flex items-center justify-center text-white transition-opacity duration-300 backdrop-blur-sm rounded-r-xl cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default AudioRow;
