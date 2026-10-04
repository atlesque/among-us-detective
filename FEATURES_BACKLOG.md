# Among Us Detective — Master Implementation Backlog & Completed Record

This document tracks all implemented architectural enhancements and planned future items for **Among Us Detective**.

---

## 📌 Master Implementation Status

**Status legend**: `[COMPLETED]` is available in the app; `[IN PROGRESS]` is being built and is not yet available.

### ✅ Completed Modernizations (v2.0 & v2.1)

1. **[COMPLETED] Feature 1: Round Timeline & Match Snapshot Architecture**
   - Deep-copy snapshots on "Next Round" (`R1`, `R2`, `R3`).
   - Read-only historical timeline inspection.
   - Evolution badges (`Now: Hard Clear`) detecting shifted alibis.
   - "New Match" preserves lobby roster and custom nicknames while resetting cards.

2. **[COMPLETED] Feature 2: Top Action Bar & Dock Modernization**
   - Simplified top bar with clear "Next Round" and "New Match" buttons.
   - Persistent bottom dock with 1-click access to Notes, Map, Tasks, Impostor Mode, Settings, Help, and About.

3. **[COMPLETED] Feature 3: Compact Floating Role Popover**
   - Non-intrusive floating popover anchored to clicked bean card.
   - Differentiates unverified claims (`?`) from verified roles (`✓`).
   - Direct "Mark as Dead" / "Revive" with "Died in Round X" tracking badge.
   - Tasks completion and emergency meetings tracker in card popover.

4. **[COMPLETED] Feature 4: Dual-Mode Detective Notepad & Voice Dictation**
   - Volatile per-round notes + persistent match-long notes.
   - Hands-free speech-to-text dictation via Web Speech API with automatic color highlighting.
   - Dock hotkey <kbd>N</kbd> for quick note drafting.

5. **[COMPLETED] Feature 5: Interactive Map Tracking & Room Pins**
   - Per-round room drop pins with historical round coordinates.
   - 5 maps: The Skeld, MIRA HQ, Polus, The Airship, The Fungle.
   - Interactive MIRA HQ door sensors overlay with hotkey <kbd>M</kbd>.

6. **[COMPLETED] Feature 6: Tasks Reference Guide Modal**
   - Quick reference modal for visual, common, short, and long tasks across all maps.
   - Dock hotkey <kbd>T</kbd>.

7. **[COMPLETED] Feature 7: Comprehensive 5-Tab Multilingual Help Modal**
   - Rebuilt guide covering Lobby Setup, Meeting Snapshots, Deduction Hierarchy, Impostor Mode, Map Sensors, Dual Notepad, and Shortcuts.
   - 100% localized across all 6 supported languages.

8. **[COMPLETED] Feature 8: About Modal & Authorship Credits**
   - Full accreditation: Original project conceived and created by **Alexander Atlesque** ([atlesque/among-us-detective](https://github.com/atlesque/among-us-detective)).
   - Modernized & enhanced for v2.0 by **Marcos Binder** ([mrbbinder@gmail.com](mailto:mrbbinder@gmail.com) / [fork v2.0](https://github.com/marcosbinder/among-us-detective)).
   - Clarified that PayPal donations go directly to Alexander Atlesque.
   - Detailed dated changelog and roadmap tab.

9. **[COMPLETED] Feature 9: Performance Mode ("Disable animations")**
   - Settings toggle reducing motion and setting CSS transition/animation durations to `0.001ms !important`.
   - Eliminates all lag on low-end hardware.

10. **[COMPLETED] Feature 10: Impostor Mode Board and Existing Tools**
    - Hotkey <kbd>I</kbd> switches the deduction board to an inverted Impostor Mode view.
    - Impostor-focused notes, partner role marking on player cards, and fake-task guidance in the Tasks reference.

11. **[COMPLETED] Feature 11: 18-Color Bean Roster with Golden "ME" Star**
    - 18 official Among Us bean colors with active LEDs and one-click presets.
    - Golden "ME" star badge isolating own player from deduction clutter.
    - Minimized/expanded with hotkey <kbd>L</kbd>.

12. **[COMPLETED] Feature 12: Deduction Board Zoom**
    - 4-level scale switcher (Compact, Normal, Large, Extra Large) in Settings.

13. **[COMPLETED] Feature 13: Modernized Fair Play Disclaimer**
    - Top button with back arrow icon (`←`).
    - Direct link to Alexander Atlesque's original repository (`https://github.com/atlesque/among-us-detective`) and Marcos Binder modernization contact & fork.
    - Expandable viewer displaying Alexander Atlesque's original 2020 legacy letter.
    - Explicit note that donations go to Alexander Atlesque.

14. **[COMPLETED] Feature 14: 100% Multilingual Localization (i18n)**
    - All user-facing strings translated into English, Portuguese, Spanish, Korean, French, and German with browser auto-detection.

15. **[COMPLETED] Feature 15: Help Modal 700px Overhaul & Segmented Navigation**
    - Enlarge modal width to ~700px (`sm:max-w-[720px]`).
    - Modern segmented step navigation without native browser scrollbars.
    - Generous spacing and visual icon badges across Lobby Setup, Impostor Mode, and Hotkeys panel.

### 🚧 In Progress

- **Dedicated Impostor HUD and Sabotage & Alibi Planner**: Build a standalone tactical HUD around the existing Impostor Mode tools, with planning for Reactor, O2, Lights, and Comms. The dedicated HUD and planner are not available in the app yet.

---

### 🔮 Community Feedback Phase (v2.0)

> 📣 **Status**: Among Us Detective 2.0 is delivered and stabilized. Work on the dedicated Impostor HUD and Sabotage & Alibi Planner is in progress; the current app provides the inverted board, Impostor-focused notes, partner role marking, and fake-task guidance. Other future work will be evaluated based on player input and live-match observation.
