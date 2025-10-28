import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface SessionCounterProps {
  count: number;
}

export const SessionCounter = ({ count }: SessionCounterProps) => {
  return (
    <motion.div 
      className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-md border border-gray-200 dark:border-gray-700"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <CheckCircle2 className="w-5 h-5 text-green-500" />
      <div className="flex items-baseline gap-2">
        <motion.span 
          className="text-3xl tabular-nums"
          key={count}
          initial={{ scale: 1.5, color: '#22c55e' }}
          animate={{ scale: 1, color: 'currentColor' }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.span>
        <span className="text-gray-600 dark:text-gray-400">
          {count === 1 ? 'session' : 'sessions'} completed
        </span>
      </div>
    </motion.div>
  );
};
