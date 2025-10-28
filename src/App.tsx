import { useEffect, useState } from 'react';
import { useTimer } from './hooks/useTimer';
import { useAppStore } from './store/useAppStore';
import { CircularTimer } from './components/CircularTimer';
import { PixelAnimal } from './components/PixelAnimal';
import { ControlButtons } from './components/ControlButtons';
import { SessionCounter } from './components/SessionCounter';
import { SettingsModal } from './components/SettingsModal';
import { Confetti } from './components/Confetti';
import { motion } from 'motion/react';

export default function App() {
  const { theme, sessionsCompleted } = useAppStore();
  const { timeLeft, status, mode, start, pause, reset } = useTimer();
  const [showConfetti, setShowConfetti] = useState(false);
  const prevTimeLeft = usePrevious(timeLeft);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Trigger confetti on completion
  useEffect(() => {
    if (prevTimeLeft === 1 && timeLeft === 0 && status === 'running') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  }, [timeLeft, prevTimeLeft, status]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        if (status === 'running') {
          pause();
        } else {
          start();
        }
      } else if (e.code === 'KeyR' && e.shiftKey) {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [status, start, pause, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Confetti trigger={showConfetti} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🍅</span>
            </div>
            <h1 className="text-3xl">Pomodoro Focus</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <SettingsModal />
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-12">
            {/* Session Counter */}
            <SessionCounter count={sessionsCompleted} />

            {/* Pixel Animal */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <PixelAnimal status={status} mode={mode} timeLeft={timeLeft} />
            </motion.div>

            {/* Circular Timer */}
            <CircularTimer timeLeft={timeLeft} status={status} mode={mode} />

            {/* Control Buttons */}
            <ControlButtons 
              status={status}
              onStart={start}
              onPause={pause}
              onReset={reset}
            />

            {/* Keyboard Shortcuts Hint */}
            <motion.div 
              className="text-sm text-gray-500 dark:text-gray-400 text-center space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>Press <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 shadow-sm">Space</kbd> to start/pause</p>
              <p>Press <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 shadow-sm">Shift + R</kbd> to reset</p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Stay focused, stay productive 🎯</p>
        </motion.footer>
      </div>
    </div>
  );
}

// Custom hook to get previous value
function usePrevious<T>(value: T): T | undefined {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
    }
  }, [value, current]);

  return previous;
}
