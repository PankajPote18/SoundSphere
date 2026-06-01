import { useState, useEffect } from 'react';
import {
  Info,
  Shield,
  LineChart,
  FileText,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Zap,
  Bookmark,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { settingsMenuApi } from '../services/api';

// Map icon_key strings (stored in DB) back to Lucide components
const ICON_MAP = {
  Info,
  Shield,
  LineChart,
  FileText,
  LayoutDashboard,
  LogOut,
  Zap,
  Bookmark,
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only active menu items from backend
    settingsMenuApi
      .getAll(true)
      .then((data) => setMenuItems(data))
      .catch((err) => console.error('Settings menu fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleNavigation = (item) => {
    if (item.is_logout) {
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
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-[#FF6B00]" size={28} />
              </div>
            ) : (
              menuItems.map((item) => {
                const IconComponent = ICON_MAP[item.icon_key] || Info;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center justify-between px-3.5 md:px-5 py-3 md:py-4 bg-[#0A0A0A] hover:bg-white/5 border ${
                      item.is_highlight
                        ? 'border-[#FF6B00]/40 shadow-[0_0_12px_rgba(255,107,0,0.12)]'
                        : 'border-[#FF6B00]/10'
                    } rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(255,107,0,0.15)] hover:border-[#FF6B00]/30 cursor-pointer`}
                  >
                    <div className="flex items-center space-x-3 md:space-x-5 min-w-0">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg flex items-center justify-center border transition-colors ${
                          item.is_highlight
                            ? 'bg-[#FF6B00]/15 border-[#FF6B00]/70 shadow-[0_0_10px_rgba(255,107,0,0.2)]'
                            : 'bg-white/5 border-[#FF6B00]/20 group-hover:border-[#FF6B00]/50 group-hover:bg-[#FF6B00]/10'
                        }`}
                      >
                        <IconComponent
                          className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B00]"
                          strokeWidth={2.2}
                        />
                      </div>

                      <span className="font-semibold text-[13px] md:text-[15px] tracking-wide text-gray-200 group-hover:text-white transition-colors text-left truncate">
                        {item.name}
                      </span>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`shrink-0 ${
                        item.is_highlight
                          ? 'text-[#FF6B00]'
                          : 'text-gray-600 group-hover:text-[#FF6B00]'
                      } transition-colors`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal — unchanged */}
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
                className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white font-bold transition-all duration-300 cursor-pointer text-sm shadow-[0_0_15px_rgba(255,107,0,0.4)] hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] hover:scale-105"
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
