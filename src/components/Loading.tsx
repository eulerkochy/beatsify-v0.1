import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-6 h-6 text-spotify-green" />
          </motion.div>
          <span className="text-gray-700 font-medium">Loading...</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
