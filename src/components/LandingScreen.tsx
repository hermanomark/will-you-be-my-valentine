import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

/**
 * Props for LandingScreen component
 */
interface LandingScreenProps {
  /** Callback when "Yes" button is clicked */
  onYes: () => void;
  /** Callback when "No" button is clicked */
  onNo: () => void;
  /** Current size multiplier for "No" button */
  noButtonScale: number;
  /** Current size multiplier for "Yes" button */
  yesButtonScale: number;
}

/**
 * Animation variants for container elements
 */
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Animation variants for individual items
 */
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

/**
 * Animation variants for the heart icon
 */
const heartVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * LandingScreen - The main landing page with the Valentine's question
 * 
 * Features:
 * - Romantic message with animated heart
 * - Interactive Yes/No buttons with playful behavior
 * - Smooth entrance animations
 * - Responsive mobile-first design
 */
export const LandingScreen: React.FC<LandingScreenProps> = ({
  onYes,
  onNo,
  noButtonScale,
  yesButtonScale,
}) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Decorative sparkles */}
      <motion.div
        className="absolute top-10 left-10 text-amber-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute top-20 right-16 text-pink-400"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      {/* Main content card */}
      <motion.div
        className="glass-effect rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
        variants={itemVariants}
      >
        {/* Animated heart */}
        <motion.div
          className="mb-6 flex justify-center"
          variants={heartVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative">
            <Heart className="w-20 h-20 md:w-24 md:h-24 text-rose-500 fill-rose-400" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-20 h-20 md:w-24 md:h-24 text-rose-300 fill-rose-200 blur-md" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main question */}
        <motion.h1
          className="font-romantic text-4xl md:text-5xl lg:text-6xl text-rose-600 mb-4 text-shadow-soft"
          variants={itemVariants}
        >
          Will you be my
        </motion.h1>
        <motion.h2
          className="font-romantic text-5xl md:text-6xl lg:text-7xl text-rose-500 mb-8 text-shadow-soft"
          variants={itemVariants}
        >
          Valentine?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-rose-400 mb-10 text-lg"
          variants={itemVariants}
        >
          You make every day feel like a fairytale 💕
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div
            animate={{ scale: yesButtonScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <AnimatedButton
              onClick={onYes}
              variant="primary"
             
            >
              Yes, I'd love to! 💝
            </AnimatedButton>
          </motion.div>

          <motion.div
            animate={{ scale: noButtonScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <AnimatedButton
              onClick={onNo}
              variant="secondary"
            >
              No
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer message */}
      {/* <motion.p
        className="mt-8 text-rose-300 text-sm"
        variants={itemVariants}
      >
        Made with love ❤️
      </motion.p> */}
    </motion.div>
  );
};

export default LandingScreen;
