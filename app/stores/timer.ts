import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  // Modal visibility & active tab
  const isModalOpen = ref(false)
  const activeTab = ref<'timer' | 'stopwatch'>('timer')

  // Sound enabled
  const isSoundEnabled = ref(true)

  // --- STOPWATCH STATE ---
  const stopwatchSeconds = ref(0)
  const isStopwatchRunning = ref(false)
  let stopwatchIntervalId: ReturnType<typeof setInterval> | null = null
  let stopwatchStartedAt: number | null = null

  // --- TIMER STATE ---
  const timerInitialSeconds = ref(25) // Default 25s (standard Among Us kill cooldown)
  const timerRemainingSeconds = ref(25)
  const isTimerRunning = ref(false)
  const isTimerFinished = ref(false)
  let timerIntervalId: ReturnType<typeof setInterval> | null = null
  let timerTargetEndMs: number | null = null
  // True from Start until the countdown is reset, finishes or gets a new duration (stays true while paused)
  let isTimerInProgress = false

  // Formatter: mm:ss
  function formatTime(totalSeconds: number): string {
    const s = Math.max(0, Math.floor(totalSeconds))
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formattedStopwatch = computed(() => formatTime(stopwatchSeconds.value))
  const formattedTimer = computed(() => formatTime(timerRemainingSeconds.value))

  // Live badge for dock button (visible without modal open)
  const liveBadgeText = computed(() => {
    if (isTimerRunning.value) {
      return formattedTimer.value
    }
    if (isStopwatchRunning.value) {
      return formattedStopwatch.value
    }
    return null
  })

  // Web Audio synthesizer chime (offline, zero assets)
  function playChime() {
    if (!isSoundEnabled.value || typeof window === 'undefined') return
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.setValueAtTime(1320, now + 0.12)
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.55)
    } catch {
      // AudioContext can fail gracefully if not permitted
    }
  }

  // --- STOPWATCH ACTIONS ---
  function startStopwatch() {
    if (isStopwatchRunning.value) return
    isStopwatchRunning.value = true
    stopwatchStartedAt = Date.now() - (stopwatchSeconds.value * 1000)
    if (stopwatchIntervalId) clearInterval(stopwatchIntervalId)
    stopwatchIntervalId = setInterval(() => {
      if (stopwatchStartedAt !== null) {
        stopwatchSeconds.value = Math.floor((Date.now() - stopwatchStartedAt) / 1000)
      }
    }, 250)
  }

  function pauseStopwatch() {
    isStopwatchRunning.value = false
    if (stopwatchIntervalId) {
      clearInterval(stopwatchIntervalId)
      stopwatchIntervalId = null
    }
    stopwatchStartedAt = null
  }

  function resetStopwatch() {
    pauseStopwatch()
    stopwatchSeconds.value = 0
  }

  function toggleStopwatch() {
    if (isStopwatchRunning.value) {
      pauseStopwatch()
    } else {
      startStopwatch()
    }
  }

  // --- TIMER ACTIONS ---
  function setTimerDuration(seconds: number) {
    pauseTimer()
    isTimerInProgress = false
    isTimerFinished.value = false
    timerInitialSeconds.value = Math.max(1, Math.min(3600, seconds))
    timerRemainingSeconds.value = timerInitialSeconds.value
  }

  function adjustTimer(deltaSeconds: number) {
    if (isTimerRunning.value && timerTargetEndMs !== null) {
      timerTargetEndMs += deltaSeconds * 1000
      const remainingMs = timerTargetEndMs - Date.now()
      if (remainingMs > 0) {
        timerRemainingSeconds.value = Math.ceil(remainingMs / 1000)
      } else {
        finishTimer()
      }
    } else if (isTimerInProgress) {
      // Paused mid-countdown: adjust the time left, keep the starting duration for Reset
      timerRemainingSeconds.value = Math.max(1, Math.min(3600, timerRemainingSeconds.value + deltaSeconds))
    } else {
      setTimerDuration(timerInitialSeconds.value + deltaSeconds)
    }
  }

  function startTimer(presetSeconds?: number) {
    if (presetSeconds !== undefined) {
      setTimerDuration(presetSeconds)
    }
    if (timerRemainingSeconds.value <= 0) {
      timerRemainingSeconds.value = timerInitialSeconds.value
    }
    isTimerFinished.value = false
    isTimerRunning.value = true
    isTimerInProgress = true
    timerTargetEndMs = Date.now() + (timerRemainingSeconds.value * 1000)

    if (timerIntervalId) clearInterval(timerIntervalId)
    timerIntervalId = setInterval(() => {
      if (timerTargetEndMs === null) return
      const remainingMs = timerTargetEndMs - Date.now()
      if (remainingMs > 0) {
        timerRemainingSeconds.value = Math.ceil(remainingMs / 1000)
      } else {
        finishTimer()
      }
    }, 250)
  }

  function finishTimer() {
    timerRemainingSeconds.value = 0
    pauseTimer()
    isTimerInProgress = false
    isTimerFinished.value = true
    playChime()
  }

  function pauseTimer() {
    isTimerRunning.value = false
    if (timerIntervalId) {
      clearInterval(timerIntervalId)
      timerIntervalId = null
    }
    timerTargetEndMs = null
  }

  function resetTimer() {
    pauseTimer()
    isTimerInProgress = false
    isTimerFinished.value = false
    timerRemainingSeconds.value = timerInitialSeconds.value
  }

  function toggleTimer() {
    if (isTimerRunning.value) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  function toggleModal(open?: boolean) {
    isModalOpen.value = open !== undefined ? open : !isModalOpen.value
    if (isTimerFinished.value) {
      isTimerFinished.value = false
    }
  }

  function cleanup() {
    pauseStopwatch()
    pauseTimer()
  }

  return {
    isModalOpen,
    activeTab,
    isSoundEnabled,
    stopwatchSeconds,
    isStopwatchRunning,
    formattedStopwatch,
    timerInitialSeconds,
    timerRemainingSeconds,
    isTimerRunning,
    isTimerFinished,
    formattedTimer,
    liveBadgeText,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    toggleStopwatch,
    setTimerDuration,
    adjustTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleTimer,
    toggleModal,
    cleanup,
  }
})
