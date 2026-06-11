import { useState, useEffect } from 'react';

import HeroCarousel from '../components/HeroCarousel';
import { moviesApi, plansApi, BASE_URL } from '../services/api';
import AudioRow from '../components/AudioRow';

const HomePage = () => {

  const [data, setData] = useState({
    hero: [],
    continueListening: [],
    trending: [],
    audios: [],
    podcasts: [],
    featuredAlbums: [],
    recommendedAudios: [],
    recentlyAdded: []
  });

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Instantly load from cache if available
    const cachedData = localStorage.getItem('home_page_audio_data_v2');
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
        const [catsRes, audiosRes, plansRes] = await Promise.all([
          fetch(`${BASE_URL}/api/audio-categories`),
          moviesApi.getAll(),
          plansApi.getAll(true)
        ]);

        if (catsRes.ok) {
          const cats = await catsRes.json();
          setCategories(cats);
        }

        const audios = await audiosRes;

        let finalHero = audios.filter(m => m.audio_category_id === 'hero');

        // Ensure we always have at least 6 items in the hero banner to show off the carousel
        if (finalHero.length < 6) {
          const extraAudios = audios.filter(m => m.audio_category_id !== 'hero').slice(0, 6 - finalHero.length);
          finalHero = [...finalHero, ...extraAudios];
        }

        // 3. Continue Listening
        const continueListening = audios.slice(10, 15).map((m, idx) => ({
          ...m,
          progress: 30 + idx * 12,
          leftTime: `${15 + idx * 10}m left`
        }));

        // 4. Trending Now - Top 10 sorted by popularityScore
        const trending = [...audios]
          .sort((a, b) => b.popularityScore - a.popularityScore)
          .slice(0, 10);

        const allPodcasts = audios.filter(m => m.audio_category_id === 'podcasts');
        const allMusic = audios.filter(m => m.audio_category_id === 'music');

        const recentlyAdded = [...audios]
          .sort((a, b) => b.releaseYear - a.releaseYear)
          .slice(0, 12);

        const finalData = {
          hero: finalHero,
          continueListening,
          trending,
          audios: audios.slice(0, 12),
          podcasts: allPodcasts.length > 0 ? allPodcasts : audios.slice(12, 24),
          featuredAlbums: allMusic.length > 0 ? allMusic : audios.slice(24, 36),
          recommendedAudios: audios.slice(36, 48),
          recentlyAdded
        };

        setData(finalData);
        localStorage.setItem('home_page_audio_data_v2', JSON.stringify(finalData));

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
    <div className="w-full bg-bg-dark relative">
      <HeroCarousel audios={data.hero} showSearch={true} />

      {/* Dynamic Rows aligned tight to hero without overlapping content */}
      <div className="flex flex-col gap-y-4 md:gap-y-6 relative z-20 pb-12 mt-4 md:mt-6">
        <AudioRow title="Continue Listening" audios={data.continueListening} cardType="rectangle" />

        <AudioRow title="Trending Now" audios={data.trending} cardType="trending" />

        <AudioRow title="Popular Audio" audios={data.audios} cardType="square" />

        <AudioRow title="Top Podcasts" audios={data.podcasts} cardType="square" />

        <AudioRow title="Featured Albums" audios={data.featuredAlbums} cardType="square" />

        <AudioRow title="Recommended For You" audios={data.recommendedAudios} cardType="square" />

        <AudioRow title="Recently Played" audios={data.recentlyAdded} cardType="square" />

      </div>

    </div>

  );

};

export default HomePage;
