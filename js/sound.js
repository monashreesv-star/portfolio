/**
 * Procedural Web Audio API Sound Synthesizer
 * Generates tactile micro-interaction sounds without external audio assets.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('sound_muted') === 'true';
    this.initContext = this.initContext.bind(this);

    // Initialize audio context on first user interaction
    window.addEventListener('click', this.initContext, { once: true });
    window.addEventListener('keydown', this.initContext, { once: true });
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('sound_muted', this.isMuted);
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio fallback silent
    }
  }

  playThemeSwitch(isDark) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      if (isDark) {
        // Deep night shimmer (falling frequency)
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.18);
      } else {
        // Morning dawn chime (rising frequency)
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.18);
      }

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + (idx * 0.07);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.14);
      });
    } catch (e) {}
  }

  playKeypress() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(220 + Math.random() * 80, now);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch (e) {}
  }
}

window.soundSystem = new SoundSystem();
