import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Star, Navigation, X, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useHallStore } from '../../context/hallStore';
import { useServiceStore } from '../../context/serviceStore';
import { useFilterStore } from '../../context/filterStore';
import { Link } from 'react-router-dom';

// Custom Marker Icon
const customIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #d4af37; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; items-center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
           <div style="transform: rotate(45deg); width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapEvents = () => {
  const { setMapBounds, setMapCenter, setMapZoom } = useFilterStore();
  const map = useMapEvents({
    moveend: () => {
      setMapBounds(map.getBounds());
      setMapCenter([map.getCenter().lat, map.getCenter().lng]);
    },
    zoomend: () => {
      setMapZoom(map.getZoom());
    },
  });
  return null;
};

const MapExplorer = () => {
  const { mapCenter, mapZoom, selectedVenue, setSelectedVenue, searchRadius, setSearchRadius } = useFilterStore();
  const { halls, fetchHalls, loading: hallsLoading } = useHallStore();
  const { services, fetchServices, loading: servicesLoading } = useServiceStore();
  
  const [searchQuery, setSearchQuery] = useState('');

  // Airbnb style bottom card state
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  useEffect(() => {
    const params = {
      lat: mapCenter[0],
      lng: mapCenter[1],
      radius: searchRadius
    };
    fetchHalls(params);
    fetchServices(params);
  }, [fetchHalls, fetchServices, mapCenter, searchRadius]);

  const activeItems = useMemo(() => {
    const combined = [...halls, ...services];
    return combined.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, halls, services]);

  const loading = hallsLoading || servicesLoading;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Search Header Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-2xl px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-gold/20 flex items-center p-2">
          <div className="flex-1 flex items-center px-6 space-x-3">
            {loading ? <Loader2 className="text-gold animate-spin" size={20} /> : <Search className="text-gold" size={20} />}
            <input 
              type="text" 
              placeholder="Search wedding venues, traiteurs..." 
              className="bg-transparent border-none outline-none w-full font-bold text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-10 w-[1px] bg-gray-200"></div>
          <button className="px-6 flex items-center space-x-2 text-gray-600 font-bold hover:text-gold transition-colors">
            <SlidersHorizontal size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="gold-gradient p-3 rounded-full text-white shadow-lg">
            <Search size={20} />
          </button>
        </div>
        
        {/* Radius Selector */}
        <div className="flex justify-center mt-4 space-x-2">
          {[5, 10, 20, 50].map(r => (
            <button 
              key={r}
              onClick={() => setSearchRadius(r)}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                searchRadius === r ? 'gold-gradient text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100 hover:border-gold/30'
              }`}
            >
              {r}km
            </button>
          ))}
        </div>
      </div>

      {/* Map Implementation */}
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        
        {activeItems.filter(item => item.lat !== undefined && item.lat !== null && item.lng !== undefined && item.lng !== null).map((item) => (
          <Marker 
            key={`${item.id}-${item.lat}-${item.lng}`} 
            position={[item.lat, item.lng]} 
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setSelectedVenue(item);
                setIsCardExpanded(true);
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Floating Bottom Card (Airbnb/Uber Style) */}
      {selectedVenue && (
        <div className={`absolute bottom-0 left-0 right-0 z-[1001] transition-all duration-500 ease-in-out transform ${
          isCardExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'
        }`}>
          <div className="max-w-xl mx-auto bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden border-t border-gold/10">
            {/* Drag Handle */}
            <div 
              className="w-full py-4 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsCardExpanded(!isCardExpanded)}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-2"></div>
              {!isCardExpanded && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-black text-gold uppercase tracking-widest">{selectedVenue.name}</span>
                  <span className="text-xs text-gray-400 font-bold">• ${selectedVenue.price || selectedVenue.priceRange}</span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-3xl font-serif font-bold text-gray-900">{selectedVenue.name}</h3>
                  <p className="flex items-center text-gray-500">
                    <MapPin size={16} className="text-gold mr-1" />
                    {selectedVenue.location || selectedVenue.city}
                  </p>
                </div>
                <div className="flex items-center bg-gold/10 px-3 py-1 rounded-full text-gold font-bold">
                  <Star size={16} className="fill-gold mr-1" />
                  {selectedVenue.rating || '4.5'}
                </div>
              </div>

              {selectedVenue.images && selectedVenue.images.length > 0 && (
                <img 
                  src={selectedVenue.images[0]} 
                  className="w-full h-56 object-cover rounded-3xl shadow-lg" 
                  alt={selectedVenue.name} 
                />
              )}

              <p className="text-gray-600 leading-relaxed font-light italic">
                {selectedVenue.description}
              </p>

              <div className="flex gap-4">
                <Link 
                  to={selectedVenue.price ? `/halls/${selectedVenue.id}` : `/services`}
                  className="flex-1 gold-gradient py-5 rounded-2xl font-bold text-white text-center shadow-lg hover:scale-[1.02] transition-transform"
                >
                  View Full Details
                </Link>
                <button 
                  onClick={() => setSelectedVenue(null)}
                  className="p-5 rounded-2xl bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation Controls Overlay */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[1000] flex flex-col space-y-4">
        <button className="h-12 w-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
          <Navigation size={24} />
        </button>
        <div className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <button className="h-12 w-12 flex items-center justify-center text-gray-400 hover:bg-gray-50 border-b border-gray-100 font-bold text-xl">+</button>
          <button className="h-12 w-12 flex items-center justify-center text-gray-400 hover:bg-gray-50 font-bold text-xl">-</button>
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;
