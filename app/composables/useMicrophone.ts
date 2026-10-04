import { ref, computed } from 'vue'

const micPermissionState = ref<'granted' | 'prompt' | 'denied' | 'unknown' | 'unsupported'>('unknown')
const micErrorKey = ref('')
const isRequestingMic = ref(false)
let isInitialized = false
export function useMicrophone() {
  const { t } = useI18n()
  const micErrorMessage = computed(() => micErrorKey.value ? t(micErrorKey.value) : '')

  if (typeof window !== 'undefined' && !isInitialized) {
    isInitialized = true
    checkPermission()
  }

  const isSupported = computed(() => {
    if (typeof navigator === 'undefined') return false
    return !!navigator.mediaDevices?.getUserMedia
  })

  const isSecure = computed(() => {
    if (typeof window === 'undefined') return true
    return window.isSecureContext
  })

  async function checkPermission() {
    if (typeof navigator === 'undefined') return
    if (!navigator.mediaDevices?.getUserMedia) {
      micPermissionState.value = 'unsupported'
      return
    }
    if (navigator.permissions?.query) {
      try {
        const status = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        micPermissionState.value = status.state
        status.onchange = () => {
          micPermissionState.value = status.state
        }
      } catch {
        // Some browsers fail permissions.query for microphone
      }
    }
  }

  async function requestMicrophonePermission(): Promise<boolean> {
    if (micPermissionState.value === 'granted') {
      return true
    }

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      micPermissionState.value = 'unsupported'
      micErrorKey.value = !isSecure.value
        ? 'mic.error.secureRequired'
        : 'mic.error.unsupported'
      return false
    }

    isRequestingMic.value = true
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // IMMEDIATELY stop and release all audio tracks for privacy
      stream.getTracks().forEach((track) => {
        track.stop()
        track.enabled = false
      })
      micPermissionState.value = 'granted'
      micErrorKey.value = ''
      isRequestingMic.value = false
      return true
    } catch (err: any) {
      isRequestingMic.value = false
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        micPermissionState.value = 'denied'
        micErrorKey.value = 'mic.error.permissionDenied'
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        micErrorKey.value = 'mic.error.deviceNotFound'
      } else {
        micErrorKey.value = 'mic.error.requestFailed'
      }
      return false
    }
  }

  return {
    micPermissionState,
    micErrorMessage,
    isRequestingMic,
    isSupported,
    isSecure,
    checkPermission,
    requestMicrophonePermission,
  }
}
