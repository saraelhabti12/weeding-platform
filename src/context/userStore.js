import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      loading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.login(credentials);
          set({ user: data.user, isAuthenticated: true, loading: false });
          return data.user;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            loading: false 
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.register(userData);
          set({ user: data.user, isAuthenticated: true, loading: false });
          return data.user;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            loading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } finally {
          set({ user: null, users: [], isAuthenticated: false });
          localStorage.removeItem('token');
        }
      },

      fetchMe: async () => {
        if (!localStorage.getItem('token')) return;
        
        set({ loading: true });
        try {
          const user = await authService.getMe();
          set({ user, isAuthenticated: true, loading: false });
        } catch {
          set({ user: null, isAuthenticated: false, loading: false });
          localStorage.removeItem('token');
        }
      },

      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const users = await userService.getAll();
          set({ users, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateUserStatus: async (userId, status) => {
        try {
          await userService.updateStatus(userId, status);
          set((state) => ({
            users: state.users.map((u) => u.id === userId ? { ...u, status } : u)
          }));
        } catch (error) {
          set({ error: error.message });
        }
      },

      deleteUser: async (userId) => {
        try {
          await userService.delete(userId);
          set((state) => ({
            users: state.users.filter((u) => u.id !== userId)
          }));
        } catch (error) {
          set({ error: error.message });
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
