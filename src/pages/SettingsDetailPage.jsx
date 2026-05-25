import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { settingsPagesApi } from '../services/api';

const SettingsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    settingsPagesApi
      .getBySlug(slug)
      .then((data) => {
        if (!data.status) {
          throw new Error('This page is currently inactive.');
        }
        setPageData(data);
      })
      .catch((err) => {
        console.error('Failed to fetch page data:', err);
        setError('Page not found or is currently unavailable.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full bg-bg-dark flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="animate-spin text-[#00A8E1]" size={36} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-bg-dark flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
        <p className="text-gray-400 mb-6 text-center">{error}</p>
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
        >
          <ArrowLeft size={18} /> Back to Settings
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-dark flex flex-col items-center min-h-[calc(100vh-80px)] pt-24 pb-12 px-4 md:px-8">
      <div className="w-full max-w-4xl bg-bg-card border border-white/5 shadow-xl rounded-2xl overflow-hidden p-6 md:p-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group w-max"
        >
          <div className="bg-white/5 p-1.5 rounded-full group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-wide leading-tight">
            {pageData.title}
          </h1>
          {pageData.short_description && (
            <p className="text-base md:text-lg text-[#00A8E1] font-medium leading-relaxed max-w-3xl">
              {pageData.short_description}
            </p>
          )}
        </div>

        {/* Content Body */}
        <div 
          className="prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed text-[15px] md:text-base space-y-4"
          // We render the HTML directly from the DB. 
          // Note: In production, ensure content is sanitized on backend or use DOMPurify if users can edit it.
          dangerouslySetInnerHTML={{ __html: pageData.full_content }}
        />
        
      </div>
    </div>
  );
};

export default SettingsDetailPage;
