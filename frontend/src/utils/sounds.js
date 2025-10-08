// Audio context instance (reusable)
let audioContext = null;

// Initialize audio context on first user interaction
export const initAudio = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // Resume context if suspended (iOS requirement)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  }
  return audioContext;
};

// Sound effects using Web Audio API
export const playSound = (type) => {
  try {
    // Initialize or resume audio context
    const ctx = initAudio();
    if (!ctx) return;
    
    // Resume if suspended (iOS requirement)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    // Different sounds for different events
    switch(type) {
      case 'success':
        // Happy ascending notes
        oscillator.frequency.setValueAtTime(523, now); // C5
        oscillator.frequency.setValueAtTime(659, now + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, now + 0.2); // G5
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        oscillator.start(now);
        oscillator.stop(now + 0.4);
        break;
        
      case 'error':
        // Descending buzz
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.setValueAtTime(200, now + 0.2);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;
        
      case 'achievement':
        // Victory fanfare
        oscillator.frequency.setValueAtTime(523, now); // C5
        oscillator.frequency.setValueAtTime(659, now + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, now + 0.2); // G5
        oscillator.frequency.setValueAtTime(1047, now + 0.3); // C6
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
        break;
        
      case 'click':
        // Button click
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;
        
      case 'save':
        // Save sound (quick beep)
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;
        
      default:
        // Default beep
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }
  } catch (error) {
    console.log('Sound playback error:', error);
  }
};