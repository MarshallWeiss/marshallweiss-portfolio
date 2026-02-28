# Chromatic Tuner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a chromatic tuner to the metal panel that reads from the mic input and displays detected pitch, note name, and cents deviation.

**Architecture:** Pure-function pitch detection (YIN autocorrelation) in a dedicated hook, reading from a new dedicated AnalyserNode on the AudioEngine. Canvas-based tuner display component on the metal panel between VU meters and master controls.

**Tech Stack:** Web Audio API (AnalyserNode), YIN pitch detection algorithm, React hook + canvas rendering, Tailwind CSS

---

### Task 1: Add dedicated tuner analyser to AudioEngine

**Files:**
- Modify: `experiments/music-recorder/src/audio/AudioEngine.ts`

**Step 1: Add the tuner analyser property**

At the top of the class, alongside the existing `private inputAnalyser`, add:

```typescript
private tunerAnalyser: AnalyserNode | null = null
```

**Step 2: Create the tuner analyser in `selectDevice()`**

In the `selectDevice()` method, after the existing `this.inputGainNode.connect(this.inputAnalyser)` line (line 121), add:

```typescript
// Create dedicated tuner analyser with large buffer for pitch detection
// 2048 samples needed for accurate detection down to ~21Hz (low E on bass)
this.tunerAnalyser = this.context!.createAnalyser()
this.tunerAnalyser.fftSize = 4096  // getFloatTimeDomainData returns 2048 samples
this.tunerAnalyser.smoothingTimeConstant = 0
this.inputGainNode.connect(this.tunerAnalyser)
```

**Step 3: Add getter method**

After the existing `getInputAnalyser()` method (line 513-515), add:

```typescript
/**
 * Get tuner analyser node (large buffer for pitch detection).
 */
getTunerAnalyser(): AnalyserNode | null {
  return this.tunerAnalyser
}
```

**Step 4: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 5: Commit**

```bash
git add experiments/music-recorder/src/audio/AudioEngine.ts
git commit -m "feat(music-recorder): add dedicated tuner analyser to AudioEngine"
```

---

### Task 2: Create pitch detection utilities

**Files:**
- Create: `experiments/music-recorder/src/audio/pitchDetection.ts`

**Step 1: Write the pitch detection module**

This is a pure-function module — no React, no Web Audio API dependencies. It takes a `Float32Array` of time-domain samples and a sample rate, returns a frequency or null.

```typescript
/**
 * YIN pitch detection algorithm.
 * Detects fundamental frequency from time-domain audio samples.
 *
 * References:
 * - "YIN, a fundamental frequency estimator for speech and music"
 *   (de Cheveigné & Kawahara, 2002)
 */

const YIN_THRESHOLD = 0.15 // Lower = stricter pitch detection, fewer false positives

/**
 * Detect the fundamental frequency of an audio signal.
 * @param buffer Time-domain audio samples (Float32Array from AnalyserNode)
 * @param sampleRate Audio sample rate (e.g., 44100)
 * @returns Detected frequency in Hz, or null if no clear pitch found
 */
export function detectPitch(buffer: Float32Array, sampleRate: number): number | null {
  const halfLen = Math.floor(buffer.length / 2)

  // Step 1: Compute the difference function
  const diff = new Float32Array(halfLen)
  for (let tau = 0; tau < halfLen; tau++) {
    let sum = 0
    for (let i = 0; i < halfLen; i++) {
      const delta = buffer[i] - buffer[i + tau]
      sum += delta * delta
    }
    diff[tau] = sum
  }

  // Step 2: Cumulative mean normalized difference function (CMNDF)
  const cmndf = new Float32Array(halfLen)
  cmndf[0] = 1
  let runningSum = 0
  for (let tau = 1; tau < halfLen; tau++) {
    runningSum += diff[tau]
    cmndf[tau] = diff[tau] * tau / runningSum
  }

  // Step 3: Absolute threshold — find first tau where cmndf dips below threshold
  let tau = 2 // Start at 2 to skip trivial zero-lag
  while (tau < halfLen) {
    if (cmndf[tau] < YIN_THRESHOLD) {
      // Walk past the dip to find the minimum (parabolic interpolation later)
      while (tau + 1 < halfLen && cmndf[tau + 1] < cmndf[tau]) {
        tau++
      }
      break
    }
    tau++
  }

  if (tau === halfLen) return null // No pitch found

  // Step 4: Parabolic interpolation for sub-sample accuracy
  const s0 = cmndf[tau - 1] ?? cmndf[tau]
  const s1 = cmndf[tau]
  const s2 = cmndf[tau + 1] ?? cmndf[tau]
  const adjustment = (s0 - s2) / (2 * (s0 - 2 * s1 + s2))
  const refinedTau = tau + (isFinite(adjustment) ? adjustment : 0)

  const frequency = sampleRate / refinedTau

  // Sanity check: guitar range is ~60Hz (drop C low) to ~1400Hz (high frets)
  // Allow wider range for other instruments: 20Hz to 5000Hz
  if (frequency < 20 || frequency > 5000) return null

  return frequency
}
```

