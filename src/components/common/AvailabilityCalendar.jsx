import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import availabilityService from '../../services/availabilityService';
import { format, isSameDay, parseISO } from 'date-fns';
import { Loader2, Calendar as CalendarIcon, Info } from 'lucide-react';

const AvailabilityCalendar = ({ entityType, entityId, onDateSelect, isOwner = false }) => {
  const [data, setData] = useState({ availabilities: [], bookings: [] });
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, [entityType, entityId]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const result = await availabilityService.getByEntity(entityType, entityId);
      setData(result);
    } catch (error) {
      console.error("Failed to fetch availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(formattedDate);
    }
  };

  const toggleAvailability = async () => {
    if (!selectedDate || !isOwner) return;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const existing = data.availabilities.find(a => isSameDay(parseISO(a.date), selectedDate));
    const newStatus = existing ? !existing.is_available : true;

    try {
      setUpdating(true);
      await availabilityService.update({
        entity_type: entityType,
        entity_id: entityId,
        date: dateStr,
        is_available: newStatus
      });
      await fetchAvailability();
    } catch (error) {
      console.error("Failed to update availability:", error);
    } finally {
      setUpdating(false);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;

    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Check bookings first (priority: red)
    const isBooked = data.bookings.some(b => isSameDay(parseISO(b.date), date));
    if (isBooked) return 'bg-red-500 text-white rounded-full';

    // Check explicit availability
    const avail = data.availabilities.find(a => isSameDay(parseISO(a.date), date));
    if (avail) {
      return avail.is_available ? 'bg-green-500 text-white rounded-full' : 'bg-gray-400 text-white rounded-full';
    }

    return null;
  };

  const tileDisabled = ({ date, view }) => {
    if (view !== 'month') return false;
    
    // Disable past dates
    if (date < new Date().setHours(0, 0, 0, 0)) return true;

    // If not owner, disable if booked or blocked
    if (!isOwner) {
        const isBooked = data.bookings.some(b => isSameDay(parseISO(b.date), date));
        const avail = data.availabilities.find(a => isSameDay(parseISO(a.date), date));
        const isBlocked = avail && !avail.is_available;
        const isUnmarked = !avail; // Logic: only explicit Green dates are bookable

        return isBooked || isBlocked || isUnmarked;
    }

    return false;
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-gold" /></div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[2rem] border border-gold/10 shadow-xl">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
          className="border-none w-full font-serif"
          minDate={new Date()}
        />

        <div className="mt-6 flex flex-wrap gap-4 justify-center border-t border-gray-100 pt-6">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-gray-400"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Blocked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full border border-gray-200"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Closed</span>
          </div>
        </div>
      </div>

      {isOwner && selectedDate && (
        <div className="bg-gold/5 p-6 rounded-2xl border border-gold/20 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">{format(selectedDate, 'PPP')}</p>
              <p className="text-xs text-gray-500">Manage availability for this date</p>
            </div>
            <button
              onClick={toggleAvailability}
              disabled={updating}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                updating ? 'bg-gray-100 text-gray-400' : 'gold-gradient text-white shadow-lg shadow-gold/20 hover:scale-105 active:scale-95'
              }`}
            >
              {updating ? 'Updating...' : 'Toggle Availability'}
            </button>
          </div>
        </div>
      )}

      {!isOwner && !selectedDate && (
        <div className="flex items-center space-x-2 text-gold bg-gold/5 p-4 rounded-xl border border-gold/10">
          <Info size={16} />
          <p className="text-xs font-medium">Select a green date from the calendar to proceed with booking.</p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
