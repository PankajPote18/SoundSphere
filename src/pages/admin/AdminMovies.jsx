import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminMovieForm from './AdminMovieForm';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const fetchMovies = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/movies`)
      .then(res => res.json())
      .then(data => setMovies(data));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      fetch(`${import.meta.env.VITE_API_URL}/api/movies/${id}`, { method: 'DELETE' })
        .then(() => fetchMovies());
    }
  };

  if (showForm) {
    return <AdminMovieForm
      movie={editingMovie}
      onClose={() => { setShowForm(false); setEditingMovie(null); fetchMovies(); }}
    />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Manage Movies</h2>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#00A8E1] hover:bg-[#008bc0] text-white px-4 py-2 rounded-lg font-bold transition-colors"
        >
          <Plus size={20} />
          <span>Add Movie</span>
        </button>
      </div>

      <div className="bg-[#141824] rounded-xl border border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-[#1a1f2e] border-b border-gray-800 text-sm uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {movies.map(movie => (
                <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{movie.title}</td>
                  <td className="px-6 py-4 text-gray-400">{movie.category_id}</td>
                  <td className="px-6 py-4 text-gray-400">{movie.year}</td>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <button
                      onClick={() => { setEditingMovie(movie); setShowForm(true); }}
                      className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMovies;
