import { useState } from 'react';

const AdminAudioForm = ({ audio, onClose }) => {
  const [formData, setFormData] = useState(audio || {
    title: '', description: '', audio_category_id: 'hero',
    coverImage: '', bannerImage: '', audioUrl: '', waveformUrl: '',
    duration: '', releaseYear: new Date().getFullYear(), language: 'English',
    newRelease: false, isTrending: false, isOriginal: false, featured: false,
    artists: '', genres: '', album: '', trackCount: 1, popularityScore: 0.0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = audio
      ? `${import.meta.env.VITE_API_URL}/api/audios/${audio.id}`
      : `${import.meta.env.VITE_API_URL}/api/audios`;
    const method = audio ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      artists: typeof formData.artists === 'string' ? formData.artists.split(',').map(s => s.trim()) : formData.artists,
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
    <div className="bg-[#141824] rounded-xl border border-gray-800 p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">{audio ? 'Edit Audio' : 'Add New Audio'}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Title</label>
            <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Category ID</label>
            <input required name="audio_category_id" value={formData.audio_category_id} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Cover Art URL</label>
            <input name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Banner Image URL</label>
            <input name="bannerImage" value={formData.bannerImage} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Audio URL</label>
            <input name="audioUrl" value={formData.audioUrl} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Waveform URL</label>
            <input name="waveformUrl" value={formData.waveformUrl} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Artist(s)</label>
            <input name="artists" value={formData.artists} onChange={handleChange} placeholder="Luna Echo, Atlas Grey" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Album</label>
            <input name="album" value={formData.album} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Genres</label>
            <input name="genres" value={formData.genres} onChange={handleChange} placeholder="Podcast, Lo-Fi" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Release Year</label>
            <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Duration</label>
            <input name="duration" value={formData.duration} onChange={handleChange} placeholder="2h 15m" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Language</label>
            <input name="language" value={formData.language} onChange={handleChange} placeholder="English" className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Track Count</label>
            <input type="number" name="trackCount" value={formData.trackCount} onChange={handleChange} className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF6B00] outline-none" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="newRelease" checked={formData.newRelease} onChange={handleChange} className="w-4 h-4 accent-[#FF6B00]" />
            <span className="text-gray-300 font-medium">New Release</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="w-4 h-4 accent-[#FF6B00]" />
            <span className="text-gray-300 font-medium">Trending</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="isOriginal" checked={formData.isOriginal} onChange={handleChange} className="w-4 h-4 accent-[#FF6B00]" />
            <span className="text-gray-300 font-medium">Original</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[#FF6B00]" />
            <span className="text-gray-300 font-medium">Featured</span>
          </label>
        </div>

        <div className="flex space-x-4 pt-4 border-t border-gray-800">
          <button type="submit" className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-6 py-2 rounded-lg font-bold transition-colors">
            {audio ? 'Update Audio' : 'Save Audio'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAudioForm;
