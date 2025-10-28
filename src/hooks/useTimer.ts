import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useTimer = () => {
  const { 
    timeLeft, 
    status, 
    mode,
    soundEnabled,
    setTimeLeft, 
    setStatus, 
    setMode,
    incrementSessions,
    focusDuration,
    breakDuration
  } = useAppStore();
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'running' && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'running') {
      // Timer completed
      if (soundEnabled) {
        playNotificationSound();
      }
      
      if (mode === 'focus') {
        incrementSessions();
        setMode('break');
      } else {
        setMode('focus');
      }
      
      setStatus('idle');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, timeLeft, mode, soundEnabled, setTimeLeft, setStatus, setMode, incrementSessions]);

  const start = () => {
    setStatus('running');
  };

  const pause = () => {
    setStatus('paused');
  };

  const reset = () => {
    const duration = mode === 'focus' ? focusDuration : breakDuration;
    setTimeLeft(duration);
    setStatus('idle');
  };

  const playNotificationSound = () => {
    // Create a simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };

  return {
    timeLeft,
    status,
    mode,
    start,
    pause,
    reset,
  };
};
