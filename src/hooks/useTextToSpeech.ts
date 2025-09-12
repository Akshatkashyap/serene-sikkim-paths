import { useState, useEffect, useCallback, useRef } from 'react';
import { textToSpeechService } from '../services/textToSpeech';

export interface UseTTSOptions {
  autoPlay?: boolean;
  speed?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export interface UseTTSReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  voices: SpeechSynthesisVoice[];
  currentVoice: SpeechSynthesisVoice | null;
  setVoice: (voiceIndex: number) => void;
}

export function useTextToSpeech(options: UseTTSOptions = {}): UseTTSReturn {
  const {
    autoPlay = false,
    speed: initialSpeed = 1.0,
    volume: initialVolume = 1.0,
    onStart,
    onEnd,
    onError
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeedState] = useState(initialSpeed);
  const [volume, setVolumeState] = useState(initialVolume);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const currentTextRef = useRef<string>('');
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize TTS service and check support
  useEffect(() => {
    setIsSupported(textToSpeechService.isSupported());
    
    if (textToSpeechService.isSupported()) {
      // Set initial settings
      textToSpeechService.setSpeed(initialSpeed);
      textToSpeechService.setVolume(initialVolume);
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = textToSpeechService.getVoices();
        setVoices(availableVoices);
        setCurrentVoice(textToSpeechService.getCurrentVoice());
      };
      
      // Load voices immediately and on voice change
      loadVoices();
      
      // Set up periodic check for voice loading (some browsers load voices asynchronously)
      const voiceCheckInterval = setInterval(() => {
        const newVoices = textToSpeechService.getVoices();
        if (newVoices.length > voices.length) {
          loadVoices();
        }
      }, 500);
      
      // Clear interval after 5 seconds
      setTimeout(() => clearInterval(voiceCheckInterval), 5000);
      
      return () => clearInterval(voiceCheckInterval);
    }
  }, [initialSpeed, initialVolume, voices.length]);

  // Update playing state periodically
  useEffect(() => {
    updateIntervalRef.current = setInterval(() => {
      const playing = textToSpeechService.isCurrentlyPlaying();
      const paused = textToSpeechService.isCurrentlyPaused();
      
      setIsPlaying(playing);
      setIsPaused(paused);
    }, 100);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!textToSpeechService.isSupported() || !text.trim()) {
      return;
    }

    try {
      currentTextRef.current = text;
      
      textToSpeechService.speak(
        text,
        () => {
          setIsPlaying(false);
          setIsPaused(false);
          if (onEnd) onEnd();
        },
        () => {
          setIsPlaying(true);
          setIsPaused(false);
          if (onStart) onStart();
        }
      );
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
      console.error('Text-to-speech error:', error);
    }
  }, [onStart, onEnd, onError]);

  const pause = useCallback(() => {
    if (textToSpeechService.isSupported()) {
      textToSpeechService.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (textToSpeechService.isSupported()) {
      textToSpeechService.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (textToSpeechService.isSupported()) {
      textToSpeechService.stop();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed);
    if (textToSpeechService.isSupported()) {
      textToSpeechService.setSpeed(newSpeed);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (textToSpeechService.isSupported()) {
      textToSpeechService.setVolume(newVolume);
    }
  }, []);

  const setVoice = useCallback((voiceIndex: number) => {
    if (textToSpeechService.isSupported()) {
      textToSpeechService.setVoice(voiceIndex);
      setCurrentVoice(textToSpeechService.getCurrentVoice());
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && currentTextRef.current && isSupported) {
      speak(currentTextRef.current);
    }
  }, [autoPlay, speak, isSupported]);

  return {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    isSupported,
    speed,
    setSpeed,
    volume,
    setVolume,
    voices,
    currentVoice,
    setVoice
  };
}
