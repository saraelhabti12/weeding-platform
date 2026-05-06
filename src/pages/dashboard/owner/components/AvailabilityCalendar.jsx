import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useHallStore } from '../../../../context/hallStore';

const AvailabilityCalendar = ({ hallId }) => {
  const { halls, toggleBlockedDate } = useHallStore();
  const hall = halls.find(h => h.id === hallId);
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!hall) return (
    <div className="bg-white p-12 rounded-[32px] border border-gold/10 text-center flex flex-col items-center">
      <CalendarIcon size={48} className="text-gold/20 mb-4" />
      <h3 className="text-xl font-bold text-gray-400">Select a venue to manage availability</h3>
    </div>
  );

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const formatYearMonth = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  const formatDay = (day) => day.toString().padStart(2, '0');

  const handleToggle = (day) => {
    const dateStr = `${formatYearMonth(currentDate)}-${formatDay(day)}`;
    toggleBlockedDate(hallId, dateStr);
  };

  return (
    <div className="bg-white p-10 rounded-[40px] border border-gold/5 soft-shadow">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-3xl font-serif font-bold text-gray-900">{monthNames[currentDate.getMonth()]}</h3>
          <p className="text-sm text-gold font-black uppercase tracking-[0.2em]">{currentDate.getFullYear()}</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={prevMonth} className="p-3 bg-gray-50 hover:bg-gold hover:text-white rounded-2xl transition-all duration-300">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextMonth} className="p-3 bg-gray-50 hover:bg-gold hover:text-white rounded-2xl transition-all duration-300">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-6">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-black text-gray-300 uppercase tracking-widest py-4">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="p-4"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${formatYearMonth(currentDate)}-${formatDay(day)}`;
          const isAvailable = hall.availableDates?.includes(dateStr);
          
          return (
            <button 
              key={day}
              onClick={() => handleToggle(day)}
              className={`aspect-square rounded-[20px] text-base font-bold transition-all relative group flex flex-col items-center justify-center ${
                isAvailable 
                  ? 'bg-gold text-white shadow-lg shadow-gold/20 scale-105 z-10' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gold/10 hover:text-gold border border-transparent'
              }`}
            >
              <span>{day}</span>
              <div className={`h-1 w-1 rounded-full mt-1 ${isAvailable ? 'bg-white' : 'bg-transparent'}`}></div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-8 pt-8 border-t border-dashed border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="h-4 w-4 rounded-lg bg-gold shadow-sm"></div>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Available for Wedding</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-4 w-4 rounded-lg bg-gray-100"></div>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Blocked / Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
