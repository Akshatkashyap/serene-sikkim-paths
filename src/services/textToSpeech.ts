export class TextToSpeechService {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private currentVoice: SpeechSynthesisVoice | null = null;
  private speed: number = 1.0;
  private pitch: number = 1.0;
  private volume: number = 1.0;

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Load voices when they become available
    this.synth.addEventListener('voiceschanged', () => {
      this.loadVoices();
    });
  }

  private loadVoices(): void {
    this.voices = this.synth.getVoices();
    
    // Prefer English voices for better monastery name pronunciation
    const englishVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en') && voice.localService
    );
    
    if (englishVoices.length > 0) {
      // Prefer female voices for narration as they tend to be clearer
      const femaleVoice = englishVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('hazel')
      );
      
      this.currentVoice = femaleVoice || englishVoices[0];
    } else if (this.voices.length > 0) {
      this.currentVoice = this.voices[0];
    }
  }

  public speak(text: string, onEnd?: () => void, onStart?: () => void): void {
    if (!text.trim()) return;

    // Stop any current speech
    this.stop();

    this.utterance = new SpeechSynthesisUtterance(text);
    
    if (this.currentVoice) {
      this.utterance.voice = this.currentVoice;
    }
    
    this.utterance.rate = this.speed;
    this.utterance.pitch = this.pitch;
    this.utterance.volume = this.volume;

    this.utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      if (onStart) onStart();
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      if (onEnd) onEnd();
    };

    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isPlaying = false;
      this.isPaused = false;
    };

    this.synth.speak(this.utterance);
  }

  public pause(): void {
    if (this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    this.synth.cancel();
    this.isPlaying = false;
    this.isPaused = false;
  }

  public setSpeed(speed: number): void {
    this.speed = Math.max(0.1, Math.min(2.0, speed));
    
    // If currently speaking, restart with new speed
    if (this.isPlaying && this.utterance) {
      const remainingText = this.utterance.text;
      this.stop();
      setTimeout(() => this.speak(remainingText), 100);
    }
  }

  public setPitch(pitch: number): void {
    this.pitch = Math.max(0.1, Math.min(2.0, pitch));
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1.0, volume));
  }

  public setVoice(voiceIndex: number): void {
    if (voiceIndex >= 0 && voiceIndex < this.voices.length) {
      this.currentVoice = this.voices[voiceIndex];
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getCurrentVoice(): SpeechSynthesisVoice | null {
    return this.currentVoice;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getPitch(): number {
    return this.pitch;
  }

  public getVolume(): number {
    return this.volume;
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  public isCurrentlyPaused(): boolean {
    return this.isPaused;
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

// Create a singleton instance
export const textToSpeechService = new TextToSpeechService();