**Step 2: Add the note mapping utilities below detectPitch in the same file**

```typescript
// Standard 12-TET note names
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export interface NoteInfo {
  note: string       // e.g. "A4", "C#3"
  noteName: string   // e.g. "A", "C#"
  octave: number     // e.g. 4
  frequency: number  // exact frequency of the nearest note
  centsOff: number   // -50 to +50, deviation from nearest note
}

/**
 * Standard tuning: maps frequency to nearest 12-TET note.
 * Accepts a reference pitch (default A4=440Hz) for future tuning support.
 */
export function frequencyToNote(frequency: number, referenceA4 = 440): NoteInfo {
  // MIDI note number: A4 = 69
  const noteNumber = 12 * Math.log2(frequency / referenceA4) + 69
  const roundedNote = Math.round(noteNumber)

  // Cents deviation: 100 cents = 1 semitone
  const centsOff = Math.round((noteNumber - roundedNote) * 100)

  const noteIndex = ((roundedNote % 12) + 12) % 12
  const octave = Math.floor(roundedNote / 12) - 1
  const noteName = NOTE_NAMES[noteIndex]

  // Exact frequency of the nearest note
  const exactFrequency = referenceA4 * Math.pow(2, (roundedNote - 69) / 12)

  return {
    note: `${noteName}${octave}`,
    noteName,
    octave,
    frequency: exactFrequency,
    centsOff,
  }
}
```

**Step 3: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add experiments/music-recorder/src/audio/pitchDetection.ts
git commit -m "feat(music-recorder): add YIN pitch detection and note mapping"
```

---

### Task 3: Create the `useTuner` hook

**Files:**
- Create: `experiments/music-recorder/src/hooks/useTuner.ts`

**Step 1: Write the hook**

```typescript
import { useState, useRef, useEffect, useCallback } from 'react'
import { AudioEngine } from '../audio/AudioEngine'
import { detectPitch, frequencyToNote, NoteInfo } from '../audio/pitchDetection'

export interface TunerState {
  /** Detected note info, or null if no pitch detected */
  noteInfo: NoteInfo | null
  /** Raw detected frequency in Hz, or null */
  rawFrequency: number | null
  /** Smoothed cents deviation for display (-50 to +50) */
  smoothedCents: number
  /** Whether pitch is currently being detected */
  isDetecting: boolean
}

/**
 * Hook that reads from the AudioEngine's tuner analyser and runs pitch detection.
 * Passive — reads from the analyser without affecting recording or playback.
 */
