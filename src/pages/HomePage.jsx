import { useState, useEffect } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import MovieRow from '../components/MovieRow';

const HomePage = () => {
  const [data, setData] = useState({
    hero: [],
    continueWatching: [],
    trending: [],
    movies: [],
    webseries: [],
    topHollywood: [],
    topBollywood: [],
    recentlyAdded: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Instantly load from cache if available (0ms load time)
    const cachedData = localStorage.getItem('home_page_data_redesign');
    if (cachedData) {
      try {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } catch (e) {
        console.error("Cache parsing error", e);
      }
    }

    // 2. Fetch fresh data in the background
    const fetchData = async () => {
      try {
        const [categoriesRes, moviesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/api/movies`)
        ]);
        
        const movies = await moviesRes.json();

        // High-quality cinematic backgrounds for Hero Carousel
        const cinematicBackgrounds = [
          'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2069&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?q=80&w=2126&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2073&auto=format&fit=crop'
        ];

        const heroMovies = movies.filter(m => m.category_id === 'hero').map((movie, index) => ({
          ...movie,
          backdropUrl: cinematicBackgrounds[index % cinematicBackgrounds.length]
        }));

        // A fallback if no specific hero movies are seeded
        const finalHero = heroMovies.length > 0 ? heroMovies : movies.slice(0, 5).map((movie, index) => ({
          ...movie,
          backdropUrl: cinematicBackgrounds[index % cinematicBackgrounds.length]
        }));

        // 3. Continue Watching (IDs 11, 16, 17, 18, 19)
        const continueIds = ['11', '16', '17', '18', '19'];
        const continueWatching = movies.filter(m => continueIds.includes(m.id)).map(m => ({
          ...m,
          progress: m.id === '11' ? 80 : m.id === '16' ? 65 : m.id === '17' ? 50 : m.id === '18' ? 80 : 85,
          leftTime: m.id === '11' ? 'S1 E4 • 32m left' : m.id === '16' ? '1h 08m left' : m.id === '17' ? 'S2 E6 • 18m left' : m.id === '18' ? '42m left' : 'S1 E2 • 21m left'
        }));

        // Fallback for Continue Watching if empty
        if (continueWatching.length === 0) {
          movies.slice(5, 10).forEach((m, idx) => {
            continueWatching.push({
              ...m,
              progress: 30 + idx * 12,
              leftTime: `${15 + idx * 10}m left`
            });
          });
        }

        // 4. Trending Now (1-10) - Top 10 sorted by rating desc
        const trending = [...movies]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10);

        // Heuristic function for Bollywood
        const isBollywood = (m) => {
          const bollywoodActors = ["Kapoor", "Dimri", "Tiwary", "Varma", "Devgn", "Bachchan", "Singh", "Kasturia", "Parihar", "Vijay", "Shahid", "Amitabh", "Ajay", "Rao", "Ayushmann", "Tripathi", "Pankaj", "Manoj", "Bhatt", "Kaushal", "Ranbir", "Alia", "Deepika"];
          const castStr = Array.isArray(m.cast) ? m.cast.join(" ") : typeof m.cast === 'string' ? m.cast : "";
          const titleStr = (m.title || "").toLowerCase();
          
          return bollywoodActors.some(name => castStr.includes(name)) || 
                 titleStr.includes("romeo") || 
                 titleStr.includes("matka") || 
                 titleStr.includes("runway") || 
                 titleStr.includes("aspirants") || 
                 (parseInt(m.id) % 3 === 1 && m.id > 10);
        };

        // 5. Movies (duration contains h or min, or isMovie condition)
        const allMoviesList = movies.filter(m => {
          const durationStr = (m.duration || "").toLowerCase();
          return durationStr.includes('h') || durationStr.includes('min') || durationStr.includes('hr');
        });

        // 6. Webseries (duration contains Season or Seasons or Episode)
        const allWebseriesList = movies.filter(m => {
          const durationStr = (m.duration || "").toLowerCase();
          return durationStr.includes('season') || durationStr.includes('seasons') || durationStr.includes('ep') || durationStr.includes('series');
        });

        // 7. Top Hollywood (is not Bollywood)
        const topHollywood = movies.filter(m => !isBollywood(m)).slice(0, 12);

        // 8. Top Bollywood
        const topBollywood = movies.filter(m => isBollywood(m)).slice(0, 12);

        // 9. Recently Added (sorted by year desc)
        const recentlyAdded = [...movies]
          .sort((a, b) => b.year - a.year)
          .slice(0, 12);

        const finalData = {
          hero: finalHero,
          continueWatching,
          trending,
          movies: allMoviesList.slice(0, 12),
          webseries: allWebseriesList.length > 0 ? allWebseriesList.slice(0, 12) : movies.filter(m => m.id % 2 !== 0).slice(0, 12),
          topHollywood: topHollywood.length > 0 ? topHollywood : movies.slice(0, 12),
          topBollywood: topBollywood.length > 0 ? topBollywood : movies.slice(0, 12),
          recentlyAdded
        };

        setData(finalData);
        localStorage.setItem('home_page_data_redesign', JSON.stringify(finalData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white text-xl bg-bg-dark">Loading...</div>;

  return (
    <div className="w-full bg-bg-dark">
      <HeroCarousel movies={data.hero} />
      
      {/* Dynamic Rows aligned tight to hero without overlapping content */}
      <div className="flex flex-col gap-y-4 md:gap-y-6 relative z-20 pb-12 mt-4 md:-mt-8">
        <MovieRow title="Continue Watching" movies={data.continueWatching} cardType="rectangle" />
        <MovieRow title="Trending Now" movies={data.trending} cardType="trending" />
        <MovieRow title="Movies" movies={data.movies} cardType="square" />
        <MovieRow title="Webseries" movies={data.webseries} cardType="square" />
        <MovieRow title="Top Hollywood" movies={data.topHollywood} cardType="square" />
        <MovieRow title="Top Bollywood" movies={data.topBollywood} cardType="square" />
        <MovieRow title="Recently Added" movies={data.recentlyAdded} cardType="square" />
      </div>
    </div>
  );
};

export default HomePage;
