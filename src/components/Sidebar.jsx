import { Home, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 md:top-0 w-full md:w-16 h-16 md:h-full bg-bg-dark flex flex-row md:flex-col items-center justify-center md:justify-center py-0 md:py-6 z-50 border-t md:border-t-0 md:border-r border-[#FF6B00]/30 shadow-[0_0_20px_rgba(255,107,0,0.1)]">
      <div className="flex flex-row md:flex-col items-center justify-center space-x-16 md:space-x-0 md:space-y-8 w-full">
        <Link to="/" className={`p-2 md:p-3 rounded-full transition-all duration-300 ${location.pathname === '/' ? 'text-white bg-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.6)] scale-110' : 'text-gray-400 hover:text-white hover:bg-[#FF6B00]/10 hover:scale-110 hover:shadow-[0_0_10px_rgba(255,107,0,0.3)]'}`}>
          <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
        </Link>
        <Link to="/search" className={`p-2 md:p-3 rounded-full transition-all duration-300 ${location.pathname === '/search' ? 'text-white bg-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.6)] scale-110' : 'text-gray-400 hover:text-white hover:bg-[#FF6B00]/10 hover:scale-110 hover:shadow-[0_0_10px_rgba(255,107,0,0.3)]'}`}>
          <Search size={22} strokeWidth={location.pathname === '/search' ? 2.5 : 2} />
        </Link>
        <Link to="/settings" className={`p-2 md:p-3 rounded-full transition-all duration-300 ${location.pathname === '/settings' ? 'text-white bg-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.6)] scale-110' : 'text-gray-400 hover:text-white hover:bg-[#FF6B00]/10 hover:scale-110 hover:shadow-[0_0_10px_rgba(255,107,0,0.3)]'}`}>
          <Settings size={22} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
