import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  User, 
  LogOut, 
  Home, 
  Briefcase, 
  Heart,
  Menu,
  X,
  Bell,
  ChevronRight
} from 'lucide-react';

const SidebarContent = ({ role, menuItems, pathname, onLinkClick }) => (
  <div className="flex flex-col h-full">
    {/* Sidebar Header */}
    <div className="p-8 pb-12">
      <Link to="/" onClick={onLinkClick} className="flex items-center space-x-2 group">
        <Heart className="h-6 w-6 text-gold fill-current group-hover:scale-110 transition-transform" />
        <span className="text-2xl font-serif font-bold text-white tracking-wide">WedBliss</span>
      </Link>
      <div className="mt-4 inline-flex items-center space-x-2 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
        <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></div>
        <span className="text-[10px] text-gold font-bold uppercase tracking-widest">{role} Portal</span>
      </div>
    </div>
    
    {/* Navigation Links */}
    <nav className="flex-grow space-y-1 px-4">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onLinkClick}
            className={`flex items-center justify-between group px-6 py-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-gold text-white shadow-lg shadow-gold/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gold'} transition-colors`}>
                {item.icon}
              </span>
              <span className="font-bold tracking-wide text-sm">{item.label}</span>
            </div>
            {isActive && <ChevronRight size={16} className="text-white/50" />}
          </Link>
        );
      })}
    </nav>

    {/* Sidebar Footer */}
    <div className="p-6 mt-auto border-t border-white/5 space-y-4">
      <Link to="/" onClick={onLinkClick} className="flex items-center space-x-3 px-6 py-3 text-gray-400 hover:text-gold transition-colors text-sm font-bold group">
        <Home size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Exit to Website</span>
      </Link>
      <button className="flex items-center space-x-3 px-6 py-3 text-gray-400 hover:text-pink-500 transition-colors w-full text-left text-sm font-bold group">
        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
        <span>Sign Out</span>
      </button>
    </div>
  </div>
);

const DashboardLayout = ({ role = 'user' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const menuConfigs = {
    admin: [
      { icon: <LayoutDashboard size={20} />, label: 'Admin Overview', path: '/dashboard/admin' },
      { icon: <User size={20} />, label: 'Manage Users', path: '/dashboard/admin/users' },
      { icon: <Briefcase size={20} />, label: 'Review Halls', path: '/dashboard/admin/halls' },
      { icon: <Settings size={20} />, label: 'System Settings', path: '/dashboard/admin/settings' },
    ],
    owner: [
      { icon: <LayoutDashboard size={20} />, label: 'Business Overview', path: '/dashboard/owner' },
      { icon: <Briefcase size={20} />, label: 'My Venues', path: '/dashboard/owner/venues' },
      { icon: <Calendar size={20} />, label: 'Reservations', path: '/dashboard/owner/bookings' },
      { icon: <Settings size={20} />, label: 'Venue Settings', path: '/dashboard/owner/settings' },
    ],
    user: [
      { icon: <LayoutDashboard size={20} />, label: 'My Overview', path: '/dashboard/user' },
      { icon: <Heart size={20} />, label: 'My Wishlist', path: '/dashboard/user/wishlist' },
      { icon: <Calendar size={20} />, label: 'My Bookings', path: '/dashboard/user/bookings' },
      { icon: <Settings size={20} />, label: 'Profile Settings', path: '/dashboard/user/settings' },
    ]
  };

  const menuItems = menuConfigs[role] || menuConfigs.user;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-gray-900 text-white shrink-0">
        <SidebarContent role={role} menuItems={menuItems} pathname={location.pathname} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 bottom-0 left-0 w-80 bg-gray-900 text-white z-50 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <SidebarContent role={role} menuItems={menuItems} pathname={location.pathname} onLinkClick={closeMobileMenu} />
      </aside>

      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-xl h-20 border-b border-gray-100 px-6 lg:px-10 flex justify-between items-center sticky top-0 z-20 shrink-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
              <h2 className="text-xl font-serif font-bold text-gray-900 capitalize leading-none">
                {role} Dashboard
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Luxury Wedding Planning Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-xl transition-all group">
              <Bell size={22} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-pink-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-gray-100"></div>

            <div className="flex items-center space-x-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-tight">Alex Graham</p>
                <button className="text-[10px] text-gold font-bold uppercase tracking-widest hover:underline">
                  View Profile
                </button>
              </div>
              <div className="relative group">
                <div className="h-12 w-12 rounded-2xl gold-gradient p-[2px] shadow-lg shadow-gold/20 transform group-hover:rotate-6 transition-transform">
                  <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} 
                      alt="avatar" 
                      className="h-10 w-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-6 lg:p-12 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
