import { Calendar, Heart, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../../context/wishlistStore';
import { useHallStore } from '../../../context/hallStore';
import HallCard from '../../../components/cards/HallCard';

const UserOverview = () => {
  const { favorites } = useWishlistStore();
  const { halls } = useHallStore();
  const favoriteHalls = halls.filter(h => favorites.includes(h.id));

  const stats = [
    { label: 'Upcoming Bookings', value: '0', icon: Calendar, color: 'text-gold' },
    { label: 'Saved Venues', value: favorites.length.toString(), icon: Heart, color: 'text-pink-500' },
    { label: 'Total Spent', value: '$0', icon: DollarSign, color: 'text-green-500' },
    { label: 'Pending Quotes', value: '0', icon: Clock, color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Welcome back, Sarah</h1>
        <p className="text-gray-500">Manage your dream wedding planning and saved venues.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gold/5 soft-shadow">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Your Wishlist</h2>
            <p className="text-gray-500 mt-2">Venues you've saved for your special day.</p>
          </div>
          {favoriteHalls.length > 0 && (
            <span className="text-gold font-bold hover:underline cursor-pointer flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </span>
          )}
        </div>

        {favoriteHalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gold/30">
            <Heart size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start exploring venues and save your favorites!</p>
            <a href="/halls" className="inline-flex items-center space-x-2 text-gold font-bold hover:underline">
              Browse Venues <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        )}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="bg-white p-10 rounded-[40px] border border-gold/5 soft-shadow">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-6">
          <p className="text-gray-400 italic">No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
