# Chord & Tab Display

## Overview

Display guitar chords and tabs from Ultimate Guitar within the recorder, scrolling in sync with the loop. Input methods: URL fetch (primary), PDF upload (fallback), paste (last resort).

## Data Pipeline

### 1. URL Fetch (primary)

User pastes a Ultimate Guitar URL. The app fetches the page, extracts the tab data from the embedded JSON.

**How UG stores tab data**: The tab content is embedded in the page HTML as a JSON blob — typically in a `<div class="js-store">` data attribute or a `<script>` tag. The actual chord/tab text is in this JSON, not rendered in the DOM. This makes parsing more reliable than scraping HTML.

**CORS solution**: Vite dev server proxy.

```js
// vite.config.ts
server: {
  proxy: {
    '/api/ug': {
      target: 'https://tabs.ultimate-guitar.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/ug/, '')
    }
  }
}
```

For deployed use (if ever needed): a small Cloudflare Worker or Vercel edge function that fetches the UG page and returns the tab JSON. ~20 lines of code.

**Parsing flow**:
```
1. User pastes UG URL into input field
2. Fetch via proxy: GET /api/ug/tab/artist/song-chords-12345
3. Extract JSON from response HTML (regex for data-content attribute or js-store JSON)
4. Parse tab content — it's typically plain text with chord annotations:
   [Am]This is the [G]song [D/F#]lyrics
   or tab format:
   e|--0--2--3--|
   B|--1--3--5--|
   ...
5. Store parsed data as structured chord sheet
```

### 2. PDF Upload (fallback)

User downloads PDF from UG and drops it into the app.

**Parsing**: Use `pdf.js` (Mozilla's PDF parser) to extract text content. UG PDFs are clean text — no complex layouts. The chord notation patterns are the same as the web version.

**Flow**:
```
1. User drops PDF onto a drop zone (or clicks file picker)
2. Parse PDF with pdf.js → extract text
3. Same chord/tab parser as URL fetch
4. Store as structured chord sheet
```

### 3. Paste (last resort)

User copies chord text from any source, pastes into a text area.

**Parsing**: Same parser, but with a pre-filter step that strips non-musical content (nav text, ads, etc.). Detection heuristics:
- Lines containing chord patterns: `[A-G][#b]?[m]?[0-9]?` in brackets or above lyric lines
- Tab lines: `[eBGDAE]\|[-0-9h p/\\|]+`
- Everything else: discard

## Parsed Data Structure

```typescript
interface ChordSheet {
  title: string
  artist: string
  source: 'url' | 'pdf' | 'paste'
  sections: Section[]
}

interface Section {
  name?: string  // "Verse", "Chorus", "Intro", etc.
  lines: ChordLine[]
}

interface ChordLine {
  type: 'chord-lyric' | 'tab' | 'text'
  // For chord-lyric lines:
  chords?: { chord: string; position: number }[]
  lyrics?: string
  // For tab lines:
  tabLines?: string[]  // 6 strings for standard tab
  // For text lines:
  text?: string
}
```

## Display

### Panel Location

A slide-out panel on the right side of the recorder, or a collapsible section below the cassette deck. When open, the mixer section compresses or hides to make room.

Toggle button: small "TAB" button somewhere accessible — possibly on the session drawer bar or near the cassette deck.

### Scrolling Behavior

The chord sheet scrolls vertically, synced to the loop position.

**Sync model**: Linear auto-scroll across the loop duration.
```
scrollPosition = (currentTime / loopDuration) * totalSheetHeight
```

On loop restart (when `currentTime` wraps back to 0), the scroll jumps back to the top. This creates a repeating teleprompter effect that matches the loop.

**Manual override**: User can drag/scroll manually to reposition. This sets an offset that persists until reset.

### Visual Style

- Monospace font for tab lines (already using Courier New)
- Chord names highlighted in amber/gold (matching the warm hardware palette)
- Section headers (Verse, Chorus) as subtle dividers
- Dark background panel, consistent with the device body but slightly recessed
- Current position indicator: a thin horizontal highlight line showing where you are in the sheet
- Font size adjustable (small control on the panel)

## Integration with Sessions

- Chord sheet data stored in session (lightweight — just text)
- Loading a session restores its chord sheet
- Chord sheet is optional — sessions work fine without one

## Files to create/modify

- `src/components/skeuomorphic/ChordPanel.tsx` — new slide-out panel component
- `src/hooks/useChordSheet.ts` — new hook for parsing and state management
- `src/lib/chordParser.ts` — parser for UG format (shared across URL/PDF/paste inputs)
- `src/lib/pdfParser.ts` — PDF text extraction wrapper
- `src/types.ts` — add ChordSheet types, add to Session
- `src/App.tsx` — add panel toggle and rendering
- `vite.config.ts` — add proxy for UG
- `package.json` — add `pdfjs-dist` dependency

## Open Questions

- **Tab vs. chords only**: UG has both chord sheets (chords + lyrics) and full tablature. The parser should handle both, but the display layout is quite different. Chord sheets scroll naturally; full tab (6-line staves) needs more horizontal space. Start with chord sheets, add tab rendering later?
- **Multiple sections per loop**: If the song has verse/chorus/bridge but the loop is just 4 bars, only a portion of the sheet is relevant. Should there be a way to select which section to display for a given loop? Or just let the user scroll to the right spot?
