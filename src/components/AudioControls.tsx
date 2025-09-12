import React from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Settings,
  Speaker
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AudioControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  speed: number;
  volume: number;
  voices: SpeechSynthesisVoice[];
  currentVoice: SpeechSynthesisVoice | null;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSpeedChange: (speed: number) => void;
  onVolumeChange: (volume: number) => void;
  onVoiceChange: (voiceIndex: number) => void;
  className?: string;
  showAdvancedControls?: boolean;
}

export function AudioControls({
  isPlaying,
  isPaused,
  isSupported,
  speed,
  volume,
  voices,
  currentVoice,
  onPlay,
  onPause,
  onResume,
  onStop,
  onSpeedChange,
  onVolumeChange,
  onVoiceChange,
  className = '',
  showAdvancedControls = true
}: AudioControlsProps) {
  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-gray-100 rounded-lg ${className}`}>
        <Speaker className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          Text-to-speech is not supported in your browser
        </span>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        onResume();
      } else {
        onPause();
      }
    } else {
      onPlay();
    }
  };

  const getPlayButtonIcon = () => {
    if (isPlaying && !isPaused) {
      return <Pause className="h-4 w-4" />;
    }
    return <Play className="h-4 w-4" />;
  };

  const getPlayButtonLabel = () => {
    if (isPlaying && !isPaused) {
      return 'Pause narration';
    }
    if (isPaused) {
      return 'Resume narration';
    }
    return 'Play narration';
  };

  return (
    <div className={`flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm ${className}`}>
      {/* Play/Pause Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlayPause}
        className="flex items-center gap-2"
        title={getPlayButtonLabel()}
      >
        {getPlayButtonIcon()}
        <span className="hidden sm:inline">
          {isPlaying && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play'}
        </span>
      </Button>

      {/* Stop Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onStop}
        disabled={!isPlaying && !isPaused}
        title="Stop narration"
      >
        <Square className="h-4 w-4" />
        <span className="hidden sm:inline">Stop</span>
      </Button>

      {/* Volume Control */}
      <div className="flex items-center gap-2 min-w-[100px]">
        <Volume2 className="h-4 w-4 text-gray-600" />
        <Slider
          value={[volume * 100]}
          onValueChange={(values) => onVolumeChange(values[0] / 100)}
          max={100}
          step={5}
          className="flex-1"
          title={`Volume: ${Math.round(volume * 100)}%`}
        />
      </div>

      {/* Advanced Controls */}
      {showAdvancedControls && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" title="Audio settings">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Audio Settings</h4>
              </div>
              
              {/* Speed Control */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Speed: {speed.toFixed(1)}x
                </label>
                <Slider
                  value={[speed * 10]}
                  onValueChange={(values) => onSpeedChange(values[0] / 10)}
                  min={5}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0.5x</span>
                  <span>1.0x</span>
                  <span>2.0x</span>
                </div>
              </div>

              {/* Voice Selection */}
              {voices.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voice</label>
                  <Select
                    value={currentVoice ? voices.findIndex(v => v === currentVoice).toString() : ''}
                    onValueChange={(value) => onVoiceChange(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          <div className="flex flex-col">
                            <span>{voice.name}</span>
                            <span className="text-xs text-gray-500">
                              {voice.lang} {voice.localService ? '(Local)' : '(Remote)'}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quick Speed Presets */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Speed</label>
                <div className="flex gap-1">
                  {[0.75, 1.0, 1.25, 1.5].map((speedPreset) => (
                    <Button
                      key={speedPreset}
                      variant={Math.abs(speed - speedPreset) < 0.1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => onSpeedChange(speedPreset)}
                      className="text-xs px-2 py-1"
                    >
                      {speedPreset}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Status Indicator */}
      {(isPlaying || isPaused) && (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <div className={`w-2 h-2 rounded-full ${isPlaying && !isPaused ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          <span className="hidden md:inline">
            {isPlaying && !isPaused ? 'Playing' : 'Paused'}
          </span>
        </div>
      )}
    </div>
  );
}
