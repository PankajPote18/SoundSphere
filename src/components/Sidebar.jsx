import { Home, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 md:top-0 w-full md:w-16 h-16 md:h-full bg-[#0a0f1c] flex flex-row md:flex-col items-center justify-around md:justify-between py-0 md:py-6 z-50 border-t md:border-t-0 md:border-r border-white/5 shadow-2xl">
      <div className="flex flex-row md:flex-col items-center space-x-0 md:space-y-6 w-full md:flex-grow">
        
        {/* Top Spacer / Logo Area (Optional) on desktop */}
        <div className="hidden md:block h-8"></div>

        {/* Nav Links */}
        <div className="flex flex-row md:flex-col space-x-16 md:space-x-0 md:space-y-6 items-center w-full justify-center">
          <Link to="/" className={`p-2 md:p-3 rounded-full transition-all duration-300 ${location.pathname === '/' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
          </Link>
          <Link to="/search" className={`p-2 md:p-3 rounded-full transition-all duration-300 ${location.pathname === '/search' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Search size={22} strokeWidth={location.pathname === '/search' ? 2.5 : 2} />
          </Link>
          <Link to="/settings" className={`p-2 md:p-3 rounded-full transition-all duration-300 ${location.pathname === '/settings' ? 'text-[#00A8E1] bg-[#00A8E1]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Settings size={22} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
