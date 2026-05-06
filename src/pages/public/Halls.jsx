import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Users, DollarSign, Loader2 } from 'lucide-react';
import { useHallStore } from '../../context/hallStore';
import HallCard from '../../components/cards/HallCard';

const Halls = () => {
  const { halls, loading, fetchHalls } = useHallStore();
  
  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(10000);
  const [minCapacity, setMinCapacity] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchHalls();
  }, [fetchHalls]);

  const filteredHalls = halls.filter(hall => {
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hall.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = hall.price <= priceRange;
    const matchesCapacity = hall.capacity >= minCapacity;

    return matchesSearch && matchesPrice && matchesCapacity;
  });

  return (
    <div className="min-h-screen moroccan-pattern pb-32">
      {/* Simplified Header */}
      <div className="bg-white border-b border-gold/10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-gold font-bold text-sm uppercase tracking-[0.3em]">Venue Collection</h2>
          <h1 className="text-5xl font-serif font-bold text-gray-900">Discover Your Perfect Venue</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse through our curated selection of grand ballrooms, scenic terraces, and historic mansions.
          </p>
        </div>
      </div>

      {/* Filter Sidebar & Search */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white p-6 rounded-3xl soft-shadow border border-gold/5 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or location..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-gold/20 outline-none text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center space-x-2 px-8 py-4 border rounded-2xl transition-all font-bold ${showFilters ? 'bg-gold text-white border-gold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-widest">
                  <DollarSign size={14} className="mr-2 text-gold" />
                  Max: ${priceRange}
                </label>
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  step="500"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-widest">
                  <Users size={14} className="mr-2 text-gold" />
                  Min Guests: {minCapacity}
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex justify-between items-center mb-10">
          <p className="text-gray-500 font-medium">
            {loading ? 'Fetching venues...' : <>Showing <span className="text-gray-900 font-bold">{filteredHalls.length}</span> venues</>}
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="text-gold animate-spin" size={48} />
            <p className="text-gold font-bold animate-pulse">Loading amazing venues...</p>
          </div>
        ) : filteredHalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gold/30 soft-shadow">
            <div className="h-20 w-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gold" size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPriceRange(10000);
                setMinCapacity(0);
              }}
              className="mt-8 text-gold font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Halls;
