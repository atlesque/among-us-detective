<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
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
        ref="dialogRef"
        class="modal-dialog-content focus:outline-none inline-block w-full px-6 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl sm:my-8 sm:align-middle sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="headlineId"
        tabindex="-1"
      >
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            :aria-label="t('modal.close')"
            data-test="modal-close"
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
            <h1 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 mb-3 sm:mb-4" :id="headlineId">
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

<script lang="ts">
// Open modals in mount order; only the last one handles Escape and Tab.
const openModals: symbol[] = []
</script>

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

const { t } = useI18n()
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

const modalToken = Symbol('modal')
const headlineId = useId()
const dialogRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(dialogRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter(el => el.getClientRects().length > 0)
}

function isTopmostModal() {
  return openModals[openModals.length - 1] === modalToken
}

function trapTab(e: KeyboardEvent) {
  const focusable = getFocusableElements()
  if (focusable.length === 0) {
    e.preventDefault()
    dialogRef.value?.focus()
    return
  }
  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  const active = document.activeElement
  const isInside = !!active && !!dialogRef.value?.contains(active)
  if (e.shiftKey && (!isInside || active === first || active === dialogRef.value)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (!isInside || active === last)) {
    e.preventDefault()
    first.focus()
  }
}

// Capture phase on window runs before every other keydown listener, so only the
// topmost modal reacts and Escape doesn't also reach page-level shortcuts
// (e.g. minimising the notepad).
function handleKeydown(e: KeyboardEvent) {
  if (!isTopmostModal() || e.isComposing) return
  if (e.key === 'Escape') {
    e.stopPropagation()
    e.preventDefault()
    emit('close')
  } else if (e.key === 'Tab') {
    trapTab(e)
  }
}

onMounted(() => {
  previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
  openModals.push(modalToken)
  window.addEventListener('keydown', handleKeydown, { capture: true })
  nextTick(() => {
    if (dialogRef.value && !dialogRef.value.contains(document.activeElement)) {
      dialogRef.value.focus({ preventScroll: true })
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown, { capture: true })
  const index = openModals.indexOf(modalToken)
  if (index !== -1) openModals.splice(index, 1)
  if (previouslyFocused?.isConnected && openModals.length === 0) {
    previouslyFocused.focus({ preventScroll: true })
  }
  previouslyFocused = null
})
</script>
