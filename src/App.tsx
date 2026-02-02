import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import Confetti from './components/Confetti';
import LandingScreen from './components/LandingScreen';
import SuccessScreen from './components/SuccessScreen';

/**
 * Playful messages to show when the "No" button is clicked
 */
const noButtonMessages = [
  "Are you sure? 🤔",
  "What if I asked nicely? 🙏",
  "Please reconsider... 😢",
  "My heart can't take it! 💗",
  "Just one chance? 🌹",
  "Pretty please? 🥺",
  "I'll be the best Valentine! 💝",
  "Don't break my heart! 💔",
  "Think about it again? 🤞",
  "I promise to make you smile! 😊",
  "You're breaking my heart! 💔",
  "What do I have to do? 😭",
  "I'll give you chocolates! 🍫",
  "Forever and always? 💕",
  "My heart beats only for you! 💓",
  "Say yes, please! 🥺",
  "I won't give up! 💪",
  "You know you want to... 😏",
  "Last chance... maybe? 🙈",
  "Okay fine... just kidding, YES? 😜",
];

/**
 * App - Main component for the "Be My Valentine" experience
 * 
 * Features:
 * - Animated landing screen with romantic question
 * - Playful "No" button behavior (shrinks with each click)
 * - Growing "Yes" button for emphasis
 * - Confetti celebration on acceptance
 * - Beautiful success screen with heartfelt message
 */
const App = () => {
  // Track which screen to display
  const [hasAccepted, setHasAccepted] = useState(false);
  
  // Track "No" button clicks for playful behavior
  const [noClickCount, setNoClickCount] = useState(0);
  
  // Track total "No" clicks for Yes button scaling (never resets)
  const [totalNoClicks, setTotalNoClicks] = useState(0);
  
  // Control confetti animation
  const [showConfetti, setShowConfetti] = useState(false);

  /**
   * Handle "Yes" button click
   * Triggers confetti and transitions to success screen
   */
  const handleYes = useCallback(() => {
    setShowConfetti(true);
    // Small delay to let confetti start before transition
    setTimeout(() => {
      setHasAccepted(true);
    }, 300);
  }, []);

  /**
   * Handle "No" button click
   * Shrinks the "No" button and grows the "Yes" button with each click
   */
  const handleNo = useCallback(() => {
    setNoClickCount((prev) => (prev + 1) % noButtonMessages.length);
    setTotalNoClicks((prev) => prev + 1);
  }, []);

  // Calculate button scales based on "No" click count
  const noButtonScale = Math.max(0.3, 1 - totalNoClicks * 0.1);
  const yesButtonScale = 1 + totalNoClicks * 0.08;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background floating hearts animation */}
      <FloatingHearts count={20} />
      
      {/* Confetti celebration effect */}
      <Confetti isActive={showConfetti} count={60} />
      
      {/* Screen transitions with AnimatePresence */}
      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <LandingScreen
            key="landing"
            onYes={handleYes}
            onNo={handleNo}
            noButtonScale={noButtonScale}
            yesButtonScale={yesButtonScale}
          />
        ) : (
          <SuccessScreen
            key="success"
          />
        )}
      </AnimatePresence>
      
      {/* Display playful message when "No" is clicked */}
      {noClickCount > 0 && !hasAccepted && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <p className="text-rose-500 font-medium text-center">
            {noButtonMessages[noClickCount]}
          </p>
        </div>
      )}
    </main>
  );
}

export default App;
