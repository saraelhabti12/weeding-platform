import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, ArrowLeft, Calendar as CalendarIcon, Share2, Heart, ShieldCheck, Clock, Info, Sparkles, Loader2, Handshake } from 'lucide-react';
import { useWishlistStore } from '../../context/wishlistStore';
import { useUserStore } from '../../context/userStore';
import serviceService from '../../services/serviceService';
import bookingService from '../../services/bookingService';
import CollaborationModal from '../../components/common/CollaborationModal';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  
  const { toggleFavorite, favorites } = useWishlistStore();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await serviceService.getById(id);
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBook = async () => {
    if (!selectedDate) return;
    
    setBookingLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await bookingService.create({
        service_id: id,
        start_date: selectedDate,
        end_date: selectedDate,
      });
      
      setMessage({ type: 'success', text: 'Booking request sent successfully!' });
      setTimeout(() => navigate('/dashboard/user/bookings'), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send booking request.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="text-gold animate-spin" size={48} />
      <p className="text-gold font-bold">Loading service...</p>
    </div>
  );

  if (!service) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl font-serif font-bold text-gray-900">Service not found</h2>
      <Link to="/services" className="text-gold font-bold hover:underline">Back to discovery</Link>
    </div>
  );

  const isFav = favorites.includes(service.id);
  const isDateAvailable = (date) => true; // Simple fallback

  return (
    <div className="min-h-screen bg-cream moroccan-pattern pb-32">
      {/* Gallery Header */}
      <div className="relative h-[60vh] group">
        <div className="absolute inset-0">
          <img 
            src={service.images?.[activeImage] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80'} 
            alt={service.name} 
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
          <Link to="/services" className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-xl hover:bg-white hover:text-gray-900 transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex space-x-4">
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-xl hover:bg-white hover:text-gold transition-all">
              <Share2 size={24} />
            </button>
            <button 
              onClick={() => toggleFavorite(service.id)}
              className={`backdrop-blur-md p-3 rounded-full shadow-xl transition-all ${isFav ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-white hover:text-pink-600'}`}
            >
              <Heart size={24} className={isFav ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-32 left-8 text-white z-20">
          <div className="inline-flex items-center space-x-2 bg-gold/80 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
            <Star className="fill-current text-white" size={12} />
            <span className="font-bold text-[10px] uppercase tracking-widest text-white">{service.rating || '4.9'} Rating</span>
          </div>
          <h1 className="text-6xl font-serif font-bold mb-2">{service.name}</h1>
          <div className="flex items-center text-white/90">
            <MapPin size={20} className="mr-2 text-gold" />
            <span className="text-xl">{service.city}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gold/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-gray-100 mb-12">
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">Verified</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Vendor</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">Fast</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Response</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Info className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">{service.category}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Category</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Sparkles className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">Premium</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Quality</p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                  <span className="h-1 w-12 bg-gold mr-4"></span>
                  About This Service
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                  {service.description}
                </p>
              </div>

              {/* Availability Calendar */}
              <div className="mt-16">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                  <span className="h-1 w-12 bg-gold mr-4"></span>
                  Availability
                </h3>
                <div className="bg-gray-50 p-10 rounded-[3rem] border border-gold/10">
                  <div className="grid grid-cols-7 gap-3">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                      <div key={d} className="text-center text-[10px] font-black text-gray-300 uppercase py-2">{d}</div>
                    ))}
                    {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-4"></div>
                    ))}
                    {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }).map((_, i) => {
                      const day = i + 1;
                      const dateStr = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                      const available = isDateAvailable(dateStr);
                      return (
                        <button 
                          key={i}
                          disabled={!available}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center font-bold text-sm transition-all ${
                            selectedDate === dateStr ? 'bg-black text-white scale-110 shadow-xl z-10' :
                            available ? 'bg-gold text-white hover:scale-105 shadow-md shadow-gold/10' : 'bg-white text-gray-200 cursor-not-allowed opacity-50'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gold/10 sticky top-28">
              <div className="mb-8">
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2">Service Price</p>
                <div className="flex items-end">
                  <span className="text-6xl font-bold text-gray-900">${service.price}</span>
                  <span className="text-gray-400 ml-2 mb-2">/ event</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Wedding Date</p>
                  <p className="font-bold text-gray-800">{selectedDate || 'Select from calendar'}</p>
                </div>
              </div>

              <button 
                disabled={!selectedDate || bookingLoading}
                onClick={handleBook}
                className="w-full gold-gradient text-white py-6 rounded-2xl font-bold text-xl shadow-xl shadow-gold/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:grayscale disabled:scale-100"
              >
                {bookingLoading ? <Loader2 className="animate-spin" size={24} /> : <CalendarIcon size={24} />}
                <span>{bookingLoading ? 'Processing...' : 'Book Service'}</span>
              </button>

              {user?.role === 'vendor' && user?.id !== service.user_id && (
                <button 
                  onClick={() => setIsCollabModalOpen(true)}
                  className="w-full mt-4 bg-white border-2 border-gold text-gold py-4 rounded-2xl font-bold hover:bg-gold/5 transition-all flex items-center justify-center space-x-2"
                >
                  <Handshake size={20} />
                  <span>Propose Collaboration</span>
                </button>
              )}
              
              {message.text && (
                <div className={`mt-4 p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CollaborationModal 
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        targetType="service"
        targetId={service.id}
        targetName={service.name}
      />
    </div>
  );
};

export default ServiceDetails;
