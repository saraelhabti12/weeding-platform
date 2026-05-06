import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Users, ArrowLeft, Calendar as CalendarIcon, Share2, Heart, ShieldCheck, Clock, Info, Sparkles, Loader2, Handshake } from 'lucide-react';
import { useWishlistStore } from '../../context/wishlistStore';
import { useUserStore } from '../../context/userStore';
import hallService from '../../services/hallService';
import bookingService from '../../services/bookingService';
import { useNavigate } from 'react-router-dom';
import CollaborationModal from '../../components/common/CollaborationModal';
import AvailabilityCalendar from '../../components/common/AvailabilityCalendar';

const HallDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  
  const { toggleFavorite, favorites } = useWishlistStore();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await hallService.getById(id);
        setHall(data);
        if (data.packages?.length > 0) {
          setSelectedPack(data.packages[0]);
        }
      } catch (error) {
        console.error("Failed to fetch hall details:", error);
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
        entity_type: 'hall',
        entity_id: id,
        date: selectedDate,
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
      <p className="text-gold font-bold">Unveiling luxury...</p>
    </div>
  );

  if (!hall) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl font-serif font-bold text-gray-900">Venue not found</h2>
      <Link to="/" className="text-gold font-bold hover:underline">Back to discovery</Link>
    </div>
  );

  const isFav = favorites.includes(hall.id);

  return (
    <div className="min-h-screen bg-cream moroccan-pattern pb-32">
      {/* Gallery Header */}
      <div className="relative h-[70vh] group">
        <div className="absolute inset-0">
          <img 
            src={hall.images?.[activeImage]} 
            alt={hall.name} 
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
          <Link to="/" className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-xl hover:bg-white hover:text-gray-900 transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex space-x-4">
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-xl hover:bg-white hover:text-gold transition-all">
              <Share2 size={24} />
            </button>
            <button 
              onClick={() => toggleFavorite(hall.id)}
              className={`backdrop-blur-md p-3 rounded-full shadow-xl transition-all ${isFav ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-white hover:text-pink-600'}`}
            >
              <Heart size={24} className={isFav ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20 overflow-x-auto max-w-full px-4 no-scrollbar">
          {hall.images?.map((img, index) => (
            <button 
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-20 w-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-gold scale-110 shadow-lg' : 'border-white/50 opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-32 left-8 text-white z-20 hidden md:block">
          <div className="inline-flex items-center space-x-2 bg-gold/80 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
            <Star className="fill-current text-white" size={12} />
            <span className="font-bold text-[10px] uppercase tracking-widest text-white">{hall.rating || '4.8'} Rating</span>
          </div>
          <h1 className="text-6xl font-serif font-bold mb-2">{hall.name}</h1>
          <div className="flex items-center text-white/90">
            <MapPin size={20} className="mr-2 text-gold" />
            <span className="text-xl">{hall.city}</span>
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
                  <Users className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">{hall.capacity}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Max Guests</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">Verified</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Status</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">24/7</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Support</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Info className="text-gold mb-3" size={28} />
                  <p className="text-lg font-bold text-gray-900">Flexible</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Booking</p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                  <span className="h-1 w-12 bg-gold mr-4"></span>
                  Description
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                  {hall.description}
                </p>
              </div>

              {/* Service Packs */}
              <div className="mt-16">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                  <span className="h-1 w-12 bg-gold mr-4"></span>
                  Choose Your Package
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hall.packages?.map((pack) => (
                    <button 
                      key={pack.id}
                      onClick={() => setSelectedPack(pack)}
                      className={`p-6 rounded-3xl border-2 text-left transition-all ${
                        selectedPack?.id === pack.id ? 'border-gold bg-gold/5 ring-4 ring-gold/10' : 'border-gray-100 hover:border-gold/30'
                      }`}
                    >
                      <div className="mb-4">
                         <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center text-gold"><Sparkles size={20} /></div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{pack.name}</h4>
                      <p className="text-2xl font-black text-gold mb-3">${pack.price}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{pack.description}</p>
                    </button>
                  ))}
                  
                  {/* External Collaborations as Premium Add-ons */}
                  {hall.accepted_collaborations?.map((collab) => (
                    <button 
                      key={collab.id}
                      onClick={() => setSelectedPack({ ...collab.service, isCollab: true })}
                      className={`p-6 rounded-3xl border-2 text-left transition-all border-dashed ${
                        selectedPack?.id === collab.service.id ? 'border-gold bg-gold/5 ring-4 ring-gold/10' : 'border-gray-100 hover:border-gold/30'
                      }`}
                    >
                      <div className="mb-4 flex justify-between items-start">
                         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Handshake size={20} /></div>
                         <span className="bg-gold/10 text-gold text-[8px] font-black uppercase px-2 py-1 rounded-full tracking-widest">Partner</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{collab.service.name}</h4>
                      <p className="text-2xl font-black text-gold mb-3">${collab.service.price}</p>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{collab.service.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-16">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                  <span className="h-1 w-12 bg-gold mr-4"></span>
                  Included Amenities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hall.amenities?.map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-gray-600">
                      <div className="h-2 w-2 rounded-full bg-gold"></div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="mt-16">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center">
                  <span className="h-1 w-12 bg-gold mr-4"></span>
                  Availability
                </h3>
                <AvailabilityCalendar 
                  entityType="hall"
                  entityId={id}
                  onDateSelect={setSelectedDate}
                  isOwner={user?.id === hall.owner_id}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[40px] soft-shadow border border-gold/10 sticky top-28">
              <div className="mb-8">
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2">Total Amount</p>
                <div className="flex items-end">
                  <span className="text-6xl font-bold text-gray-900">${selectedPack?.price || hall.price}</span>
                  <span className="text-gray-400 ml-2 mb-2">/ event</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Selected Package</p>
                  <p className="font-bold text-gray-800">{selectedPack?.name || 'Please select'}</p>
                </div>
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
                <span>{bookingLoading ? 'Processing...' : 'Reserve Now'}</span>
              </button>

              {user?.role === 'vendor' && user?.id !== hall.owner_id && (
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
              
              <div className="mt-8 pt-8 border-t border-dashed border-gray-100 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">{selectedPack?.name}</span>
                  <span>${selectedPack?.price}</span>
                </div>
                <div className="flex justify-between text-2xl font-serif font-bold text-gray-900 pt-4">
                  <span>Grand Total</span>
                  <span className="text-gold">${selectedPack?.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CollaborationModal 
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        targetType="hall"
        targetId={hall.id}
        targetName={hall.name}
      />
    </div>
  );
};

export default HallDetails;
