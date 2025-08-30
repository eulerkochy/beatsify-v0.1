import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import SearchBox from '@/components/SearchBox';
import Playlist from '@/components/Playlist';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Title from '@/components/Title';
import Tip from '@/components/Tip';
import { AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const {
    user,
    searchQuery,
    isSearching,
    tracks,
    mainTrack,
    isLoading,
    resetSearch,
  } = useAppStore();

  // Reset search when component unmounts
  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Top Bar - Shows when searching */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TopBar searchQuery={searchQuery} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <AnimatePresence mode="wait">
            {!isSearching ? (
              // Search Interface
              <motion.div
                key="search"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto"
              >
                <Title />
                <SearchBox />
                <Tip />
              </motion.div>
            ) : (
              // Playlist Interface
              <motion.div
                key="playlist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto"
              >
                {!isLoading && mainTrack && (
                  <Playlist mainTrack={mainTrack} tracks={tracks} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <Footer trackCount={tracks.length} />
      </motion.div>
    </div>
  );
};

export default HomePage;
