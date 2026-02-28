# Ditto Loop Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Ditto looper mode alongside the existing multitrack recorder — single control (spacebar / stomp button), bounce-down mixing, undo/redo, matching the real TC Electronic Ditto behavior.

**Architecture:** New `useLooper` hook owns the looper state machine (EMPTY → RECORDING_FIRST → PLAYING ↔ OVERDUBBING). Keeps a composite AudioBuffer (bounced-down) and one undo buffer. Gesture detection (tap/double-tap/hold/double-tap+hold) interprets spacebar presses. New StompButton and LooperView components replace the mixer and transport in looper mode. AudioEngine gets a `mixBuffers()` utility for overdub bounce-down with soft limiting. App.tsx conditionally renders multitrack or looper layout based on a mode toggle.

**Tech Stack:** Web Audio API, React hooks, canvas rendering, Tailwind CSS

---

### Task 1: Add `mixBuffers()` to AudioEngine

**Files:**
- Modify: `experiments/music-recorder/src/audio/AudioEngine.ts`

**Step 1: Add the mixBuffers method**

After the existing `exportMix()` method (~line 604), add this method. It takes two AudioBuffers, adds them sample-by-sample, and applies a soft limiter to prevent clipping when layers stack up.

```typescript
/**
 * Mix two mono AudioBuffers together (additive bounce-down).
 * Applies tanh soft limiting to prevent clipping with many layers.
 * Result length = longer buffer's length.
 */
mixBuffers(a: AudioBuffer, b: AudioBuffer): AudioBuffer {
  if (!this.context) throw new Error('AudioEngine not initialized')
  const length = Math.max(a.length, b.length)
  const result = this.context.createBuffer(1, length, this.context.sampleRate)
  const out = result.getChannelData(0)
  const aData = a.getChannelData(0)
  const bData = b.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const sum = (i < aData.length ? aData[i] : 0) + (i < bData.length ? bData[i] : 0)
    // tanh soft limiter — preserves dynamics, prevents hard clipping
    out[i] = Math.tanh(sum)
  }
  return result
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/audio/AudioEngine.ts
git commit -m "feat: add mixBuffers() for looper overdub bounce-down"
```

---

### Task 2: Create gesture detection hook

**Files:**
- Create: `experiments/music-recorder/src/hooks/useGesture.ts`

This hook interprets spacebar presses into Ditto-style gestures. It discriminates between: tap, double-tap, hold (1.5s), and double-tap+hold (second tap held 1.5s). It does NOT know about looper state — it just emits gesture events.

**Step 1: Write the hook**

```typescript
import { useEffect, useRef, useCallback } from 'react'

export type Gesture = 'tap' | 'double-tap' | 'hold' | 'double-tap-hold'

interface UseGestureOptions {
  /** Called when a gesture is recognized */
  onGesture: (gesture: Gesture) => void
  /** Whether gesture detection is active */
  enabled: boolean
  /** Key to listen for (default: ' ' i.e. Space) */
  key?: string
}

const DOUBLE_TAP_WINDOW = 300 // ms — max gap between two taps
const HOLD_DURATION = 1500    // ms — how long to hold for hold gestures

/**
 * Detects tap, double-tap, hold, and double-tap+hold gestures on a key.
 * Filters out keyboard repeat events.
 */
export function useGesture({ onGesture, enabled, key = ' ' }: UseGestureOptions) {
  const stateRef = useRef<{
    isDown: boolean
    downTime: number
    tapCount: number       // taps so far in current gesture sequence
    tapTimer: ReturnType<typeof setTimeout> | null
    holdTimer: ReturnType<typeof setTimeout> | null
  }>({
    isDown: false,
    downTime: 0,
    tapCount: 0,
    tapTimer: null,
    holdTimer: null,
  })

  const onGestureRef = useRef(onGesture)
  onGestureRef.current = onGesture

  const clearTimers = useCallback(() => {
    const s = stateRef.current
    if (s.tapTimer) { clearTimeout(s.tapTimer); s.tapTimer = null }
    if (s.holdTimer) { clearTimeout(s.holdTimer); s.holdTimer = null }
  }, [])

  useEffect(() => {
    if (!enabled) {
      clearTimers()
      stateRef.current.tapCount = 0
      stateRef.current.isDown = false
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== key || e.repeat) return
      e.preventDefault()

      const s = stateRef.current
      if (s.isDown) return // shouldn't happen, but guard
      s.isDown = true
      s.downTime = Date.now()

      // Clear the "wait for second tap" timer since a new press arrived
      if (s.tapTimer) { clearTimeout(s.tapTimer); s.tapTimer = null }

      // Start hold timer
      s.holdTimer = setTimeout(() => {
        // Key is still held after HOLD_DURATION
        if (s.tapCount === 0) {
          // Single hold
          onGestureRef.current('hold')
        } else {
          // Had a prior tap + now holding = double-tap+hold
          onGestureRef.current('double-tap-hold')
        }
        s.tapCount = 0
        s.holdTimer = null
      }, HOLD_DURATION)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== key) return
      e.preventDefault()

      const s = stateRef.current
      if (!s.isDown) return
      s.isDown = false

      const duration = Date.now() - s.downTime

      // Cancel hold timer — released before hold threshold
      if (s.holdTimer) { clearTimeout(s.holdTimer); s.holdTimer = null }

      // If held long enough, gesture already fired in the hold timer
      if (duration >= HOLD_DURATION) {
        s.tapCount = 0
        return
      }

      // Short press — count as a tap
      s.tapCount++

      if (s.tapCount === 1) {
        // First tap — wait for possible second tap
        s.tapTimer = setTimeout(() => {
          // No second tap arrived — it's a single tap
          onGestureRef.current('tap')
          s.tapCount = 0
          s.tapTimer = null
        }, DOUBLE_TAP_WINDOW)
      } else if (s.tapCount >= 2) {
        // Second tap released quickly — double-tap
        onGestureRef.current('double-tap')
        s.tapCount = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearTimers()
    }
  }, [enabled, key, clearTimers])
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/hooks/useGesture.ts
git commit -m "feat: add useGesture hook for tap/double-tap/hold detection"
```

