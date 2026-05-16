import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Grid, Bookmark, User, Bell } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'TV shows', path: '/tv' },
    { name: 'Live TV', path: '/live' },
  ];

  const secondaryLinks = [
    { name: 'Subscriptions', icon: Grid },
    { name: 'Store', icon: null },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
        isScrolled ? 'bg-bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center">
          <span className="text-brand">Nexora</span>
          <span className="ml-1 text-sm font-normal mt-1">video</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors px-4 py-2 rounded-md ${
                location.pathname === link.path 
                  ? 'bg-white/20 text-white font-bold backdrop-blur-md' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-5 w-px bg-gray-600 mx-2"></div>
          {secondaryLinks.map((link) => (
            <Link
              key={link.name}
              to="#"
              className="text-gray-300 hover:text-white flex items-center space-x-1 transition-colors px-3 py-2 rounded-md hover:bg-white/5"
            >
              {link.icon && <link.icon size={18} className="mr-1" />}
              <span className="font-bold">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-6 text-gray-300 font-medium">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`transition-colors p-2 rounded-full ${isSearchOpen ? 'bg-white text-black' : 'hover:text-white'}`}
        >
          <Search size={20} />
        </button>
        <button className="hover:text-white transition-colors flex items-center text-sm font-bold">
          EN <span className="ml-1 text-[10px]">▼</span>
        </button>
        <button className="hover:text-white transition-colors hidden md:block">
          <Grid size={20} />
        </button>
        <Link to="/settings" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:ring-2 hover:ring-white transition-all">
          <User size={16} />
        </Link>
        <button className="bg-[#00A8E1] hover:bg-[#007799] text-white font-bold py-2 px-4 rounded transition-colors hidden md:block">
          Join Nexora
        </button>
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1e293b]/95 backdrop-blur-lg border-t border-gray-700 shadow-2xl py-6 px-6 z-40">
          <div className="max-w-4xl mx-auto flex items-center bg-gray-800 rounded-md border border-gray-600 focus-within:border-white focus-within:bg-gray-700 transition-all">
            <div className="pl-4 pr-2 text-gray-400">
              <Search size={24} />
            </div>
            <input 
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-white px-2 py-4 text-xl outline-none placeholder-gray-400 font-medium"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
