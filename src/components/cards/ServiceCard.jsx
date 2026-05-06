import { MapPin, Star, Clock, CheckCircle2, AlertCircle, XCircle, Handshake } from 'lucide-react';
import { useUserStore } from '../../context/userStore';

const ServiceCard = ({ service, onCollaborate }) => {
  const { user, isAuthenticated } = useUserStore();
  const isVendor = isAuthenticated && user?.role === 'vendor';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-600';
      case 'Limited': return 'bg-amber-100 text-amber-600';
      case 'Booked': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return <CheckCircle2 size={14} />;
      case 'Limited': return <AlertCircle size={14} />;
      case 'Booked': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden soft-shadow border border-gold/5 hover:border-gold/20 transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={service.images[0]} 
          alt={service.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
            <Star className="text-gold fill-current" size={14} />
            <span className="font-bold text-gray-900 text-xs">{service.rating}</span>
          </div>
          <div className={`backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm font-bold text-[10px] uppercase tracking-wider ${getStatusColor(service.availabilityStatus)}`}>
            {getStatusIcon(service.availabilityStatus)}
            <span>{service.availabilityStatus}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{service.category.replace('-', ' ')}</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{service.name}</h3>
        
        <div className="flex items-center text-gray-500 mb-6 space-x-4">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1 text-gold" />
            <span className="text-sm font-medium">{service.city}</span>
          </div>
          <div className="flex items-center border-l border-gray-200 pl-4">
            <Clock size={16} className="mr-1 text-gold" />
            <span className="text-sm font-medium">Fast Response</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-2 italic font-light">
          "{service.description}"
        </p>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100 gap-2">
          <div className="flex-grow">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Price Range</p>
            <p className="text-lg font-bold text-gray-900">{service.priceRange}</p>
          </div>
          <div className="flex gap-2">
            {isVendor && (
              <button 
                onClick={() => onCollaborate(service)}
                className="p-3 bg-gold/10 text-gold rounded-xl font-bold hover:bg-gold hover:text-white transition-all group/btn"
                title="Collaborate"
              >
                <Handshake size={20} className="group-hover/btn:scale-110 transition-transform" />
              </button>
            )}
            <button className="gold-gradient px-6 py-3 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-gold/30 transition-all">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
