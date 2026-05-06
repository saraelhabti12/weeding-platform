import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { hallService } from '../services/hallService';

export const useHallStore = create()(
  persist(
    (set, get) => ({
      halls: [],
      loading: false,
      error: null,

      fetchHalls: async (params = {}) => {
        set({ loading: true, error: null });
        try {
          const halls = await hallService.getAll(params);
          set({ halls, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      addHall: async (hallData) => {
        set({ loading: true, error: null });
        try {
          const newHall = await hallService.create(hallData);
          set((state) => ({ 
            halls: [...state.halls, newHall],
            loading: false 
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateHall: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
          const updatedHall = await hallService.update(id, updatedData);
          set((state) => ({
            halls: state.halls.map((h) => h.id === id ? updatedHall : h),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      deleteHall: async (id) => {
        set({ loading: true, error: null });
        try {
          await hallService.delete(id);
          set((state) => ({
            halls: state.halls.filter((h) => h.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateHallStatus: async (id, status) => {
        set({ loading: true, error: null });
        try {
          const updatedHall = await hallService.updateStatus(id, status);
          set((state) => ({
            halls: state.halls.map((h) => h.id === id ? updatedHall : h),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      toggleBlockedDate: async (hallId, date) => {
        const hall = get().halls.find(h => h.id === hallId);
        if (!hall) return;

        const currentDates = hall.availableDates || [];
        const newDates = currentDates.includes(date)
          ? currentDates.filter(d => d !== date)
          : [...currentDates, date];

        try {
          await hallService.updateAvailability(hallId, newDates);
          set((state) => ({
            halls: state.halls.map((h) => 
              h.id === hallId ? { ...h, availableDates: newDates } : h
            )
          }));
        } catch (error) {
          console.error("Failed to update availability:", error);
        }
      },
    }),
    {
      name: 'halls-storage',
    }
  )
);
