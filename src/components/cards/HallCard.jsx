import { Link } from 'react-router-dom';
import { MapPin, Star, Users, ArrowRight, Heart } from 'lucide-react';
import { useWishlistStore } from '../../context/wishlistStore';

const HallCard = ({ hall }) => {
  const { toggleFavorite, favorites } = useWishlistStore();
  const isFav = favorites.includes(hall.id);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden soft-shadow border border-gold/5 hover:border-gold/20 transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={hall.images[0]} 
          alt={hall.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
          <Star className="text-gold fill-current h-4 w-4" />
          <span className="font-bold text-gray-900 text-sm">{hall.rating}</span>
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(hall.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isFav ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-400 hover:text-pink-500'}`}
        >
          <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
        </button>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
          <span className="bg-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Featured</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-serif font-bold text-gray-900">{hall.name}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 mb-6 space-x-4">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1 text-gold" />
            <span className="text-sm font-medium">{hall.city}</span>
          </div>
          <div className="flex items-center border-l border-gray-200 pl-4">
            <Users size={16} className="mr-1 text-gold" />
            <span className="text-sm font-medium">{hall.capacity} Guests</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Starting from</p>
            <p className="text-2xl font-bold text-gray-900">${hall.price}<span className="text-sm text-gray-400 font-normal ml-1">/ day</span></p>
          </div>
          
          <Link 
            to={`/halls/${hall.id}`}
            className="h-12 w-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HallCard;
