import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Settings, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Slider } from './ui/slider';

export const SettingsModal = () => {
  const { 
    theme, 
    soundEnabled, 
    focusDuration,
    breakDuration,
    toggleTheme, 
    toggleSound,
    setFocusDuration,
    setBreakDuration,
    status
  } = useAppStore();

  const isTimerRunning = status === 'running';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full hover:scale-105 hover:rotate-90 transition-transform duration-300"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your Pomodoro experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
              <Label htmlFor="theme-toggle">Dark Mode</Label>
            </div>
            <Switch 
              id="theme-toggle"
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-green-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <Label htmlFor="sound-toggle">Sound Notifications</Label>
            </div>
            <Switch 
              id="sound-toggle"
              checked={soundEnabled} 
              onCheckedChange={toggleSound}
              aria-label="Toggle sound notifications"
            />
          </div>

          {/* Focus Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-duration">Focus Duration</Label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.floor(focusDuration / 60)} min
              </span>
            </div>
            <Slider
              id="focus-duration"
              value={[focusDuration / 60]}
              onValueChange={(value) => setFocusDuration(value[0] * 60)}
              min={1}
              max={60}
              step={1}
              disabled={isTimerRunning}
              className="w-full"
              aria-label="Focus duration in minutes"
            />
          </div>

          {/* Break Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="break-duration">Break Duration</Label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.floor(breakDuration / 60)} min
              </span>
            </div>
            <Slider
              id="break-duration"
              value={[breakDuration / 60]}
              onValueChange={(value) => setBreakDuration(value[0] * 60)}
              min={1}
              max={30}
              step={1}
              disabled={isTimerRunning}
              className="w-full"
              aria-label="Break duration in minutes"
            />
          </div>

          {isTimerRunning && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              ⚠️ Stop the timer to change durations
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
