<template>
  <section class="changelog">
    <div class="p-2 overflow-y-scroll rounded max-h-64 bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200">
      <div
        v-for="(item, index) in changelog"
        :key="index"
        class="mb-4 text-sm leading-5"
      >
        <span class="text-xs font-bold text-gray-900 dark:text-gray-100">{{ item.date }}</span>
        <ul v-if="(item.changes || []).length > 0" class="pl-4 list-disc text-gray-700 dark:text-gray-300">
          <li v-for="(change, i) in item.changes" :key="i" v-html="change" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ChangelogItem {
  date: string
  changes: string[]
}

const changelog: ChangelogItem[] = [
  {
    date: '2026-09-23 (v2.3 - Modo Claro & Refinamento Visual)',
    changes: [
      '<b>☀️ Modo Claro Completo:</b> Suporte completo ao tema claro em todos os painéis, modais, quadro de deduções e ferramentas',
      '<b>🎨 Contraste e Destaque Dinâmico:</b> Cores secundárias ajustadas e tags de nomes e cores com contraste dinâmico de alto relevo',
      '<b>🐛 Fix de Bugs Gerais:</b> Correções no cabeçalho de mortos, quebras de linhas de cores no lobby e refinamento em botões e badges',
    ],
  },
  {
    date: '2026-09-21 (v2.2 - Histórico & Correções Gerais)',
    changes: [
      '<b>🔒 Histórico em Modo Leitura:</b> Bloqueio de arrastar e editar ao visualizar reuniões passadas',
      '<b>🛡️ Persistência Segura:</b> Sessão da rodada 1 protegida com TTL e tratamento de erros no armazenamento',
      '<b>🔄 Reinício Limpo:</b> Botão de nova partida preservando a lista de jogadores do lobby ativo',
      '<b>🎭 Sincronização do Impostor:</b> Correção no roteamento de papéis e confirmações de parceiros impostores',
      '<b>🌐 Nomes Oficiais de Tarefas:</b> Tradução oficial de salas e tarefas em 6 idiomas',
      '<b>🎙️ Ditado por Voz:</b> Detecção automática de idioma e seletor rápido',
      '<b>🐛 Fix de Bugs Gerais:</b> Ajustes de responsividade móvel no seletor de cores e nos contadores de reunião',
    ],
  },
  {
    date: '2026-09-20 (v2.1 - Performance, Shortcuts & Help Overhaul)',
    changes: [
      '<b>⚡ Performance & Smoothness:</b> Added "Disable animations" option in Settings to eliminate all CSS transitions and keyframes, providing a lightweight, lag-free experience on low-end hardware',
      '<b>📚 Help Modal Visual Overhaul:</b> Expanded modal to comfortable ~700px width, replaced native tab scrollbar with sleek segmented navigation, increased card spacing, and visually upgraded Lobby Setup, Impostor HUD, and Hotkeys panel',
      '<b>⌨️ Full Keyboard Shortcuts:</b> Added quick hotkey access: <kbd class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">N</kbd> (Notes), <kbd class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">M</kbd> (Map), <kbd class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">T</kbd> (Tasks), <kbd class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">I</kbd> (Impostor HUD), <kbd class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">L</kbd> (Roster), <kbd class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">Esc</kbd> (Close/Minimize)',
      '<b>📜 Disclaimer & Authorship Credits:</b> Clarified original authorship conceived and credited by Alexandre Atlesque with link to original GitHub (<a href="https://github.com/atlesque/among-us-detective" target="_blank" class="text-blue-500 underline">atlesque/among-us-detective</a>), modernized by Marcos Binder (<a href="mailto:mrbbinder@gmail.com" class="text-emerald-500 underline">mrbbinder@gmail.com</a> / <a href="https://github.com/marcosbinder/among-us-detective" target="_blank" class="text-gray-400 underline">fork v2.0</a>), added original legacy disclaimer viewer, and clarified that PayPal donations go directly to Alexandre Atlesque',
      '<b>🌐 100% Multilingual:</b> Complete i18n coverage across all 6 locales (en-US, pt-BR, es-ES, ko-KR, fr-FR, de-DE)',
    ],
  },
  {
    date: '2026-09-18 (Version 2.0 Overhaul)',
    changes: [
      '<b>✨ Added & Modernized:</b>',
      'Multilingual localization (i18n) supporting English, Portuguese, Spanish, Korean, French, and German with browser auto-detection and Settings switcher',
      'Dedicated Impostor Operations HUD with interactive kill cooldown timer, fake task safety advisor, sabotage planner, and fellow impostor coordination',
      'Player Tasks Completion tracker (Done ✓ / In Progress) and Emergency Meetings counter directly in player card context menu',
      'Modern 4-tab visual walkthrough tutorial (Match Setup, Meeting Rounds, Deduction Board, Map & Voice Notes)',
      'Modern responsive dark-mode Disclaimer page detailing 100% compliance with Innersloth companion tool policy',
      'Modern 6-column deduction hierarchy: Hard Clear, Trusted, Unknown, Suspicious, Impostor, and Dead',
      'Match Lobby Roster with all 18 official Among Us bean colors, live count indicator, and responsive mobile layout',
      'Compact floating Role Popover with official role icons (Detective, Judge, Scientist, Engineer, Noisemaker, Shapeshifter, Phantom, Viper) and claim verification badges',
      'Round Timeline & Snapshot history: view past meetings read-only and observe how deductions evolved across rounds',
      'Mobile touch-and-hold drag-and-drop: cards smoothly track your finger across columns without triggering unwanted page scrolling',
      'Persistent bottom Detective Toolbar docked with quick access to Notes, Map, Tasks, Settings, Help, and About',
      'Direct in-card Mark as Dead / Revive action with "Died in Round X" tracking badge',
      'Round limit indicator (up to 10 rounds) and dedicated Board Zoom scaling options in Settings',
      'Full dark mode and high-contrast styling across all screens and modals',
      '<b>🧹 Removed & Cleaned Up:</b>',
      'Removed legacy top Player Selector modal and dropdown (replaced by one-click ME badge and popover)',
      'Removed legacy text notes panel from top header (modernized into persistent bottom dock)',
      'Removed cluttered emojis throughout UI in favor of clean, professional SVG icons',
      'Removed obsolete 10-player preset button to declutter match lobby header',
      'Removed "Right click to set as Me" hint on mobile devices where right click does not exist',
      'Removed redundant "Expand" / "Minimize" text buttons',
      'Removed legacy table-based Settings layout in favor of modern card groups',
      'Removed obsolete CrewStats component',
    ],
  },
  { date: '2025-05-20', changes: ['Added new map: The Fungle'] },
  { date: '2025-05-16', changes: ['Enabled tracking your own color by default, to avoid confusion why yellow is missing'] },
  { date: '2021-07-19', changes: ['Add new Clean Vent task'] },
  { date: '2021-06-25', changes: ['Add new colors'] },
  { date: '2021-04-12', changes: ['Adjust map constrast and color scheme <small>(Thx u/Greenbay7115!)</small>'] },
  {
    date: '2021-04-09',
    changes: [
      'Add imposter mode <small>(Thx u/Cantwaitforyandere and S.P. Eieye!)</small>',
      'Add tasks logger <small>(Thx Trolliant, tacallender and u/Cantwaitforyandere!)</small>',
      'Add Mira HQ map overlay to help with door logs <small>(Thx u/XanderTheV!)</small>',
      'Increase map player contrast',
      'Fix Notes on iOS <small>(Thx S.P. Eieye!)</small>',
    ],
  },
  { date: '2021-04-08', changes: ['Track dead players on map'] },
  { date: '2021-04-07', changes: ['Add player location tracker <small>(Thx u/PacoZK1 and u/SteelFrog21_YT!)</small>'] },
  {
    date: '2021-04-05',
    changes: [
      'Change player color selector to use modal',
      'Highlight own color when tracking yourself is enabled',
      'Disable adding member to both innocent and suspect',
      'Add option to use your own color <small>(Thx connor and Triple A!)</small>',
      'Misc. internal improvements and refactoring',
    ],
  },
  {
    date: '2021-04-04',
    changes: [
      'Add option to hide round notes (useful if you need to save space)',
      'Add voice transcription to Game notes too',
      'Add option to preserve Game notes after new game',
      'Allow editing player names <small>(Thx teeny!)</small>',
      'Preserve settings on page refresh (including Dark mode)',
      'Make Tasks, Meetings and Imposter checkboxes configurable in Settings',
      'Group all settings under Settings modal to free up space',
      'Add checkbox for marking someone as an imposter (when you\'re 100% sure) <small>(Thx u/__Glaceyy and u/EhCrumb!)</small>',
      'Add new The Airship map <small>(Thx Ezzelin and Triple A!)</small>',
      'Update Mira HQ map <small>(Thx SamuraiPipotchi on Twitter!)</small>',
      'Fix caching so everyone sees the new version',
      'Fix player color names resetting to icons',
      'Fix new round button being disabled in some cases',
      'Misc. UI improvements',
    ],
  },
  {
    date: '2020-10-28',
    changes: [
      'Rename <b>Player</b> to <b>My color</b> to clarify color picker use <small>(Thx u/Elle and u/lustle!)</small>',
      'Add hotkeys \'M\' to toggle map and \'N\' to toggle notes <small>(Thx u/CadeFromSales!)</small>',
    ],
  },
  { date: '2020-10-21', changes: ['Add Speech-to-Text for transcribing notes by voice <small>(Thx u/CadeFromSales!)</small>'] },
  {
    date: '2020-10-20',
    changes: [
      'Moving inactive crew will make them active',
      'Add feedback form',
      'Add PWA support for adding to mobile home screen',
      'Improve crew icon quality',
      'Fix crew icons disappearing while moving',
      'Misc. Dark mode fixes',
    ],
  },
  {
    date: '2020-10-14',
    changes: [
      'Update maps with better versions <small>(Thx Ezzelin!)</small>',
      'Auto-detect dark mode',
      'Make bottom buttons larger and mention them in Help',
    ],
  },
  { date: '2020-10-06', changes: ['Show Help modal for new players <small>(Thx u/peasant-trip!)</small>'] },
  {
    date: '2020-10-05',
    changes: [
      'Move Notes button to top button row for easier access',
      'Reduce font-size on large screens',
      'Remake How to use into a GIF slideshow',
    ],
  },
  {
    date: '2020-09-30',
    changes: [
      'Make table UI prettier',
      'Move Changelog into separate modal',
      'Improve \'Show map\' button layout',
      'Add Notes modal. You can now add notes per round and per game. <small>(Thx u/Greedlord and u/AshamedBrit!)</small>',
      'Improve mobile UI',
    ],
  },
  { date: '2020-09-22', changes: ['Added Dark mode', 'Show player icons by default. Color names can be enabled in footer'] },
]
</script>
