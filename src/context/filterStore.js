import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  mapCenter: [31.7917, -7.0926], // Center of Morocco
  mapZoom: 6,
  mapBounds: null,
  selectedVenue: null,
  searchRadius: 20, // km
  
  setMapCenter: (center) => set({ mapCenter: center }),
  setMapZoom: (zoom) => set({ mapZoom: zoom }),
  setMapBounds: (bounds) => set({ mapBounds: bounds }),
  setSelectedVenue: (venue) => set({ selectedVenue: venue }),
  setSearchRadius: (radius) => set({ searchRadius: radius }),
  
  resetFilters: () => set({ 
    mapCenter: [31.7917, -7.0926], 
    mapZoom: 6, 
    mapBounds: null, 
    selectedVenue: null,
    searchRadius: 20 
  }),
}));
