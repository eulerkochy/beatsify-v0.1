import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Music } from 'lucide-react';
import { useQuery } from 'react-query';
import { useAppStore } from '@/store/useAppStore';
import { SpotifyService } from '@/services/spotify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Track } from '@/types';
import { formatArtistNames } from '@/lib/utils';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setMainTrack, setTracks, setIsLoading } = useAppStore();

  // Search query
  const { data: searchResults, isLoading: isSearching } = useQuery(
    ['search', query],
    () => SpotifyService.searchTracks(query, 10),
    {
      enabled: query.length >= 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handleTrackSelect = useCallback(async (track: Track) => {
    setIsLoading(true);
    setIsOpen(false);
    setQuery(track.name);
    
    try {
      // First, verify the track exists by getting its details
      await SpotifyService.getTrack(track.id);
      
      // Get recommendations based on the selected track
      const recommendations = await SpotifyService.getRecommendations([track.id], 20);
      
      setMainTrack(track);
      setTracks(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('Unable to get recommendations for this track. Please try a different song.');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setMainTrack, setTracks]);

  // Handle search results
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [searchResults]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !searchResults) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleTrackSelect(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, handleTrackSelect]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && searchResults && setIsOpen(true)}
          placeholder="Search for a song..."
          className="pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:ring-spotify-green focus:border-spotify-green"
        />
        
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && searchResults && searchResults.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="max-h-80 overflow-y-auto">
              {searchResults.map((track, index) => (
                <motion.button
                  key={track.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleTrackSelect(track)}
                  className={`
                    w-full p-4 text-left hover:bg-accent transition-colors flex items-center gap-3
                    ${selectedIndex === index ? 'bg-accent' : ''}
                  `}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded overflow-hidden">
                    {track.album.images[0] && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {track.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {formatArtistNames(track.artists)}
                    </div>
                  </div>
                  
                  <Music className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </motion.button>
              ))}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isSearching && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 text-center text-muted-foreground">
          Searching...
        </Card>
      )}
    </div>
  );
};

export default SearchBox;