---

### Task 3: Create the looper state machine hook

**Files:**
- Create: `experiments/music-recorder/src/hooks/useLooper.ts`

This is the core logic. It manages the Ditto state machine, calls AudioEngine methods for recording/playback, handles overdub bounce-down, and exposes state for the UI.

**Step 1: Write the hook**

```typescript
import { useState, useRef, useCallback, useEffect } from 'react'
import { AudioEngine } from '../audio/AudioEngine'
import { Gesture, useGesture } from './useGesture'

export type LooperState = 'empty' | 'recording' | 'playing' | 'overdubbing' | 'stopped'

export interface UseLooperReturn {
  state: LooperState
  layerCount: number
  loopDuration: number
  currentTime: number
  canUndo: boolean
  undoIsRedo: boolean  // true if next undo action would actually redo
  ledColor: 'off' | 'red' | 'green' | 'green-flash' | 'red-pulse'
}

export function useLooper(engine: AudioEngine | null, enabled: boolean): UseLooperReturn {
  const [state, setState] = useState<LooperState>('empty')
  const [layerCount, setLayerCount] = useState(0)
  const [loopDuration, setLoopDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [canUndo, setCanUndo] = useState(false)
  const [undoIsRedo, setUndoIsRedo] = useState(false)

  // Audio buffers — refs to avoid stale closures
  const compositeRef = useRef<AudioBuffer | null>(null)
  const undoBufferRef = useRef<AudioBuffer | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state
  const loopDurationRef = useRef(0)

  // Time tracking
  useEffect(() => {
    if (!engine || !enabled) return
    engine.onTimeUpdate = (time) => setCurrentTime(time)
    return () => { engine.onTimeUpdate = null }
  }, [engine, enabled])

  // Auto-stop polling ref
  const autoStopRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAutoStop = useCallback(() => {
    if (autoStopRef.current) {
      clearInterval(autoStopRef.current)
      autoStopRef.current = null
    }
  }, [])

  const startPlayback = useCallback(() => {
    if (!engine || !compositeRef.current) return
    engine.stopAllPlayback()
    engine.playAll(
      [{ buffer: compositeRef.current, volume: 1, pan: 0, muted: false, solo: false }],
      true,
      0,
    )
  }, [engine])

  const handleRecordingFirstComplete = useCallback(() => {
    if (!engine) return
    clearAutoStop()
    const buffer = engine.stopRecording()
    if (!buffer || buffer.length === 0) {
      setState('empty')
      return
    }
    compositeRef.current = buffer
    loopDurationRef.current = buffer.duration
    setLoopDuration(buffer.duration)
    setLayerCount(1)
    setState('playing')
    // Start looping immediately
    engine.playAll(
      [{ buffer, volume: 1, pan: 0, muted: false, solo: false }],
      true,
      0,
    )
  }, [engine, clearAutoStop])

  const handleOverdubComplete = useCallback(() => {
    if (!engine) return
    clearAutoStop()
    const overdubBuffer = engine.stopRecording()
    if (!overdubBuffer || !compositeRef.current) {
      setState('playing')
      startPlayback()
      return
    }
    // Save current composite for undo
    undoBufferRef.current = compositeRef.current
    setCanUndo(true)
    setUndoIsRedo(false)
    // Bounce down: mix overdub into composite
    compositeRef.current = engine.mixBuffers(compositeRef.current, overdubBuffer)
    setLayerCount(prev => prev + 1)
    setState('playing')
    startPlayback()
  }, [engine, clearAutoStop, startPlayback])

  const startOverdub = useCallback(() => {
    if (!engine || !compositeRef.current) return
    // Play composite while recording new layer
    engine.stopAllPlayback()
    engine.startRecording(
      [{ buffer: compositeRef.current, volume: 1, pan: 0, muted: false }],
      loopDurationRef.current,
      0,
    )
    setState('overdubbing')
    // Poll for auto-stop at loop boundary
    autoStopRef.current = setInterval(() => {
      if (!engine.isRecording()) {
        handleOverdubComplete()
      }
    }, 50)
  }, [engine, handleOverdubComplete])

  const handleGesture = useCallback((gesture: Gesture) => {
    if (!engine) return
    const s = stateRef.current

    switch (gesture) {
      case 'tap':
        if (s === 'empty') {
          // Start first recording
          engine.startRecording([], undefined, 0)
          setState('recording')
        } else if (s === 'recording') {
          // End first recording → play
          handleRecordingFirstComplete()
        } else if (s === 'playing') {
          // Start overdub
          startOverdub()
        } else if (s === 'overdubbing') {
          // End overdub → play
          handleOverdubComplete()
        } else if (s === 'stopped') {
          // Resume playback
          startPlayback()
          setState('playing')
        }
        break

      case 'hold':
        if (s === 'playing') {
          // Undo/redo last overdub
          if (canUndo && undoBufferRef.current) {
            // Swap composite and undo buffer
            const temp = compositeRef.current
            compositeRef.current = undoBufferRef.current
            undoBufferRef.current = temp
            setUndoIsRedo(prev => !prev)
            // Restart playback with swapped buffer
            startPlayback()
          }
        }
        break

      case 'double-tap':
        if (s === 'playing' || s === 'overdubbing') {
          // Stop (loop stays in memory)
          clearAutoStop()
          if (engine.isRecording()) engine.stopRecording()
          engine.stopAllPlayback()
          setState('stopped')
        }
        break

      case 'double-tap-hold':
        // Delete loop entirely
        clearAutoStop()
        if (engine.isRecording()) engine.stopRecording()
        engine.stopAllPlayback()
        compositeRef.current = null
        undoBufferRef.current = null
        setLayerCount(0)
        setLoopDuration(0)
        setCurrentTime(0)
        setCanUndo(false)
        setUndoIsRedo(false)
        setState('empty')
        break
    }
  }, [engine, canUndo, handleRecordingFirstComplete, handleOverdubComplete, startOverdub, startPlayback, clearAutoStop])

  useGesture({
    onGesture: handleGesture,
    enabled: enabled && !!engine,
  })

  // Reset when disabled
  useEffect(() => {
    if (!enabled) {
      clearAutoStop()
      if (engine?.isRecording()) engine.stopRecording()
      if (engine?.isPlaying()) engine.stopAllPlayback()
      compositeRef.current = null
      undoBufferRef.current = null
      setState('empty')
      setLayerCount(0)
      setLoopDuration(0)
      setCurrentTime(0)
      setCanUndo(false)
      setUndoIsRedo(false)
    }
  }, [enabled, engine, clearAutoStop])

  // LED color derived from state
  let ledColor: UseLooperReturn['ledColor'] = 'off'
  if (state === 'recording' || state === 'overdubbing') ledColor = 'red'
  else if (state === 'playing') ledColor = 'green'
  else if (state === 'stopped') ledColor = 'green-flash'

  return { state, layerCount, loopDuration, currentTime, canUndo, undoIsRedo, ledColor }
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/hooks/useLooper.ts
git commit -m "feat: add useLooper hook with Ditto state machine"
```

