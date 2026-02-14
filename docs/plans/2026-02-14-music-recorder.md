# 4-Track Music Recorder Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a browser-based 4-track loop recorder inspired by the Tascam Portastudio, for recording guitar + vocals through a TASCAM US-1x2 interface.

**Architecture:** Standalone Vite + React + TypeScript app living at `experiments/music-recorder/` inside the portfolio repo. Audio engine is a plain TypeScript class (no React dependency) wrapped by a custom hook. Canvas-based real-time visuals (VU meters) avoid React re-render overhead. IndexedDB for session persistence via `idb-keyval`. No server -- everything runs client-side.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, Web Audio API, MediaRecorder API, idb-keyval

---

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Loop mode | Auto-loop on stop | Track 1 recording length becomes the loop. Simplest UX. |
| Overdub | Auto-stop at loop end + redo option | Predictable behavior, easy to re-record a track |
| Sessions | Named sessions with undo/redo | Full project management. Undo scoped to track-level actions. |
| Tracks | 4 fixed tracks | Tascam Portastudio constraint. Keeps UI simple. |
| Mixing | Per-track volume + pan | GainNode + StereoPannerNode. Minimum viable mixing. |
| Export | WAV download | Mix all tracks to single stereo WAV file |
| UI | Minimal-clean first, Tascam aesthetic as final polish | Get audio right, then make it beautiful |
| Real-time visuals | Canvas-based VU meters | Avoids React re-render overhead for 30fps updates |

---

## File Structure

```
experiments/music-recorder/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx                    # React entry point
│   ├── App.tsx                     # Root component
│   ├── types.ts                    # Shared TypeScript types
│   ├── audio/
│   │   ├── AudioEngine.ts          # Core engine: record, play, loop, mix
│   │   ├── wav-encoder.ts          # Encode AudioBuffer → WAV blob
│   │   └── db.ts                   # IndexedDB session CRUD via idb-keyval
│   ├── hooks/
│   │   ├── useAudioEngine.ts       # React hook wrapping AudioEngine
│   │   └── useUndoRedo.ts          # Track-level undo/redo state
│   ├── components/
│   │   ├── Recorder.tsx            # Main layout: transport + tracks + session
│   │   ├── TrackStrip.tsx          # Single track: record btn, volume, pan, mute, solo, VU
│   │   ├── TransportBar.tsx        # Play / Stop / master controls
│   │   ├── VUMeter.tsx             # Canvas-based real-time level meter
│   │   ├── Knob.tsx                # Draggable rotary knob (volume/pan)
│   │   ├── DeviceSelector.tsx      # Audio input device picker dropdown
│   │   ├── SessionBrowser.tsx      # List saved sessions, load, delete, rename
│   │   └── WaveformDisplay.tsx     # Mini waveform preview per track
│   └── styles/
│       └── index.css               # Tailwind directives + custom styles
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `experiments/music-recorder/package.json`
- Create: `experiments/music-recorder/index.html`
- Create: `experiments/music-recorder/vite.config.ts`
- Create: `experiments/music-recorder/tsconfig.json`
- Create: `experiments/music-recorder/tailwind.config.js`
- Create: `experiments/music-recorder/postcss.config.js`
- Create: `experiments/music-recorder/src/main.tsx`
- Create: `experiments/music-recorder/src/App.tsx`
- Create: `experiments/music-recorder/src/styles/index.css`
- Create: `experiments/music-recorder/src/types.ts`

**Step 1: Scaffold the Vite project**

```bash
cd experiments/music-recorder
npm create vite@latest . -- --template react-ts
```

Or manually create the files. Install deps:

```bash
npm install react react-dom
npm install -D @types/react @types/react-dom typescript vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install idb-keyval
```

**Step 2: Create `src/types.ts` with core types**

```typescript
export interface Track {
  id: number;
  name: string;
  audioBuffer: AudioBuffer | null;
  volume: number;       // 0-1
  pan: number;          // -1 to 1
  muted: boolean;
  solo: boolean;
  isRecording: boolean;
}

