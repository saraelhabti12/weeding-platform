import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Sparkles, Loader2 } from 'lucide-react';
import { useServiceStore } from '../../context/serviceStore';
import ServiceCard from '../../components/cards/ServiceCard';
import CollaborationModal from '../dashboard/owner/components/CollaborationModal';

const categories = [
  { name: 'All', slug: 'All' },
  { name: 'DJ', slug: 'dj' },
  { name: 'Traiteur', slug: 'traiteur' },
  { name: 'Negafa', slug: 'negafa' },
  { name: 'Photography', slug: 'photography' },
  { name: 'Dakka Marrakchia', slug: 'dakka-marrakchia' },
  { name: 'Hair & Makeup', slug: 'hair-makeup' }
];

const cities = ['All', 'Casablanca', 'Marrakech', 'Rabat', 'Tangier', 'Agadir'];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { services, loading, fetchServices } = useServiceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceForCollab, setSelectedServiceForCollab] = useState(null);

  const categoryFilter = searchParams.get('category') || 'All';
  const cityFilter = searchParams.get('city') || 'All';

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All') newParams.delete(key);
    else newParams.set(key, value);
    setSearchParams(newParams);
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = categoryFilter === 'All' || service.slug === categoryFilter;
    const matchesCity = cityFilter === 'All' || service.city === cityFilter;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream moroccan-pattern pb-32">
      {selectedServiceForCollab && (
        <CollaborationModal 
          service={selectedServiceForCollab} 
          onCancel={() => setSelectedServiceForCollab(null)} 
        />
      )}
      {/* Header */}
      <div className="bg-white border-b border-gold/10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-gold font-bold text-sm uppercase tracking-[0.4em]">Elite Partners</h2>
          <h1 className="text-6xl font-serif font-bold text-gray-900">Wedding Professionals</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Discover the most talented artists and service providers in Morocco to make your celebration truly legendary.
          </p>
        </div>
      </div>

      {/* Modern Filter Interface */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white p-8 rounded-[3rem] soft-shadow border border-gold/5 space-y-8">
          {/* Top Row: Search and City */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or description..." 
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-none outline-none font-medium focus:ring-2 focus:ring-gold/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64 relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gold" size={20} />
              <select 
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border-none outline-none font-bold text-gray-700 appearance-none cursor-pointer"
                value={cityFilter}
                onChange={(e) => updateParams('city', e.target.value)}
              >
                {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
              </select>
            </div>
          </div>

          {/* Bottom Row: Categories Pills */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-4 no-scrollbar">
            <div className="p-2 bg-gold/10 rounded-xl text-gold shrink-0">
              <SlidersHorizontal size={20} />
            </div>
            {categories.map((cat) => (
              <button 
                key={cat.slug}
                onClick={() => updateParams('category', cat.slug)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shrink-0 border ${
                  categoryFilter === cat.slug ? 'gold-gradient text-white border-transparent shadow-lg' : 'bg-white text-gray-500 border-gray-100 hover:border-gold/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="text-gold animate-spin" size={48} />
            <p className="text-gold font-bold animate-pulse">Loading elite services...</p>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onCollaborate={setSelectedServiceForCollab}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gold/30">
            <div className="h-20 w-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-gold" size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-500">Try adjusting your filters to find providers in other categories or cities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;