---

### Task 4: Create the StompButton component

**Files:**
- Create: `experiments/music-recorder/src/components/skeuomorphic/StompButton.tsx`

A large circular button styled like a guitar pedal footswitch, with an LED ring that changes color based on looper state.

**Step 1: Write the component**

```typescript
import { UseLooperReturn } from '../../hooks/useLooper'

interface StompButtonProps {
  looper: UseLooperReturn
  onClick: () => void
}

const LED_COLORS = {
  off: { ring: 'rgba(60, 55, 50, 0.8)', glow: 'none' },
  red: { ring: '#e53e3e', glow: '0 0 12px 4px rgba(229, 62, 62, 0.5)' },
  green: { ring: '#48bb78', glow: '0 0 12px 4px rgba(72, 187, 120, 0.5)' },
  'green-flash': { ring: '#48bb78', glow: '0 0 12px 4px rgba(72, 187, 120, 0.3)' },
  'red-pulse': { ring: '#e53e3e', glow: '0 0 12px 4px rgba(229, 62, 62, 0.4)' },
}

const STATE_LABELS: Record<string, string> = {
  empty: 'READY',
  recording: 'REC',
  playing: 'PLAY',
  overdubbing: 'OVERDUB',
  stopped: 'STOPPED',
}

export default function StompButton({ looper, onClick }: StompButtonProps) {
  const led = LED_COLORS[looper.ledColor]
  const isFlashing = looper.ledColor === 'green-flash'
  const isRecording = looper.state === 'recording' || looper.state === 'overdubbing'

  return (
    <div className="flex flex-col items-center gap-3">
      {/* State label */}
      <div className="text-[11px] font-mono font-bold tracking-wider uppercase"
        style={{ color: looper.state === 'empty' ? 'rgba(180,170,150,0.4)' : 'rgba(220,210,190,0.8)' }}
      >
        {STATE_LABELS[looper.state]}
        {looper.layerCount > 0 && (
          <span className="ml-2 text-[9px]" style={{ color: 'rgba(180,170,150,0.5)' }}>
            {looper.layerCount} {looper.layerCount === 1 ? 'layer' : 'layers'}
          </span>
        )}
      </div>

      {/* Stomp button */}
      <button
        onClick={onClick}
        className="relative rounded-full cursor-pointer transition-transform active:translate-y-0.5 active:scale-[0.98] no-select"
        style={{
          width: 100,
          height: 100,
          background: 'radial-gradient(circle at 40% 35%, #686058, #484038 50%, #383430 100%)',
          boxShadow: `
            0 4px 12px rgba(0,0,0,0.5),
            0 1px 4px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -2px 4px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* LED ring */}
        <div
          className={`absolute inset-2 rounded-full border-2 transition-all ${
            isFlashing ? 'animate-led-pulse' : ''
          }`}
          style={{
            borderColor: led.ring,
            boxShadow: led.glow,
          }}
        />

        {/* Center dot texture */}
        <div
          className="absolute rounded-full"
          style={{
            top: '30%', left: '30%', right: '30%', bottom: '30%',
            background: 'radial-gradient(circle at 40% 35%, #585048, #383430 100%)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
          }}
        />

        {/* Recording pulse overlay */}
        {isRecording && (
          <div
            className="absolute inset-2 rounded-full animate-led-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(229,62,62,0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </button>

      {/* Undo indicator */}
      {looper.canUndo && looper.state === 'playing' && (
        <div className="text-[8px] font-mono tracking-wider"
          style={{ color: 'rgba(180,170,150,0.5)' }}
        >
          HOLD: {looper.undoIsRedo ? 'REDO' : 'UNDO'}
        </div>
      )}

      {/* Keyboard hint */}
      <div className="flex items-center gap-1.5">
        <div className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold"
          style={{
            background: 'rgba(0,0,0,0.2)',
            color: 'rgba(180,170,150,0.5)',
            border: '1px solid rgba(180,170,150,0.15)',
          }}
        >
          SPACE
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/skeuomorphic/StompButton.tsx
git commit -m "feat: add StompButton component with LED ring"
```

---

### Task 5: Create LooperView layout component

**Files:**
- Create: `experiments/music-recorder/src/components/skeuomorphic/LooperView.tsx`

This replaces the mixer + transport area when in looper mode. Shows the stomp button centered, with the cassette deck above it.

**Step 1: Write the component**

```typescript
import { UseLooperReturn } from '../../hooks/useLooper'
import StompButton from './StompButton'
import CassetteDeck from './CassetteDeck'

interface LooperViewProps {
  looper: UseLooperReturn
  sessionName: string
  onSetSessionName: (name: string) => void
  onStompClick: () => void
}

export default function LooperView({
  looper,
  sessionName,
  onSetSessionName,
  onStompClick,
}: LooperViewProps) {
  // Format time as M:SS
  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center gap-4 flex-1 justify-center py-4">
      {/* Cassette deck */}
      <CassetteDeck
        isPlaying={looper.state === 'playing' || looper.state === 'overdubbing'}
        isRecording={looper.state === 'recording' || looper.state === 'overdubbing'}
        sessionName={sessionName}
        onSetSessionName={onSetSessionName}
        loopDuration={looper.loopDuration}
        currentTime={looper.currentTime}
      />

      {/* Loop time display */}
      {looper.loopDuration > 0 && (
        <div className="text-[10px] font-mono" style={{ color: 'rgba(180,170,150,0.5)' }}>
          {formatTime(looper.currentTime)} / {formatTime(looper.loopDuration)}
        </div>
      )}

      {/* Stomp button */}
      <StompButton looper={looper} onClick={onStompClick} />
    </div>
  )
}
```

**Step 2: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/skeuomorphic/LooperView.tsx
git commit -m "feat: add LooperView layout component"
```

---

### Task 6: Add mode toggle and wire looper into App.tsx

**Files:**
- Modify: `experiments/music-recorder/src/App.tsx`

This is the integration task. Add mode state, import looper hook, conditionally render looper or multitrack layout.

**Step 1: Add mode state and looper hook**

At the top of `App.tsx`, add the imports:

```typescript
import { useState, useCallback } from 'react'
import { useLooper } from './hooks/useLooper'
import LooperView from './components/skeuomorphic/LooperView'
```

Inside `App()`, after the `useAudioEngine()` destructuring, add:

```typescript
const [mode, setMode] = useState<'multitrack' | 'looper'>('multitrack')
const isLooperMode = mode === 'looper'

const looper = useLooper(engine, isLooperMode)

// Stomp button click = simulate a spacebar tap
// (the useGesture hook handles spacebar, but clicking the button should also work)
const handleStompClick = useCallback(() => {
  // Dispatch a synthetic Space keydown + keyup to trigger gesture detection
  window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
  setTimeout(() => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }))
  }, 50)
}, [])

const toggleMode = useCallback(() => {
  // Stop any active recording/playback before switching
  if (isRecording) stopRecording()
  if (isPlaying) stop()
  setMode(prev => prev === 'multitrack' ? 'looper' : 'multitrack')
}, [isRecording, isPlaying, stopRecording, stop])
```

**Step 2: Add mode toggle to the UI**

In the JSX, after the `<MetalPanel ... />` component and before the middle section, add a mode toggle bar:

```tsx
{/* Mode toggle */}
<div className="flex items-center justify-center gap-3 py-1.5 border-b border-hw-400/10">
  <button
    onClick={toggleMode}
    className={`px-3 py-1 rounded text-[9px] font-label uppercase tracking-wider font-bold transition-all ${
      !isLooperMode ? 'shadow-button-down' : 'shadow-button-up'
    }`}
    style={{
      background: !isLooperMode
        ? 'radial-gradient(circle, #4a6a8a 0%, #3a5a7a 100%)'
        : 'radial-gradient(circle at 38% 35%, #a09888, #706860 100%)',
      color: !isLooperMode ? 'rgba(200,210,230,0.9)' : 'rgba(0,0,0,0.35)',
    }}
  >
    4-Track
  </button>
  <button
    onClick={toggleMode}
    className={`px-3 py-1 rounded text-[9px] font-label uppercase tracking-wider font-bold transition-all ${
      isLooperMode ? 'shadow-button-down' : 'shadow-button-up'
    }`}
    style={{
      background: isLooperMode
        ? 'radial-gradient(circle, #4a6a8a 0%, #3a5a7a 100%)'
        : 'radial-gradient(circle at 38% 35%, #a09888, #706860 100%)',
      color: isLooperMode ? 'rgba(200,210,230,0.9)' : 'rgba(0,0,0,0.35)',
    }}
  >
    Looper
  </button>
</div>
```

**Step 3: Conditionally render multitrack or looper layout**

Replace the middle section `<div className="flex items-stretch flex-1 ...">` with conditional rendering:

```tsx
{/* Middle: Mixer + Transport (multitrack) or Stomp (looper) */}
<div className="flex items-stretch flex-1 px-4 py-4 gap-4">
  {isLooperMode ? (
    <LooperView
      looper={looper}
      sessionName={currentSessionName}
      onSetSessionName={setSessionName}
      onStompClick={handleStompClick}
    />
  ) : (
    <>
      {/* Mixer section (left) */}
      <MixerSection
        tracks={tracks}
        onArmTrack={armTrack}
        onSetVolume={setVolume}
        onSetPan={setPan}
        onToggleMute={toggleMute}
        onToggleSolo={toggleSolo}
        onClearTrack={clearTrack}
        onRenameTrack={renameTrack}
      />

      {/* Cassette deck + transport (right) */}
      <div className="flex flex-col items-center gap-2 flex-1 justify-center">
        <CassetteDeck
          isPlaying={isPlaying}
          isRecording={isRecording}
          sessionName={currentSessionName}
          onSetSessionName={setSessionName}
          loopDuration={loopDuration}
          currentTime={currentTime}
        />

        <TransportButtons
          isRecording={isRecording}
          isCountingIn={isCountingIn}
          isPlaying={isPlaying}
          hasArmedTrack={!!armedTrack}
          hasRecordedTracks={hasRecordedTracks}
          loopDuration={loopDuration}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onPlay={play}
          onStop={stop}
          onSeekTo={seekTo}
        />
      </div>
    </>
  )}
</div>
```

**Step 4: Verify it compiles**

Run: `cd "experiments/music-recorder" && npx tsc --noEmit`
Expected: No errors

**Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add mode toggle and wire looper into App"
```

---

### Task 7: Manual test and fix

**Step 1: Run the app**

Run: `cd "experiments/music-recorder" && npm run dev`

Open `http://localhost:5173/music-recorder/`

**Step 2: Test the multitrack mode**

1. Power on
2. Verify 4-Track mode works as before (record, play, overdub, stop)
3. Verify the mode toggle appears between the metal panel and the mixer

**Step 3: Test looper mode**

1. Click "Looper" toggle
2. Verify mixer/transport hides, stomp button appears
3. Press spacebar → should show "REC", LED ring red
4. Press spacebar again → should show "PLAY", LED ring green, loop plays back
5. Press spacebar → "OVERDUB", red LED, new audio layers on top
6. Press spacebar → "PLAY" again with both layers
7. Double-tap spacebar → "STOPPED", green LED flashes
8. Tap spacebar → resumes playback
9. Hold spacebar while playing → should undo last overdub
10. Hold again → redo
11. Double-tap + hold → deletes loop, back to "READY"

**Step 4: Fix any issues found**

Common things to check:
- `engine.onTimeUpdate` conflict: the looper and multitrack both try to set it. When switching modes, the previous mode's time handler should be cleaned up. May need to wrap the time update handler to support both.
- Auto-stop polling: verify the interval cleans up when switching modes
- Clicking the stomp button vs spacebar should behave identically

**Step 5: Commit fixes**

```bash
git add src/
git commit -m "fix: looper mode integration adjustments"
```

---

### Task 8: Production build verification

**Step 1: Build**

Run: `cd "experiments/music-recorder" && npm run build`
Expected: Clean build with no errors

**Step 2: Commit if any build fixes were needed**

```bash
git add src/
git commit -m "fix: resolve build issues"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Add `mixBuffers()` to AudioEngine | `AudioEngine.ts` |
| 2 | Create gesture detection hook | `useGesture.ts` (new) |
| 3 | Create looper state machine hook | `useLooper.ts` (new) |
| 4 | Create StompButton component | `StompButton.tsx` (new) |
| 5 | Create LooperView component | `LooperView.tsx` (new) |
| 6 | Wire mode toggle + looper into App | `App.tsx` |
| 7 | Manual test and fix | Various |
| 8 | Production build verification | — |

Total: 4 new files, 2 modified files. No new dependencies.

### Key design decisions:
- **Bounce-down mixing** with tanh soft limiter — matches real Ditto behavior
- **Single undo level** — swap composite and undo buffer on hold gesture
- **Synthetic keyboard events** for stomp button click — reuses gesture detection without duplicating logic
- **Mode toggle stops all activity** — clean transition between modes
- **Looper is fully independent** of multitrack state — own hook, own buffers, no shared track state
- **onTimeUpdate conflict** — Task 7 addresses this; the looper sets its own handler when active
