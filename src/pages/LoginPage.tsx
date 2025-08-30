import React, { useEffect, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { SpotifyService } from '@/services/spotify';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Music } from 'lucide-react';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/callback';

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { setUser, setToken } = useAppStore();
  const hasProcessedCode = useRef(false);

  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (code && !hasProcessedCode.current) {
      hasProcessedCode.current = true;
      
      const exchangeCodeForToken = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/auth/spotify/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (response.ok) {
            const tokenData = await response.json();
            localStorage.setItem('spotify_token', JSON.stringify(tokenData));
            setToken(tokenData);
            
            const user = await SpotifyService.getCurrentUser();
            setUser(user);
            
            window.location.href = '/';
          } else {
            const errorData = await response.json();
            alert(`Authentication failed: ${errorData.error || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Authentication failed:', error);
          alert('Authentication failed. Please try again.');
        }
      };

      exchangeCodeForToken();
    }
  }, [code, setUser, setToken]);

  // If there's an error, show it
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-500">Authentication Error</CardTitle>
            <CardDescription>
              There was an error during authentication: {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If we have a code, show loading
  if (code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Authenticating...</CardTitle>
            <CardDescription>
              Please wait while we complete your authentication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spotify-green"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login page
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private')}&show_dialog=true`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Beatsify</CardTitle>
          <CardDescription>
            Create amazing playlists with AI-powered recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleLogin}
            className="w-full bg-spotify-green hover:bg-spotify-green/90 text-white font-semibold py-3"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect with Spotify
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-4">
            By connecting, you agree to our terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