export interface Session {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  loopDuration: number; // seconds
  tracks: SerializedTrack[];
  sampleRate: number;
}

export interface SerializedTrack {
  id: number;
  name: string;
  audioData: Float32Array[] | null; // channel data
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
}
```

**Step 3: Create minimal `App.tsx`**

```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <h1 className="text-2xl font-medium">4-Track Recorder</h1>
    </div>
  );
}
```

**Step 4: Verify dev server runs**

```bash
cd experiments/music-recorder && npm run dev
```

Expected: Dark page with "4-Track Recorder" centered. Vite HMR working.

**Step 5: Commit**

```bash
git add experiments/music-recorder
git commit -m "feat: scaffold music recorder project (Vite + React + TS + Tailwind)"
```

---

## Task 2: Audio Engine — Mic Access + Single Track Record/Playback

**Files:**
- Create: `src/audio/AudioEngine.ts`
- Create: `src/hooks/useAudioEngine.ts`
- Create: `src/components/DeviceSelector.tsx`
- Modify: `src/App.tsx`

**Step 1: Build `AudioEngine.ts`**

Core audio engine class that manages:
- AudioContext creation/resumption
- MediaStream from mic (getUserMedia)
- Recording via ScriptProcessorNode (captures raw PCM for precise loop sync)
- Playback via AudioBufferSourceNode
- Device enumeration

Key methods:
- `init()` — create AudioContext, request mic permission
- `enumerateDevices()` — list audio input devices
- `selectDevice(deviceId)` — switch input device
- `startRecording(trackId)` — begin capturing audio for a track
- `stopRecording()` — stop capture, return AudioBuffer
- `playTrack(trackId, buffer)` — play a single track's buffer
- `playAll(tracks)` — play all non-muted tracks simultaneously
- `stop()` — stop all playback

Important: Use ScriptProcessorNode (or AudioWorklet) instead of MediaRecorder for recording. MediaRecorder outputs compressed formats (WebM/Opus) with variable timing. ScriptProcessorNode gives us raw PCM Float32 samples, which we need for:
- Precise loop boundary sync
- Direct AudioBuffer creation (no decoding step)
- Consistent sample count across tracks

**Step 2: Build `useAudioEngine.ts` hook**

Wraps AudioEngine in React lifecycle:
- Creates engine on mount
- Provides state: `devices`, `selectedDevice`, `isRecording`, `isPlaying`
- Provides actions: `selectDevice`, `startRecording`, `stopRecording`, `play`, `stop`

**Step 3: Build `DeviceSelector.tsx`**

Dropdown showing available audio input devices. Selects TASCAM US-1x2 by default if found.

**Step 4: Wire into App.tsx with a record/play button**

Minimal UI: device selector + Record button + Play button. Record captures audio, Play plays it back.

**Step 5: Verify**

- Open in browser, grant mic permission
- Select TASCAM from device list
- Click Record, play guitar, click Stop
- Click Play — hear your guitar back
- Check console for no errors

**Step 6: Commit**

```bash
git commit -m "feat: audio engine with mic access, single track record/playback"
```

---

## Task 3: Loop Engine — Track 1 Sets the Loop

**Files:**
- Modify: `src/audio/AudioEngine.ts`
- Modify: `src/hooks/useAudioEngine.ts`
- Modify: `src/App.tsx`

**Step 1: Add loop state to engine**

- `loopDuration: number | null` — set when Track 1 finishes recording
- `loopStartTime: number` — AudioContext time when loop started
- When Track 1 recording stops: `loopDuration = buffer.duration`

**Step 2: Implement looped playback**

When playing, use `AudioBufferSourceNode.loop = true` for continuous looping. All tracks start simultaneously and loop at the same duration.

For tracks shorter than the loop (shouldn't happen with auto-stop, but defensive): pad with silence.

**Step 3: Auto-stop recording at loop boundary**

When recording Track 2-4 and the loop reaches its end:
- Stop recording automatically
- Trim or pad the buffer to exactly match `loopDuration`
- This ensures all tracks are sample-accurate to the loop

**Step 4: Add visual loop position indicator**

A simple progress bar showing where in the loop we currently are. Updates via `requestAnimationFrame` reading `AudioContext.currentTime`.

**Step 5: Verify**

- Record Track 1 (guitar riff, ~4 seconds)
- It loops automatically on playback
- Record Track 2 — hear Track 1 in headphones while recording
- Track 2 auto-stops when loop reaches end
- Play both — they're in sync

**Step 6: Commit**

```bash
git commit -m "feat: loop engine — Track 1 sets loop, auto-stop overdub at boundary"
```

---

## Task 4: Multi-Track UI — 4 Track Strips

**Files:**
- Create: `src/components/Recorder.tsx`
- Create: `src/components/TrackStrip.tsx`
- Create: `src/components/TransportBar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/types.ts`

**Step 1: Build `TrackStrip.tsx`**

Each track strip shows:
- Track number + name (editable)
- Record button (red, armed state)
- Volume slider (0-100%)
- Pan slider (L-R)
- Mute button (M)
- Solo button (S)
- Waveform placeholder (empty box for now)
- Status indicator (empty / recorded / recording)

**Step 2: Build `TransportBar.tsx`**

Global controls:
- Play/Pause button
- Stop button
- Loop position bar (progress indicator)
- Current time / loop duration display

**Step 3: Build `Recorder.tsx` as main layout**

```
┌─────────────────────────────────────┐
│  DeviceSelector    TransportBar     │
├─────────────────────────────────────┤
│  Track 1  [R] ═══════ Vol Pan M S  │
│  Track 2  [R] ═══════ Vol Pan M S  │
│  Track 3  [R] ═══════ Vol Pan M S  │
│  Track 4  [R] ═══════ Vol Pan M S  │
└─────────────────────────────────────┘
```

**Step 4: Wire up track state with useReducer**

Track state managed by a reducer:
- `ARM_TRACK` — select which track will record next
- `START_RECORDING` — track begins recording
- `STOP_RECORDING` — track finishes, store buffer
- `SET_VOLUME` — update track volume
- `SET_PAN` — update track pan
- `TOGGLE_MUTE` — toggle mute
- `TOGGLE_SOLO` — toggle solo
- `CLEAR_TRACK` — remove recording from track
- `RENAME_TRACK` — change track name

**Step 5: Verify**

- See 4 track strips rendered
- Can arm Track 1, record, see it marked as recorded
- Arm Track 2, record, hear Track 1 during overdub
- Volume/pan sliders change values (audio effect wired in next task)
- Mute/Solo buttons toggle visually

**Step 6: Commit**

```bash
git commit -m "feat: multi-track UI with 4 track strips and transport bar"
```

---

## Task 5: Mixing — Volume + Pan + Mute/Solo

**Files:**
- Modify: `src/audio/AudioEngine.ts`
- Modify: `src/hooks/useAudioEngine.ts`
- Modify: `src/components/TrackStrip.tsx`

**Step 1: Add per-track audio nodes**

For each track in the audio engine:
```
AudioBufferSourceNode → GainNode → StereoPannerNode → destination
```

- `GainNode.gain.value` = track volume (0-1)
- `StereoPannerNode.pan.value` = track pan (-1 to 1)

**Step 2: Implement mute/solo logic**

- Muted track: set GainNode.gain to 0
- Solo: if ANY track has solo active, only solo'd tracks play (others gain = 0)
- Multiple solo: all solo'd tracks play

**Step 3: Real-time parameter updates**

Volume and pan changes apply immediately during playback (not just on next play). Use `gain.setValueAtTime()` for click-free transitions.

**Step 4: Verify**

- Record 2 tracks
- Play both — hear them together
- Drag Track 2 volume to 0 — it goes silent
- Pan Track 1 left, Track 2 right — stereo separation
- Mute Track 1 — only Track 2 plays
- Solo Track 1 — only Track 1 plays

**Step 5: Commit**

```bash
git commit -m "feat: per-track mixing with volume, pan, mute, solo"
```

---

## Task 6: Track Management — Re-record + Clear

**Files:**
- Modify: `src/audio/AudioEngine.ts`
- Modify: `src/components/TrackStrip.tsx`
- Modify: `src/components/Recorder.tsx`

**Step 1: Re-record a track**

When a track already has a recording:
- "Re-record" replaces the existing buffer
- Show a confirmation or just allow overwrite (the undo system in Task 8 provides safety net)

**Step 2: Clear a track**

"Clear" button removes the recording from a track, returning it to empty state.

**Step 3: Track 1 special behavior**

If Track 1 is re-recorded:
- The loop duration updates to the new recording length
- Tracks 2-4 that are longer get trimmed; shorter get padded
- Warn user if other tracks exist ("Re-recording Track 1 will change the loop length")

If Track 1 is cleared:
- All other tracks are also cleared (loop is gone)
- Or: keep other tracks, just remove the loop constraint

Decision: Clear Track 1 clears everything (simplest, avoids orphaned state).

**Step 4: Verify**

- Record Track 1 and Track 2
- Re-record Track 2 — old recording replaced
- Clear Track 2 — returns to empty
- Clear Track 1 — everything resets

**Step 5: Commit**

```bash
git commit -m "feat: track management — re-record and clear tracks"
```

---

## Task 7: Session Storage — Save/Load with IndexedDB

**Files:**
- Create: `src/audio/db.ts`
- Create: `src/components/SessionBrowser.tsx`
- Modify: `src/components/Recorder.tsx`
- Modify: `src/types.ts`

**Step 1: Build `db.ts` with idb-keyval**

Functions:
- `saveSession(session: Session)` — serialize tracks (extract Float32Array channel data from AudioBuffers) and store
- `loadSession(id: string)` — retrieve and deserialize (reconstruct AudioBuffers from channel data)
- `listSessions()` — return all session metadata (id, name, date, duration)
- `deleteSession(id: string)` — remove from IndexedDB
- `renameSession(id: string, name: string)` — update name

Serialization: AudioBuffer can't be stored directly. Extract channel data as Float32Arrays, store those, then reconstruct on load.

**Step 2: Auto-save behavior**

After each recording action (record, re-record, clear, volume/pan change), auto-save the current session. Debounce saves to avoid excessive writes.

**Step 3: Build `SessionBrowser.tsx`**

- List of saved sessions (name, date, track count, duration)
- Click to load
- Delete button per session
- "New Session" button
- Rename inline

**Step 4: "New Session" flow**

- Prompts for session name (or defaults to "Untitled" + date)
- Clears all tracks
- Creates fresh session in DB

**Step 5: Verify**

- Record some tracks
- Session auto-saves
- Refresh page — session is still there, loads automatically
- Create new session — clean slate
- Previous session appears in browser list
- Load previous session — tracks restored with audio

**Step 6: Commit**

```bash
git commit -m "feat: session storage with IndexedDB — save, load, browse, delete"
```

---

## Task 8: Undo/Redo — Track-Level State History

**Files:**
- Create: `src/hooks/useUndoRedo.ts`
- Modify: `src/components/Recorder.tsx`
- Modify: `src/components/TransportBar.tsx`

**Step 1: Build `useUndoRedo.ts`**

Track-level undo/redo. Each "action" that modifies track audio is a snapshot:
- Record a track (store previous state: empty or previous buffer)
- Re-record a track (store previous buffer)
- Clear a track (store previous buffer)
- Clear all (store all previous buffers)

NOT tracked by undo (too granular, changes are continuous):
- Volume changes
- Pan changes
- Mute/solo toggles

Implementation: simple stack of snapshots. Each snapshot is `{ tracks: SerializedTrack[] }`.

Max history depth: 20 (to limit memory usage with audio buffers).

**Step 2: Add undo/redo buttons to TransportBar**

- Undo button (disabled when no history)
- Redo button (disabled when no future)
- Keyboard shortcuts: Cmd+Z / Cmd+Shift+Z

**Step 3: Verify**

- Record Track 1, Record Track 2
- Undo — Track 2 is removed
- Undo — Track 1 is removed
- Redo — Track 1 is back
- Redo — Track 2 is back

**Step 4: Commit**

```bash
git commit -m "feat: undo/redo for track recording actions"
```

---

## Task 9: WAV Export — Mix and Download

**Files:**
- Create: `src/audio/wav-encoder.ts`
- Modify: `src/audio/AudioEngine.ts`
- Modify: `src/components/TransportBar.tsx`

**Step 1: Build `wav-encoder.ts`**

Encode an AudioBuffer to a WAV Blob:
- Write WAV header (44 bytes: RIFF, fmt chunk, data chunk)
- Interleave channels (stereo: L, R, L, R, ...)
- 16-bit PCM, sample rate from AudioContext

**Step 2: Add `mixdown()` method to AudioEngine**

Offline render using `OfflineAudioContext`:
- Create OfflineAudioContext with loop duration
- For each track: create source → gain → pan → destination
- Apply current volume/pan/mute/solo settings
- Render to single stereo AudioBuffer

**Step 3: Add Export button to TransportBar**

"Export WAV" button:
- Calls `mixdown()`
- Encodes to WAV
- Triggers browser download with session name as filename

**Step 4: Verify**

- Record 2+ tracks with different volumes/panning
- Click Export
- WAV file downloads
- Open in any audio player — sounds correct, stereo mix matches what you heard in the browser

**Step 5: Commit**

```bash
git commit -m "feat: WAV export with offline mixdown"
```

---

## Task 10: VU Meters + Waveform Display

**Files:**
- Create: `src/components/VUMeter.tsx`
- Create: `src/components/WaveformDisplay.tsx`
- Modify: `src/audio/AudioEngine.ts`
- Modify: `src/components/TrackStrip.tsx`

**Step 1: Build `VUMeter.tsx`**

Canvas-based real-time level meter:
- Uses `AnalyserNode.getByteTimeDomainData()` for per-track levels
- Renders vertical bar with peak hold
- Color: green → yellow → red based on level
- Updates via `requestAnimationFrame` (not React state)
- Ref-based: parent passes `analyserNode`, VUMeter reads it directly

**Step 2: Add AnalyserNode per track in AudioEngine**

```
Source → GainNode → StereoPannerNode → AnalyserNode → destination
```

Expose analyser nodes for the UI to read.

**Step 3: Build `WaveformDisplay.tsx`**

Static waveform preview of a recorded track:
- Draws the AudioBuffer waveform data onto a canvas
- Shows the full loop duration
- Playback position indicator (vertical line) synced to AudioContext time

**Step 4: Wire into TrackStrip**

Each TrackStrip shows:
- VU meter (live during playback/recording)
- Waveform (static after recording, with playback position)

**Step 5: Verify**

- Record a track — waveform appears
- Play back — VU meter bounces, playback line moves across waveform
- Volume changes affect VU meter levels

**Step 6: Commit**

```bash
git commit -m "feat: canvas VU meters and waveform display"
```

---

## Task 11: UI Polish — Tascam Aesthetic

**Files:**
- Modify: `src/styles/index.css`
- Create: `src/components/Knob.tsx` (replace sliders with rotary knobs)
- Modify: all component files for visual refinement

**Step 1: Define the visual language**

- Dark chassis: `bg-gray-900` / `bg-gray-950` with subtle texture
- Warm accent colors: amber/orange for record, green for play, red for stop
- Track strips: slightly raised panels with subtle borders
- Transport buttons: pill-shaped with physical press feel (active:scale, shadows)
- Font: Inter or system monospace for time displays

**Step 2: Build `Knob.tsx` rotary control**

Draggable circular knob for volume and pan:
- Mouse drag up/down to change value
- Visual indicator showing current position (arc or dot)
- Labels below (Vol / Pan)
- Optional: center detent for pan (snaps to 0)

**Step 3: Polish each component**

- TrackStrip: dark panel with colored left border per track (Track 1: amber, Track 2: blue, Track 3: green, Track 4: purple)
- TransportBar: centered layout, large play/stop buttons, time display in monospace
- SessionBrowser: sidebar or modal with clean list
- VU Meters: gradient bars (green → amber → red), subtle glow at peak
- Record button: pulsing red animation when recording

**Step 4: Responsive layout**

- Desktop: tracks stack vertically, full width
- No mobile requirement for MVP (audio recording on mobile is problematic anyway)

**Step 5: Verify**

- Visual inspection: does it look like a Portastudio?
- All interactions still work (knobs, buttons, recording)
- No visual glitches during recording/playback

**Step 6: Commit**

```bash
git commit -m "feat: Tascam-inspired UI with rotary knobs and dark aesthetic"
```

---

## Task 12: Final Integration + Edge Cases

**Files:**
- Various fixes across all files

**Step 1: Handle edge cases**

- Browser tab focus/blur: pause playback? Continue? (Continue is better for recording)
- AudioContext suspension: browsers suspend AudioContext until user gesture. Show "Click to start" overlay if needed.
- Device disconnection: handle TASCAM being unplugged mid-session
- Empty export: disable export button when no tracks recorded
- Large sessions: test with 4 full tracks at 30+ seconds each

**Step 2: Keyboard shortcuts**

- `Space` — Play/Stop toggle
- `R` — Start/stop recording on armed track
- `1-4` — Arm track 1-4
- `M` — Mute armed track
- `S` — Solo armed track
- `Cmd+Z` — Undo
- `Cmd+Shift+Z` — Redo
- `Cmd+E` — Export

**Step 3: Add to experiments listing**

Update `data/experiments.json` in the portfolio to include the recorder:

```json
{
  "items": [
    {
      "id": "music-recorder",
      "title": "4-Track Browser Recorder",
      "description": "A Tascam Portastudio-inspired loop recorder built entirely in the browser. Record guitar, layer vocals, mix and export — no plugins, no DAW, just Web Audio API.",
      "date": "2026-02-14",
      "slug": "music-recorder",
      "image": ""
    }
  ]
}
```

**Step 4: Final testing checklist**

- [ ] Fresh page load → grant mic → select TASCAM
- [ ] Record Track 1 (guitar) → auto-loops
- [ ] Record Track 2 (vocals) → hear Track 1 in headphones → auto-stops at loop end
- [ ] Adjust volumes and panning → hear the mix change
- [ ] Mute/solo tracks → correct behavior
- [ ] Re-record Track 2 → replaces cleanly
- [ ] Undo → Track 2 restored to previous
- [ ] Save session → refresh page → loads correctly
- [ ] Create new session → previous in browser list
- [ ] Load previous session → all audio intact
- [ ] Export WAV → plays correctly in external player
- [ ] VU meters bounce during playback
- [ ] Waveforms display after recording
- [ ] Keyboard shortcuts work

**Step 5: Commit**

```bash
git commit -m "feat: final integration, keyboard shortcuts, edge cases"
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "idb-keyval": "^6.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0"
  }
}
```

No Tone.js, no waveform libraries, no state management libraries. Raw Web Audio API + React + idb-keyval.

---

## Risk Register

| Risk | Mitigation |
|------|------------|
| Audio latency during overdub | Use low-latency AudioContext settings. Headphones required (speaker feedback loop). Test with TASCAM. |
| ScriptProcessorNode deprecated | AudioWorklet is the replacement but has more complex setup. Start with ScriptProcessorNode, migrate if needed. |
| Track sync drift | All buffers trimmed/padded to exact loop sample count. Use AudioContext.currentTime for scheduling. |
| IndexedDB storage limits | Warn user at ~50MB. Each minute of audio ≈ 10MB (stereo 44.1kHz 32-bit). |
| Safari Web Audio quirks | Not a priority target — Chrome/Firefox first. Safari tested later. |
