import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface PixelAnimalProps {
  status: 'idle' | 'running' | 'paused';
  mode: 'focus' | 'break';
  timeLeft: number;
}

export const PixelAnimal = ({ status, mode, timeLeft }: PixelAnimalProps) => {
  const [frame, setFrame] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && status === 'running') {
      setIsCompleting(true);
      setTimeout(() => setIsCompleting(false), 2000);
    }
  }, [timeLeft, status]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (status === 'running') {
      interval = setInterval(() => {
        setFrame((prev) => (prev + 1) % 4);
      }, 500);
    } else {
      setFrame(0);
    }
    
    return () => clearInterval(interval);
  }, [status]);

  const getAnimalState = () => {
    if (isCompleting) return 'celebrating';
    if (status === 'running') return mode === 'focus' ? 'working' : 'resting';
    if (status === 'paused') return 'paused';
    return 'idle';
  };

  const state = getAnimalState();

  // Pixel art cat using CSS and div elements for retro look
  return (
    <motion.div 
      className="relative w-32 h-32 mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: state === 'celebrating' ? [1, 1.2, 1] : 1,
        opacity: 1,
        y: state === 'working' ? [0, -4, 0] : 0,
      }}
      transition={{ 
        scale: { duration: 0.5, repeat: state === 'celebrating' ? 3 : 0 },
        y: { duration: 1, repeat: state === 'working' ? Infinity : 0, ease: 'easeInOut' }
      }}
    >
      <div 
        className="relative w-full h-full"
        style={{ imageRendering: 'pixelated' }}
        role="img"
        aria-label={`Pixel cat is ${state}`}
      >
        {/* Pixel Cat */}
        <svg viewBox="0 0 32 32" className="w-full h-full">
          {/* Ears */}
          <rect x="6" y="8" width="4" height="4" fill={mode === 'focus' ? '#fb923c' : '#60a5fa'} />
          <rect x="22" y="8" width="4" height="4" fill={mode === 'focus' ? '#fb923c' : '#60a5fa'} />
          
          {/* Head */}
          <rect x="10" y="10" width="12" height="12" fill={mode === 'focus' ? '#fdba74' : '#93c5fd'} />
          
          {/* Eyes */}
          {state === 'working' && frame % 2 === 0 ? (
            <>
              <rect x="13" y="14" width="2" height="1" fill="#1f2937" />
              <rect x="17" y="14" width="2" height="1" fill="#1f2937" />
            </>
          ) : (
            <>
              <rect x="13" y="14" width="2" height="2" fill="#1f2937" />
              <rect x="17" y="14" width="2" height="2" fill="#1f2937" />
            </>
          )}
          
          {/* Nose */}
          <rect x="15" y="17" width="2" height="1" fill="#ef4444" />
          
          {/* Mouth */}
          {state === 'celebrating' && (
            <>
              <rect x="13" y="19" width="1" height="1" fill="#1f2937" />
              <rect x="14" y="20" width="4" height="1" fill="#1f2937" />
              <rect x="18" y="19" width="1" height="1" fill="#1f2937" />
            </>
          )}
          
          {state === 'paused' && (
            <rect x="14" y="19" width="4" height="1" fill="#1f2937" />
          )}
          
          {/* Body */}
          <rect x="11" y="22" width="10" height="8" fill={mode === 'focus' ? '#fdba74' : '#93c5fd'} />
          
          {/* Arms */}
          {state === 'working' && (
            <>
              <motion.rect 
                x="8" 
                y={24 + (frame % 2)} 
                width="3" 
                height="4" 
                fill={mode === 'focus' ? '#fdba74' : '#93c5fd'}
                animate={{ y: [24, 25, 24] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.rect 
                x="21" 
                y={24 + ((frame + 1) % 2)} 
                width="3" 
                height="4" 
                fill={mode === 'focus' ? '#fdba74' : '#93c5fd'}
                animate={{ y: [25, 24, 25] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </>
          )}
          
          {(state === 'idle' || state === 'paused' || state === 'resting') && (
            <>
              <rect x="8" y="24" width="3" height="4" fill={mode === 'focus' ? '#fdba74' : '#93c5fd'} />
              <rect x="21" y="24" width="3" height="4" fill={mode === 'focus' ? '#fdba74' : '#93c5fd'} />
            </>
          )}
          
          {/* Celebration stars */}
          {state === 'celebrating' && (
            <>
              <motion.rect 
                x="4" 
                y="12" 
                width="2" 
                height="2" 
                fill="#fbbf24"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.rect 
                x="26" 
                y="12" 
                width="2" 
                height="2" 
                fill="#fbbf24"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
              />
            </>
          )}
        </svg>
      </div>
      
      {/* Status text */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={state}
      >
        {state === 'working' && '💪 Focused!'}
        {state === 'resting' && '😌 Resting'}
        {state === 'celebrating' && '🎉 Great job!'}
        {state === 'idle' && '😺 Ready'}
        {state === 'paused' && '⏸️ Paused'}
      </motion.div>
    </motion.div>
  );
};
