# Local Dictation Setup (Whisper Flow Replacement)

Fully local, unlimited speech-to-text using OpenAI's Whisper model running on-device. Replaces Whisper Flow with zero usage limits — no tokens, no API calls, no cloud.

Built in ~10 minutes after running out of Whisper Flow's free weekly words.

## How It Works

1. **Hammerspoon** listens for a global hotkey (Right Option)
2. **sox** records audio from the TASCAM US-1x2 interface
3. **whisper-cpp** transcribes the audio locally on the M3 chip
4. Result is pasted into whatever app has focus (via clipboard + Cmd+V)

## Components Installed

| Tool | Purpose | Install |
|---|---|---|
| `whisper-cpp` | Local Whisper inference (C++ port) | `brew install whisper-cpp` |
| `sox` | Audio recording from mic | `brew install sox` |
| `Hammerspoon` | Global hotkey detection + automation | `brew install --cask hammerspoon` |
| `ggml-base.bin` | Whisper base model (142MB) | Downloaded to `~/.local/share/whisper-cpp/models/` |

## Usage

**Hold Right Option** to record, **release** to transcribe and paste. Works system-wide — VS Code, browser, terminal, anywhere.

A red "Recording..." indicator appears at the top of the screen while recording.

There's also a "D" in the menu bar indicating dictation is active.

## Files

- `~/.hammerspoon/init.lua` — Hammerspoon config with dictation logic
- `~/.local/share/whisper-cpp/models/ggml-base.bin` — Whisper model
- `~/bin/dictate` — CLI alternative (run `dictate` in terminal for push-to-talk, `dictate stream` for real-time, `dictate clip` for clipboard-only)

## Configuration

### Change the hotkey
Edit `~/.hammerspoon/init.lua`, find `keyCode == 61` (Right Option) and change to a different key code.

### Change the audio input device
Edit `~/.hammerspoon/init.lua`, find `AUDIODEV = "US-1x2"` and change to your device name. List devices with:
```bash
system_profiler SPAudioDataType
```

### Change the model
Download a different model size and update the `MODEL` path in `~/.hammerspoon/init.lua`:

| Model | Size | Speed | Accuracy |
|---|---|---|---|
| `ggml-tiny.bin` | 75MB | Fastest | Lower |
| `ggml-base.bin` | 142MB | Fast | Good (current) |
| `ggml-small.bin` | 466MB | Medium | Better |
| `ggml-medium.bin` | 1.5GB | Slower | Best |

Download from: `https://huggingface.co/ggerganov/whisper.cpp/tree/main`

```bash
curl -L "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin" \
  -o ~/.local/share/whisper-cpp/models/ggml-small.bin
```

## Permissions Required

- **Accessibility** — Hammerspoon needs this to detect global hotkeys and simulate paste (System Settings > Privacy & Security > Accessibility)
- **Microphone** — Terminal/Hammerspoon needs mic access for recording

## Limits

None. Everything runs locally. No API keys, no subscriptions, no word limits.
