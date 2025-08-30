import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AppStore } from '@/types';

const initialState = {
  // Search state
  searchQuery: '',
  isSearching: false,
  
  // Playlist state
  tracks: [],
  mainTrack: null,
  isLoading: false,
  lastPlaylistUrl: null,
  
  // User state
  user: null,
  token: null,
  country: 'US',
  
  // UI state
  isModalOpen: false,
  alert: null,
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Search actions
        setSearchQuery: (query: string) => set({ searchQuery: query }),
        setIsSearching: (isSearching: boolean) => set({ isSearching }),
        resetSearch: () => set({ searchQuery: '', isSearching: false }),

        // Playlist actions
        setTracks: (tracks) => set({ tracks }),
        setMainTrack: (mainTrack) => set({ mainTrack }),
        addTrack: (track) => {
          const { tracks } = get();
          if (!tracks.find(t => t.id === track.id)) {
            set({ tracks: [...tracks, track] });
          }
        },
        removeTrack: (trackId) => {
          const { tracks } = get();
          set({ tracks: tracks.filter(track => track.id !== trackId) });
        },
        clearTracks: () => set({ tracks: [], mainTrack: null }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setLastPlaylistUrl: (lastPlaylistUrl) => set({ lastPlaylistUrl }),

        // User actions
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        setCountry: (country) => set({ country }),
        logout: () => set({ 
          user: null, 
          token: null, 
          tracks: [], 
          mainTrack: null,
          searchQuery: '',
          isSearching: false,
          isModalOpen: false,
          alert: null,
        }),

        // UI actions
        setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
        setAlert: (alert) => set({ alert }),
        clearAlert: () => set({ alert: null }),
      }),
      {
        name: 'beatsify-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          country: state.country,
          lastPlaylistUrl: state.lastPlaylistUrl,
        }),
      }
    ),
    {
      name: 'beatsify-store',
    }
  )
);
