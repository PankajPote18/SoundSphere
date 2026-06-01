import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop');
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect device mode (mobile, mobile-desktop, desktop)
  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
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

  // Keyboard shortcut ⌘K / Ctrl+K to open search page
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

  const isSearchPage = location.pathname === '/search';
  const isSettingsPage = location.pathname === '/settings';
  const isPlansPage = location.pathname === '/plans';
  const isDetailPage = location.pathname.startsWith('/audio/');
  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 md:left-16 right-0 z-40 transition-all duration-300 px-4 md:px-6 flex flex-col justify-center border-none outline-none ${
        isScrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between w-full py-3 space-x-4">
        {/* Logo (hidden on mobile‑detail pages) */}
        {!isDetailPage && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">
              Sound<span className="text-[#FF6B00]">Sphere</span>
            </span>
          </div>
        )}

        {/* Search bar – visible on desktop & tablet, hidden on mobile */}
        {deviceMode !== 'mobile' && isHomePage && (
          <div className="flex-1 max-w-xl lg:max-w-2xl mx-auto hidden md:block transition-all duration-300">
            <div
              onClick={() => navigate('/search')}
              className="w-full flex items-center bg-transparent backdrop-blur-none border border-white/20 rounded-full px-4 py-2 hover:bg-white/5 hover:border-[#FF6B00]/50 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] cursor-pointer transition group"
            >
              <Search size={16} className="text-[#FF6B00] mr-2 group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.8)] transition-all" />
              <span className="text-gray-400 text-sm">Search songs, podcasts, albums…</span>
            </div>
          </div>
        )}

        {/* Placeholder for right‑side actions (keep spacing) */}
        <div className="w-12 md:w-20"></div>
      </div>
    </nav>
  );
};

export default Navbar;
