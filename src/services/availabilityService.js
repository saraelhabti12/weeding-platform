import api from './api';

const availabilityService = {
  getByEntity: async (type, id) => {
    const response = await api.get(`/availability/${type}/${id}`);
    return response.data;
  },

  update: async (data) => {
    const response = await api.post('/availability', data);
    return response.data;
  }
};

export default availabilityService;
