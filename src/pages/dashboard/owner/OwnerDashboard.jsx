import { useState, useEffect, useMemo } from 'react';
import { 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  Clock,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useHallStore } from '../../../context/hallStore';
import HallForm from './components/HallForm';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import CollaborationManager from './components/CollaborationManager';

const OwnerDashboard = () => {
  const { halls, fetchHalls, addHall, updateHall, deleteHall, loading } = useHallStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHall, setEditingHall] = useState(null);
  const [activeTab, setActiveTab] = useState('venues'); // 'venues', 'bookings', 'availability', 'collaborations'
  
  const safeHalls = useMemo(() => halls || [], [halls]);
  const [selectedHallId, setSelectedHallId] = useState(null);
  const activeHallId = selectedHallId || safeHalls[0]?.id;

  useEffect(() => {
    fetchHalls();
  }, [fetchHalls]);

  const handleAddHall = (data) => {
    if (editingHall) {
      updateHall(editingHall.id, data);
    } else {
      addHall(data);
    }
    setIsFormOpen(false);
    setEditingHall(null);
  };

  const openEdit = (hall) => {
    setEditingHall(hall);
    setIsFormOpen(true);
  };

  const mockBookings = [
    { id: 1, venue: 'Royal Grand Ballroom', user: 'Sarah Bellani', date: 'Aug 12, 2026', status: 'Confirmed', amount: 2500 },
    { id: 2, venue: 'Ocean View Terrace', user: 'Karim Idrissi', date: 'Sept 05, 2026', status: 'Pending', amount: 1800 },
    { id: 3, venue: 'Royal Grand Ballroom', user: 'Mouna Lahlou', date: 'Oct 14, 2026', status: 'Confirmed', amount: 2500 },
  ];

  const stats = [
    { label: 'Total Venues', value: safeHalls.length.toString(), icon: Briefcase, color: 'text-gold' },
    { label: 'Monthly Bookings', value: '12', icon: Calendar, color: 'text-blue-500' },
    { label: 'Revenue (MTD)', value: '$24,500', icon: TrendingUp, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Business Dashboard</h1>
          <p className="text-gray-500">Manage your venues, track bookings, and grow your business.</p>
        </div>
        <button 
          onClick={() => { setEditingHall(null); setIsFormOpen(true); }}
          className="gold-gradient text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-gold/20 flex items-center space-x-2 hover:scale-[1.02] transition-all"
        >
          <Plus size={20} />
          <span>Add New Venue</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-100 pb-px overflow-x-auto no-scrollbar">
        {['venues', 'bookings', 'availability', 'collaborations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all relative shrink-0 ${
              activeTab === tab ? 'text-gold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="text-gold animate-spin" size={48} />
          <p className="text-gold font-bold">Loading your dashboard...</p>
        </div>
      ) : (
        <>
          {activeTab === 'venues' && (
            <div className="space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gold/5 soft-shadow">
                    <div className={`p-4 rounded-2xl bg-gray-50 w-fit mb-6 ${stat.color}`}>
                      <stat.icon size={28} />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {safeHalls.map((hall) => (
                  <div key={hall.id} className="bg-white p-8 rounded-[40px] border border-gold/5 soft-shadow flex flex-col group">
                    <div className="relative h-56 w-full mb-6 overflow-hidden rounded-3xl">
                      <img src={hall.images?.[0] || 'https://via.placeholder.com/600x400'} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button 
                          onClick={() => openEdit(hall)}
                          className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-gray-600 hover:text-gold shadow-sm transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteHall(hall.id)}
                          className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-gray-600 hover:text-pink-500 shadow-sm transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-2xl font-serif font-bold text-gray-900 mb-1">{hall.name}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1 text-gold" /> {hall.city}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${hall.price}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Per Event</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Users size={16} className="text-gold" />
                          <span className="text-sm font-bold text-gray-700">{hall.capacity} Guests</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 size={16} className="text-green-500" />
                          <span className="text-sm font-bold text-gray-700">{(hall.amenities?.length || 0)} Amenities</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('availability')}
                      className="w-full mt-4 py-4 rounded-2xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gold hover:text-white transition-all flex items-center justify-center space-x-2"
                    >
                      <Calendar size={18} />
                      <span>Manage Availability</span>
                    </button>
                  </div>
                ))}
                
                {safeHalls.length === 0 && (
                  <div className="md:col-span-2 text-center py-20 bg-white rounded-[40px] border border-dashed border-gold/30">
                    <Briefcase size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No venues listed yet</h3>
                    <p className="text-gray-500">Add your first wedding hall to start receiving bookings!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-[40px] border border-gold/5 soft-shadow overflow-hidden">
              <div className="p-10 border-b border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-gray-900">Recent Bookings</h3>
                <p className="text-gray-500">Track and manage reservations for all your venues.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Venue</th>
                      <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Client</th>
                      <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                      <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                      <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-10 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-10 py-6 font-bold text-gray-900">{booking.venue}</td>
                        <td className="px-10 py-6 text-gray-600">{booking.user}</td>
                        <td className="px-10 py-6 text-gray-500 flex items-center">
                          <Clock size={14} className="mr-2 text-gold" /> {booking.date}
                        </td>
                        <td className="px-10 py-6 font-bold text-gray-900">${booking.amount}</td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-gold/10 text-gold'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button className="text-gold font-bold text-sm hover:underline">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-500">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900">Venue Selection</h3>
                <p className="text-gray-500">Select a venue to manage its calendar and blocked dates.</p>
                <div className="space-y-4">
                  {safeHalls.map(hall => (
                    <button 
                      key={hall.id} 
                      onClick={() => setSelectedHallId(hall.id)}
                      className={`w-full p-6 rounded-3xl border transition-all flex items-center space-x-4 group ${
                        activeHallId === hall.id ? 'bg-gold border-gold text-white shadow-xl' : 'bg-white border-gold/5 soft-shadow text-gray-900 hover:border-gold/30'
                      }`}
                    >
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100">
                        <img src={hall.images?.[0] || 'https://via.placeholder.com/100x100'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold">{hall.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <AvailabilityCalendar hallId={activeHallId} />
              </div>
            </div>
          )}

          {activeTab === 'collaborations' && (
            <CollaborationManager />
          )}
        </>
      )}

      {isFormOpen && (
        <HallForm 
          hall={editingHall}
          onSubmit={handleAddHall}
          onCancel={() => { setIsFormOpen(false); setEditingHall(null); }}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;
