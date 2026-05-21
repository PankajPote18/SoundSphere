import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        navigate('/search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Hide search bar on specific pages
  const isSearchPage = location.pathname === '/search';
  const isSettingsPage = location.pathname === '/settings';
  const isPlansPage = location.pathname === '/plans';
  const isDetailPage = location.pathname.startsWith('/movie/');

  const showSearchBar = !isSearchPage && !isSettingsPage && !isPlansPage && !isDetailPage;
  const showMobileTabs = !isSearchPage && !isSettingsPage && !isPlansPage && !isDetailPage;

  return (
    <nav 
      className={`fixed top-0 left-0 md:left-16 right-0 z-40 transition-all duration-300 px-4 md:px-6 flex flex-col justify-center border-none outline-none ${
        isScrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-gradient-to-b from-bg-dark/90 to-transparent'
      }`}
    >
      {/* Top Row: Logo & Search */}
      <div className="flex items-center justify-between w-full py-3">
        {/* Logo */}
        <div className="lg:hidden flex items-center">
          <span className="text-xl font-bold text-white tracking-tight">Nex<span className="text-[#00A8E1]">ora</span></span>
        </div>

        {/* Desktop Search Bar (Hidden on Mobile home, visible otherwise or handled by sidebar) */}
        <div className="hidden md:flex flex-1 max-w-md items-center">
          {showSearchBar && (
            <div 
              onClick={() => navigate('/search')}
              className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <Search size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-gray-400 text-sm font-medium group-hover:text-gray-200 transition-colors">
                  Search movies, web series...
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-1 bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      {showMobileTabs && (
        <div className="md:hidden flex items-center space-x-6 pb-2 w-full px-1">
          <Link to="/" className="text-white text-sm font-bold relative pb-1">
            Home
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A8E1] rounded-full"></div>
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium pb-1">
            Movies
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium pb-1">
            Web Series
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
