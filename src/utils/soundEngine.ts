// Atmospheric Web Audio API synthesizer for Crime Dinner Ambience
// Works 100% offline without external mp3 files

class MysterySoundEngine {
  private ctx: AudioContext | null = null;
  private windNode: AudioNode | null = null;
  private fireNode: AudioNode | null = null;
  private isWindPlaying = false;
  private isFirePlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate pink noise buffer for realistic wind & rain
  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  // Toggle howling snowstorm & wind outside the mansion
  public toggleWind(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (enable === undefined) enable = !this.isWindPlaying;

    if (enable) {
      if (this.isWindPlaying) return true;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.createNoiseBuffer();
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);

      // Low frequency oscillator to make wind howl dynamically
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      this.windNode = gain;
      this.isWindPlaying = true;
    } else {
      if (this.windNode) {
        (this.windNode as GainNode).gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.windNode = null;
        }, 1000);
      }
      this.isWindPlaying = false;
    }
    return this.isWindPlaying;
  }

  // Toggle crackling warm fireplace in dining hall
  public toggleFire(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (enable === undefined) enable = !this.isFirePlaying;

    if (enable) {
      if (this.isFirePlaying) return true;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.createNoiseBuffer();
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      this.fireNode = gain;
      this.isFirePlaying = true;
    } else {
      if (this.fireNode) {
        (this.fireNode as GainNode).gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.fireNode = null;
        }, 1000);
      }
      this.isFirePlaying = false;
    }
    return this.isFirePlaying;
  }

  // Play ominous clock chime (Westminster-style bell)
  public playClockBell() {
    this.initContext();
    if (!this.ctx) return;

    const notes = [440, 330, 370, 220]; // Dissonant Victorian clock chime
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.7);

      gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.3, this.ctx!.currentTime + idx * 0.7 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.7 + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(this.ctx!.currentTime + idx * 0.7);
      osc.stop(this.ctx!.currentTime + idx * 0.7 + 2.0);
    });
  }

  // Play dramatic murder strike stinger (dissonant brass/organ chords)
  public playMurderStinger() {
    this.initContext();
    if (!this.ctx) return;

    const chords = [130.81, 155.56, 185.00, 246.94]; // C3, Eb3, Gb3, B3 (diminished / horror)
    chords.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx!.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx!.currentTime + 3.0);

      gain.gain.setValueAtTime(0.25, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 3.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start();
      osc.stop(this.ctx!.currentTime + 3.6);
    });
  }

  // Native Speech Synthesis with vintage phonograph emulation
  public playVintageSpeech(text: string, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.88; // Slightly slow & deliberate Victorian tone
    utterance.pitch = 0.85;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    // Play subtle needle crackle sound before voice starts
    this.playClockBell();
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 600);
  }

  public stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getStatus() {
    return {
      wind: this.isWindPlaying,
      fire: this.isFirePlaying
    };
  }
}

export const soundEngine = new MysterySoundEngine();
