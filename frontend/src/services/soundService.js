// Web Audio API Synthesizer for tactical Command Center alerts
class SoundService {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  playBeep(freq = 800, type = 'sine', duration = 0.15, vol = 0.1) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy or error
    }
  }

  playCriticalAlarm() {
    if (this.muted) return;
    this.playBeep(880, 'sawtooth', 0.2, 0.15);
    setTimeout(() => this.playBeep(1174, 'sawtooth', 0.25, 0.15), 180);
  }

  playWarningChime() {
    if (this.muted) return;
    this.playBeep(659.25, 'triangle', 0.18, 0.1);
    setTimeout(() => this.playBeep(783.99, 'triangle', 0.22, 0.1), 120);
  }

  playActionClick() {
    if (this.muted) return;
    this.playBeep(1200, 'sine', 0.05, 0.04);
  }
}

export const sound = new SoundService();
