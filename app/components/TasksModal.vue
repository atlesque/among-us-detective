<template>
  <div class="flex">
    <Modal max-width="700px" @close="emit('close')">
      <template #title>{{ t('tasks.title') }}</template>
      <template #body>
        <!-- Impostor Fake Tasks Alert Banner (when Impostor Mode is active) -->
        <div
          v-if="impostorStore.isImpostorModeActive"
          class="p-2.5 mb-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-900 dark:text-red-200 leading-relaxed shadow-sm"
        >
          <div class="flex items-center justify-between font-bold mb-1.5">
            <span class="flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400">
              <AppIcon name="flame" class="w-4 h-4 shrink-0" />
              <span>{{ t('tasks.impostorBannerTitle') }}</span>
            </span>
            <span class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 font-bold border border-red-500/30">
              {{ t('tasks.impostorBadge') }}
            </span>
          </div>
          <div class="space-y-1.5 text-[11px] opacity-90">
            <div class="flex items-start gap-1.5">
              <AppIcon name="alert" class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span class="font-semibold text-red-900 dark:text-red-200 mr-1">{{ t('tasks.neverFakeVisualBold') }}</span>
                <span>{{ t('tasks.neverFakeVisualDesc') }}</span>
              </div>
            </div>
            <div class="flex items-start gap-1.5">
              <AppIcon name="target" class="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span class="font-semibold text-red-900 dark:text-red-200 mr-1">{{ t('tasks.safeToFakeBold') }}</span>
                <span>{{ t('tasks.safeToFakeDesc') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Detective Tip Banner -->
        <div class="p-2.5 mb-3 rounded-lg bg-blue-500/10 border border-blue-500/25 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          <p class="font-bold mb-1.5 flex items-center gap-1.5 text-xs">
            <AppIcon name="lightbulb" class="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
            <span>{{ t('tasks.detectiveKnowledgeTitle') }}</span>
          </p>
          <div class="space-y-1.5 text-[11px] opacity-90">
            <div class="flex items-start gap-1.5">
              <AppIcon name="key" class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span class="font-semibold text-blue-900 dark:text-blue-200 mr-1">{{ t('tasks.commonTasksTitle') }}</span>
                <span>{{ t('tasks.commonTasksDesc') }}</span>
              </div>
            </div>
            <div class="flex items-start gap-1.5">
              <AppIcon name="eye" class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span class="font-semibold text-emerald-900 dark:text-emerald-200 mr-1">{{ t('tasks.visualTasksTitle') }}</span>
                <span>{{ t('tasks.visualTasksDesc') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls: MapSelector, Filter Pills, and Search -->
        <div class="space-y-2 mb-3">
          <!-- Maps Selector Row -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <MapSelector
              :selected-map="mapsStore.selectedMap"
              @map-selected="(map) => mapsStore.setSelectedMap(map)"
            />
          </div>

          <!-- Filter Pills Row -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <button
              v-for="filter in filterOptions"
              :key="filter.id"
              class="px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 border"
              :class="activeFilter === filter.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700'"
              @click="activeFilter = filter.id"
            >
              <AppIcon v-if="filter.icon" :name="filter.icon" class="w-3.5 h-3.5 shrink-0" />
              <span>{{ filter.label }}</span>
            </button>
          </div>

          <!-- Full-width Search Bar Row -->
          <div class="relative w-full">
            <AppIcon name="search" class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('tasks.searchPlaceholder')"
              class="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
            />
            <button
              v-if="searchQuery"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center justify-center p-0.5 rounded"
              @click="searchQuery = ''"
            >
              <AppIcon name="close" class="w-3 h-3" />
            </button>
          </div>
        </div>

        <!-- Tasks Table -->
        <div class="max-h-96 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700/60 shadow-inner">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="sticky top-0 bg-gray-100 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-10">
              <tr>
                <th class="p-2.5 font-bold text-gray-700 dark:text-gray-300">{{ t('tasks.colTaskName') }}</th>
                <th class="p-2.5 font-bold text-gray-700 dark:text-gray-300">{{ t('tasks.colRoomLocation') }}</th>
                <th class="p-2.5 font-bold text-gray-700 dark:text-gray-300">{{ t('tasks.colClassification') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900/50">
              <tr
                v-for="task in filteredTasks"
                :key="task.name"
                class="hover:bg-blue-50/40 dark:hover:bg-gray-800/60 transition-colors"
              >
                <td class="p-2.5 font-semibold text-gray-900 dark:text-gray-100">
                  {{ tTask(task.name) }}
                </td>
                <td class="p-2.5 text-gray-600 dark:text-gray-400">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="(loc, locIdx) in task.locations"
                      :key="locIdx"
                      class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      <AppIcon name="pin" class="w-3 h-3 text-red-500/80 shrink-0" />
                      <span>{{ tLocation(loc) }}</span>
                    </span>
                  </div>
                </td>
                <td class="p-2.5 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="(type, i) in task.types"
                      :key="i"
                      class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold rounded"
                      :class="getTaskBadgeStyle(type)"
                    >
                      <AppIcon v-if="getTaskTypeInfo(type).icon" :name="getTaskTypeInfo(type).icon" class="w-3 h-3 shrink-0" />
                      <span>{{ getTaskTypeInfo(type).label }}</span>
                    </span>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredTasks.length === 0">
                <td colspan="3" class="p-6 text-center text-gray-400 dark:text-gray-500">
                  {{ t('tasks.noTasksFound') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>();

const tasksStore = useTasksStore();
const mapsStore = useMapsStore();
const impostorStore = useImpostorStore();
const { t, tTask, tLocation } = useI18n();

const activeFilter = ref("all");
const searchQuery = ref("");

const filterOptions = computed(() => [
  { id: "all", label: t("tasks.filterAll"), icon: "" },
  { id: "visual", label: t("tasks.filterVisual"), icon: "eye" },
  { id: "common", label: t("tasks.filterCommon"), icon: "key" },
  { id: "short", label: t("tasks.filterShort"), icon: "zap" },
  { id: "long", label: t("tasks.filterLong"), icon: "timer" },
]);

const currentMapTasks = computed(() => {
  const list = tasksStore.tasks[mapsStore.selectedMap] ?? [];
  return list.map((task, originalIndex) => ({
    ...task,
    originalIndex,
  }));
});

const filteredTasks = computed(() => {
  return currentMapTasks.value.filter((task) => {
    if (
      activeFilter.value === "visual" &&
      !task.types.some((t) => t.toLowerCase().includes("visual"))
    ) {
      return false;
    }
    if (
      activeFilter.value === "common" &&
      !task.types.some((t) => t.toLowerCase().includes("common"))
    ) {
      return false;
    }
    if (
      activeFilter.value === "short" &&
      !task.types.some((t) => t.toLowerCase().includes("short"))
    ) {
      return false;
    }
    if (
      activeFilter.value === "long" &&
      !task.types.some((t) => t.toLowerCase().includes("long"))
    ) {
      return false;
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const localizedName = tTask(task.name).toLowerCase();
      const matchName = task.name.toLowerCase().includes(q) || localizedName.includes(q);
      const matchLocation = task.locations.some((loc) =>
        loc.toLowerCase().includes(q) || tLocation(loc).toLowerCase().includes(q)
      );
      return matchName || matchLocation;
    }

    return true;
  });
});

function getTaskBadgeStyle(type: string): string {
  if (type.includes("Visual")) {
    return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30";
  }
  if (type.includes("Common")) {
    return "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30";
  }
  if (type.includes("Long")) {
    return "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30";
  }
  if (type.includes("Short")) {
    return "bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30";
  }
  return "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
}

function getTaskTypeInfo(type: string): { label: string; icon: string } {
  if (type.includes("Visual")) return { label: t("tasks.typeVisual"), icon: "eye" };
  if (type.includes("Common")) return { label: t("tasks.typeCommon"), icon: "key" };
  if (type.includes("Long")) return { label: t("tasks.typeLong"), icon: "timer" };
  if (type.includes("Short")) return { label: t("tasks.typeShort"), icon: "zap" };
  return { label: type, icon: "" };
}
</script>
