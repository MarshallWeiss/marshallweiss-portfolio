# Ditto Loop Mode

## Overview

Add a "loop pedal" mode alongside the existing multitrack recorder mode. Inspired by the TC Electronic Ditto looper: press to record, press again to stop — loop starts immediately. Subsequent presses layer (overdub) on top. Spacebar as the primary control.

## How the Ditto Works (from the TC Electronic manual)

1. **Empty → Record**: Tap footswitch → LED red, recording starts
2. **Record → Play**: Tap again → LED green, loop length set, playback starts instantly. LED blinks at loop start point.
3. **Play → Overdub**: Tap again → LED red, overdub recording starts (layered on existing loop, playing simultaneously)
4. **Overdub → Play**: Tap again → LED green, overdub committed, playback continues
5. **Undo/Redo** (during playback): Press and hold footswitch 1.5s → LED blinks twice, last overdub removed. Same gesture again → last overdub restored. Single level of undo/redo.
6. **Stop**: Double-tap footswitch → LED flashes green (loop still in memory, ready for resume)
7. **Resume**: Tap footswitch while stopped → playback starts
8. **Stop + Delete**: Double-tap and hold on second tap → LED off, loop deleted, back to empty
9. **Delete while stopped**: Double-tap and hold → LED off, loop deleted

Key properties:
- Loop length defined by first recording. Overdubs never change the length.
- Unlimited overdubs.
- Undo/redo only works during playback. Holding footswitch while stopped = delete.
- Loop persists in memory across stop/resume until explicitly deleted.

## Architecture

### Mode Toggle

New state in `useAudioEngine`: `mode: 'multitrack' | 'looper'`

- **Multitrack mode**: Current behavior. 4 tracks, arm/record/play workflow.
- **Looper mode**: Ditto-style. Single control (spacebar), automatic layering.

The toggle lives in the UI (a switch somewhere on the device body). Switching modes stops any active recording/playback. Sessions store which mode they were created in.

### Looper State Machine

```
EMPTY → (tap) → RECORDING_FIRST
RECORDING_FIRST → (tap) → PLAYING           [loop length set, instant playback]
PLAYING → (tap) → OVERDUBBING               [record layer on top]
OVERDUBBING → (tap) → PLAYING               [overdub committed]
PLAYING → (hold 1.5s) → PLAYING             [undo last overdub, LED blinks 2x]
PLAYING → (hold 1.5s again) → PLAYING       [redo last overdub, LED blinks 2x]
PLAYING → (double-tap) → STOPPED            [loop in memory, LED flashes]
STOPPED → (tap) → PLAYING                   [resume from start]
STOPPED → (double-tap + hold) → EMPTY       [delete loop, LED off]
PLAYING → (double-tap + hold) → EMPTY       [stop + delete, LED off]
```

All transitions triggered by spacebar (or a single on-screen stomp button).

### Gesture Detection

Spacebar maps to the footswitch. Gesture detection logic:

- **Tap**: keydown + keyup within 300ms, no second tap within 300ms
- **Double-tap**: Two taps within 300ms of each other
- **Double-tap + hold**: Two taps, hold on second tap for 1.5s+
- **Hold**: Single keydown held for 1.5s+ (only for undo/redo during playback)

Implementation: on keydown, start a timer. On keyup, check duration. If short, wait 300ms for possible second tap. If no second tap, it's a single tap. If second tap arrives, check if it's released quickly (double-tap = stop) or held (double-tap+hold = delete). Filter out key repeat events (`event.repeat`).

### Audio Implementation

The looper doesn't need 4 separate tracks internally. Instead:

- **Base layer**: The first recording's AudioBuffer
- **Composite buffer**: After each overdub, mix the overdub into the composite. This is what the Ditto actually does — it doesn't keep separate layers, it bounces down.
- **Undo buffer**: Keep the previous composite so "undo last overdub" is possible (single level of undo/redo, matching the Ditto exactly). Undo removes the last overdub; redo restores it. These toggle back and forth on repeated hold gestures.

**Recording the first loop**:
```
1. Start capturing raw PCM (same as current startRecording)
2. On second press: stop capture, create AudioBuffer
3. Set loopDuration = buffer.duration
4. Immediately call playAll() with this buffer, loop=true, offset=0
```

**Overdubbing**:
```
1. Start recording while playback continues (monitor playback already works)
2. On press: stop recording
3. Mix new buffer into composite: sample-by-sample addition, normalized
4. Restart playback with new composite buffer
```

**Mixing down**: Simple additive mix. For each sample: `composite[i] = existing[i] + overdub[i]`. Apply a limiter/soft-clip to prevent clipping when layers stack up.

### LED / Visual Feedback (matching the Ditto)

The stomp button's LED ring mirrors the real Ditto's single LED:

- **Off**: Empty state, no loop in memory
- **Red solid**: Recording first loop
- **Green solid**: Playing back (blinks/pulses at loop start point)
- **Red solid**: Overdubbing (same as recording, layered on playback)
- **Green flashing**: Stopped with loop in memory
- **2x quick blink**: Undo or redo triggered

### UI Changes

**In looper mode, the UI simplifies:**

- **Mixer section**: Hidden or collapsed. No individual track controls.
- **Transport buttons**: Replaced by a single large stomp button (styled like a guitar pedal footswitch). Visual states: idle (dark), recording (red pulse), playing (green), overdubbing (red+green).
- **Cassette deck**: Still shows the tape spinning. The session label works the same.
- **Metal panel**: VU meters + tuner still active. Metronome still available (useful for timing the first loop).
- **Status display**: Show current state prominently — "RECORDING", "PLAYING", "OVERDUB", layer count.
- **Undo indicator**: Small indicator showing undo is available (after first overdub).

**The stomp button**:
- Large circular button, centered where the transport controls are
- Metallic/industrial look (like a real pedal footswitch)
- LED ring around it that changes color with state
- Text label below showing current state
- Keyboard hint: "SPACE" label

### Integration with Sessions

- Sessions created in looper mode store: composite buffer, undo buffer, loop duration, layer count
- Loading a looper session enters looper mode automatically
- Can't switch a multitrack session to looper mode or vice versa (different data structures)

### Files to create/modify

- `src/hooks/useAudioEngine.ts` — add mode state, looper state machine, spacebar handler
- `src/audio/AudioEngine.ts` — add `mixBuffers()` method for overdub bounce-down, soft limiter
- `src/components/skeuomorphic/StompButton.tsx` — new component, the big pedal button
- `src/components/skeuomorphic/LooperView.tsx` — new layout component for looper mode (replaces mixer + transport in looper mode)
- `src/App.tsx` — conditional rendering based on mode, mode toggle UI
- `src/types.ts` — add mode to Session type, looper-specific state

## Open questions

- **Metronome in looper mode**: Should the metronome auto-stop when the first loop is set? Or keep ticking as a reference? Leaning toward: keep it running if the user turned it on, but don't force it.
- **Layer limit**: The Ditto has no practical limit (degrades with noise over many layers). Same approach here — no hard limit, just let it accumulate. The soft limiter prevents clipping.
- **Quantization**: The Ditto has no quantization — the loop is exactly as long as you play. This is part of its charm but also means sloppy timing = sloppy loop. Future enhancement: optional snap-to-beat-boundary if metronome is on.
