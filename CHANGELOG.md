# Changelog
All notable changes to **Among Us Detective** are documented in this file.

---

## [2.2.0] - 2026-09-21 (Investigation Hardening & Review Polish)

### Added & Improved
- **Read-Only History Snapshot Mode**: Drag-and-drop card movements, context menu edits, and role assignments are strictly locked while inspecting past meeting rounds (`R1`, `R2`, etc.) to prevent accidental board state corruption.
- **Resilient Session Lifecycle & TTL**: Round 1 match state is preserved across page reloads with a 2-hour TTL expiration; all `localStorage` operations are wrapped in safe `try/catch` guards to prevent runtime crashes from corrupted browser storage.
- **Clean Match Reset Lifecycle**: "New Match" now properly resets Impostor Mode state and fellow impostors without destroying or altering the active lobby roster.
- **Unified Impostor Role Synchronization**: Single source of truth for impostor status and roles; fixed bug where confirming role in impostor mode would move players to alibi instead of fellow impostors.
- **Multilingual Tasks & Location Translations**: Added official in-game names for all tasks and room locations across English, Portuguese, Spanish, Korean, French, and German; localized 'tan' color to 'Cáqui' in Brazilian Portuguese.
- **Discreet Voice Dictation**: Auto-detection of browser language for speech recognition with dedicated language switcher and non-intrusive permission controls.
- **Streamlined Privacy Banner**: Clean, transparent single-action cookie and storage disclosure banner.
- **Mobile Roster Responsiveness**: Color picker popover is constrained to viewport bounds on narrow mobile screens, and emergency meeting counters are restricted to manual input.

---

## [2.1.0] - 2026-09-20 (Performance, Shortcuts & Help Overhaul)

### Added
- **Performance Mode**: Added "Disable animations" toggle in Settings to eliminate all CSS transitions and keyframes for a lightweight experience on lower-end devices.
- **Help Modal Overhaul**: Expanded modal width to ~700px with segmented navigation, improved card spacing, and refreshed guides.
- **Keyboard Shortcuts**: Added hotkeys (`N` for Notes, `M` for Map, `T` for Tasks, `I` for Impostor HUD, `L` for Roster, `Esc` to close).
- **Authorship & Credits**: Clarified original authorship conceived and credited by Alexandre Atlesque and modernization fork by Marcos Binder.

---

## [2.0.0] - 2026-09-18 (Version 2.0 Major Overhaul)

### Added
- Complete multilingual localization (i18n) supporting English, Portuguese, Spanish, Korean, French, and German.
- Dedicated Impostor Operations HUD with fake tasks safety advisor and sabotage planner.
- Player Tasks Completion tracker and Emergency Meetings counter in player card context menu.
- 6-column deduction hierarchy: Hard Clear, Trusted, Unknown, Suspicious, Impostor, and Dead.
- 18 official Among Us bean colors in Match Lobby with LED indicators and presets.
- Compact floating Role Popover with official role icons and claim verification badges.
- Persistent bottom Detective Toolbar docked with quick access to investigation tools.
- Round timeline inspection with snapshots.
