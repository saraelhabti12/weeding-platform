import api from './api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
