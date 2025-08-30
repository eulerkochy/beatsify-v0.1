import { motion } from 'framer-motion';
import { Music, Heart } from 'lucide-react';

interface FooterProps {
  trackCount: number;
}

const Footer = ({ trackCount }: FooterProps) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="mt-12 pt-8 border-t border-white/10"
    >
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4" />
          <span>
            {trackCount} {trackCount === 1 ? 'track' : 'tracks'} in playlist
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>by Beatsify</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
