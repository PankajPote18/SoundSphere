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
          fetch('http://localhost:8000/api/categories'),
          fetch('http://localhost:8000/api/movies')
        ]);
        
        const categories = await categoriesRes.json();
        const movies = await moviesRes.json();

        const heroMovies = movies.filter(m => m.category_id === 'hero');
        
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
    <div className="pb-20">
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
