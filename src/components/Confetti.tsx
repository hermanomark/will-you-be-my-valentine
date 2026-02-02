import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

/**
 * Individual confetti piece properties
 */
interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  type: 'heart' | 'sparkle' | 'star';
  color: string;
}

/**
 * Props for Confetti component
 */
interface ConfettiProps {
  /** Whether confetti animation is active */
  isActive: boolean;
  /** Number of confetti pieces to generate */
  count?: number;
}

/**
 * Available colors for confetti pieces
 */
const confettiColors = [
  'text-rose-400',
  'text-pink-400',
  'text-red-400',
  'text-rose-300',
  'text-pink-300',
  'text-amber-300',
];

/**
 * Generate confetti pieces with random properties
 */
const generatePieces = (count: number): ConfettiPiece[] => {
  const types: ConfettiPiece['type'][] = ['heart', 'sparkle', 'star'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 60,
    y: 50 + (Math.random() - 0.5) * 40,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 1,
    type: types[Math.floor(Math.random() * types.length)],
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));
};

/**
 * Confetti - Celebration animation with hearts, sparkles, and stars
 * 
 * Features:
 * - Burst animation on activation
 * - Multiple particle types (hearts, sparkles, stars)
 * - Random colors, positions, and rotations
 * - Auto-cleanup after animation
 */
const Confetti: React.FC<ConfettiProps> = ({
  isActive,
  count = 50,
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  // Handle activation - generate pieces when isActive becomes true
  // Using requestAnimationFrame defers the update to avoid sync setState warning
  useEffect(() => {
    if (isActive) {
      // Defer state update to next frame to avoid synchronous setState in effect
      const rafId = requestAnimationFrame(() => {
        setPieces(generatePieces(count));
      });

      // Clear confetti after animation completes
      const timeout = setTimeout(() => setPieces([]), 3000);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timeout);
      };
    }
  }, [isActive, count]);

  const renderIcon = (type: ConfettiPiece['type'], color: string) => {
    const iconProps = { className: `w-6 h-6 ${color} fill-current` };
    switch (type) {
      case 'heart':
        return <Heart {...iconProps} />;
      case 'sparkle':
        return <Sparkles {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
    }
  };

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed pointer-events-none z-50"
          initial={{
            left: '50%',
            top: '50%',
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            scale: piece.scale,
            rotate: piece.rotation,
            opacity: 0,
            y: [0, -100, 200],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.5,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {renderIcon(piece.type, piece.color)}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default Confetti;
