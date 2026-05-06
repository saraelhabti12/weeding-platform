import { MapPin, Sparkles, Star, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useServiceStore } from '../../../../context/serviceStore';

const ServiceModeration = () => {
  const { services, deleteService, updateServiceStatus } = useServiceStore();
  const safeServices = services || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {safeServices.map((service) => (
          <div key={service.id} className="bg-white rounded-[40px] border border-gold/5 soft-shadow overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img src={service.images?.[0] || 'https://via.placeholder.com/400x300'} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
                <Star className="text-gold fill-current h-3 w-3" />
                <span className="font-bold text-gray-900 text-[10px]">{service.rating || 'N/A'}</span>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button 
                  onClick={() => updateServiceStatus(service.id, 'approved')}
                  className="bg-green-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                  title="Approve"
                >
                  <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => updateServiceStatus(service.id, 'rejected')}
                  className="bg-orange-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                  title="Reject"
                >
                  <AlertCircle size={18} />
                </button>
                <button 
                  onClick={() => deleteService(service.id)}
                  className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                  title="Delete"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-serif font-bold text-gray-900 truncate pr-2">{service.name}</h4>
                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                  service.status === 'approved' ? 'bg-green-100 text-green-600' :
                  service.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-gold/10 text-gold'
                }`}>
                  {service.status || 'pending'}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 text-xs mb-6 space-x-4">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1 text-gold" />
                  <span className="font-medium">{service.city}</span>
                </div>
                <div className="flex items-center border-l border-gray-200 pl-4">
                  <Sparkles size={14} className="mr-1 text-gold" />
                  <span className="font-medium">{service.category}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Vendor: {service.vendor?.name || 'Unknown'}
                </span>
                <p className="text-lg font-bold text-gray-900">${service.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceModeration;