export function useTuner(engine: AudioEngine | null): TunerState {
  const [noteInfo, setNoteInfo] = useState<NoteInfo | null>(null)
  const [rawFrequency, setRawFrequency] = useState<number | null>(null)
  const [smoothedCents, setSmoothedCents] = useState(0)
  const [isDetecting, setIsDetecting] = useState(false)

  const rafRef = useRef<number>(0)
  const bufferRef = useRef<Float32Array | null>(null)
  const smoothedCentsRef = useRef(0)
  const noDetectionCountRef = useRef(0)

  useEffect(() => {
    const analyser = engine?.getTunerAnalyser()
    if (!analyser) {
      setIsDetecting(false)
      return
    }

    const sampleRate = engine!.getSampleRate()

    const detect = () => {
      // Allocate buffer once
      if (!bufferRef.current || bufferRef.current.length !== analyser.fftSize / 2) {
        bufferRef.current = new Float32Array(analyser.fftSize / 2)
      }

      analyser.getFloatTimeDomainData(bufferRef.current)

      // Check if there's actually signal (avoid detecting silence)
      let maxAmp = 0
      for (let i = 0; i < bufferRef.current.length; i++) {
        const abs = Math.abs(bufferRef.current[i])
        if (abs > maxAmp) maxAmp = abs
      }

      if (maxAmp < 0.01) {
        // Too quiet — no input
        noDetectionCountRef.current++
        if (noDetectionCountRef.current > 15) { // ~250ms at 60fps
          setNoteInfo(null)
          setRawFrequency(null)
          setIsDetecting(false)
          smoothedCentsRef.current = 0
          setSmoothedCents(0)
        }
        rafRef.current = requestAnimationFrame(detect)
        return
      }

      const frequency = detectPitch(bufferRef.current, sampleRate)

      if (frequency !== null) {
        const info = frequencyToNote(frequency)
        setNoteInfo(info)
        setRawFrequency(frequency)
        setIsDetecting(true)
        noDetectionCountRef.current = 0

        // Smooth the cents display
        smoothedCentsRef.current = smoothedCentsRef.current * 0.7 + info.centsOff * 0.3
        setSmoothedCents(Math.round(smoothedCentsRef.current))
      } else {
        noDetectionCountRef.current++
        if (noDetectionCountRef.current > 15) {
          setNoteInfo(null)
          setRawFrequency(null)
          setIsDetecting(false)
          smoothedCentsRef.current = 0
          setSmoothedCents(0)
        }
      }

      rafRef.current = requestAnimationFrame(detect)
    }

    rafRef.current = requestAnimationFrame(detect)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [engine])

  return { noteInfo, rawFrequency, smoothedCents, isDetecting }
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add experiments/music-recorder/src/hooks/useTuner.ts
git commit -m "feat(music-recorder): add useTuner hook with smoothed pitch detection"
```

---

### Task 4: Create the `TunerDisplay` component

**Files:**
- Create: `experiments/music-recorder/src/components/skeuomorphic/TunerDisplay.tsx`

**Step 1: Write the tuner display component**

This is a canvas-based display, similar to the VUMeter component's rendering approach. Sized to fit on the metal panel (~120px wide, ~110px tall to match VU meter height).

```typescript
import { useRef, useEffect } from 'react'
import { TunerState } from '../../hooks/useTuner'

interface TunerDisplayProps {
  tuner: TunerState
  width?: number
  height?: number
}

export default function TunerDisplay({ tuner, width = 120, height = 110 }: TunerDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const displayCentsRef = useRef(0) // for smooth animation independent of hook state

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const draw = () => {
      // Smooth the cents animation
      const targetCents = tuner.isDetecting ? tuner.smoothedCents : 0
      displayCentsRef.current = displayCentsRef.current * 0.8 + targetCents * 0.2

      ctx.clearRect(0, 0, width, height)

      // --- Background ---
      ctx.fillStyle = '#2a2218'
      ctx.beginPath()
      ctx.roundRect(0, 0, width, height, 4)
      ctx.fill()

      // Subtle warm glow
      const glow = ctx.createRadialGradient(width / 2, height * 0.4, 5, width / 2, height * 0.4, width * 0.5)
      glow.addColorStop(0, 'rgba(245, 166, 35, 0.08)')
      glow.addColorStop(1, 'rgba(245, 166, 35, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const isInTune = tuner.isDetecting && Math.abs(tuner.smoothedCents) <= 5
      const detecting = tuner.isDetecting

      // --- Note Name ---
      const noteName = detecting && tuner.noteInfo ? tuner.noteInfo.noteName : '--'
      const octave = detecting && tuner.noteInfo ? String(tuner.noteInfo.octave) : ''

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Note name — large
      ctx.font = 'bold 28px "Courier New", monospace'
      ctx.fillStyle = detecting
        ? (isInTune ? '#48bb78' : 'rgba(220, 210, 190, 0.9)')
        : 'rgba(220, 210, 190, 0.3)'
      ctx.fillText(noteName, centerX - 4, height * 0.28)

      // Octave — smaller, offset right
      if (octave) {
        ctx.font = 'bold 14px "Courier New", monospace'
        ctx.fillStyle = 'rgba(220, 210, 190, 0.5)'
        const noteWidth = ctx.measureText(noteName).width
        // Measure with the large font to get correct width
        ctx.font = 'bold 28px "Courier New", monospace'
        const actualNoteWidth = ctx.measureText(noteName).width
        ctx.font = 'bold 14px "Courier New", monospace'
        ctx.textAlign = 'left'
        ctx.fillText(octave, centerX - 4 + actualNoteWidth / 2 + 2, height * 0.28 + 6)
        ctx.textAlign = 'center'
      }

      // --- In-tune glow ---
      if (isInTune && detecting) {
        const tuneGlow = ctx.createRadialGradient(centerX, height * 0.28, 2, centerX, height * 0.28, 30)
        tuneGlow.addColorStop(0, 'rgba(72, 187, 120, 0.15)')
        tuneGlow.addColorStop(1, 'rgba(72, 187, 120, 0)')
        ctx.fillStyle = tuneGlow
        ctx.fillRect(0, 0, width, height)
      }

      // --- Cents Meter Bar ---
      const meterY = height * 0.55
      const meterWidth = width - 24
      const meterLeft = 12
      const meterHeight = 6

      // Track background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.beginPath()
      ctx.roundRect(meterLeft, meterY - meterHeight / 2, meterWidth, meterHeight, 3)
      ctx.fill()

      // Center tick mark
      ctx.fillStyle = 'rgba(220, 210, 190, 0.4)'
      ctx.fillRect(centerX - 0.5, meterY - meterHeight / 2 - 2, 1, meterHeight + 4)

      // Quarter tick marks
      for (const frac of [0.25, 0.75]) {
        const x = meterLeft + frac * meterWidth
        ctx.fillStyle = 'rgba(220, 210, 190, 0.15)'
        ctx.fillRect(x - 0.5, meterY - meterHeight / 2 - 1, 1, meterHeight + 2)
      }

      // Indicator dot
      if (detecting) {
        const centsNorm = displayCentsRef.current / 50 // -1 to +1
        const clampedNorm = Math.max(-1, Math.min(1, centsNorm))
        const indicatorX = centerX + clampedNorm * (meterWidth / 2 - 4)

        // Color based on how in-tune
        const absCents = Math.abs(displayCentsRef.current)
        let dotColor: string
        if (absCents <= 5) {
          dotColor = '#48bb78' // green — in tune
        } else if (absCents <= 20) {
          dotColor = '#f5a623' // amber — close
        } else {
          dotColor = '#e53e3e' // red — way off
        }

        // Dot glow
        const dotGlow = ctx.createRadialGradient(indicatorX, meterY, 0, indicatorX, meterY, 8)
        dotGlow.addColorStop(0, dotColor.replace(')', ', 0.3)').replace('rgb', 'rgba'))
        dotGlow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = dotGlow
        ctx.fillRect(indicatorX - 8, meterY - 8, 16, 16)

        // Dot
        ctx.beginPath()
        ctx.arc(indicatorX, meterY, 3, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      }

      // --- Flat/Sharp labels ---
      ctx.font = '8px "Helvetica Neue", sans-serif'
      ctx.fillStyle = 'rgba(220, 210, 190, 0.3)'
      ctx.textAlign = 'left'
      ctx.fillText('♭', meterLeft, meterY + meterHeight / 2 + 10)
      ctx.textAlign = 'right'
      ctx.fillText('♯', meterLeft + meterWidth, meterY + meterHeight / 2 + 10)

      // --- Frequency readout ---
      ctx.textAlign = 'center'
      ctx.font = '9px "Courier New", monospace'
      ctx.fillStyle = detecting
        ? 'rgba(220, 210, 190, 0.5)'
        : 'rgba(220, 210, 190, 0.15)'

      const freqText = detecting && tuner.rawFrequency
        ? `${tuner.rawFrequency.toFixed(1)} Hz`
        : '--- Hz'
      ctx.fillText(freqText, centerX, height * 0.82)

      // --- Cents readout ---
      ctx.font = '8px "Courier New", monospace'
      ctx.fillStyle = detecting
        ? 'rgba(220, 210, 190, 0.4)'
        : 'rgba(220, 210, 190, 0.1)'

      const centsText = detecting && tuner.noteInfo
        ? `${tuner.smoothedCents > 0 ? '+' : ''}${tuner.smoothedCents}¢`
        : ''
      ctx.fillText(centsText, centerX, height * 0.93)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tuner, width, height])

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded shadow-vu-recess p-0.5">
        <canvas
          ref={canvasRef}
          style={{ width, height }}
          className="rounded"
        />
      </div>
      <span className="text-[9px] font-label uppercase tracking-wider text-engraved font-bold">
        Tuner
      </span>
    </div>
  )
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add experiments/music-recorder/src/components/skeuomorphic/TunerDisplay.tsx
git commit -m "feat(music-recorder): add canvas-based TunerDisplay component"
```

---

### Task 5: Wire tuner into MetalPanel

**Files:**
- Modify: `experiments/music-recorder/src/components/skeuomorphic/MetalPanel.tsx`

**Step 1: Add imports**

At the top of `MetalPanel.tsx`, add:

```typescript
import { useTuner } from '../../hooks/useTuner'
import TunerDisplay from './TunerDisplay'
```

**Step 2: Add the hook call**

Inside the `MetalPanel` component function, before the `getLeftAnalyser` function, add:

```typescript
const tuner = useTuner(engine)
```

**Step 3: Add TunerDisplay to the layout**

In the JSX, between the VU meters `<div>` (closing `</div>` on what was line 72) and the `<div className="flex-1" />` spacer (line 74), insert:

```tsx
{/* Tuner */}
<TunerDisplay tuner={tuner} width={120} height={110} />
```

**Step 4: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 5: Manual test**

Run: `cd "experiments/music-recorder" && npm run dev`

1. Open the app, click the power button to initialize
2. The tuner should appear on the metal panel between the VU meters and the Input knob
3. Play a note on your guitar (or hum into the mic) — the tuner should show the note name, a moving indicator dot on the cents bar, and the frequency readout
4. When in tune (±5 cents), the note name should turn green with a subtle glow
5. When silent, it should dim to `--`

**Step 6: Commit**

```bash
git add experiments/music-recorder/src/components/skeuomorphic/MetalPanel.tsx
git commit -m "feat(music-recorder): wire TunerDisplay into MetalPanel"
```

---

### Task 6: Visual polish pass

**Files:**
- Modify: `experiments/music-recorder/src/components/skeuomorphic/TunerDisplay.tsx` (potential adjustments)

**Step 1: Run the app and visually inspect**

Run: `cd "experiments/music-recorder" && npm run dev`

Check for:
- [ ] TunerDisplay height matches VU meters (both 110px)
- [ ] Tuner background darkness matches VU meter face background (`#2a2218`)
- [ ] Indicator dot moves smoothly without jitter
- [ ] Note name is readable at the 28px size
- [ ] Frequency readout is legible but doesn't compete with the note name
- [ ] The panel doesn't feel cramped — the flex-1 spacer should absorb any extra width
- [ ] On narrow windows, the layout doesn't break

**Step 2: Adjust as needed**

Common adjustments that may be needed:
- If the panel is too crowded, reduce `TunerDisplay` width to 100px
- If the note name text is too bright/dark, adjust the fill opacity
- If the cents indicator is too jittery, increase the smoothing factor in `useTuner` from `0.7/0.3` to `0.8/0.2`
- If pitch detection misses low notes, verify the `fftSize` is 4096 (gives 2048 samples to `getFloatTimeDomainData`)

**Step 3: Commit any adjustments**

```bash
git add experiments/music-recorder/src/
git commit -m "fix(music-recorder): tune TunerDisplay visual alignment and smoothing"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Add tuner analyser to AudioEngine | `AudioEngine.ts` |
| 2 | Create pitch detection utilities | `pitchDetection.ts` (new) |
| 3 | Create `useTuner` hook | `useTuner.ts` (new) |
| 4 | Create `TunerDisplay` component | `TunerDisplay.tsx` (new) |
| 5 | Wire into MetalPanel | `MetalPanel.tsx` |
| 6 | Visual polish pass | Various |

Total: 3 new files, 2 modified files. No new dependencies.
