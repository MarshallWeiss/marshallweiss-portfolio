# Transcription Skill

Restart the local Whisper-based dictation system that runs through Hammerspoon.

## Usage

```
/transcription
```

## What This Skill Does

Relaunches Hammerspoon, which provides the global dictation hotkey (Right Option = push-to-talk, Whisper transcription on release).

## Steps

1. Run `killall Hammerspoon` then `sleep 1` then `open -a Hammerspoon` — a full kill-and-relaunch is required; `open -a` alone won't reload the config if it's already running
2. Confirm to the user that dictation should be back — look for the ⌥ icon in the menu bar and the "Dictation ready" alert
3. Suggest testing with Right Option hold/release
4. If the hotkey still doesn't work (no "Listening..." pill), tell the user to check **System Settings > Privacy & Security > Accessibility** and make sure Hammerspoon is toggled on

## Reference

Full setup docs: `docs/LOCAL_DICTATION.md`
Config file: `~/.hammerspoon/init.lua`
