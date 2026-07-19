// Web Audio API Retro Sound Effects Synthesizer
let audioCtx = null;
let isEnabled = true;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  isEnabled = enabled;
  if (enabled) {
    initAudio();
  }
};

export const getSoundEnabled = () => {
  return isEnabled;
};

// Generic synthesizer function
export const playBeep = (freq, duration, type = "square", volume = 0.08, glideFreq = null) => {
  if (!isEnabled) return;
  try {
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    if (glideFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(glideFreq, ctx.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    // Smooth release to avoid pop click sounds
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Audio synthesis failed:", e);
  }
};

// Nokia eat food beep: high double beep
export const playSnakeEat = () => {
  // Classic dual tone: 880Hz then 1320Hz (A5 -> E6)
  playBeep(880, 0.08, "square", 0.08);
  setTimeout(() => {
    playBeep(1320, 0.12, "square", 0.07);
  }, 80);
};

// Quiet tick sound for movement
export const playSnakeMove = () => {
  playBeep(120, 0.015, "triangle", 0.03);
};

// Retro downward sweep for death
export const playGameOver = () => {
  // Frequency glide down from 350Hz to 60Hz over 0.5s
  playBeep(350, 0.5, "sawtooth", 0.12, 60);
};

// Stack Game: Perfect placement beep based on combo streak
// We use a pentatonic scale starting from C4 (261.63 Hz) up to high notes
const PENTATONIC_SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
export const playStackPerfect = (combo) => {
  const noteIndex = Math.min(combo, PENTATONIC_SCALE.length - 1);
  const freq = PENTATONIC_SCALE[noteIndex];
  
  // Clean double-ping for perfect placement
  playBeep(freq, 0.12, "sine", 0.15);
  setTimeout(() => {
    playBeep(freq * 1.5, 0.15, "sine", 0.08);
  }, 60);
};

// Stack Game: Normal block placement beep
export const playStackPlacement = () => {
  // Normal clean placement beep
  playBeep(329.63, 0.1, "sine", 0.1); // E4 note
};

// Stack Game: Slice/debris sound (noise burst simulation using square wave sweep)
export const playStackSlice = () => {
  playBeep(200, 0.08, "sawtooth", 0.08, 100);
};

// Zen Game: Calm Pentatonic / Hirajoshi Scale wind chime sounds
const ZEN_SCALE = [440.00, 493.88, 523.25, 659.25, 698.46, 880.00, 987.77, 1046.50, 1318.51];
export const playZenChime = (index) => {
  const note = ZEN_SCALE[index % ZEN_SCALE.length];
  // Pure sine wave with very long release (1.8s) for glass/bell resonance
  playBeep(note, 1.8, "sine", 0.14);
};

export const playZenPop = () => {
  // Clear, bright water drop chime
  playBeep(987.77, 0.06, "sine", 0.1);
  setTimeout(() => {
    playBeep(1479.98, 0.1, "sine", 0.06);
  }, 40);
};

// Constellation Linker Game: connection tones and chain burst chords
const LINK_SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
export const playLinkConnect = (index) => {
  const note = LINK_SCALE[index % LINK_SCALE.length];
  playBeep(note, 0.22, "sine", 0.12);
};

export const playLinkBurst = () => {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((note, i) => {
    setTimeout(() => {
      playBeep(note, 0.5, "sine", 0.07);
    }, i * 45);
  });
};
