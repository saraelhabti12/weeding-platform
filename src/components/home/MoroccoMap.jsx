import { MapPin } from 'lucide-react';

const cities = [
  { name: 'Tangier', x: '55%', y: '10%' },
  { name: 'Casablanca', x: '35%', y: '40%' },
  { name: 'Rabat', x: '45%', y: '32%' },
  { name: 'Marrakech', x: '30%', y: '65%' },
  { name: 'Fes', x: '65%', y: '35%' },
  { name: 'Agadir', x: '20%', y: '85%' },
];

const MoroccoMap = ({ onCitySelect, selectedCity }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] bg-pink-soft/30 rounded-[3rem] border-2 border-gold/20 p-8 shadow-inner overflow-hidden">
      {/* Stylized Morocco Shape (Simplified) */}
      <svg viewBox="0 0 500 600" className="w-full h-full drop-shadow-2xl">
        <path
          d="M250,50 L350,80 L450,150 L420,250 L380,350 L300,550 L150,580 L50,450 L100,300 L150,150 Z"
          fill="white"
          stroke="#d4af37"
          strokeWidth="2"
          className="transition-all duration-500"
        />
        
        {/* City Markers */}
        {cities.map((city) => (
          <g 
            key={city.name} 
            className="cursor-pointer group"
            onClick={() => onCitySelect(city.name)}
          >
            <circle
              cx={city.x}
              cy={city.y}
              r="8"
              fill={selectedCity === city.name ? "#d4af37" : "white"}
              stroke="#d4af37"
              strokeWidth="2"
              className="transition-all duration-300 group-hover:r-12"
            />
            <text
              x={city.x}
              y={city.y}
              dx="15"
              dy="5"
              className={`text-sm font-bold font-serif transition-all duration-300 ${
                selectedCity === city.name ? "fill-gold scale-110" : "fill-gray-600 group-hover:fill-gold"
              }`}
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gold/20 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gold uppercase tracking-widest">Selected Region</p>
          <h4 className="text-2xl font-serif font-bold text-gray-900">{selectedCity || "Select a City"}</h4>
        </div>
        <div className="h-12 w-12 rounded-full gold-gradient flex items-center justify-center text-white shadow-lg">
          <MapPin size={24} />
        </div>
      </div>
    </div>
  );
};

export default MoroccoMap;
