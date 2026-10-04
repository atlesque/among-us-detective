# 🔍 Among Us Detective — Tactical Companion & Investigation Board

> **A smart, legal, and non-intrusive companion tool for Among Us detectives and impostors.**  
> Keep track of room sightings, verify role claims, coordinate meetings, and crack shifting alibis with precision.

---

## 🌟 Version 2.0 / 2.1 Major Modernization Highlights

**Among Us Detective** has been completely revamped into a modern, responsive, split-screen desktop and mobile investigative workspace:

- **⚡ Performance Mode ("Disable animations")**: Built-in toggle in Settings to completely eliminate CSS transitions and keyframes, giving an ultra-lightweight, zero-lag experience on low-end hardware.
- **🕵️ 6-Column Deduction Hierarchy**: Clean, strict separation across *Hard Clear*, *Trusted*, *Unknown*, *Suspicious*, *Impostors*, and *Dead*.
- **💀 Impostor Mode tools available today**: Press `I` or use the Dock button to switch the deduction board to an inverted view for manually tracking priority targets, alibis, scapegoats, and fellow Impostors. The mode also provides Impostor-focused notes, partner role marking, and fake-task guidance in the Tasks reference.
- **🚧 Dedicated Impostor HUD — work in progress**: A standalone tactical HUD and its Sabotage & Alibi Planner are not implemented yet.
- **🎭 Floating Role Popover (Claimed vs. Verified)**: Quick-access popover on each card to assign Crew roles (*Detective, Judge, Scientist, Engineer, Noisemaker*) or Impostor roles (*Impostor, Shapeshifter, Phantom, Viper*), differentiate between unverified claims (`?`) and confirmed roles (`✓`), mark task completion, and track emergency meetings.
- **👥 18 Official Bean Colors & Match Roster**: Full 18-color Among Us roster with LED indicators, one-click lobby presets (15 Players, All 18, Clear), collapsible panel (`L`), and golden **"ME"** star isolation.
- **⏱️ Meeting Rounds & Timeline Snapshots**: Deep-copy snapshots on every "Next Round" click (`R1`, `R2`, `R3`), historical read-only timeline inspection, and evolution tags (e.g., `Now: Hard Clear`) to spot shifting alibis and exposed lies.
- **📝 Dual-Mode Detective Notepad & Voice Dictation**: Volatile per-round notes (auto-archived upon meeting) alongside persistent match notes, with built-in Web Speech API voice dictation and automatic player color syntax highlighting (`N`).
- **🗺️ Interactive Map & MIRA HQ Sensor Overlay**: Room pin drop tracking across all 5 maps (*The Skeld, MIRA HQ, Polus, The Airship, The Fungle*) with per-round pin history, automatic dead-player pin removal, and interactive MIRA HQ door sensors overlay (`M`).
- **⌨️ Persistent Dock & Keyboard Shortcuts**: Quick hotkey access:
  - <kbd>N</kbd> — Toggle Detective / Impostor Notepad
  - <kbd>M</kbd> — Toggle Interactive Map
  - <kbd>T</kbd> — Open Tasks Reference Guide
  - <kbd>I</kbd> — Toggle the inverted Impostor Mode board
  - <kbd>L</kbd> — Minimize / Expand Lobby Roster
  - <kbd>Esc</kbd> — Close open modal / minimize notepad / blur inputs
- **🌐 100% Multilingual Localization (i18n)**: Full native translations across 6 locales with automatic browser language detection and instant switcher:
  - 🇺🇸 English (`en-US`)
  - 🇧🇷 Português do Brasil (`pt-BR`)
  - 🇪🇸 Español (`es-ES`)
  - 🇰🇷 한국어 (`ko-KR`)
  - 🇫🇷 Français (`fr-FR`)
  - 🇩🇪 Deutsch (`de-DE`)
- **🔍 Dedicated Deduction Board Zoom**: Built-in 4-level scale switcher (*Compact, Normal, Large, Extra Large*) keeping deduction columns perfectly aligned without distorting browser viewports.

---

## 🛡️ Fair Play & Innersloth Policy Compliance

Among Us Detective is **100% legal, ban-proof, and anti-cheat safe**:
- **Zero Memory Reading / Injection**: Operates exclusively in an isolated browser sandbox. Never hooks DirectX/Vulkan frames, never injects DLLs, and never sniffs network packets.
- **Innersloth Policy Compliant**: Complies strictly with Innersloth companion tool guidelines. All data on the board is entered manually by the human player.
- Technical details, creator letters, and legal disclaimers can be reviewed on the in-app [Disclaimer page](https://amongusdetective.com/disclaimer).

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Nuxt 4](https://nuxt.com/) / [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **State Management**: [Pinia](https://pinia.vuejs.org/) with `pinia-plugin-persistedstate`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & SCSS modules with native dark-mode
- **Drag-and-Drop**: `vuedraggable` / `SortableJS` with smooth mobile touch-and-hold fallback
- **Typing & Linting**: TypeScript with strict type verification (`vue-tsc --noEmit`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- pnpm (or npm / yarn)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/atlesque/among-us-detective.git
cd among-us-detective

# Install dependencies
pnpm install

# Start development server on http://localhost:8071
pnpm dev
```

### Type Checking & Building

```bash
# Run strict Vue / TypeScript verification
npx vue-tsc --noEmit

# Build production bundle
pnpm build
```

---

## 👤 Credits & Attribution

- **Original Conception, Credits & Upstream Project**: Conceived, credited, and maintained by **Alexander Atlesque** ([GitHub: atlesque/among-us-detective](https://github.com/atlesque/among-us-detective)).
- **Version 2.0 / 2.1 Modernization & Revamp**: Modernized, redesigned, and overhauled by **Marcos Binder** ([mrbbinder@gmail.com](mailto:mrbbinder@gmail.com) • [GitHub Fork: marcosbinder/among-us-detective](https://github.com/marcosbinder/among-us-detective)).
- **Donations Notice**: All PayPal donations in the app support original creator **Alexander Atlesque** directly.

*Among Us is a registered trademark of Innersloth LLC. Among Us Detective is an independent fan-made companion tool and is not affiliated with or endorsed by Innersloth.*
