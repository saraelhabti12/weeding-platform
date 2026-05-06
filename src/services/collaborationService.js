import api from './api';

export const collaborationService = {
  getAll: async () => {
    const response = await api.get('/collaborations');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/collaborations', data);
    return response.data;
  },

  update: async (id, status) => {
    const response = await api.put(`/collaborations/${id}`, { status });
    return response.data;
  }
};

export default collaborationService;
