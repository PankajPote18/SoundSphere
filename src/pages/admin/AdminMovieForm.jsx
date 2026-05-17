import { useState } from 'react';

const AdminMovieForm = ({ movie, onClose }) => {
  const [formData, setFormData] = useState(movie || {
    title: '', description: '', category_id: 1, 
    posterUrl: '', backdropUrl: '', videoUrl: '', 
    duration: '', year: new Date().getFullYear(), ageRating: 'U/A 13+',
    isNew: false, isTrending: false, cast: [], genres: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = movie ? `http://localhost:8000/api/movies/${movie.id}` : 'http://localhost:8000/api/movies';
    const method = movie ? 'PUT' : 'POST';

    // Convert comma-separated strings to arrays if necessary
    const payload = {
      ...formData,
      cast: typeof formData.cast === 'string' ? formData.cast.split(',').map(s => s.trim()) : formData.cast,
      genres: typeof formData.genres === 'string' ? formData.genres.split(',').map(s => s.trim()) : formData.genres,
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(() => onClose());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-[#141824] rounded-xl border border-gray-800 p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Title</label>
            <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Category ID</label>
            <input type="number" required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Poster URL</label>
            <input name="posterUrl" value={formData.posterUrl} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Backdrop URL</label>
            <input name="backdropUrl" value={formData.backdropUrl} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
           <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Duration</label>
            <input name="duration" value={formData.duration} onChange={handleChange} placeholder="2h 15m" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Age Rating</label>
            <input name="ageRating" value={formData.ageRating} onChange={handleChange} placeholder="U/A 13+" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#00A8E1] outline-none" />
          </div>
        </div>

        <div className="flex space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} className="w-4 h-4 accent-[#00A8E1]" />
            <span className="text-gray-300 font-medium">New Release</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="w-4 h-4 accent-[#00A8E1]" />
            <span className="text-gray-300 font-medium">Trending</span>
          </label>
        </div>

        <div className="flex space-x-4 pt-4 border-t border-gray-800">
          <button type="submit" className="bg-[#00A8E1] hover:bg-[#008bc0] text-white px-6 py-2 rounded-lg font-bold transition-colors">
            {movie ? 'Update Movie' : 'Save Movie'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminMovieForm;
