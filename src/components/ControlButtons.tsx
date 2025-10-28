import { motion } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface ControlButtonsProps {
  status: 'idle' | 'running' | 'paused';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const ControlButtons = ({ status, onStart, onPause, onReset }: ControlButtonsProps) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      {status === 'running' ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onPause}
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-full w-16 h-16 shadow-lg"
            aria-label="Pause timer"
            aria-pressed={status === 'running'}
          >
            <Pause className="w-6 h-6" />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 shadow-lg"
            aria-label="Start timer"
            aria-pressed={status === 'running'}
          >
            <Play className="w-6 h-6 ml-1" />
          </Button>
        </motion.div>
      )}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onReset}
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 border-2 border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-400 shadow-md"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};
