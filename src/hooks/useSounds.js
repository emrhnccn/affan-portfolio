import { useRef, useCallback } from 'react';

/** Web Audio API ile ses sentezi — dosya gerekmez */
function createCtx() {
  try { return new (window.AudioContext || window.webkitAudioContext)(); }
  catch { return null; }
}

function playTones(ctx, tones) {
  if (!ctx) return;
  tones.forEach(({ freq, type = 'sine', start = 0, dur = 0.2, vol = 0.25 }) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  });
}

const SOUNDS = {
  startup: (ctx) => playTones(ctx, [
    { freq: 261.63, start: 0.0,  dur: 0.35, vol: 0.2 },
    { freq: 329.63, start: 0.18, dur: 0.35, vol: 0.2 },
    { freq: 392.00, start: 0.35, dur: 0.35, vol: 0.2 },
    { freq: 523.25, start: 0.50, dur: 0.6,  vol: 0.25 },
  ]),

  windowOpen: (ctx) => playTones(ctx, [
    { freq: 440, start: 0,    dur: 0.08, vol: 0.18, type: 'sine' },
    { freq: 660, start: 0.07, dur: 0.12, vol: 0.15, type: 'sine' },
  ]),

  windowClose: (ctx) => playTones(ctx, [
    { freq: 660, start: 0,    dur: 0.08, vol: 0.15, type: 'sine' },
    { freq: 330, start: 0.07, dur: 0.12, vol: 0.12, type: 'sine' },
  ]),

  click: (ctx) => playTones(ctx, [
    { freq: 1200, type: 'square', dur: 0.04, vol: 0.08 },
  ]),

  error: (ctx) => playTones(ctx, [
    { freq: 440, start: 0,    dur: 0.15, vol: 0.2, type: 'sawtooth' },
    { freq: 330, start: 0.15, dur: 0.15, vol: 0.2, type: 'sawtooth' },
    { freq: 220, start: 0.30, dur: 0.2,  vol: 0.2, type: 'sawtooth' },
  ]),

  notification: (ctx) => playTones(ctx, [
    { freq: 880,  start: 0,    dur: 0.15, vol: 0.2 },
    { freq: 1100, start: 0.15, dur: 0.2,  vol: 0.18 },
  ]),

  success: (ctx) => playTones(ctx, [
    { freq: 523, start: 0,    dur: 0.1, vol: 0.2 },
    { freq: 659, start: 0.1,  dur: 0.1, vol: 0.2 },
    { freq: 784, start: 0.2,  dur: 0.2, vol: 0.22 },
  ]),

  navigate: (ctx) => playTones(ctx, [
    { freq: 800, type: 'sine', dur: 0.06, vol: 0.1 },
  ]),
};

export function useSounds(muted) {
  const ctxRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = createCtx();
    if (ctxRef.current?.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback((name) => {
    if (muted) return;
    const fn = SOUNDS[name];
    if (!fn) return;
    try { fn(ensureCtx()); } catch {}
  }, [muted, ensureCtx]);

  return { play };
}
