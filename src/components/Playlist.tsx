import { motion } from 'framer-motion';
import { Play, Plus, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { SpotifyService } from '@/services/spotify';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Track } from '@/types';
import { formatDuration, formatArtistNames } from '@/lib/utils';

interface PlaylistProps {
  mainTrack: Track;
  tracks: Track[];
}

const Playlist = ({ mainTrack, tracks }: PlaylistProps) => {
  const { user, setLastPlaylistUrl, setIsLoading } = useAppStore();
  const { toast } = useToast();

  const handleCreatePlaylist = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const trackUris = [mainTrack, ...tracks].map(track => track.uri);
      const playlistName = `Beatsify - Based on "${mainTrack.name}"`;
      const description = `A personalized playlist created by Beatsify based on "${mainTrack.name}" by ${formatArtistNames(mainTrack.artists)}`;

      const playlist = await SpotifyService.createPlaylist(
        user.id,
        playlistName,
        description,
        trackUris
      );

      setLastPlaylistUrl(playlist.external_urls.spotify);
      toast({
        title: "Playlist Created!",
        description: "Your playlist has been saved to Spotify.",
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create playlist. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTrack = (track: Track) => {
    window.open(track.external_urls.spotify, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Main Track */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                {mainTrack.album.images[0] && (
                  <img
                    src={mainTrack.album.images[0].url}
                    alt={mainTrack.album.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {mainTrack.name}
                </h3>
                <p className="text-gray-300 truncate">
                  {formatArtistNames(mainTrack.artists)}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {mainTrack.album.name}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePlayTrack(mainTrack)}
                  className="text-white hover:bg-white/10"
                >
                  <Play className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(mainTrack.external_urls.spotify, '_blank')}
                  className="text-white hover:bg-white/10"
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommended Tracks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">
            Recommended Tracks ({tracks.length})
          </h3>
          <Button
            onClick={handleCreatePlaylist}
            className="bg-spotify-green hover:bg-green-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Save Playlist
          </Button>
        </div>

        <div className="space-y-2">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
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
                      <h4 className="font-medium text-white truncate">
                        {track.name}
                      </h4>
                      <p className="text-sm text-gray-300 truncate">
                        {formatArtistNames(track.artists)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{formatDuration(track.duration_ms)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePlayTrack(track)}
                        className="text-white hover:bg-white/10 h-8 w-8"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
