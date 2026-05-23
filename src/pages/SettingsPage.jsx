import { useState } from 'react';
import {
  Info,
  Shield,
  LineChart,
  FileText,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Zap,
  Bookmark
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { name: 'Explore Plans', icon: Zap, path: '/plans', isHighlight: true },
    { name: 'My List', icon: Bookmark, path: '/mylist' },
    { name: 'About', icon: Info },
    { name: 'Privacy Policy', icon: Shield },
    { name: 'Refund Policy', icon: LineChart },
    { name: 'Terms and Conditions', icon: FileText },
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Logout', icon: LogOut, isLogout: true },
  ];

  const handleNavigation = (item) => {
    if (item.isLogout) {
      setShowLogoutConfirm(true);
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="w-full bg-bg-dark flex flex-col justify-center min-h-[calc(100vh-80px)] pt-20 pb-8 md:pb-[20vh] lg:pb-8">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6">

        {/* Top Section */}
        <div>
          {/* User Profile */}
          <div className="flex flex-col items-center mb-4 md:mb-6">
            <h1 className="text-lg md:text-2xl font-black text-white mb-1 tracking-wide text-center">
              {user?.name || 'Jon deo'}
            </h1>
          </div>

          {/* Settings Menu */}
          <div className="w-full space-y-2.5 md:space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center justify-between px-3.5 md:px-5 py-3 md:py-4 bg-bg-card hover:bg-white/5 border ${item.isHighlight
                  ? 'border-[#00A8E1]/40 shadow-[0_0_12px_rgba(0,168,225,0.12)]'
                  : 'border-white/5'
                  } rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-center space-x-3 md:space-x-5 min-w-0">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center border transition-colors ${item.isHighlight
                      ? 'bg-[#00A8E1]/15 border-[#00A8E1]/70'
                      : 'bg-white/5 border-white/10 group-hover:border-[#00A8E1]/30'
                      }`}
                  >
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[#00A8E1]" strokeWidth={2.2} />
                  </div>

                  <span className="font-semibold text-[13px] md:text-[15px] tracking-wide text-gray-200 group-hover:text-white transition-colors text-left truncate">
                    {item.name}
                  </span>
                </div>

                <ChevronRight
                  size={16}
                  className={`shrink-0 ${item.isHighlight
                    ? 'text-[#00A8E1]'
                    : 'text-gray-600 group-hover:text-gray-400'
                    } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-bg-card border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Logout</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 font-bold border border-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#00A8E1] hover:bg-[#008bc0] text-white font-bold transition-all duration-300 cursor-pointer text-sm shadow-lg shadow-[#00A8E1]/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;