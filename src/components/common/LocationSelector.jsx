import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, Loader2, ChevronRight } from 'lucide-react';
import { useFilterStore } from '../../context/filterStore';
import { cityDistricts } from '../../services/mockData';

const LocationSelector = () => {
  const navigate = useNavigate();
  const { selectedCity, selectedDistrict, isLiveLocation, setCity, setDistrict } = useFilterStore();
  const [isDetecting, setIsDetecting] = useState(false);
  
  const cities = Object.keys(cityDistricts);
  const districts = cityDistricts[selectedCity] || [];

  const handleExplore = () => {
    const params = new URLSearchParams();
    if (selectedCity !== 'All') params.append('city', selectedCity);
    if (selectedDistrict !== 'All') params.append('district', selectedDistrict);
    navigate(`/halls?${params.toString()}`);
  };

  const detectLocation = (e) => {
    e.stopPropagation();
    setIsDetecting(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setTimeout(() => {
          const mockCities = ['Casablanca', 'Marrakech', 'Tangier', 'Rabat'];
          const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
          setCity(randomCity, true);
          setIsDetecting(false);
        }, 1200);
      },
      () => {
        alert("Location access denied");
        setIsDetecting(false);
      }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-gold/10">
        <div className="flex flex-col md:flex-row items-stretch">
          
          {/* City Selection - inDrive Style */}
          <div className="flex-1 p-6 md:p-8 flex items-center space-x-6 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer group relative">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-white rounded-full border-2 border-gold flex items-center justify-center">
                <div className="h-1.5 w-1.5 bg-gold rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <label className="text-[11px] font-black text-gold uppercase tracking-[0.2em] mb-1">Select City</label>
              <div className="relative">
                <select 
                  className="w-full bg-transparent border-none outline-none font-serif text-2xl font-bold text-gray-900 appearance-none cursor-pointer pr-10"
                  value={selectedCity}
                  onChange={(e) => setCity(e.target.value, false)}
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>

            {/* Detect Button Integrated */}
            <button 
              onClick={detectLocation}
              disabled={isDetecting}
              className={`p-3 rounded-xl transition-all ${isLiveLocation ? 'bg-gold text-white' : 'bg-gray-100 text-gray-500 hover:bg-gold/10 hover:text-gold'}`}
              title="Use current location"
            >
              {isDetecting ? <Loader2 size={20} className="animate-spin" /> : <Navigation size={20} />}
            </button>
          </div>

          {/* District Selection */}
          <div className="flex-1 p-6 md:p-8 flex items-center space-x-6 hover:bg-gray-50/50 transition-colors cursor-pointer group">
            <div className="h-12 w-12 rounded-full bg-pink-soft flex items-center justify-center text-pink-deep group-hover:scale-110 transition-transform">
              <div className="h-3 w-3 rounded-full border-2 border-pink-deep"></div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <label className="text-[11px] font-black text-pink-deep uppercase tracking-[0.2em] mb-1">Area / Hay</label>
              <div className="relative">
                <select 
                  className="w-full bg-transparent border-none outline-none font-serif text-2xl font-bold text-gray-900 appearance-none cursor-pointer pr-10"
                  value={selectedDistrict}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="All">All Regions</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Large inDrive Style Search Button */}
          <button 
            onClick={handleExplore}
            className="bg-black hover:bg-gray-900 text-white px-10 py-8 flex items-center justify-center space-x-4 transition-all active:scale-95 group"
          >
            <div className="h-14 w-14 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform">
              <Search size={28} />
            </div>
            <span className="text-xl font-bold tracking-tight md:hidden lg:inline">Find Now</span>
          </button>

        </div>
      </div>
      
      {/* Visual Line Connector (inDrive Detail) */}
      <div className="hidden md:flex justify-center -mt-[1px]">
        <div className="h-1 w-32 bg-gold/20 rounded-b-full"></div>
      </div>
    </div>
  );
};

export default LocationSelector;
