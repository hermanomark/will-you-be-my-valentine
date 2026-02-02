import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

/**
 * Button variant types for different visual styles
 */
type ButtonVariant = 'primary' | 'secondary';

/**
 * Props for the AnimatedButton component
 */
interface AnimatedButtonProps {
  /** Button text content */
  children: React.ReactNode;
  /** Click handler function */
  onClick: () => void;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Optional icon to display before text */
  icon?: LucideIcon;
  /** Additional CSS classes */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Framer Motion animation variants for button interactions
 */
const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

/**
 * Style configurations for different button variants
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-rose-500 to-pink-500
    hover:from-rose-600 hover:to-pink-600
    text-white font-semibold
    shadow-lg shadow-rose-300/50
    hover:shadow-xl hover:shadow-rose-400/50
  `,
  secondary: `
    bg-white/80 backdrop-blur-sm
    text-rose-600 font-semibold
    border-2 border-rose-200
    hover:border-rose-300 hover:bg-white
    shadow-md shadow-rose-100/50
  `,
};

/**
 * AnimatedButton - A reusable button component with smooth animations
 * 
 * Features:
 * - Hover and tap animations using Framer Motion
 * - Primary and secondary visual variants
 * - Optional icon support with Lucide React
 * - Accessible and responsive design
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  className = '',
  disabled = false,
}) => {
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 max-h-15 rounded-full
        text-lg tracking-wide
        transition-colors duration-300
        flex items-center justify-center gap-2
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
