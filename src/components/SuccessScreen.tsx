import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Heart, PartyPopper, Sparkles, Stars } from 'lucide-react';

/**
 * Props for SuccessScreen component
 */

/**
 * Animation variants for container
 */
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
 * Animation for celebratory elements
 */
const celebrateVariants: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
  },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

/**
 * SuccessScreen - Displayed after user accepts the Valentine's invitation
 * 
 * Features:
 * - Celebratory message with animations
 * - Floating decorative icons
 * - Heartfelt thank you message
 * - Option to restart the experience
 */
export const SuccessScreen: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated decorative icons */}
      <motion.div
        className="absolute top-16 left-8 text-amber-400"
        variants={celebrateVariants}
        initial="initial"
        animate="animate"
      >
        <Stars className="w-12 h-12" />
      </motion.div>
      <motion.div
        className="absolute top-24 right-12 text-rose-400"
        variants={celebrateVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <PartyPopper className="w-10 h-10" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-16 text-pink-400"
        variants={celebrateVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-24 right-8 text-rose-300"
        variants={celebrateVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        <Heart className="w-10 h-10 fill-rose-200" />
      </motion.div>

      {/* Main content card */}
      <motion.div
        className="glass-effect rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
        variants={itemVariants}
      >
        {/* Celebration icon */}
        <motion.div
          className="mb-6 flex justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-300/50 animate-pulse-glow">
              <Heart className="w-12 h-12 md:w-14 md:h-14 text-white fill-white" />
            </div>
          </div>
        </motion.div>

        {/* Success message */}
        <motion.h1
          className="font-romantic text-4xl md:text-5xl lg:text-6xl text-rose-600 mb-4 text-shadow-soft"
          variants={itemVariants}
        >
          Yay! 🎉
        </motion.h1>
        <motion.h2
          className="font-romantic text-3xl md:text-4xl text-rose-500 mb-6"
          variants={itemVariants}
        >
          You made my day!
        </motion.h2>

        {/* Romantic message */}
        <motion.p
          className="text-rose-400 mb-4 text-lg leading-relaxed"
          variants={itemVariants}
        >
          I promise to fill your days with love, laughter, and endless happiness.
        </motion.p>
        <motion.p
          className="text-rose-500 mb-8 text-xl font-medium"
          variants={itemVariants}
        >
          Can't wait to celebrate with you! 💕
        </motion.p>

        {/* Date suggestion */}
        <motion.div
          className="bg-rose-50 rounded-2xl p-6 mb-8"
          variants={itemVariants}
        >
          <p className="text-rose-400 text-sm mb-2">Save the date</p>
          <p className="font-romantic text-3xl text-rose-500">
            February 14th ❤️
          </p>
          <p className="text-rose-400 mt-2">
            Our Valentine's Day celebration!
          </p>
        </motion.div>

        {/* Hearts row */}
        <motion.div
          className="flex justify-center gap-2 mb-6"
          variants={itemVariants}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart
                className={`w-6 h-6 ${
                  i % 2 === 0 ? 'text-rose-400 fill-rose-300' : 'text-pink-400 fill-pink-300'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-8 text-rose-300 text-sm"
        variants={itemVariants}
      >
        Forever yours ❤️
      </motion.p>
    </motion.div>
  );
};

export default SuccessScreen;
