<template>
  <div class="min-h-screen bg-slate-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Back Link with Left Arrow -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-8 shadow-sm"
        data-test="back-to-board-top"
      >
        <AppIcon name="arrow-left" class="w-4 h-4 shrink-0 text-blue-500 dark:text-blue-400" />
        <span>{{ t('disclaimer.back') }}</span>
      </NuxtLink>

      <!-- Hero Header -->
      <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-xl mb-8">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
            <AppIcon name="check" class="w-3.5 h-3.5 stroke-[3]" />
            {{ t('disclaimer.safeLegalBadge') }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30">
            {{ t('disclaimer.zeroInjectionBadge') }}
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-3">
          {{ t('disclaimer.heroTitle') }}
        </h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('disclaimer.heroSubtitle') }}
        </p>
      </div>

      <!-- Core Safeguards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <!-- Card 1: Zero Memory Reading -->
        <div class="p-5 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center mb-3">
            <AppIcon name="shield" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-1.5">{{ t('disclaimer.zeroMemoryTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('disclaimer.zeroMemoryDesc') }}
          </p>
        </div>

        <!-- Card 2: 100% Ban-Proof & Legal -->
        <div class="p-5 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3">
            <AppIcon name="check" class="w-5 h-5 stroke-[3]" />
          </div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-1.5">{{ t('disclaimer.antiCheatTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('disclaimer.antiCheatDesc') }}
          </p>
        </div>

        <!-- Card 3: Human Deduction -->
        <div class="p-5 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
            <AppIcon name="lightbulb" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-1.5">{{ t('disclaimer.socialSkillTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('disclaimer.socialSkillDesc') }}
          </p>
        </div>

        <!-- Card 4: Accessibility Aid -->
        <div class="p-5 rounded-xl bg-white/90 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-md">
          <div class="w-9 h-9 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-3">
            <AppIcon name="notes" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-1.5">{{ t('disclaimer.cognitiveAidTitle') }}</h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t('disclaimer.cognitiveAidDesc') }}
          </p>
        </div>
      </div>

      <!-- Innersloth Compliance Statement -->
      <div class="p-6 rounded-xl bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 mb-8 space-y-3 shadow-md">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <AppIcon name="file" class="w-4 h-4 text-blue-500 dark:text-blue-400" />
          <span>{{ t('disclaimer.innerslothTitle') }}</span>
        </h2>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('disclaimer.innerslothDesc1') }}
        </p>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ t('disclaimer.innerslothDesc2') }}
        </p>
      </div>

      <!-- Creator Credits & Inquiries -->
      <div class="p-6 rounded-xl bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400 space-y-3 shadow-sm">
        <p class="leading-relaxed">
          {{ t('disclaimer.creditsOriginal') }}
          <a href="https://github.com/atlesque/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-bold">
            Alexandre Atlesque
          </a>.
          {{ t('disclaimer.creditsModernized') }}
          <a href="mailto:mrbbinder@gmail.com" class="text-emerald-600 dark:text-emerald-400 hover:underline font-bold">
            Marcos Binder
          </a> (<a href="mailto:mrbbinder@gmail.com" class="text-emerald-600 dark:text-emerald-400 hover:underline">mrbbinder@gmail.com</a>)
          <a href="https://github.com/marcosbinder/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-[11px] text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 underline ml-1" :title="t('disclaimer.forkLinkTitle')">{{ t('disclaimer.forkLinkLabel') }}</a>.
        </p>

        <p class="leading-relaxed">
          {{ t('disclaimer.githubRepoNotice') }}
          <a href="https://github.com/atlesque/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-bold inline-flex items-center gap-1">
            <span>github.com/atlesque/among-us-detective</span>
            <span>↗</span>
          </a>
        </p>

        <p class="text-[11px] text-gray-500 italic">
          {{ t('about.donateNotice') }}
        </p>

        <div class="pt-4 border-t border-gray-200 dark:border-gray-800/80">
          <span class="text-gray-500 text-[11px] leading-tight">
            {{ t('disclaimer.trademark') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

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
