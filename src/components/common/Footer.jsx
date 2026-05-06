import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gold/10 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] border-[40px] border-gold rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-gold fill-current" />
              <span className="text-2xl font-serif font-bold text-gray-900 tracking-wide">WedBliss</span>
            </Link>
            <p className="text-gray-500 leading-relaxed font-light">
              Crafting exquisite wedding experiences inspired by Moroccan heritage and modern luxury.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Venues', 'Services', 'Dashboard'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-500 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Collections</h4>
            <ul className="space-y-4">
              {['Royal Palaces', 'Beach Terraces', 'Garden Pavilions', 'Historic Mansions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-gold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Contact</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li>Casablanca, Morocco</li>
              <li>+212 5XX XX XX XX</li>
              <li>concierge@wedbliss.ma</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">&copy; 2026 WedBliss Luxury Planning. All rights reserved.</p>
          <div className="flex space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
