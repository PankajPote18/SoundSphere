import { Info, Shield, LineChart, FileText, LayoutDashboard, LogOut, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

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
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] pt-32 pb-20 flex flex-col items-center">
      
      {/* User Profile */}
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">John Doe</h1>
        <p className="text-gray-400 font-medium text-sm">+91 9999999999</p>
      </div>

      {/* Settings Menu */}
      <div className="w-full max-w-3xl px-6 space-y-4">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center justify-between p-5 bg-[#141824] hover:bg-[#1a1f2e] border ${item.isHighlight ? 'border-[#00A8E1]/50 shadow-[0_0_15px_rgba(0,168,225,0.15)]' : 'border-white/5'} rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md`}
          >
            <div className="flex items-center space-x-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${item.isHighlight ? 'bg-[#00A8E1]/20 border-[#00A8E1]' : 'bg-[#00A8E1]/10 border-[#00A8E1]/20 group-hover:border-[#00A8E1]/50'}`}>
                <item.icon size={22} className={item.isLogout ? 'text-red-500' : 'text-[#00A8E1]'} strokeWidth={2.5} />
              </div>
              <span className={`font-bold text-base tracking-wide ${item.isLogout ? 'text-gray-300' : 'text-gray-200'} group-hover:text-white transition-colors`}>
                {item.name}
              </span>
            </div>
            <ChevronRight size={20} className={`${item.isHighlight ? 'text-[#00A8E1]' : 'text-gray-600 group-hover:text-gray-400'} transition-colors`} />
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default SettingsPage;
