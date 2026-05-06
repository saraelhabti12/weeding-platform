import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { serviceService } from '../services/serviceService';

export const useServiceStore = create()(
  persist(
    (set) => ({
      services: [],
      loading: false,
      error: null,

      fetchServices: async (params = {}) => {
        set({ loading: true, error: null });
        try {
          const services = await serviceService.getAll(params);
          set({ services, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      addService: async (serviceData) => {
        set({ loading: true, error: null });
        try {
          const newService = await serviceService.create(serviceData);
          set((state) => ({ 
            services: [...state.services, newService],
            loading: false 
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateService: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
          const updatedService = await serviceService.update(id, updatedData);
          set((state) => ({
            services: state.services.map((s) => s.id === id ? updatedService : s),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      deleteService: async (id) => {
        set({ loading: true, error: null });
        try {
          await serviceService.delete(id);
          set((state) => ({
            services: state.services.filter((s) => s.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateServiceStatus: async (id, status) => {
        set({ loading: true, error: null });
        try {
          const updatedService = await serviceService.updateStatus(id, status);
          set((state) => ({
            services: state.services.map((s) => s.id === id ? updatedService : s),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: 'services-storage',
    }
  )
);
