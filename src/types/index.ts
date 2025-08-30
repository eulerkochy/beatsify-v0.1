export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  uri: string;
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  external_urls: {
    spotify: string;
  };
  href: string;
  uri: string;
  type: string;
  genres?: string[]; // Add genres property
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
  external_urls: {
    spotify: string;
  };
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface User {
  id: string;
  display_name: string;
  email: string;
  country?: string;
  images?: Image[];
  external_urls: {
    spotify: string;
  };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  external_urls: {
    spotify: string;
  };
  images: Image[];
  tracks: {
    total: number;
  };
}

export interface SearchResult {
  tracks: {
    items: Track[];
    total: number;
  };
}

export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export interface AppState {
  // Search state
  searchQuery: string;
  isSearching: boolean;
  
  // Playlist state
  tracks: Track[];
  mainTrack: Track | null;
  isLoading: boolean;
  lastPlaylistUrl: string | null;
  
  // User state
  user: User | null;
  token: SpotifyToken | null;
  country: string;
  
  // UI state
  isModalOpen: boolean;
  alert: AlertState | null;
}

export interface AlertState {
  type: 'success' | 'error' | 'info';
  message: string;
  title?: string;
}

export interface SearchActions {
  setSearchQuery: (query: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  resetSearch: () => void;
}

export interface PlaylistActions {
  setTracks: (tracks: Track[]) => void;
  setMainTrack: (track: Track | null) => void;
  addTrack: (track: Track) => void;
  removeTrack: (trackId: string) => void;
  clearTracks: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setLastPlaylistUrl: (url: string | null) => void;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  setToken: (token: SpotifyToken | null) => void;
  setCountry: (country: string) => void;
  logout: () => void;
}

export interface UIActions {
  setIsModalOpen: (isOpen: boolean) => void;
  setAlert: (alert: AlertState | null) => void;
  clearAlert: () => void;
}

export type AppActions = SearchActions & PlaylistActions & UserActions & UIActions;
export type AppStore = AppState & AppActions;
