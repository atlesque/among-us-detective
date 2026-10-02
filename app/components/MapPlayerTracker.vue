<template>
  <section class="relative map-player-tracker">
    <div class="flex justify-between items-center mb-1">
      <div v-if="roundsStore.isViewingHistory" class="text-xs text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
        <AppIcon name="clock" class="w-3.5 h-3.5 shrink-0" />
        <span>{{ t('map.historySnapshotTitle', { round: roundsStore.viewingRoundNumber }) }}</span>
      </div>
      <div v-else />
      <button
        v-if="trackedCrewMembers.length > 0 && !roundsStore.isViewingHistory"
        class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60 transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
        @click="resetPositions"
      >
        <AppIcon name="refresh" class="w-3 h-3 shrink-0" />
        <span>{{ t('map.resetPositions') }}</span>
      </button>
    </div>
    <div class="container">
      <template v-for="item in moveableItems" :key="item.member.color">
        <div
          :ref="(el) => setTargetRef(el, item.member.color)"
          class="inline-flex moveable-target"
        >
          <CrewIcon
            :color="item.member.color"
            :show-color-name="showMapColorNames"
            :highlight-color-name="highlightColorNames"
            :show-player-name="showPlayerNames"
            :is-imposter="item.member.isImposter"
            :is-player="item.member.isPlayer"
            :is-dead="item.member.isDead"
            :player-name="item.member.playerName"
            class="inline-flex map-player-tracker--crew-icon"
          />
        </div>
        <Moveable
          v-if="item.target && !roundsStore.isViewingHistory"
          :key="`${item.member.color}-moveable`"
          :target="item.target"
          v-bind="moveableOptions"
          @drag="handleDrag"
          @dragEnd="handleDragEnd"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import Moveable from "vue3-moveable";

const crewStore = useCrewStore();
const roundsStore = useRoundsStore();
const settingsStore = useSettingsStore();
const { highlightColorNames, showPlayerNames, showMapColorNames } = storeToRefs(settingsStore);
const { t } = useI18n();

const targetRefs = ref<Record<string, HTMLElement | null>>({});

// Hide players who died in rounds prior to the currently displayed round
const trackedCrewMembers = computed(() => {
  if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
    const snap = roundsStore.activeSnapshot;
    return snap.crewMembers.filter(
      (m) => m.isActive && (!m.isDead || m.diedInRound === snap.roundNumber) && (settingsStore.canTrackOwnColor || !m.isPlayer)
    );
  }
  return crewStore.activeCrewMembers.filter(
    (m) => (!m.isDead || (m.diedInRound != null && m.diedInRound === roundsStore.currentRoundNumber)) && (settingsStore.canTrackOwnColor || !m.isPlayer)
  );
});

const moveableItems = computed(() =>
  trackedCrewMembers.value.map((member) => ({
    member,
    target: targetRefs.value[member.color] ?? null,
  }))
);

function getMemberTransform(color: string): string {
  if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
    return roundsStore.activeSnapshot.mapPositions?.[color] || "";
  }
  return roundsStore.currentMapPositions[color] || "";
}

function applyAllTransforms() {
  nextTick(() => {
    Object.keys(targetRefs.value).forEach((color) => {
      const el = targetRefs.value[color];
      if (el) {
        el.style.transform = getMemberTransform(color);
      }
    });
  });
}

watch(
  [
    () => roundsStore.viewingRoundNumber,
    () => roundsStore.currentRoundNumber,
    () => roundsStore.currentMapPositions,
  ],
  () => {
    applyAllTransforms();
  },
  { deep: true }
);

watch(trackedCrewMembers, (members) => {
  const activeColors = new Set(members.map((member) => member.color));

  Object.keys(targetRefs.value).forEach((color) => {
    if (!activeColors.has(color)) {
      delete targetRefs.value[color];
    }
  });
  applyAllTransforms();
});

const moveableOptions = { draggable: true };

const setTargetRef = (
  el: Element | { $el?: Element } | null,
  color: string
) => {
  const element = el instanceof Element ? el : el?.$el;
  const htmlEl = element instanceof HTMLElement ? element : null;
  targetRefs.value[color] = htmlEl;
  if (htmlEl) {
    htmlEl.style.transform = getMemberTransform(color);
  }
};

const handleDrag = ({
  target,
  transform,
}: {
  target: HTMLElement | SVGElement;
  transform: string;
}) => {
  if (roundsStore.isViewingHistory) return;
  target.style.transform = transform;
};

const handleDragEnd = ({
  target,
  isDrag,
}: {
  target: HTMLElement | SVGElement;
  isDrag?: boolean;
}) => {
  if (roundsStore.isViewingHistory) return;
  if (isDrag === false) return;
  const color = Object.keys(targetRefs.value).find(
    (c) => targetRefs.value[c] === target
  );
  if (color && target && "style" in target) {
    roundsStore.setMapPosition(color, (target as HTMLElement).style.transform || "");
  }
};

const resetPositions = () => {
  if (roundsStore.isViewingHistory) return;
  roundsStore.clearMapPositions();
  moveableItems.value.forEach((item) => {
    const target = item.target;
    if (target) {
      target.style.transform = "";
    }
  });
};
</script>

<style lang="scss">
.moveable-control-box {
  opacity: 0;
}
.map-player-tracker--crew-icon {
  width: 4vw;
  min-width: 2em;
  max-width: 2.5em;
}

.map-player-tracker--crew-icon > svg {
  filter: drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)
    drop-shadow(0 0 1px white) drop-shadow(0 0 1px white);
}
</style>
