import { Home, Search, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 md:top-0 w-full md:w-16 h-16 md:h-full bg-[#0a0f1c] flex flex-row md:flex-col items-center justify-around md:justify-between py-0 md:py-6 z-50 border-t md:border-t-0 md:border-r border-white/5 shadow-2xl">
      <div className="flex flex-row md:flex-col items-center space-x-6 md:space-x-0 md:space-y-6 w-full md:w-auto px-4 md:px-0 justify-around md:justify-start md:flex-grow">
        
        {/* User indicator icon - hidden on mobile since MySpace is there */}
        <Link to="/settings" className="hidden md:flex mb-4 group">
          <div className="w-8 h-8 rounded-full bg-[#1e2330] flex items-center justify-center border border-white/10 group-hover:border-[#00A8E1] transition-colors overflow-hidden shadow-inner">
             <div className="w-full h-full bg-[#00A8E1]/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E1] shadow-[0_0_10px_#00A8E1]"></span>
             </div>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex flex-row md:flex-col space-x-6 md:space-x-0 md:space-y-4 items-center">
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

      <div className="mt-0 md:mt-auto hidden md:block">
        <Link to="/myspace" className="group flex items-center justify-center p-2 mb-2">
          {/* Glossy MySpace Avatar Recreation */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-b from-[#6faef5] via-[#1b5db8] to-[#042870] border-[1.5px] border-[#a1ccf7] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
             {/* Glossy top highlight */}
             <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg pointer-events-none"></div>
             <User fill="#e2e8f0" className="text-[#e2e8f0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mt-1 md:mt-2" size={26} strokeWidth={0} />
          </div>
        </Link>
      </div>
      
      {/* Mobile My Space Button inside the row */}
      <div className="md:hidden flex items-center justify-center px-4">
        <Link to="/myspace" className="group flex items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#6faef5] via-[#1b5db8] to-[#042870] border border-[#a1ccf7] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_5px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg pointer-events-none"></div>
             <User fill="#e2e8f0" className="text-[#e2e8f0] mt-1" size={20} strokeWidth={0} />
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;
