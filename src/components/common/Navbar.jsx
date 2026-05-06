import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useUserStore } from '../../context/userStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/dashboard/admin';
    if (user?.role === 'vendor') return '/dashboard/owner';
    return '/dashboard/user';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gold/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors">
              <Heart className="h-6 w-6 text-gold fill-current" />
            </div>
            <span className="text-2xl font-serif font-bold text-gray-900 tracking-wide">WedBliss</span>
          </Link>
          
          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className="text-gray-600 hover:text-gold font-medium transition-colors tracking-wide">Home</Link>
            <Link to="/halls" className="text-gray-600 hover:text-gold font-medium transition-colors tracking-wide">Venues</Link>
            <Link to="/services" className="text-gray-600 hover:text-gold font-medium transition-colors tracking-wide">Services</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link 
                  to={getDashboardLink()} 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gold font-medium transition-colors tracking-wide"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <div className="h-6 w-[1px] bg-gray-200"></div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-900">{user?.name}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold">{user?.role}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="gold-gradient text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-gold/20 hover:scale-105 transition-all flex items-center space-x-2">
                  <User size={18} />
                  <span>Sign In</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
