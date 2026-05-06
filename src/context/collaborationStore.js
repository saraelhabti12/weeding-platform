import { create } from 'zustand';
import { collaborationService } from '../services/collaborationService';

export const useCollaborationStore = create((set) => ({
  collaborations: [],
  loading: false,
  error: null,

  fetchCollaborations: async () => {
    set({ loading: true, error: null });
    try {
      const collaborations = await collaborationService.getAll();
      set({ collaborations, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  sendRequest: async (hallId, serviceId) => {
    set({ loading: true, error: null });
    try {
      const newCollaboration = await collaborationService.create({ 
        hall_id: hallId, 
        service_id: serviceId 
      });
      set((state) => ({ 
        collaborations: [...state.collaborations, newCollaboration],
        loading: false 
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const updated = await collaborationService.update(id, status);
      set((state) => ({
        collaborations: state.collaborations.map((c) => c.id === id ? updated : c),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));
