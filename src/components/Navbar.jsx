import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
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

  return (
    <nav 
      className={`fixed top-0 left-0 md:left-16 right-0 z-40 transition-all duration-300 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between ${
        isScrolled ? 'bg-[#0f1115]/90 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-[#0f1115]/80 to-transparent'
      }`}
    >
      <div className="flex items-center w-full md:w-1/4 justify-between md:justify-start">
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center">
          <span className="text-[#00A8E1]">Nexora</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-auto hidden md:flex items-center">
        {location.pathname !== '/search' && (
          <div 
            onClick={() => navigate('/search')}
            className="w-full flex items-center bg-transparent border border-gray-600 rounded-full px-4 py-2 hover:border-[#00A8E1] transition-colors cursor-text group"
          >
            <div className="text-[#00A8E1] mr-2">
              <Search size={18} />
            </div>
            <span className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">Search series...</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end w-1/4 space-x-4">
        {/* Removed My Space */}
      </div>
    </nav>
  );
};

export default Navbar;
