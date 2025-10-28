import { create } from 'zustand';

export type TimerMode = 'focus' | 'break';
export type TimerStatus = 'idle' | 'running' | 'paused';

interface AppState {
  // Timer settings
  focusDuration: number;
  breakDuration: number;
  
  // Timer state
  timeLeft: number;
  mode: TimerMode;
  status: TimerStatus;
  sessionsCompleted: number;
  
  // UI preferences
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  
  // Actions
  setTimeLeft: (time: number) => void;
  setMode: (mode: TimerMode) => void;
  setStatus: (status: TimerStatus) => void;
  incrementSessions: () => void;
  setFocusDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  resetTimer: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Default: 25 minutes focus, 5 minutes break
  focusDuration: 25 * 60,
  breakDuration: 5 * 60,
  
  timeLeft: 25 * 60,
  mode: 'focus',
  status: 'idle',
  sessionsCompleted: 0,
  
  theme: 'light',
  soundEnabled: true,
  
  setTimeLeft: (time) => set({ timeLeft: time }),
  
  setMode: (mode) => {
    const state = get();
    const duration = mode === 'focus' ? state.focusDuration : state.breakDuration;
    set({ mode, timeLeft: duration });
  },
  
  setStatus: (status) => set({ status }),
  
  incrementSessions: () => set((state) => ({ 
    sessionsCompleted: state.sessionsCompleted + 1 
  })),
  
  setFocusDuration: (duration) => {
    set({ focusDuration: duration });
    if (get().mode === 'focus' && get().status === 'idle') {
      set({ timeLeft: duration });
    }
  },
  
  setBreakDuration: (duration) => {
    set({ breakDuration: duration });
    if (get().mode === 'break' && get().status === 'idle') {
      set({ timeLeft: duration });
    }
  },
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  toggleSound: () => set((state) => ({ 
    soundEnabled: !state.soundEnabled 
  })),
  
  resetTimer: () => {
    const state = get();
    const duration = state.mode === 'focus' ? state.focusDuration : state.breakDuration;
    set({ 
      timeLeft: duration, 
      status: 'idle' 
    });
  },
}));
