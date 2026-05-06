import { useState } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import ServiceManager from './ServiceManager';

const HallForm = ({ hall, onSubmit, onCancel }) => {
  const defaultData = {
    name: '',
    city: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    images: [''],
    amenities: [''],
    services: []
  };

  const [formData, setFormData] = useState(hall ? { ...defaultData, ...hall } : defaultData);

  const [prevHall, setPrevHall] = useState(hall);
  if (hall !== prevHall) {
    setFormData(hall ? { ...defaultData, ...hall } : defaultData);
    setPrevHall(hall);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacity: parseInt(formData.capacity),
      price: parseInt(formData.price),
      images: formData.images.filter(img => img !== ''),
      amenities: formData.amenities.filter(a => a !== '')
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="sticky top-0 bg-white px-10 py-6 border-b border-gray-100 flex justify-between items-center z-10">
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            {hall ? 'Edit Venue' : 'Register New Venue'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Venue Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Royal Palace Ballroom"
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">City</label>
              <input 
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Casablanca"
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Full Address</label>
              <input 
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. 123 Luxury Ave, Anfa District"
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Capacity (Guests)</label>
              <input 
                required
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="500"
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Daily Price ($)</label>
              <input 
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2500"
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Description</label>
            <textarea 
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about the history and beauty of your venue..."
              className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all resize-none"
            />
          </div>

          {/* Image URLs */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Gallery Images (URLs)</label>
              <button 
                type="button"
                onClick={() => addArrayItem('images')}
                className="text-gold font-bold text-xs flex items-center hover:underline"
              >
                <Plus size={14} className="mr-1" /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.images.map((url, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      value={url}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-gold outline-none transition-all text-sm"
                    />
                  </div>
                  {formData.images.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeArrayItem(index, 'images')}
                      className="p-3 text-gray-400 hover:text-pink-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Amenities & Features</label>
              <button 
                type="button"
                onClick={() => addArrayItem('amenities')}
                className="text-gold font-bold text-xs flex items-center hover:underline"
              >
                <Plus size={14} className="mr-1" /> Add Amenity
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.amenities.map((amenity, index) => (
                <div key={index} className="flex space-x-2">
                  <input 
                    value={amenity}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'amenities')}
                    placeholder="e.g. WiFi"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-gold outline-none transition-all text-sm"
                  />
                  {formData.amenities.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeArrayItem(index, 'amenities')}
                      className="p-3 text-gray-400 hover:text-pink-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add-on Services */}
          <div className="space-y-6">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Add-on Services (Optional)</label>
            <ServiceManager 
              services={formData.services}
              onChange={(services) => setFormData(prev => ({ ...prev, services }))}
            />
          </div>

          <div className="pt-10 border-t border-gray-100 flex justify-end space-x-6">
            <button 
              type="button"
              onClick={onCancel}
              className="px-10 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="gold-gradient text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-gold/20 hover:scale-105 transition-all"
            >
              {hall ? 'Save Changes' : 'Publish Venue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HallForm;
