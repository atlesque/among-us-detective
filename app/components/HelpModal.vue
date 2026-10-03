<template>
  <div class="flex">
    <Modal max-width="700px" @close="emit('close')">
      <template #title>
        <div class="flex items-center gap-2">
          <AppIcon name="help" class="w-5 h-5 text-blue-500 shrink-0" />
          <span>{{ t('help.title') }}</span>
        </div>
      </template>

      <template #body>
        <!-- Modern Segmented Tab Navigation (No native scrollbars & No ellipsis truncation!) -->
        <div class="mt-1 sm:mt-2 p-1 sm:p-1.5 bg-gray-100/90 dark:bg-gray-800/80 rounded-xl mb-4 border border-gray-200/80 dark:border-gray-700/60 flex items-center justify-between gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            v-for="(tab, idx) in tabs"
            :key="tab.id"
            type="button"
            class="flex-1 min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 sm:shrink select-none cursor-pointer"
            :class="currentStep === idx
              ? 'bg-blue-600 text-white shadow-sm scale-[1.01]'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-700/50'"
            :data-test="`help-tab-${tab.id}`"
            @click="currentStep = idx"
          >
            <AppIcon :name="tab.icon" class="w-3.5 h-3.5 shrink-0" />
            <span class="whitespace-nowrap font-bold">{{ tab.label }}</span>
          </button>
        </div>

        <!-- TAB 1: Match Setup & Lobby Roster -->
        <div v-if="currentStep === 0" class="space-y-3.5 text-xs leading-relaxed text-gray-700 dark:text-gray-300" data-test="help-view-setup">
          <div class="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
            <h3 class="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1.5">
              <AppIcon name="users" class="w-4 h-4 text-blue-500" />
              <span>{{ t('help.setupTitle') }}</span>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              {{ t('help.setupDesc') }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
                <span class="p-1 rounded bg-blue-500/10 border border-blue-500/20">
                  <AppIcon name="users" class="w-3.5 h-3.5 text-blue-500" />
                </span>
                <span>{{ t('help.setupRosterTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.setupRosterDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <span class="p-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <AppIcon name="refresh" class="w-3.5 h-3.5 text-amber-500" />
                </span>
                <span>{{ t('help.setupPresetsTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.setupPresetsDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold text-xs">
                <span class="p-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <AppIcon name="star" class="w-3.5 h-3.5 text-yellow-500" />
                </span>
                <span>{{ t('help.setupMeTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.setupMeDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <span class="p-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <AppIcon name="file" class="w-3.5 h-3.5 text-emerald-500" />
                </span>
                <span>{{ t('help.setupNamesTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.setupNamesDesc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- TAB 2: Meeting Rounds & Timeline Snapshots -->
        <div v-if="currentStep === 1" class="space-y-3.5 text-xs leading-relaxed text-gray-700 dark:text-gray-300" data-test="help-view-rounds">
          <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <h3 class="text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1 flex items-center gap-1.5">
              <AppIcon name="clock" class="w-4 h-4 text-emerald-500" />
              <span>{{ t('help.roundsTitle') }}</span>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              {{ t('help.roundsDesc') }}
            </p>
          </div>

          <div class="space-y-3">
            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <span class="p-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <AppIcon name="bell" class="w-3.5 h-3.5 text-emerald-500" />
                </span>
                <span>{{ t('help.roundsNextTitle') }}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ t('help.roundsNextDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <span class="p-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <AppIcon name="refresh" class="w-3.5 h-3.5 text-amber-500" />
                </span>
                <span>{{ t('help.roundsNewMatchTitle') }}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ t('help.roundsNewMatchDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                <span class="p-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <AppIcon name="clock" class="w-3.5 h-3.5 text-indigo-500" />
                </span>
                <span>{{ t('help.roundsTimelineTitle') }}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ t('help.roundsTimelineDesc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- TAB 3: Deduction Board & Roles -->
        <div v-if="currentStep === 2" class="space-y-3.5 text-xs leading-relaxed text-gray-700 dark:text-gray-300" data-test="help-view-board">
          <div class="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50">
            <h3 class="text-sm font-bold text-purple-900 dark:text-purple-200 mb-1 flex items-center gap-1.5">
              <AppIcon name="shield" class="w-4 h-4 text-purple-500" />
              <span>{{ t('help.boardTitle') }}</span>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              {{ t('help.boardDesc') }}
            </p>
          </div>

          <!-- 6 Deduction Columns with Icons on Every Single Column -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <!-- Hard Clear -->
            <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2 shadow-xs">
              <div class="p-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <AppIcon name="check" class="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 block text-xs">{{ t('col.hardClear') }}</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 leading-snug block">{{ t('help.boardColHardClear') }}</span>
              </div>
            </div>

            <!-- Trusted -->
            <div class="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-2 shadow-xs">
              <div class="p-1 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
                <AppIcon name="shield" class="w-3.5 h-3.5" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <span class="font-bold text-teal-600 dark:text-teal-400 block text-xs">{{ t('col.trusted') }}</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 leading-snug block">{{ t('help.boardColTrusted') }}</span>
              </div>
            </div>

            <!-- Unknown -->
            <div class="p-2.5 rounded-xl bg-gray-500/10 border border-gray-500/30 flex items-start gap-2 shadow-xs">
              <div class="p-1 rounded bg-gray-500/20 text-gray-600 dark:text-gray-300 shrink-0 mt-0.5">
                <AppIcon name="help" class="w-3.5 h-3.5" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <span class="font-bold text-gray-700 dark:text-gray-300 block text-xs">{{ t('col.unknown') }}</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 leading-snug block">{{ t('help.boardColUnknown') }}</span>
              </div>
            </div>

            <!-- Suspicious -->
            <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 shadow-xs">
              <div class="p-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                <AppIcon name="alert" class="w-3.5 h-3.5" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <span class="font-bold text-amber-600 dark:text-amber-400 block text-xs">{{ t('col.suspicious') }}</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 leading-snug block">{{ t('help.boardColSuspicious') }}</span>
              </div>
            </div>

            <!-- Impostor -->
            <div class="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 shadow-xs">
              <div class="p-1 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                <AppIcon name="skull" class="w-3.5 h-3.5" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <span class="font-bold text-rose-600 dark:text-rose-400 block text-xs">{{ t('col.impostor') }}</span>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 leading-snug block">{{ t('help.boardColImpostor') }}</span>
              </div>
            </div>

            <!-- Dead -->
            <div class="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-700/80 flex items-start gap-2 shadow-xs">
              <div class="p-1 rounded bg-red-950/60 text-red-400 shrink-0 mt-0.5">
                <AppIcon name="dead" class="w-3.5 h-3.5" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <span class="font-bold text-red-400 block text-xs">{{ t('col.dead') }}</span>
                <span class="text-[10px] text-gray-400 leading-snug block">{{ t('help.boardColDead') }}</span>
              </div>
            </div>
          </div>

          <!-- Roles Card — Crystal Clear with Visual Status Badges and Supported Roles -->
          <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-3 shadow-xs">
            <div class="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold text-xs">
              <AppIcon name="users" class="w-4 h-4 text-purple-500 shrink-0" />
              <span>{{ t('help.rolesTitle') }}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              {{ t('help.rolesDesc') }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1">
                <div class="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 text-xs">
                  <span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold">?</span>
                  <span>{{ t('help.rolesClaimedTitle') }}</span>
                </div>
                <p class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {{ t('help.rolesClaimedDesc') }}
                </p>
              </div>

              <div class="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <div class="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                  <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">✓</span>
                  <span>{{ t('help.rolesVerifiedTitle') }}</span>
                </div>
                <p class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {{ t('help.rolesVerifiedDesc') }}
                </p>
              </div>
            </div>

            <!-- Supported Roles Badges -->
            <div class="pt-2 border-t border-gray-200 dark:border-gray-700/60 space-y-1.5">
              <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                {{ t('help.rolesSpecialBadges') }}
              </span>
              <div class="flex flex-wrap gap-1.5 text-[11px]">
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">🔍 {{ t('role.detective') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">🧪 {{ t('role.scientist') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">🔧 {{ t('role.engineer') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">🔔 {{ t('role.noisemaker') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">📍 {{ t('role.tracker') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium">⚖️ {{ t('role.judge') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-medium">👤 {{ t('role.shapeshifter') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-medium">👻 {{ t('role.phantom') }}</span>
                <span class="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-medium">🐍 {{ t('role.viper') }}</span>
              </div>
            </div>

            <!-- In-Card Tasks & Meetings notice -->
            <div class="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300">
              <AppIcon name="tasks" class="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{{ t('help.rolesTasksAndMeetings') }}</span>
            </div>
          </div>

          <!-- Mobile Controls Notice -->
          <div class="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-2.5">
            <div class="p-1 rounded bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
              <AppIcon name="pin" class="w-4 h-4 text-blue-500" />
            </div>
            <div class="space-y-0.5">
              <strong class="text-blue-900 dark:text-blue-200 font-bold block text-xs">{{ t('help.boardMobileTouchTitle') }}</strong>
              <p class="text-blue-800/90 dark:text-blue-300 text-xs leading-relaxed">{{ t('help.boardMobileTouchDesc') }}</p>
            </div>
          </div>
        </div>

        <!-- TAB 4: Impostor Mode HUD -->
        <div v-if="currentStep === 3" class="space-y-3.5 text-xs leading-relaxed text-gray-700 dark:text-gray-300" data-test="help-view-impostor">
          <div class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
            <h3 class="text-sm font-bold text-rose-900 dark:text-rose-200 mb-1 flex items-center gap-1.5">
              <AppIcon name="skull" class="w-4 h-4 text-rose-500" />
              <span>{{ t('help.impostorTitle') }}</span>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              {{ t('help.impostorDesc') }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                <span class="p-1 rounded bg-rose-500/10 border border-rose-500/20">
                  <AppIcon name="skull" class="w-3.5 h-3.5 text-rose-500" />
                </span>
                <span>{{ t('help.impostorHudTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.impostorHudDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                <span class="p-1 rounded bg-rose-500/10 border border-rose-500/20">
                  <AppIcon name="target" class="w-3.5 h-3.5 text-rose-500" />
                </span>
                <span>{{ t('help.impostorFrameTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.impostorFrameDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
                <span class="p-1 rounded bg-purple-500/10 border border-purple-500/20">
                  <AppIcon name="users" class="w-3.5 h-3.5 text-purple-500" />
                </span>
                <span>{{ t('help.impostorFellowTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.impostorFellowDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <span class="p-1 rounded bg-emerald-500/20 border border-emerald-500/30">
                  <AppIcon name="tasks" class="w-3.5 h-3.5 text-emerald-500" />
                </span>
                <span>{{ t('help.impostorFakeTasksTitle') }}</span>
                <span class="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold uppercase ml-auto">
                  Guia Essencial
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.impostorFakeTasksDesc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- TAB 5: Maps, Voice Notes & Shortcuts -->
        <div v-if="currentStep === 4" class="space-y-3.5 text-xs leading-relaxed text-gray-700 dark:text-gray-300" data-test="help-view-tools">
          <div class="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
            <h3 class="text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-1.5">
              <AppIcon name="map" class="w-4 h-4 text-indigo-500" />
              <span>{{ t('help.toolsTitle') }}</span>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              {{ t('help.toolsDesc') }}
            </p>
          </div>

          <!-- 3 Tools Cards in a Balanced Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                <span class="p-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <AppIcon name="map" class="w-3.5 h-3.5 text-indigo-500" />
                </span>
                <span>{{ t('help.toolsMapTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.toolsMapDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                <span class="p-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                  <AppIcon name="shield" class="w-3.5 h-3.5 text-cyan-500" />
                </span>
                <span>{{ t('help.toolsSensorsTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.toolsSensorsDesc') }}
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-1.5 shadow-xs">
              <div class="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
                <span class="p-1 rounded bg-purple-500/10 border border-purple-500/20">
                  <AppIcon name="notes" class="w-3.5 h-3.5 text-purple-500" />
                </span>
                <span>{{ t('help.toolsNotepadTitle') }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {{ t('help.toolsNotepadDesc') }}
              </p>
            </div>
          </div>

          <!-- Shortcuts Panel Styled Like Deduction Badges -->
          <div class="p-3.5 rounded-xl bg-gray-50/90 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 space-y-2.5 shadow-xs">
            <div class="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold text-xs">
              <AppIcon name="file" class="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{{ t('help.shortcutsTitle') }}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700/60 shadow-xs">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ t('help.shortcutN') }}</span>
                <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-100 font-mono text-xs font-bold border border-gray-700 shadow-xs">N</kbd>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700/60 shadow-xs">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ t('help.shortcutM') }}</span>
                <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-100 font-mono text-xs font-bold border border-gray-700 shadow-xs">M</kbd>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700/60 shadow-xs">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ t('help.shortcutT') }}</span>
                <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-100 font-mono text-xs font-bold border border-gray-700 shadow-xs">T</kbd>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700/60 shadow-xs">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ t('help.shortcutI') }}</span>
                <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-100 font-mono text-xs font-bold border border-gray-700 shadow-xs">I</kbd>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700/60 shadow-xs">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ t('help.shortcutL') }}</span>
                <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-100 font-mono text-xs font-bold border border-gray-700 shadow-xs">L</kbd>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700/60 shadow-xs">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ t('help.shortcutEsc') }}</span>
                <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-100 font-mono text-xs font-bold border border-gray-700 shadow-xs">Esc</kbd>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Pagination Controls -->
        <div class="flex justify-between items-center mt-5 pt-3.5 border-t border-gray-200 dark:border-gray-800">
          <button
            class="px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer"
            :class="currentStep <= 0
              ? 'opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'"
            :disabled="currentStep <= 0"
            data-test="help-prev-btn"
            @click="currentStep--"
          >
            {{ t('help.prev') }}
          </button>

          <span
            class="text-xs font-bold text-gray-500 dark:text-gray-400"
            data-test="help-step-counter"
          >
            {{ currentStep + 1 }}/{{ tabs.length }}
          </span>

          <button
            v-show="currentStep < tabs.length - 1"
            class="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors cursor-pointer"
            :disabled="currentStep >= tabs.length - 1"
            data-test="help-next-btn"
            @click="currentStep++"
          >
            {{ t('help.next') }}
          </button>

          <button
            v-show="currentStep >= tabs.length - 1"
            class="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer"
            data-test="help-close-btn"
            @click="emit('close')"
          >
            {{ t('help.close') }}
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits<{ close: [] }>();
const { t } = useI18n();

const tabs = computed(() => [
  { id: 'setup', label: t('help.tabSetup'), icon: 'users' },
  { id: 'rounds', label: t('help.tabRounds'), icon: 'clock' },
  { id: 'board', label: t('help.tabBoard'), icon: 'shield' },
  { id: 'impostor', label: t('help.tabImpostor'), icon: 'skull' },
  { id: 'tools', label: t('help.tabTools'), icon: 'map' },
]);

const currentStep = ref(0);
</script>
