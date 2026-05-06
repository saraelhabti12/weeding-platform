import api from './api';

const bookingService = {
  getAll: async () => {
    const response = await api.get('/user/bookings');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  update: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

export default bookingService;
