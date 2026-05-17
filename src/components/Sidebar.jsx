import { Home, Search, Settings, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-[#0a0f1c] flex flex-col items-center py-6 z-50 border-r border-white/5 shadow-2xl">
      <div className="flex flex-col items-center space-y-6 flex-grow">
        {/* User indicator icon */}
        <Link to="/settings" className="mb-4 group">
          <div className="w-8 h-8 rounded-full bg-[#1e2330] flex items-center justify-center border border-white/10 group-hover:border-[#00A8E1] transition-colors overflow-hidden shadow-inner">
             <div className="w-full h-full bg-[#00A8E1]/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E1] shadow-[0_0_10px_#00A8E1]"></span>
             </div>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className={`p-3 rounded-full transition-all duration-300 ${location.pathname === '/' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
          </Link>
          <Link to="/search" className={`p-3 rounded-full transition-all duration-300 ${location.pathname === '/search' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Search size={22} strokeWidth={location.pathname === '/search' ? 2.5 : 2} />
          </Link>
          <Link to="/login" className={`p-3 rounded-full transition-all duration-300 ${location.pathname === '/login' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <LogIn size={22} strokeWidth={location.pathname === '/login' ? 2.5 : 2} />
          </Link>
        </div>
      </div>

      <div className="mt-auto">
        <Link to="/settings" className={`p-3 rounded-full transition-all duration-300 ${location.pathname === '/settings' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <Settings size={22} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
