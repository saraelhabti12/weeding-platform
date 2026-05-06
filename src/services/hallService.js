import api from './api';

export const hallService = {
  getAll: async (params = {}) => {
    const response = await api.get('/halls', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/halls/${id}`);
    return response.data;
  },

  create: async (hallData) => {
    const response = await api.post('/halls', hallData);
    return response.data;
  },

  update: async (id, hallData) => {
    const response = await api.put(`/halls/${id}`, hallData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/halls/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/halls/${id}/status`, { status });
    return response.data;
  },

  updateAvailability: async (id, dates) => {
    const response = await api.put(`/halls/${id}/availability`, { dates });
    return response.data;
  },
};

export default hallService;
