import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

export const Confetti = ({ trigger }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#fb923c', '#fdba74', '#60a5fa', '#93c5fd', '#fbbf24', '#fde047'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.3,
        rotation: Math.random() * 360,
      }));
      
      setPieces(newPieces);
      
      setTimeout(() => {
        setPieces([]);
      }, 3000);
    }
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: '-10px',
            backgroundColor: piece.color,
          }}
          initial={{ 
            y: -20, 
            opacity: 1,
            rotate: piece.rotation,
          }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: piece.rotation + 720,
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};
