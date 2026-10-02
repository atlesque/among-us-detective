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
          <a href="https://github.com/marcosbinder/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-[11px] text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 underline ml-1" :title="t('disclaimer.viewGithubFork')">({{ t('disclaimer.viewForkLink') }})</a>.
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

        <div class="pt-4 border-t border-gray-200 dark:border-gray-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span class="text-gray-500 text-[11px] leading-tight">
            {{ t('disclaimer.trademark') }}
          </span>

          <!-- Bottom Button: View Original Disclaimer from Atlesque (No duplicate return to board) -->
          <button
            type="button"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-gray-300 dark:border-gray-700 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
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
          class="mt-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-blue-400/40 dark:border-blue-500/40 text-xs text-gray-700 dark:text-gray-300 space-y-3 shadow-inner"
          data-test="original-disclaimer-content"
        >
          <div class="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <AppIcon name="file" class="w-4 h-4 shrink-0" />
              <span>{{ t('disclaimer.originalHeader') }}</span>
            </div>
            <span class="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Archived (2020)</span>
          </div>

          <p class="italic text-gray-500 dark:text-gray-400">
            Hi, I'm Alex, also known as Atlesque.
          </p>
          <p>
            Thank you for using this tool. I initially made it to help myself remember things while playing, but decided to release it for free so other people could enjoy it.
          </p>
          <p>
            There has been some controversy about whether this tool is a hack or a way of cheating.
          </p>
          <p>
            Let me start by sincerely apologizing for giving you the wrong impression: I never intended to create anything that would ruin the game for anyone. After all, Among Us is a fantastic game that deserves great players like yourself!
          </p>
          <p>
            But I do understand why you might think this gives you an unfair advantage. The fact is: this <i>is</i> an external tool that let's you do things the game does not normally permit, like taking notes. So yes, it <i>does</i> get awfully close to cheat territory!
          </p>
          <p>
            However, from a technical point of view, this tool does not alter anything in the game. Unlike a hack which modifies the game client or a glitch which abuses the game's mechanics, this tool only allows you to keep track of things you've seen during your game. Therefore it is completely safe, legal and will <b>not</b> get you banned.
          </p>
          <p>
            In fact, it is nothing more than a "smart" notepad. You could also use pen and paper, or Excel, to create the exact same thing.
          </p>
          <p>
            Does it spoil the fun for others? Let's consider: Does it really matter that you are confident in who/what you saw, if your crew doesn't believe you?
          </p>
          <p>
            The biggest challenge of this game is not memorizing things, but convincing others you are right. If your crew doesn't believe you, it doesn't matter if you have perfect memory, no one will vote with you. And unfortunately, there is no tool for convincing people yet 🙂
          </p>
          <p>
            For people like me that have a bad visual memory or are just starting out, this tool has proven to be quite a helpful little aid. For us, this tool has brought back the fun to this game by giving us more confidence in what we see and being able to focus more on other gameplay mechanics.
          </p>
          <p>
            If you're still convinced this tool is in violation of any rules, policies or legal agreements, please don't hesitate to get in touch with me through email: <a href="mailto:alexander@atlesque.com" class="text-blue-600 dark:text-blue-400 hover:underline">alexander@atlesque.com</a>. I promise I will take any inquiry seriously and take appropriate action if necessary.
          </p>
          <p>
            For everyone else, I really hope you enjoy this tool and the game, and if you have any feedback or suggestions, you're always most welcome to get in touch! A lot of feature suggestions have come from users like yourself, and I heartily appreciate it.
          </p>
          <p>With metta,</p>
          <p><strong>-Alex</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const isOriginalVisible = ref(false)

useHead({
  title: computed(() => t('disclaimer.title')),
  meta: [
    {
      name: 'description',
      content: 'Official fair-play disclaimer and Innersloth companion tool compliance notice for Among Us Detective.'
    }
  ]
})
</script>
