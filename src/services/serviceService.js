import api from './api';

export const serviceService = {
  getAll: async (params = {}) => {
    const response = await api.get('/services', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  create: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  update: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/services/${id}/status`, { status });
    return response.data;
  },

  updateAvailability: async (id, dates) => {
    const response = await api.put(`/services/${id}/availability`, { dates });
    return response.data;
  },
};

export default serviceService;
