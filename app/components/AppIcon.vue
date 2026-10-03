<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Notes / Pencil -->
    <g v-if="name === 'notes' || name === 'pencil'">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </g>

    <!-- Map -->
    <g v-else-if="name === 'map'">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </g>

    <!-- Users / Roster / Players -->
    <g v-else-if="name === 'users' || name === 'roster'">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </g>

    <!-- Arrows & Chevrons -->
    <g v-else-if="name === 'arrow-left'">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>
    <g v-else-if="name === 'chevron-left'">
      <polyline points="15 18 9 12 15 6" />
    </g>
    <g v-else-if="name === 'chevron-down'">
      <polyline points="6 9 12 15 18 9" />
    </g>
    <g v-else-if="name === 'chevron-up'">
      <polyline points="18 15 12 9 6 15" />
    </g>

    <!-- Tasks / Checklist -->
    <g v-else-if="name === 'tasks' || name === 'list'">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </g>

    <!-- Settings / Cog -->
    <g v-else-if="name === 'settings' || name === 'cog'">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </g>

    <!-- Help / Question -->
    <g v-else-if="name === 'help' || name === 'question'">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </g>

    <!-- About / Info -->
    <g v-else-if="name === 'about' || name === 'info'">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </g>

    <!-- Clock / History / Timeline -->
    <g v-else-if="name === 'clock' || name === 'history' || name === 'timeline'">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </g>

    <!-- Bell (Next Round / Meeting) -->
    <g v-else-if="name === 'bell'">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </g>

    <!-- Refresh / Rotate / New Match -->
    <g v-else-if="name === 'refresh' || name === 'rotate'">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </g>

    <!-- Alert / Warning -->
    <g v-else-if="name === 'alert' || name === 'warning'">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </g>

    <!-- Target / Crosshair / Scapegoat -->
    <g v-else-if="name === 'target' || name === 'crosshair'">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </g>

    <!-- Close / X -->
    <g v-else-if="name === 'close' || name === 'x'">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </g>

    <!-- Search / Magnifying Glass -->
    <g v-else-if="name === 'search'">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </g>

    <!-- Eye (Visual Tasks) -->
    <g v-else-if="name === 'eye'">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </g>

    <!-- Key (Common Tasks) -->
    <g v-else-if="name === 'key'">
      <path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l-1.5-1.5L8 9a5 5 0 1 0 2 2l8.5-8.5" />
      <circle cx="7.5" cy="16.5" r="1.5" />
    </g>

    <!-- Zap / Lightning (Short Tasks) -->
    <g v-else-if="name === 'zap' || name === 'bolt'">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </g>

    <!-- Timer / Stopwatch (Long Tasks) -->
    <g v-else-if="name === 'timer'">
      <line x1="10" y1="2" x2="14" y2="2" />
      <line x1="12" y1="14" x2="15" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </g>

    <!-- Location / Pin -->
    <g v-else-if="name === 'pin'">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </g>

    <!-- Sun (Light Mode) -->
    <g v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>

    <!-- Moon (Dark Mode) -->
    <g v-else-if="name === 'moon'">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </g>

    <!-- Checkmark -->
    <g v-else-if="name === 'check'">
      <polyline points="20 6 9 17 4 12" />
    </g>

    <!-- Skull / Dead Player / Impostor -->
    <g v-else-if="name === 'dead' || name === 'dead-body' || name === 'skull'">
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
      <path d="M8 20v2h8v-2M10 17v3M14 17v3M12 4a7 7 0 0 0-7 7c0 2.2 1 4 2.5 5.2V18a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1.8c1.5-1.2 2.5-3 2.5-5.2a7 7 0 0 0-7-7z" />
    </g>

    <!-- Ghost (Among Us Dead Player Ghost) -->
    <g v-else-if="name === 'ghost'">
      <circle cx="9" cy="11" r="1.2" fill="currentColor" />
      <circle cx="15" cy="11" r="1.2" fill="currentColor" />
      <path d="M4 12a8 8 0 0 1 16 0v7a2 2 0 0 1-2 2c-.7 0-1.3-.3-1.7-.8L14 18l-2 2-2-2-2.3 2.2c-.4.5-1 .8-1.7.8a2 2 0 0 1-2-2v-7z" />
    </g>

    <!-- Tombstone / Grave (Alternative Dead Icon) -->
    <g v-else-if="name === 'tombstone' || name === 'grave'">
      <path d="M5 21V9a7 7 0 0 1 14 0v12" />
      <path d="M3 21h18" />
      <line x1="12" y1="8" x2="12" y2="14" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </g>

    <!-- Heart / Revive -->
    <g v-else-if="name === 'heart' || name === 'revive'">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </g>

    <!-- Star (Player Me) -->
    <g v-else-if="name === 'star'">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </g>

    <!-- Shield (Safe / Legal) -->
    <g v-else-if="name === 'shield'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </g>

    <!-- File / Notebook -->
    <g v-else-if="name === 'file'">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </g>

    <!-- Lightbulb (Detective Tips / Knowledge) -->
    <g v-else-if="name === 'lightbulb'">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.64.78 1.13 1.54 1.41 2.5" />
    </g>

    <!-- Touch / Hand / Drag -->
    <g v-else-if="name === 'touch' || name === 'hand' || name === 'drag'">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M6 14v1a7 7 0 0 0 7 7h1a7 7 0 0 0 7-7v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2" />
    </g>

    <!-- Microphone / Voice -->
    <g v-else-if="name === 'mic' || name === 'microphone'">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
