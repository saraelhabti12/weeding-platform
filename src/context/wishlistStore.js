import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (hallId) =>
        set((state) => ({
          favorites: state.favorites.includes(hallId)
            ? state.favorites.filter((id) => id !== hallId)
            : [...state.favorites, hallId],
        })),
      isFavorite: (hallId) => (state) => state.favorites.includes(hallId),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
