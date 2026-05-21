import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;

    if (isMobileDevice && !isSmallScreen) {
      setDeviceMode('mobile-desktop');
    } else if (isMobileDevice && isSmallScreen) {
      setDeviceMode('mobile');
    } else {
      setDeviceMode('desktop');
    }

    const handleResize = () => {
      const small = window.innerWidth < 768;
      if (isMobileDevice && !small) setDeviceMode('mobile-desktop');
      else if (isMobileDevice && small) setDeviceMode('mobile');
      else setDeviceMode('desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Hide mobile tabs on specific pages
  const isSearchPage = location.pathname === '/search';
  const isSettingsPage = location.pathname === '/settings';
  const isPlansPage = location.pathname === '/plans';
  const isDetailPage = location.pathname.startsWith('/movie/');

  const showMobileTabs = !isSearchPage && !isSettingsPage && !isPlansPage && !isDetailPage;

  return (
    <nav 
      className={`fixed top-0 left-0 md:left-16 right-0 z-40 transition-all duration-300 px-4 md:px-6 flex flex-col justify-center border-none outline-none ${
        isScrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      {/* Top Row: Logo */}
      <div className={`flex ${deviceMode === 'mobile-desktop' ? 'flex-col items-start gap-3 py-4' : 'items-center justify-between py-3'} w-full`}>
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-white tracking-tight">Nex<span className="text-[#00A8E1]">ora</span></span>
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
