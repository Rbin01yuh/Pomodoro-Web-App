import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';

interface CircularTimerProps {
  timeLeft: number;
  status: 'idle' | 'running' | 'paused';
  mode: 'focus' | 'break';
}

export const CircularTimer = ({ timeLeft, status, mode }: CircularTimerProps) => {
  const { focusDuration, breakDuration } = useAppStore();
  
  const totalDuration = mode === 'focus' ? focusDuration : breakDuration;
  const progress = timeLeft / totalDuration;
  
  const radius = 140;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const ringColor = mode === 'focus' 
    ? 'stroke-orange-400' 
    : 'stroke-blue-400';

  return (
    <div className="relative flex items-center justify-center">
      <svg 
        width="300" 
        height="300" 
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="150"
          cy="150"
          r={radius}
          className={ringColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ 
            strokeDashoffset: offset,
            opacity: status === 'running' ? [1, 0.8, 1] : 1
          }}
          transition={{ 
            strokeDashoffset: { duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 2, repeat: status === 'running' ? Infinity : 0, ease: 'easeInOut' }
          }}
        />
      </svg>
      
      {/* Timer display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="text-6xl tabular-nums"
          initial={{ scale: 1 }}
          animate={{ scale: status === 'running' ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: status === 'running' ? Infinity : 0 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {formatTime(timeLeft)}
        </motion.div>
        <div className="mt-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {mode === 'focus' ? 'Focus Time' : 'Break Time'}
        </div>
      </div>
    </div>
  );
};
