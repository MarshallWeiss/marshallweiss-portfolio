# Music Recorder Polish Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the four-track recorder feel complete and dependable without losing its Tascam-inspired physical-console identity.

**Architecture:** Keep the existing Web Audio engine and skeuomorphic component system. Add small presentation components for waveform and status feedback, expose initialization errors through the existing hook, and make the current fixed layout responsive through scoped CSS classes rather than replacing the interface.

**Tech Stack:** React 18, TypeScript, Web Audio API, Canvas 2D, Tailwind CSS, Vite.

---

## Design direction

- **Palette:** walnut `#5a3416`, warm aluminum `#c6beb0`, smoked acrylic `#211c18`, tape cream `#eee2c8`, signal amber `#f5a623`, record red `#b43832`.
- **Type:** Helvetica Neue for engraved controls and Courier New for counters/readouts; retain the existing instrument-panel typography rather than introducing web-editorial type.
- **Layout:** wide screens use a centered two-column transport/mixer chassis; compact screens stack the cassette, transport, and mixer while preserving full-width controls. Metal-panel controls wrap into logical groups instead of clipping.
- **Memorable element:** recorded waveforms appear as luminous tape traces inside each channel strip. Everything else remains quiet hardware chrome.
- **Accessibility:** visible focus, semantic buttons, keyboard shortcuts, reduced-motion support, and readable failure states.

```text
Wide                              Compact
┌─────────────────────────────┐   ┌──────────────────┐
│ input  VU L/R  tuner/tempo  │   │ input + status   │
├─────────────────────────────┤   │      VU L/R      │
│  cassette      mixer 1—4    │   ├──────────────────┤
│  transport     waveforms    │   │ cassette         │
├─────────────────────────────┤   │ transport        │
│ sessions                    │   │ mixer 1—4 scroll │
└─────────────────────────────┘   └──────────────────┘
```

### Task 1: Initialization and microphone recovery

**Files:**
- Modify: `experiments/music-recorder/src/hooks/useAudioEngine.ts`
- Modify: `experiments/music-recorder/src/App.tsx`
- Modify: `experiments/music-recorder/src/components/skeuomorphic/MetalPanel.tsx`

1. Add `isInitializing` and `initializationError` state to the audio hook contract.
2. Catch unsupported-browser, denied-permission, and no-device outcomes with plain-language messages.
3. Keep the power screen visible on failure and provide a working retry button.
4. Show a compact input warning in the powered-on panel if a device disappears.
5. Run `npm run build`; expect TypeScript and Vite to complete successfully.

### Task 2: Recorded waveform feedback

**Files:**
- Create: `experiments/music-recorder/src/components/skeuomorphic/TrackWaveform.tsx`
- Modify: `experiments/music-recorder/src/components/skeuomorphic/ChannelStrip.tsx`
- Modify: `experiments/music-recorder/src/components/skeuomorphic/MixerSection.tsx`

1. Draw an AudioBuffer summary to a high-DPI canvas with the existing blue/amber hardware palette.
2. Show playhead progress, muted state, and a useful empty/armed state.
3. Thread playback time and loop duration into each strip without duplicating audio state.
4. Run `npm run build`; expect a clean build.

### Task 3: Responsive console composition

**Files:**
- Modify: `experiments/music-recorder/src/App.tsx`
- Modify: `experiments/music-recorder/src/components/skeuomorphic/MetalPanel.tsx`
- Modify: `experiments/music-recorder/src/components/skeuomorphic/MixerSection.tsx`
- Modify: `experiments/music-recorder/src/styles/index.css`

1. Add stable layout class names around the chassis, top panel, work area, transport stack, and mixer.
2. Add breakpoints that wrap the top controls, scale VU meters, stack the work area, and keep channel strips usable with horizontal overflow.
3. Replace `h-screen` with dynamic viewport sizing and safe-area-aware padding where needed.
4. Verify at 1440×900, 1024×768, and 800×640; expect no clipped controls or inaccessible transport.

### Task 4: Four-track keyboard controls and status

**Files:**
- Create: `experiments/music-recorder/src/hooks/useRecorderShortcuts.ts`
- Create: `experiments/music-recorder/src/components/skeuomorphic/ShortcutLegend.tsx`
- Modify: `experiments/music-recorder/src/App.tsx`

1. Add Space for play/stop, R for record/stop, and 1–4 for track arm.
2. Ignore shortcuts while typing in inputs, textareas, selects, or editable content.
3. Show a compact hardware-style shortcut legend on pointer-capable wide screens.
4. Run `npm run build`; expect a clean build.

### Task 5: Visual verification

**Files:**
- Modify only files above if visual defects are found.

1. Start the Vite preview.
2. Capture the powered-off and powered-on states at wide and compact sizes.
3. Check visible focus, reduced motion, overflow, mode switching, and session drawer behavior.
4. Review the final diff for accidental changes to generated `dist`, Vite cache, or existing user work.
