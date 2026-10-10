<template>
  <div class="flex">
    <Modal max-width="md" @close="timerStore.toggleModal(false)">
      <template #title>
        <div class="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <AppIcon name="timer" class="w-5 h-5 text-indigo-500 shrink-0" />
          <span>{{ t('timer.title') }}</span>
        </div>
      </template>

      <template #body>
        <div class="space-y-4">
          <!-- Mode Tabs (Timer vs Stopwatch) -->
          <div class="flex rounded-lg bg-gray-100 dark:bg-gray-800/80 p-1 border border-gray-200 dark:border-gray-700/60">
            <button
              type="button"
              class="flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all text-center cursor-pointer select-none"
              :class="timerStore.activeTab === 'timer'
                ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
              @click="timerStore.activeTab = 'timer'"
            >
              ⏳ {{ t('timer.tabTimer') }}
              <span v-if="timerStore.isTimerRunning" class="ml-1 inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <button
              type="button"
              class="flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all text-center cursor-pointer select-none"
              :class="timerStore.activeTab === 'stopwatch'
                ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
              @click="timerStore.activeTab = 'stopwatch'"
            >
              ⏱ {{ t('timer.tabStopwatch') }}
              <span v-if="timerStore.isStopwatchRunning" class="ml-1 inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>

          <!-- TAB 1: COUNTDOWN TIMER -->
          <div v-if="timerStore.activeTab === 'timer'" class="space-y-3.5">
            <!-- Big Digital Display -->
            <div
              class="flex flex-col items-center justify-center p-4 rounded-xl border transition-all"
              :class="timerStore.isTimerFinished
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-600 ring-2 ring-rose-500/40 animate-pulse'
                : (timerStore.isTimerRunning
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800/60'
                  : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/60')"
            >
              <div
                class="font-mono text-4xl sm:text-5xl font-black tracking-wider transition-colors"
                :class="timerStore.isTimerFinished
                  ? 'text-rose-600 dark:text-rose-400'
                  : (timerStore.isTimerRunning
                    ? 'text-indigo-600 dark:text-indigo-300'
                    : 'text-gray-800 dark:text-gray-200')"
                data-test="timer-display"
              >
                {{ timerStore.formattedTimer }}
              </div>
              <div v-if="timerStore.isTimerFinished" class="mt-1 text-xs font-bold text-rose-600 dark:text-rose-400 animate-pulse">
                🔔 {{ t('timer.timeUp') }}
              </div>
            </div>

            <!-- Quick Adjusters (-15s, -5s, +5s, +15s) -->
            <div class="flex items-center justify-center gap-1.5">
              <button
                v-for="delta in [-15, -5, 5, 15]"
                :key="delta"
                type="button"
                class="px-2 py-1 text-[11px] font-bold rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 transition-colors cursor-pointer select-none active:scale-95"
                :data-test="`timer-adjust-${delta}`"
                @click="timerStore.adjustTimer(delta)"
              >
                {{ delta > 0 ? `+${delta}s` : `${delta}s` }}
              </button>
            </div>

            <!-- Primary Action Buttons (Start / Pause / Reset) -->
            <div class="flex items-center gap-2 pt-1">
              <button
                type="button"
                class="flex-1 py-2 px-4 rounded-lg font-bold text-xs sm:text-sm text-white transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                :class="timerStore.isTimerRunning
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30'"
                data-test="timer-toggle-btn"
                @click="timerStore.toggleTimer()"
              >
                <span>{{ timerStore.isTimerRunning ? '⏸' : '▶' }}</span>
                <span>{{ timerStore.isTimerRunning ? t('timer.pause') : t('timer.start') }}</span>
              </button>
              <button
                type="button"
                class="py-2 px-3.5 rounded-lg font-bold text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                :title="t('timer.reset')"
                data-test="timer-reset-btn"
                @click="timerStore.resetTimer()"
              >
                <span>↺</span>
                <span>{{ t('timer.reset') }}</span>
              </button>
            </div>

            <!-- Presets Specifically for Among Us -->
            <div class="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <!-- Kill Cooldown Presets -->
              <div>
                <div class="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1">
                  <span>💀</span>
                  <span>{{ t('timer.killCooldown') }}</span>
                </div>
                <div class="grid grid-cols-5 gap-1 text-[11px]">
                  <button
                    v-for="s in [10, 15, 20, 25, 30]"
                    :key="s"
                    type="button"
                    class="py-1 rounded font-bold border transition-all cursor-pointer text-center"
                    :class="timerStore.timerInitialSeconds === s
                      ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 border-rose-400 dark:border-rose-600'
                      : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-rose-50 dark:hover:bg-rose-900/30'"
                    @click="timerStore.startTimer(s)"
                  >
                    {{ s }}s
                  </button>
                </div>
              </div>

              <!-- Meeting / Discussion Presets -->
              <div>
                <div class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                  <span>🔔</span>
                  <span>{{ t('timer.meeting') }}</span>
                </div>
                <div class="grid grid-cols-4 gap-1 text-[11px]">
                  <button
                    v-for="s in [45, 60, 90, 120]"
                    :key="s"
                    type="button"
                    class="py-1 rounded font-bold border transition-all cursor-pointer text-center"
                    :class="timerStore.timerInitialSeconds === s
                      ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 border-blue-400 dark:border-blue-600'
                      : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30'"
                    @click="timerStore.startTimer(s)"
                  >
                    {{ s }}s
                  </button>
                </div>
              </div>

              <!-- Sabotage (30s & 45s) -->
              <div>
                <div class="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                  <span>⚠️</span>
                  <span>{{ t('timer.sabotage') }}</span>
                </div>
                <div class="grid grid-cols-2 gap-1 text-[11px]">
                  <button
                    type="button"
                    class="py-1 rounded font-bold border transition-all cursor-pointer text-center bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 hover:bg-amber-100"
                    @click="timerStore.startTimer(30)"
                  >
                    {{ t('timer.sabotage30') }}
                  </button>
                  <button
                    type="button"
                    class="py-1 rounded font-bold border transition-all cursor-pointer text-center bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 hover:bg-amber-100"
                    @click="timerStore.startTimer(45)"
                  >
                    {{ t('timer.sabotage45') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Sound Chime Checkbox -->
            <label class="flex items-center gap-2 pt-1 text-[11px] text-gray-600 dark:text-gray-400 cursor-pointer select-none">
              <input
                v-model="timerStore.isSoundEnabled"
                type="checkbox"
                class="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span>{{ t('timer.sound') }}</span>
            </label>
          </div>

          <!-- TAB 2: STOPWATCH -->
          <div v-else class="space-y-3.5">
            <!-- Big Digital Stopwatch Display -->
            <div
              class="flex flex-col items-center justify-center p-4 rounded-xl border transition-all"
              :class="timerStore.isStopwatchRunning
                ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800/60'
                : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/60'"
            >
              <div
                class="font-mono text-4xl sm:text-5xl font-black tracking-wider transition-colors"
                :class="timerStore.isStopwatchRunning
                  ? 'text-indigo-600 dark:text-indigo-300'
                  : 'text-gray-800 dark:text-gray-200'"
              >
                {{ timerStore.formattedStopwatch }}
              </div>
            </div>

            <!-- Primary Action Buttons (Start / Pause / Reset) -->
            <div class="flex items-center gap-2 pt-1">
              <button
                type="button"
                class="flex-1 py-2 px-4 rounded-lg font-bold text-xs sm:text-sm text-white transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                :class="timerStore.isStopwatchRunning
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30'"
                @click="timerStore.toggleStopwatch()"
              >
                <span>{{ timerStore.isStopwatchRunning ? '⏸' : '▶' }}</span>
                <span>{{ timerStore.isStopwatchRunning ? t('timer.pause') : t('timer.start') }}</span>
              </button>
              <button
                type="button"
                class="py-2 px-3.5 rounded-lg font-bold text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                :title="t('timer.reset')"
                @click="timerStore.resetStopwatch()"
              >
                <span>↺</span>
                <span>{{ t('timer.reset') }}</span>
              </button>
            </div>

            <!-- Copy Timestamp to Notes Action with micro-interaction -->
            <div class="pt-2 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                class="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                @click="stampIntoNotes"
              >
                <AppIcon name="notes" class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span v-if="isStamped" class="text-emerald-600 dark:text-emerald-400 font-bold">✓ {{ t('timer.stamped') }}</span>
                <span v-else>{{ t('timer.stampNotes') }} ({{ timerStore.formattedStopwatch }})</span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTimerStore } from '~/stores/timer'

const timerStore = useTimerStore()
const notesStore = useNotesStore()
const { t } = useI18n()

const isStamped = ref(false)

function stampIntoNotes() {
  const stamp = `[${timerStore.formattedStopwatch}] `
  const current = notesStore.roundNotes ? `${notesStore.roundNotes}\n` : ''
  notesStore.setRoundNotes(`${current}${stamp}`)
  isStamped.value = true
  setTimeout(() => {
    isStamped.value = false
  }, 1500)
}
</script>
