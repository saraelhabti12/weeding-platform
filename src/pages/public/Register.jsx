import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowRight, UserCircle, Briefcase } from 'lucide-react';
import { useUserStore } from '../../context/userStore';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useUserStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(formData);
      if (user.role === 'vendor') navigate('/dashboard/owner');
      else navigate('/dashboard/user');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream moroccan-pattern flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-[2.5rem] soft-shadow border border-gold/10 overflow-hidden">
        <div className="gold-gradient p-10 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-2">Join Our Community</h2>
          <p className="opacity-90 font-light text-sm uppercase tracking-widest">Create your wedding platform account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'customer' })}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2 ${
                formData.role === 'customer' 
                ? 'border-gold bg-gold/5 text-gold' 
                : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gold/30'
              }`}
            >
              <UserCircle size={24} />
              <span className="text-xs font-black uppercase tracking-widest">I'm a Couple</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'vendor' })}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2 ${
                formData.role === 'vendor' 
                ? 'border-gold bg-gold/5 text-gold' 
                : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gold/30'
              }`}
            >
              <Briefcase size={24} />
              <span className="text-xs font-black uppercase tracking-widest">I'm a Vendor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

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

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                />
              </div>
            </div>
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
                <span>Create Account</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="text-center text-gray-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-gold font-bold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
