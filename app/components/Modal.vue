<template>
  <div class="fixed inset-0 z-30 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen p-20 px-4 pt-4 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div
          :class="[
            isDarkMode ? 'bg-black' : 'bg-gray-500',
            isTransparent ? 'opacity-0' : 'opacity-75',
          ]"
          class="absolute inset-0"
          @click="emit('close')"
        />
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;
      <div
        :class="[
          isDarkMode ? 'bg-gray-900 text-gray-100 border border-gray-700/80 shadow-2xl' : 'bg-white text-gray-900 border border-gray-200 shadow-xl',
          maxWidthClass,
        ]"
        class="modal-dialog-content inline-block w-full px-6 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl sm:my-8 sm:align-middle sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Close"
            @click="emit('close')"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div class="w-full my-6 sm:my-0">
            <h1 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 mb-3 sm:mb-4" id="modal-headline">
              <slot name="title" />
            </h1>
            <div class="pb-4 modal-body">
              <slot name="body" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isTransparent?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '700px'
  }>(),
  {
    isTransparent: false,
    maxWidth: 'lg',
  }
)
const emit = defineEmits<{ close: [] }>()

const darkModeStore = useDarkModeStore()
const isDarkMode = computed(() => darkModeStore.isDarkMode)

const maxWidthClass = computed(() => {
  switch (props.maxWidth) {
    case 'sm':
      return 'sm:max-w-sm'
    case 'md':
      return 'sm:max-w-md'
    case 'lg':
      return 'sm:max-w-lg'
    case 'xl':
      return 'sm:max-w-xl'
    case '2xl':
    case '700px':
      return 'sm:max-w-[720px]'
    case '3xl':
      return 'sm:max-w-3xl'
    case '4xl':
      return 'sm:max-w-4xl'
    default:
      return 'sm:max-w-lg'
  }
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
