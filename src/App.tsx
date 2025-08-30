import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { SpotifyService } from '@/services/spotify';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import Loading from '@/components/Loading';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const {
    setUser,
    setToken,
    setCountry,
    isLoading,
  } = useAppStore();

  // Initialize app on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for stored token
        const storedToken = localStorage.getItem('spotify_token');
        if (storedToken) {
          setToken(JSON.parse(storedToken));
          
          // Get user profile
          const userProfile = await SpotifyService.getCurrentUser();
          setUser(userProfile);
          
          // Get user country
          const country = await SpotifyService.getUserCountry();
          setCountry(country);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        // Clear invalid token
        localStorage.removeItem('spotify_token');
        setToken(null);
        setUser(null);
      }
    };

    initializeApp();
  }, [setUser, setToken, setCountry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-dark via-spotify-black to-gray-900">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AnimatePresence>

      {/* Global Loading Overlay */}
      {isLoading && <Loading />}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
