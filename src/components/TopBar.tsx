import { motion } from 'framer-motion';
import { ArrowLeft, User } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface TopBarProps {
  searchQuery: string;
}

const TopBar = ({ searchQuery }: TopBarProps) => {
  const { user, resetSearch, setIsModalOpen } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-between w-full mb-8"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={resetSearch}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-medium text-white">Search Results</h2>
          <p className="text-sm text-gray-400">"{searchQuery}"</p>
        </div>
      </div>

      {user && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          {user.images?.[0] ? (
            <img
              src={user.images[0].url}
              alt={user.display_name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="hidden sm:block text-sm">{user.display_name}</span>
        </button>
      )}
    </motion.div>
  );
};

export default TopBar;
