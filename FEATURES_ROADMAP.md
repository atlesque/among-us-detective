# 🚀 Among Us Detective — Features Roadmap & Implementation Record

This document serves as the single source of truth for all architectural decisions, completed modernizations, and future backlog items for **Among Us Detective**.

---

## 📋 Project Status & Core Principles

- **Tech Stack**: Nuxt 4, Vue 3 (`<script setup>`, Composition API), Pinia, Tailwind CSS, TypeScript.
- **Active Working Branch**: `agents` (All commits strictly on this branch).
- **Core Principles**:
  1. **Strictly No Playwright Execution during active iteration**: User explicitly requested to rely on fast TypeScript type-checks (`npx vue-tsc --noEmit`).
  2. **Real Nuxt Stack Only (`app/`)**: No static HTML mocks; all architecture stays within the reactive Nuxt app framework.
  3. **Original Author Attribution**: Respect and highlight original authorship by **Alexandre Atlesque** ([atlesque/among-us-detective](https://github.com/atlesque/among-us-detective)) and modernization by **Marcos Binder** ([mrbbinder@gmail.com](mailto:mrbbinder@gmail.com) / [marcosbinder/among-us-detective](https://github.com/marcosbinder/among-us-detective)). Donations go directly to Alexandre Atlesque.
  4. **100% Multilingual First**: Every single user-facing string must be localized via `app/utils/translations.ts` across all 6 supported locales (`en-US`, `pt-BR`, `es-ES`, `ko-KR`, `fr-FR`, `de-DE`).
  5. **Split-Screen First**: Optimized for split-screen window sizing (ultra-compact vertical space, zero clipped elements, instant 1-click interactions).

---

## 🏷️ Status Legend
- `[COMPLETED]` — Implemented, verified, and shipped.
- `[IN PROGRESS]` — Work is underway but is not yet available in the app.
- `[PLANNED - FUTURE]` — Future backlog items agreed upon for future releases.

---

## 1. Completed Features `[COMPLETED]`

### 1.1 Match Lobby & Roster Selector (`app/components/GameRosterSelector.vue`)
- **18 Official Among Us Colors**: All colors represented by mini bean avatars with status LEDs.
- **Active Counter**: Dynamic count of active players out of 15 (e.g. 15 Playing, 3 Not in Game).
- **One-Click Presets**: 15 Players, All 18 Players, and Clear.
- **Golden "ME" Star**: Click player card and tap "Set as Me" to highlight own player and isolate from deduction clutter.
- **Collapsible Panel (Hotkey `L`)**: Minimized mid-game to save valuable vertical screen space.

### 1.2 6-Column Deduction Hierarchy (`app/components/CrewTracker.vue`)
- **Strict Deduction Columns**: Hard Clear, Trusted, Unknown, Suspicious, Impostors, Dead.
- **Drag-and-Drop (`vuedraggable`)**: Smooth dragging between all 6 columns.
- **Mobile Touch-and-Hold**: `:delay="160"` with `:touch-start-threshold="4"` allows 1:1 finger tracking without unwanted page scrolling.

### 1.3 Floating Role Popover (`app/components/PlayerCard.vue`)
- **Claimed vs Verified Status**: Distinguishes unverified role claims (`?`) from confirmed roles (`✓`).
- **Official Local PNG Icons**: 8 official high-res PNG icons (Detective, Judge, Scientist, Engineer, Noisemaker, Shapeshifter, Phantom, Viper).
- **In-Card Actions**: Mark tasks (Done / In Progress), log meeting calls, and direct Mark as Dead / Revive with "Died in Round X" tracking badge.

### 1.4 Impostor Mode Support Available Today (`app/components/CrewTracker.vue`, `DetectiveNotepad.vue`, `TasksModal.vue`, `PlayerCard.vue`)
- **Inverted Deduction Board**: Hotkey `I` or the Dock button switches the board to Impostor Mode labels for manually tracking targets, alibis, scapegoats, and fellow Impostors.
- **Impostor-Focused Notes**: The existing notepad switches to Impostor operations notes while the mode is active.
- **Partner Role Marking**: Mark fellow Impostors and their roles on player cards; the board reflects partner status.
- **Fake-Task Guidance**: The Tasks reference warns against faking visual tasks and lists safer non-animated tasks.

### 1.5 Meeting Rounds Snapshots & Timeline Review (`app/stores/rounds.ts`, `app/pages/index.vue`)
- **Snapshot Architecture**: "Next Round" deep-copies board state, deductions, notes, and map pins.
- **Timeline Inspection**: Inspect past meetings in read-only mode (`R1`, `R2`, `Live`).
- **Evolution Badges**: Displays how claims evolved across rounds (e.g. `Now: Hard Clear`) to expose lies.

### 1.6 Dual-Mode Detective Notepad & Voice Dictation (`app/components/DetectiveNotepad.vue`, `app/stores/notes.ts`)
- **Dual Notepad**: Volatile per-round notes alongside persistent match-long notes.
- **Speech-to-Text Voice Dictation**: Hands-free voice input via Web Speech API with automatic color highlighting.
- **Collapsible Dock Bar (Hotkey `N`)**: Minimized into dock with quick drafting toggle.

### 1.7 Interactive Map & MIRA HQ Sensor Overlay (`app/components/Maps.vue`, `MapPlayerTracker.vue`)
- **Per-Round Room Pins**: Drag player tokens to rooms without removing cards from the deduction board.
- **5 Supported Maps**: The Skeld, MIRA HQ, Polus, The Airship, The Fungle.
- **MIRA HQ Sensors**: Interactive door sensor zones overlay to decode door logs.

### 1.8 Performance Mode ("Disable animations") (`app/stores/settings.ts`, `app/app.vue`)
- **Ultra-Fast Toggle in Settings**: Adds `disable-animations` to `<html>` and sets all animation/transition durations to `0.001ms !important`.
- **Zero Frame Drops**: Eliminates pulses, keyframes, and transitions on low-end hardware.

### 1.9 Deduction Board Zoom (`app/stores/settings.ts`, `app/components/SettingsModal.vue`)
- **Built-in Scale Switcher**: 4 zoom levels (Compact, Normal, Large, Extra Large) keeping columns aligned without browser viewport distortion.

### 1.10 Persistent Dock & Keyboard Shortcuts (`app/pages/index.vue`)
- Complete keyboard accessibility: <kbd>N</kbd> (Notes), <kbd>M</kbd> (Map), <kbd>T</kbd> (Tasks), <kbd>I</kbd> (Impostor Mode board), <kbd>L</kbd> (Roster), <kbd>Esc</kbd> (Close/Minimize).

### 1.11 Comprehensive Multilingual System (`app/utils/translations.ts`, `app/composables/useI18n.ts`)
- 100% localized across 6 languages with browser auto-detection: English (`en-US`), Português (`pt-BR`), Español (`es-ES`), 한국어 (`ko-KR`), Français (`fr-FR`), Deutsch (`de-DE`).

### 1.12 Disclaimer Modernization & Atlesque Credits (`app/pages/disclaimer.vue`)
- Top back button with left arrow icon (`←`).
- Explicit accreditation to **Alexandre Atlesque** with link to original GitHub repo (`https://github.com/atlesque/among-us-detective`).
- Modernization contact for **Marcos Binder** (`mrbbinder@gmail.com`) with discrete link to [GitHub fork](https://github.com/marcosbinder/among-us-detective).
- Expandable / collapsible viewer for the original legacy disclaimer written by Alexandre Atlesque.
- Explicit notice that PayPal donations go directly to Alexandre Atlesque.

### 1.13 Help Modal Visual Overhaul & Segmented Navigation (`app/components/HelpModal.vue`)
- Enlarge modal width to ~700px (`sm:max-w-[720px]`) via `maxWidth="700px"` prop on `Modal.vue`.
- Segmented step navigation bar eliminating native browser scrollbars entirely.
- Generous card spacing (`gap-3.5`, `p-3.5`) and visual icon badges for Lobby Setup, Meeting Rounds, Deductions, Impostor Mode, and Hotkeys.

---

## 2. Community Feedback & Impostor HUD Work in Progress

> 📣 **Current Phase**: **Among Us Detective 2.0** is delivered and stabilized. Work is in progress on a dedicated Impostor HUD and its Sabotage & Alibi Planner. The inverted board, Impostor-focused notes, partner role marking, and fake-task guidance described above are the Impostor Mode tools available today; the dedicated HUD and planner are not implemented yet. Other future enhancements will be prioritized based on player feedback and live-match observation.
