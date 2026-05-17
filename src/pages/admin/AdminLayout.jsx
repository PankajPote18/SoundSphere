import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Film, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Movies', path: '/admin/movies', icon: Film },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex fixed inset-0 z-50">
      {/* Admin Sidebar */}
      <div className="w-64 bg-[#141824] border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-[#00A8E1]">Nexora Admin</h2>
        </div>
        <div className="flex-1 py-6 space-y-2 px-4">
          {menu.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-[#00A8E1] text-white font-bold' 
                  : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Exit Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-[#141824] border-b border-gray-800 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-gray-200">
            {menu.find(m => m.path === location.pathname)?.name || 'Admin Panel'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#00A8E1] flex items-center justify-center text-white font-bold">
              AD
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
