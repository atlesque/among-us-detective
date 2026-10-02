import { ref, computed } from 'vue'

const micPermissionState = ref<'granted' | 'prompt' | 'denied' | 'unknown' | 'unsupported'>('unknown')
const micErrorMessage = ref('')
const isRequestingMic = ref(false)
let isInitialized = false

export function useMicrophone() {
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
      micErrorMessage.value = !isSecure.value
        ? 'Acesso ao microfone requer HTTPS ou localhost no navegador.'
        : 'Microfone não suportado neste navegador.'
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
      micErrorMessage.value = ''
      isRequestingMic.value = false
      return true
    } catch (err: any) {
      isRequestingMic.value = false
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        micPermissionState.value = 'denied'
        micErrorMessage.value = 'Permissão de microfone bloqueada pelo navegador. Ative nas permissões do site (ícone ao lado da URL).'
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        micErrorMessage.value = 'Nenhum dispositivo de microfone foi encontrado.'
      } else {
        micErrorMessage.value = 'Erro ao solicitar microfone: ' + (err.message || 'Permissão recusada')
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
