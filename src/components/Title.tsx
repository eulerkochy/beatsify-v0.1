import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const Title = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-spotify-green rounded-full mb-6"
      >
        <Music className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-5xl font-bold text-white mb-4"
      >
        Beatsify
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-gray-300"
      >
        Your Music Buddy
      </motion.p>
    </motion.div>
  );
};

export default Title;
