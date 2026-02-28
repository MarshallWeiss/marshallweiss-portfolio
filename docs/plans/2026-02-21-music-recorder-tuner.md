# Chromatic Tuner

## Overview

Add a small always-visible chromatic tuner to the metal panel, positioned between the VU meters and the master controls. Taps into the existing input signal chain (inputAnalyser) to detect pitch via autocorrelation.

## Architecture

### Pitch Detection: `useTuner` hook

New hook that reads time-domain data from the existing `inputAnalyser` node on the AudioEngine.

**Algorithm**: Autocorrelation (YIN variant). Well-suited for monophonic instrument input — guitar, bass, voice. Runs in a `requestAnimationFrame` loop when active.

**Output**:
- `detectedNote`: string (`"A4"`, `"C#3"`, etc.) or null when no pitch detected
- `centsOff`: number (-50 to +50), deviation from nearest note in cents
- `frequency`: number (Hz), raw detected frequency
- `isActive`: boolean
- `toggle()`: enable/disable detection

**Activation**: Tuner runs whenever the audio engine is initialized and the input is live. No separate toggle needed — it reads passively from the analyser. If CPU is a concern, it can skip frames (run every 2nd or 3rd rAF).

**Note mapping**: Standard 12-TET. `noteNumber = 12 * log2(freq / 440) + 69`, then map to note name + octave.

### UI: `TunerDisplay` component

Small panel on the metal strip, ~120px wide. Fits between VU meters and the flex spacer.

**Layout** (vertical stack, compact):
```
┌─────────────────┐
│    ▼  A4  ▲     │  ← note name, large, centered
│  ◀━━━━|━━━━━▶   │  ← horizontal cents meter (-50 to +50)
│   440.0 Hz      │  ← small frequency readout
└─────────────────┘
```

**Visual style**:
- Recessed panel matching VU meter aesthetic (`.shadow-inset-groove`, dark background)
- Note name in monospace, amber/cream color matching VU meter labels
- Cents meter: thin horizontal bar. Green at center (in tune, ±5 cents), amber moving outward, red at extremes
- Needle/indicator dot that slides left/right along the bar
- Subtle glow when in tune (green LED effect)

**States**:
- No input detected: dims out, shows `"--"` for note
- Pitch detected but unstable: shows note but meter flickers
- Stable pitch: solid display, smooth meter movement
- In tune (±5 cents): satisfying green glow, visual "lock-on" feel

**Design priority**: This should feel like a quality piece of the hardware — not an afterthought bolted on. The visual treatment should be developed alongside the broader material refinements (see visual refinements plan). Think vintage strobe tuner aesthetic: warm amber on dark, smooth needle movement, subtle glow states.

### Integration points

1. **AudioEngine**: Expose `getInputAnalyser()` method (or just expose the existing `inputAnalyser` node). The tuner reads `getByteTimeDomainData()` from it — same data path the VU meters use.
2. **MetalPanel**: Add `TunerDisplay` between the VU meters div and the `flex-1` spacer.
3. **App.tsx**: Pass `engine` to MetalPanel (already done).

### Files to create/modify

- `src/hooks/useTuner.ts` — new hook, pitch detection logic
- `src/components/skeuomorphic/TunerDisplay.tsx` — new component
- `src/components/skeuomorphic/MetalPanel.tsx` — add TunerDisplay to layout
- `src/audio/AudioEngine.ts` — expose inputAnalyser getter (one line)

## Future: Tuning Presets

Not MVP, but the architecture should accommodate this. The current design assumes standard tuning (A4 = 440Hz, 12-TET). Future additions:

- **Alternate tunings**: Drop D, Open G, DADGAD, Half-step down, etc. The tuner would show which string you're closest to and whether you're sharp/flat relative to that tuning's target pitch.
- **Custom tunings**: User defines target pitches per string.
- **Reference pitch**: Adjustable A4 reference (e.g., 432Hz, 442Hz).

Implementation-wise, this means the note-mapping logic should take a tuning table as input rather than hardcoding standard tuning. The UI would add a small dropdown or selector near the tuner display.

## Implementation notes

- Create a dedicated analyser node with a larger buffer (2048+ samples) for accurate pitch detection across the full guitar range. Wire it from the same input gain node the existing analyser uses.
- Smoothing: apply exponential moving average to cents value to avoid jittery display. Something like `smoothedCents = prev * 0.7 + current * 0.3`.
- The tuner is read-only — it doesn't affect recording or playback in any way.
- Note mapping should accept a tuning table parameter from the start (even if only standard tuning is shipped initially) to support future tuning presets without refactoring.
