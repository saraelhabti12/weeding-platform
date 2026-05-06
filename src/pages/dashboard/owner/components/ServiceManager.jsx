import { useState } from 'react';
import { Plus, Trash2, Music, Utensils, Flower2, Camera, Car } from 'lucide-react';

const availableIcons = [
  { name: 'Music', icon: Music },
  { name: 'Catering', icon: Utensils },
  { name: 'Decor', icon: Flower2 },
  { name: 'Photo', icon: Camera },
  { name: 'Car', icon: Car },
];

const ServiceManager = ({ services = [], onChange }) => {
  const [newService, setNewService] = useState({ name: '', price: '', icon: 'Music' });

  const addService = () => {
    if (newService.name && newService.price) {
      onChange([...services, newService]);
      setNewService({ name: '', price: '', icon: 'Music' });
    }
  };

  const removeService = (index) => {
    onChange(services.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-3xl border border-gold/10">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Add Add-on Service</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) => setNewService({...newService, name: e.target.value})}
            className="p-3 rounded-xl bg-white border border-transparent focus:border-gold outline-none text-sm"
          />
          <input 
            placeholder="Price ($)"
            type="number"
            value={newService.price}
            onChange={(e) => setNewService({...newService, price: e.target.value})}
            className="p-3 rounded-xl bg-white border border-transparent focus:border-gold outline-none text-sm"
          />
          <select 
            value={newService.icon}
            onChange={(e) => setNewService({...newService, icon: e.target.value})}
            className="p-3 rounded-xl bg-white border border-transparent focus:border-gold outline-none text-sm"
          >
            {availableIcons.map(item => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
          <button 
            type="button"
            onClick={addService}
            className="gold-gradient text-white rounded-xl font-bold text-sm flex items-center justify-center py-3"
          >
            <Plus size={16} className="mr-2" /> Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => {
          const IconComp = availableIcons.find(i => i.name === service.icon)?.icon || Music;
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 soft-shadow">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <IconComp size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{service.name}</p>
                  <p className="text-xs text-gray-500">${service.price}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => removeService(index)}
                className="p-2 text-gray-400 hover:text-pink-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceManager;
