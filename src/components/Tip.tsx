import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const Tip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-white mb-1">Pro Tip</h3>
          <p className="text-sm text-gray-300">
            Search for your favorite song and we'll create a personalized playlist based on it!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Tip;
