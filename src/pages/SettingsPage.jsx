import { useState } from 'react';
import { Info, Shield, LineChart, FileText, LayoutDashboard, LogOut, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { name: 'Explore Plans', icon: Zap, path: '/plans', isHighlight: true },
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

  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="w-full bg-bg-dark pt-16 md:pt-24 pb-12 flex flex-col items-center min-h-[calc(100vh-80px)]">
      
      {/* User Profile */}
      <div className="flex flex-col items-center mt-2 md:mt-8 mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-wide">Jon deo</h1>
      </div>

      {/* Settings Menu */}
      <div className="w-full max-w-3xl px-6 space-y-4">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center justify-between p-4 md:p-5 bg-bg-card hover:bg-white/5 border ${item.isHighlight ? 'border-[#00A8E1]/50 shadow-[0_0_15px_rgba(0,168,225,0.15)]' : 'border-white/5'} rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer`}
          >
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border transition-colors ${item.isHighlight ? 'bg-[#00A8E1]/20 border-[#00A8E1]' : 'bg-white/5 border-white/10 group-hover:border-[#00A8E1]/40'}`}>
                <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.isLogout ? 'text-red-500' : 'text-[#00A8E1]'}`} strokeWidth={2.2} />
              </div>
              <span className={`font-bold text-sm md:text-base tracking-wide ${item.isLogout ? 'text-red-500' : 'text-gray-200'} group-hover:text-white transition-colors`}>
                {item.name}
              </span>
            </div>
            <ChevronRight size={20} className={`${item.isHighlight ? 'text-[#00A8E1]' : 'text-gray-600 group-hover:text-gray-400'} transition-colors`} />
          </button>
        ))}
      </div>

      {/* Custom Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-bg-card border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-transform duration-300 scale-100">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Logout</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Are you sure you want to logout? You will need to verify your phone number again.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold border border-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-300 cursor-pointer text-sm shadow-lg shadow-red-600/20"
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
