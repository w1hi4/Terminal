const SOUNDS = {
  STARTUP: 'https://cdn.freesound.org/previews/242/242503_4414120-lq.mp3',
  WINDOW_OPEN: 'https://cdn.freesound.org/previews/235/235911_35187-lq.mp3',
  WINDOW_CLOSE: 'https://cdn.freesound.org/previews/235/235913_35187-lq.mp3',
  CLICK: 'https://cdn.freesound.org/previews/173/173934_2548842-lq.mp3',
  NOTIFICATION: 'https://cdn.freesound.org/previews/220/220202_3943373-lq.mp3',
  SUCCESS: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
  ERROR: 'https://cdn.freesound.org/previews/142/142608_1846549-lq.mp3',
};

class SoundManager {
  private static instance: SoundManager;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  private constructor() {
    // Preload sounds
    Object.values(SOUNDS).forEach(url => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.volume = 0.2; // Set default volume low
      this.audioCache.set(url, audio);
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public play(soundName: keyof typeof SOUNDS) {
    if (!this.enabled) return;

    const url = SOUNDS[soundName];
    const audio = this.audioCache.get(url);
    
    if (audio) {
      // Reset to start if already playing
      audio.currentTime = 0;
      audio.play().catch(err => console.log('Sound play blocked by browser policy until interaction.', err));
    }
  }
}

export const playSound = (soundName: keyof typeof SOUNDS) => {
  SoundManager.getInstance().play(soundName);
};

export default SoundManager;
