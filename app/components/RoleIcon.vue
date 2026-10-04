<template>
  <div class="relative inline-flex items-center justify-center role-icon-wrapper" :class="sizeClass">
    <!-- Official role PNG image -->
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="role ? tRole(role) : t('role.label')"
      class="object-contain w-full h-full select-none pointer-events-none drop-shadow-sm"
      draggable="false"
    />

    <!-- Generic Impostor Icon (Skull) -->
    <div
      v-else-if="role && role.toLowerCase() === 'impostor'"
      class="w-full h-full flex items-center justify-center text-rose-500 drop-shadow-sm"
    >
      <AppIcon name="skull" class="w-full h-full p-0.5" />
    </div>

    <!-- Empty / unassigned role placeholder -->
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      class="w-full h-full text-gray-400 dark:text-gray-500 opacity-40"
    >
      <circle cx="12" cy="12" r="8" stroke-dasharray="2 2"/>
      <path d="M12 9v6M9 12h6"/>
    </svg>

    <!-- Yellow '?' badge overlay when roleConfirmed is false -->
    <span
      v-if="showBadge && role && !confirmed"
      class="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-yellow-400 text-black font-black text-[10px] rounded-full border border-white dark:border-gray-900 ring-1 ring-black/20 dark:ring-white/20 shadow-md pointer-events-none z-10"
      :title="t('role.unverifiedClaim')"
    >
      ?
    </span>

    <!-- Verified badge uses red for impostor roles and green for crew roles -->
    <span
      v-else-if="showBadge && role && confirmed"
      class="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-white font-black text-[10px] rounded-full border border-white dark:border-gray-900 ring-1 ring-black/20 dark:ring-white/20 shadow-md pointer-events-none z-10"
      :class="isImpostorRole ? 'bg-rose-600' : 'bg-emerald-500'"
      :title="t('role.verifiedClaim')"
    >
      <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
const { t, tRole } = useI18n()
const props = withDefaults(
  defineProps<{
    role?: string | null
    confirmed?: boolean
    size?: 'sm' | 'md' | 'lg'
    showBadge?: boolean
  }>(),
  {
    role: null,
    confirmed: false,
    size: 'md',
    showBadge: true,
  }
)

const roleImages: Record<string, string> = {
  detective: '/images/roles/detective.png',
  judge: '/images/roles/judge.png',
  scientist: '/images/roles/scientist.png',
  engineer: '/images/roles/engineer.png',
  noisemaker: '/images/roles/noisemaker.png',
  impostor: '/images/roles/impostor.png',
  shapeshifter: '/images/roles/shapeshifter.png',
  phantom: '/images/roles/phantom.png',
  viper: '/images/roles/viper.png',
}

const imageSrc = computed(() => {
  if (!props.role) return null
  return roleImages[props.role.toLowerCase()] || null
})

const isImpostorRole = computed(() =>
  ['impostor', 'shapeshifter', 'phantom', 'viper'].includes((props.role || '').toLowerCase())
)

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'w-5 h-5'
  if (props.size === 'lg') return 'w-8 h-8'
  return 'w-6 h-6'
})
</script>

<style scoped>
.role-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}
</style>
