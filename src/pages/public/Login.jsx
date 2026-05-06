import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useUserStore } from '../../context/userStore';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useUserStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      // Redirect based on role or original destination
      if (from !== '/') {
        navigate(from, { replace: true });
      } else {
        if (user.role === 'admin') navigate('/dashboard/admin');
        else if (user.role === 'vendor') navigate('/dashboard/owner');
        else navigate('/dashboard/user');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream moroccan-pattern flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] soft-shadow border border-gold/10 overflow-hidden">
        <div className="gold-gradient p-10 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome Back</h2>
          <p className="opacity-90 font-light text-sm uppercase tracking-widest">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-gold focus:ring-gold" />
              <span className="text-gray-500 font-medium">Remember me</span>
            </label>
            <Link to="#" className="text-gold font-bold hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full gold-gradient py-5 rounded-2xl text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="text-center text-gray-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold font-bold hover:underline">Create account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
