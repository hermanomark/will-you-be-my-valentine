import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * Individual floating heart properties
 */
interface FloatingHeartProps {
  /** Unique identifier for the heart */
  id: number;
  /** Initial X position (percentage of viewport width) */
  initialX: number;
  /** Animation delay in seconds */
  delay: number;
  /** Animation duration in seconds */
  duration: number;
  /** Size of the heart in pixels */
  size: number;
  /** Opacity value (0-1) */
  opacity: number;
  /** Pre-computed rotation values for animation */
  rotations: [number, number, number, number];
}

/**
 * Single floating heart component with animation
 */
const FloatingHeart: React.FC<FloatingHeartProps> = ({
  initialX,
  delay,
  duration,
  size,
  opacity,
  rotations,
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: `${initialX}vw`,
        y: '110vh',
        rotate: rotations[0],
        opacity: 0,
      }}
      animate={{
        y: '-10vh',
        rotate: [rotations[1], rotations[2], rotations[3]],
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <Heart
        className="text-rose-400 fill-rose-300"
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
};

/**
 * Props for FloatingHearts component
 */
interface FloatingHeartsProps {
  /** Number of hearts to render */
  count?: number;
}

/**
 * FloatingHearts - Creates an ambient background animation of floating hearts
 * 
 * Features:
 * - Randomized positions, sizes, and timing for natural effect
 * - Infinite looping animation
 * - Performance-optimized with pointer-events disabled
 */
const generateHearts = (count: number): FloatingHeartProps[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 6,
    size: 16 + Math.random() * 24,
    opacity: 0.3 + Math.random() * 0.4,
    rotations: [
      Math.random() * 30 - 15,
      Math.random() * 30 - 15,
      Math.random() * 30 - 15,
      Math.random() * 30 - 15,
    ],
  }));

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 15 }) => {
  // Generate random heart configurations only once on initial mount
  const [hearts] = useState<FloatingHeartProps[]>(() => generateHearts(count));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} {...heart} />
      ))}
    </div>
  );
};

export default FloatingHearts;
