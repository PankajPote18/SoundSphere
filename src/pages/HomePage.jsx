import { useState, useEffect } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import MovieRow from '../components/MovieRow';

const HomePage = () => {
  const [data, setData] = useState({ hero: [], rows: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, moviesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/api/movies`)
        ]);
        
        const categories = await categoriesRes.json();
        const movies = await moviesRes.json();

        // High-quality cinematic placeholders to replace low-quality picsum images
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
        
        const rowsData = categories.filter(c => c.type === 'row').map(category => {
          return {
            ...category,
            // Mix in random movies for volume just like the mock version did
            movies: movies.filter(m => m.category_id === category.id || Math.random() > 0.7) 
          };
        });

        setData({ hero: heroMovies, rows: rowsData });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;

  return (
    <div className="w-full">
      <HeroCarousel movies={data.hero} />
      
      <div className="flex flex-col gap-y-2 md:gap-y-6 mt-4 relative z-20">
        {data.rows.map(row => (
          <MovieRow key={row.id} title={row.title} movies={row.movies} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
