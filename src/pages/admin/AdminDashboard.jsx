import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ movies: 0, categories: 0 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/movies`)
      .then(res => res.json())
      .then(data => setStats(s => ({ ...s, movies: data.length })));

    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setStats(s => ({ ...s, categories: data.length })));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141824] p-6 rounded-xl border border-gray-800 shadow-sm">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Movies</p>
          <p className="text-4xl font-bold text-white">{stats.movies}</p>
        </div>
        <div className="bg-[#141824] p-6 rounded-xl border border-gray-800 shadow-sm">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Total Categories</p>
          <p className="text-4xl font-bold text-white">{stats.categories}</p>
        </div>
        <div className="bg-[#141824] p-6 rounded-xl border border-gray-800 shadow-sm">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Active Subscriptions</p>
          <p className="text-4xl font-bold text-[#00A8E1]">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
