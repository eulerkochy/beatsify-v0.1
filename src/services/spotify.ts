import axios from 'axios';
import type { Track, SearchResult, User, Playlist } from '@/types';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Create axios instance with default config
const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
spotifyApi.interceptors.request.use((config) => {
  const tokenData = localStorage.getItem('spotify_token');
  if (tokenData) {
    try {
      const parsedToken = JSON.parse(tokenData);
      const accessToken = parsedToken.access_token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error parsing token from localStorage:', error);
    }
  }
  return config;
});

// Response interceptor for error handling
spotifyApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('spotify_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export class SpotifyService {
  // Search for tracks
  static async searchTracks(query: string, limit = 20): Promise<Track[]> {
    try {
      const response = await spotifyApi.get<SearchResult>('/search', {
        params: {
          q: query,
          type: 'track',
          limit,
          market: 'from_token',
        },
      });
      return response.data.tracks.items;
    } catch (error) {
      console.error('Error searching tracks:', error);
      throw error;
    }
  }

  // Get current user profile
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await spotifyApi.get<User>('/me');
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Get user's country
  static async getUserCountry(): Promise<string> {
    try {
      const response = await spotifyApi.get<User>('/me');
      return response.data.country || 'US';
    } catch (error) {
      console.error('Error getting user country:', error);
      return 'US';
    }
  }

  // Get track recommendations (intelligent search-based approach)
  static async getRecommendations(
    seedTracks: string[],
    limit = 20
  ): Promise<Track[]> {
    try {
      // Validate that we have at least one seed track
      if (!seedTracks || seedTracks.length === 0) {
        throw new Error('At least one seed track is required for recommendations');
      }

      const recommendations: Track[] = [];
      const processedTracks = new Set<string>();

      for (const trackId of seedTracks.slice(0, 2)) {
        try {
          // Get the seed track details
          const seedTrack = await this.getTrack(trackId);
          const mainArtist = seedTrack.artists[0];

          // Strategy 1: Search for similar tracks by the same artist (excluding the seed track)
          try {
            const artistTracksResponse = await spotifyApi.get('/search', {
              params: {
                q: `artist:"${mainArtist.name}"`,
                type: 'track',
                limit: 20,
                market: 'from_token'
              }
            });
            
            const artistTracks = artistTracksResponse.data.tracks.items
              .filter((t: Track) => t.id !== trackId && !processedTracks.has(t.id))
              .slice(0, 6);
            
            recommendations.push(...artistTracks);
            artistTracks.forEach((t: Track) => processedTracks.add(t.id));
          } catch (artistError) {
            // Silent fail - continue with other strategies
          }

          // Strategy 2: Search for tracks with similar characteristics
          try {
            const similarQuery = `${mainArtist.name} ${seedTrack.name}`;
            const similarResponse = await spotifyApi.get('/search', {
              params: {
                q: similarQuery,
                type: 'track',
                limit: 15,
                market: 'from_token'
              }
            });
            
            const similarTracks = similarResponse.data.tracks.items
              .filter((t: Track) => !processedTracks.has(t.id))
              .slice(0, 4);
            
            recommendations.push(...similarTracks);
            similarTracks.forEach((t: Track) => processedTracks.add(t.id));
          } catch (similarError) {
            // Silent fail - continue with other strategies
          }

          // Strategy 3: Search by genre if available
          if (mainArtist.genres && mainArtist.genres.length > 0) {
            try {
              const genreQuery = mainArtist.genres.slice(0, 2).join(' OR ');
              const genreResponse = await spotifyApi.get('/search', {
                params: {
                  q: `genre:${genreQuery}`,
                  type: 'track',
                  limit: 10,
                  market: 'from_token'
                }
              });
              
              const genreTracks = genreResponse.data.tracks.items
                .filter((t: Track) => !processedTracks.has(t.id))
                .slice(0, 3);
              
              recommendations.push(...genreTracks);
              genreTracks.forEach((t: Track) => processedTracks.add(t.id));
            } catch (genreError) {
              // Silent fail - continue with other strategies
            }
          }

          // Strategy 4: Search for popular tracks from similar era
          try {
            const eraResponse = await spotifyApi.get('/search', {
              params: {
                q: 'year:2015-2024',
                type: 'track',
                limit: 10,
                market: 'from_token'
              }
            });
            
            const eraTracks = eraResponse.data.tracks.items
              .filter((t: Track) => !processedTracks.has(t.id))
              .slice(0, 3);
            
            recommendations.push(...eraTracks);
            eraTracks.forEach((t: Track) => processedTracks.add(t.id));
          } catch (eraError) {
            // Silent fail - continue with other strategies
          }

          // Strategy 5: Search for trending/undiscovered tracks
          try {
            const trendingResponse = await spotifyApi.get('/search', {
              params: {
                q: 'tag:hipster',
                type: 'track',
                limit: 8,
                market: 'from_token'
              }
            });
            
            const trendingTracks = trendingResponse.data.tracks.items
              .filter((t: Track) => !processedTracks.has(t.id))
              .slice(0, 2);
            
            recommendations.push(...trendingTracks);
            trendingTracks.forEach((t: Track) => processedTracks.add(t.id));
          } catch (trendingError) {
            // Silent fail - continue with other strategies
          }

          // Strategy 6: Search for classic tracks
          try {
            const classicResponse = await spotifyApi.get('/search', {
              params: {
                q: 'year:1990-2010',
                type: 'track',
                limit: 8,
                market: 'from_token'
              }
            });
            
            const classicTracks = classicResponse.data.tracks.items
              .filter((t: Track) => !processedTracks.has(t.id))
              .slice(0, 2);
            
            recommendations.push(...classicTracks);
            classicTracks.forEach((t: Track) => processedTracks.add(t.id));
          } catch (classicError) {
            // Silent fail - continue with other strategies
          }

        } catch (trackError) {
          // Silent fail - continue with other seed tracks
        }
      }

      // If we don't have enough tracks, add more diverse tracks
      if (recommendations.length < limit) {
        try {
          const diverseResponse = await spotifyApi.get('/search', {
            params: {
              q: 'popularity:50-100',
              type: 'track',
              limit: limit - recommendations.length + 5,
              market: 'from_token'
            }
          });
          
          const diverseTracks = diverseResponse.data.tracks.items
            .filter((t: Track) => !processedTracks.has(t.id))
            .slice(0, limit - recommendations.length);
          
          recommendations.push(...diverseTracks);
        } catch (diverseError) {
          // Silent fail - return what we have
        }
      }

      // Remove duplicates and limit results
      const uniqueRecommendations = recommendations
        .filter((track, index, self) => 
          index === self.findIndex(t => t.id === track.id)
        )
        .slice(0, limit);

      return uniqueRecommendations;

    } catch (error: any) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  // Create a playlist
  static async createPlaylist(
    userId: string,
    name: string,
    description: string,
    trackUris: string[]
  ): Promise<Playlist> {
    try {
      // Create the playlist
      const playlistResponse = await spotifyApi.post<Playlist>(
        `/users/${userId}/playlists`,
        {
          name,
          description,
          public: false,
        }
      );

      const playlist = playlistResponse.data;

      // Add tracks to the playlist
      if (trackUris.length > 0) {
        await spotifyApi.post(
          `/playlists/${playlist.id}/tracks`,
          {
            uris: trackUris,
          }
        );
      }

      return playlist;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  }

  // Get track by ID
  static async getTrack(trackId: string): Promise<Track> {
    try {
      const response = await spotifyApi.get<Track>(`/tracks/${trackId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting track:', error);
      throw error;
    }
  }

  // Get multiple tracks by IDs
  static async getTracks(trackIds: string[]): Promise<Track[]> {
    try {
      const response = await spotifyApi.get<{ tracks: Track[] }>('/tracks', {
        params: {
          ids: trackIds.join(','),
        },
      });
      return response.data.tracks.filter(track => track !== null);
    } catch (error) {
      console.error('Error getting tracks:', error);
      throw error;
    }
  }
}

export default SpotifyService;
