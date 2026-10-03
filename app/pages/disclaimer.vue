<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Back Link with Left Arrow -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-colors mb-8 shadow-sm"
        data-test="back-to-board-top"
      >
        <AppIcon name="arrow-left" class="w-4 h-4 shrink-0 text-blue-400" />
        <span>{{ t('disclaimer.back') }}</span>
      </NuxtLink>

      <!-- Hero Header -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-900/80 border border-gray-800 shadow-xl mb-8">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <AppIcon name="check" class="w-3.5 h-3.5 stroke-[3]" />
            {{ t('disclaimer.safeLegalBadge') }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
            {{ t('disclaimer.zeroInjectionBadge') }}
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
          {{ t('disclaimer.heroTitle') }}
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          {{ t('disclaimer.heroSubtitle') }}
        </p>
      </div>

      <!-- Core Safeguards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <!-- Card 1: Zero Memory Reading -->
        <div class="p-5 rounded-xl bg-gray-900/70 border border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-3">
            <AppIcon name="shield" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-bold text-white mb-1.5">{{ t('disclaimer.zeroMemoryTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {{ t('disclaimer.zeroMemoryDesc') }}
          </p>
        </div>

        <!-- Card 2: 100% Ban-Proof & Legal -->
        <div class="p-5 rounded-xl bg-gray-900/70 border border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3">
            <AppIcon name="check" class="w-5 h-5 stroke-[3]" />
          </div>
          <h2 class="text-base font-bold text-white mb-1.5">{{ t('disclaimer.antiCheatTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {{ t('disclaimer.antiCheatDesc') }}
          </p>
        </div>

        <!-- Card 3: Human Deduction -->
        <div class="p-5 rounded-xl bg-gray-900/70 border border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
            <AppIcon name="lightbulb" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-bold text-white mb-1.5">{{ t('disclaimer.socialSkillTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {{ t('disclaimer.socialSkillDesc') }}
          </p>
        </div>

        <!-- Card 4: Accessibility Aid -->
        <div class="p-5 rounded-xl bg-gray-900/70 border border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-3">
            <AppIcon name="notes" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-bold text-white mb-1.5">{{ t('disclaimer.cognitiveAidTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {{ t('disclaimer.cognitiveAidDesc') }}
          </p>
        </div>
      </div>

      <!-- Innersloth Compliance Statement -->
      <div class="p-6 rounded-xl bg-gray-900/90 border border-gray-800 mb-8 space-y-3">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <AppIcon name="file" class="w-4 h-4 text-blue-400" />
          <span>{{ t('disclaimer.innerslothTitle') }}</span>
        </h2>
        <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {{ t('disclaimer.innerslothDesc1') }}
        </p>
        <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {{ t('disclaimer.innerslothDesc2') }}
        </p>
      </div>

      <!-- Creator Credits & Inquiries -->
      <div class="p-6 rounded-xl bg-gray-900/60 border border-gray-800 text-xs text-gray-400 space-y-3">
        <p class="leading-relaxed">
          {{ t('disclaimer.creditsOriginal') }}
          <a href="https://github.com/atlesque/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline font-bold">
            Alexandre Atlesque
          </a>.
          {{ t('disclaimer.creditsModernized') }}
          <a href="mailto:mrbbinder@gmail.com" class="text-emerald-400 hover:underline font-bold">
            Marcos Binder
          </a> (<a href="mailto:mrbbinder@gmail.com" class="text-emerald-400 hover:underline">mrbbinder@gmail.com</a>)
          <a href="https://github.com/marcosbinder/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-[11px] text-gray-500 hover:text-emerald-400 underline ml-1" :title="t('disclaimer.forkLinkTitle')">{{ t('disclaimer.forkLinkLabel') }}</a>.
        </p>

        <p class="leading-relaxed">
          {{ t('disclaimer.githubRepoNotice') }}
          <a href="https://github.com/atlesque/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline font-bold inline-flex items-center gap-1">
            <span>github.com/atlesque/among-us-detective</span>
            <span>↗</span>
          </a>
        </p>

        <p class="text-[11px] text-gray-500 italic">
          {{ t('about.donateNotice') }}
        </p>

        <div class="pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span class="text-gray-500 text-[11px] leading-tight">
            {{ t('disclaimer.trademark') }}
          </span>

          <!-- Bottom Button: View Original Disclaimer from Atlesque (No duplicate return to board) -->
          <button
            type="button"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-800 hover:bg-gray-700 text-blue-400 hover:text-blue-300 border border-gray-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            data-test="toggle-original-disclaimer-btn"
            @click="isOriginalVisible = !isOriginalVisible"
          >
            <AppIcon :name="isOriginalVisible ? 'chevron-up' : 'chevron-down'" class="w-3.5 h-3.5 shrink-0" />
            <span>{{ isOriginalVisible ? t('disclaimer.hideOriginal') : t('disclaimer.viewOriginal') }}</span>
          </button>
        </div>

        <!-- Collapsible Original Disclaimer from Alexandre Atlesque -->
        <div
          v-show="isOriginalVisible"
          class="mt-4 p-5 rounded-xl bg-gray-900 border border-blue-500/40 text-xs text-gray-300 space-y-3 shadow-inner"
          data-test="original-disclaimer-content"
        >
          <div class="flex items-center justify-between pb-2 border-b border-gray-800">
            <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <AppIcon name="file" class="w-4 h-4 shrink-0" />
              <span>{{ t('disclaimer.originalHeader') }}</span>
            </div>
            <span class="text-[10px] text-gray-500 uppercase tracking-wider font-mono">{{ t('disclaimer.archivedOriginal') }}</span>
          </div>

          <p class="text-[11px] text-gray-400 italic">{{ originalLetter.notice }}</p>
          <p class="italic text-gray-400">
            {{ originalLetter.greeting }}
          </p>
          <p v-for="(paragraph, index) in originalLetter.paragraphsBeforeContact" :key="index">
            {{ paragraph }}
          </p>
          <p>
            {{ originalLetter.contactPrefix }}
            <a href="mailto:alexander@atlesque.com" class="text-blue-400 hover:underline">alexander@atlesque.com</a>
            {{ originalLetter.contactSuffix }}
          </p>
          <p>{{ originalLetter.closingParagraph }}</p>
          <p>{{ originalLetter.signOff }}</p>
          <p><strong>{{ originalLetter.signature }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { originalLetterTranslations } from '~/utils/originalLetterTranslations'

const { t, locale } = useI18n()
const originalLetter = computed(() => originalLetterTranslations[locale.value])
const isOriginalVisible = ref(false)

useHead(() => ({
  title: t('disclaimer.title'),
  meta: [
    {
      name: 'description',
      content: t('disclaimer.metaDescription'),
    }
  ]
}))
</script>
