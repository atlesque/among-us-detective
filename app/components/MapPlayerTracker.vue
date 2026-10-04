<template>
  <section
    ref="mapOverlay"
    class="map-player-tracker"
    data-test="map-player-tracker"
    :data-map-id="mapId"
  >
    <div class="map-player-tracker__toolbar flex justify-start items-start gap-2">
      <div
        v-if="roundsStore.isViewingHistory"
        class="text-xs text-amber-500 font-semibold flex items-center gap-1"
      >
        <AppIcon name="clock" class="w-3.5 h-3.5 shrink-0" />
        <span>{{ t('map.snapshotReadOnly', { round: roundsStore.viewingRoundNumber || 1 }) }}</span>
      </div>
      <template v-if="trackedCrewMembers.length > 0 && !roundsStore.isViewingHistory">
        <button
          class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700/60 transition-colors flex items-center gap-1 shadow-sm cursor-pointer disabled:cursor-default disabled:hover:bg-gray-800/90 disabled:hover:text-gray-200"
          data-test="reset-map-positions-btn"
          :disabled="isResetConfirmOpen"
          @click="isResetConfirmOpen = true"
        >
          <AppIcon name="refresh" class="w-3 h-3 shrink-0" />
          <span>{{ t('map.resetPositions') }}</span>
        </button>
        <template v-if="isResetConfirmOpen">
          <button
            class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
            data-test="reset-map-positions-confirm-btn"
            @click="confirmResetPositions"
          >
            {{ t('map.resetPositionsConfirmAction') }}
          </button>
          <button
            class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700/60 transition-colors shadow-sm cursor-pointer"
            data-test="reset-map-positions-cancel-btn"
            @click="isResetConfirmOpen = false"
          >
            {{ t('map.resetPositionsConfirmCancel') }}
          </button>
        </template>
      </template>
    </div>

    <template v-for="item in moveableItems" :key="item.member.color">
      <div
        :ref="getTargetRefCallback(item.member.color)"
        class="moveable-target"
        :style="getPositionStyle(item.member.color, item.index)"
        :data-position-x="getMemberPosition(item.member.color, item.index).x"
        :data-position-y="getMemberPosition(item.member.color, item.index).y"
        :data-test="`map-player-${item.member.color}`"
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
        :ref="getMoveableRefCallback(item.member.color)"
        v-bind="moveableOptions"
        @drag="handleDrag"
        @dragEnd="handleDragEnd"
      />
    </template>

  </section>
</template>

<script setup lang="ts">
import Moveable from "vue3-moveable";
import type { MapCoordinate, RoundSnapshot } from "~/stores/rounds";

const props = defineProps<{ mapId: string }>();

const crewStore = useCrewStore();
const roundsStore = useRoundsStore();
const settingsStore = useSettingsStore();
const { t } = useI18n();
const { highlightColorNames, showPlayerNames, showMapColorNames } = storeToRefs(settingsStore);

const mapOverlay = ref<HTMLElement | null>(null);
const mapSize = ref({ width: 0, height: 0 });
const targetRefs = ref<Record<string, HTMLElement | null>>({});
type MoveableHandle = { getManager?: () => unknown; updateRect?: () => void };
const moveableHandles = new Map<string, MoveableHandle>();
const targetRefCallbacks = new Map<string, (el: Element | { $el?: Element } | null) => void>();
const moveableRefCallbacks = new Map<string, (instance: unknown) => void>();
let resizeObserver: ResizeObserver | null = null;

// Active players shown on the movement map.
// Note: canTrackOwnColor applies here to the map pins so you can hide your own token if you want.
// On the main deduction board, your card stays visible with the ME badge so you can track roles and tasks.
// Also hides players who died in rounds prior to the currently displayed round.
const trackedCrewMembers = computed(() => {
  if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
    const snap = roundsStore.activeSnapshot;
    return snap.crewMembers.filter(
      (member) => member.isActive && (!member.isDead || member.diedInRound === snap.roundNumber) && (settingsStore.canTrackOwnColor || !member.isPlayer)
    );
  }
  return crewStore.activeCrewMembers.filter(
    (member) => (!member.isDead || (member.diedInRound != null && member.diedInRound === roundsStore.currentRoundNumber)) && (settingsStore.canTrackOwnColor || !member.isPlayer)
  );
});

const moveableItems = computed(() =>
  trackedCrewMembers.value.map((member, index) => ({
    member,
    index,
    target: targetRefs.value[member.color] ?? null,
  }))
);

const moveableOptions = { draggable: true };

function asCoordinate(value: unknown): MapCoordinate | null {
  if (!value || typeof value !== "object") return null;
  const point = value as Partial<MapCoordinate>;
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;

  return {
    x: Math.min(1, Math.max(0, point.x as number)),
    y: Math.min(1, Math.max(0, point.y as number)),
  };
}

function defaultPosition(index: number): MapCoordinate {
  const columns = 6;
  return {
    x: 0.035 + (index % columns) * 0.145,
    y: 0.085 + Math.floor(index / columns) * 0.085,
  };
}

function getMemberPosition(color: string, index: number): MapCoordinate {
  if (roundsStore.isViewingHistory) {
    const snapshot = roundsStore.activeSnapshot as RoundSnapshot | null;
    if (snapshot?.mapId === props.mapId) {
      const snapshotPosition = asCoordinate(snapshot.mapPositions?.[color]);
      if (snapshotPosition) return snapshotPosition;
    }
  } else {
    const currentPosition = asCoordinate(roundsStore.getMapPositions(props.mapId)[color]);
    if (currentPosition) return currentPosition;
  }

  return defaultPosition(index);
}

function getPositionStyle(color: string, index: number) {
  const position = getMemberPosition(color, index);
  return {
    transform: `translate(${position.x * mapSize.value.width}px, ${position.y * mapSize.value.height}px)`,
  };
}

function updateMapSize() {
  const rect = mapOverlay.value?.getBoundingClientRect();
  if (!rect) return;
  mapSize.value = { width: rect.width, height: rect.height };
}

function applyAllTransforms() {
  nextTick(() => {
    updateMapSize();
    moveableItems.value.forEach((item) => {
      const target = targetRefs.value[item.member.color];
      if (target) {
        target.style.transform = getPositionStyle(item.member.color, item.index).transform;
        moveableHandles.get(item.member.color)?.updateRect?.();
      }
    });
  });
}

watch(
  [
    () => props.mapId,
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
    if (!activeColors.has(color)) delete targetRefs.value[color];
  });
  applyAllTransforms();
});

const setTargetRef = (el: Element | { $el?: Element } | null, color: string) => {
  const element = el instanceof Element ? el : el?.$el;
  const target = element instanceof HTMLElement ? element : null;
  targetRefs.value[color] = target;
  if (!target) moveableHandles.get(color)?.updateRect?.();
};

function getTargetRefCallback(color: string) {
  let callback = targetRefCallbacks.get(color);
  if (!callback) {
    callback = (element) => setTargetRef(element, color);
    targetRefCallbacks.set(color, callback);
  }
  return callback;
}

function setMoveableRef(instance: unknown, color: string) {
  if (!instance || typeof instance !== "object") {
    moveableHandles.delete(color);
    targetRefs.value[color]?.removeAttribute("data-moveable-ready");
    return;
  }

  const handle = instance as MoveableHandle;
  if (moveableHandles.get(color) === handle) return;
  moveableHandles.set(color, handle);

  nextTick(() => {
    if (moveableHandles.get(color) !== handle) return;
    if (!handle.getManager?.()) return;
    handle.updateRect?.();
    targetRefs.value[color]?.setAttribute("data-moveable-ready", "true");
  });
}

function getMoveableRefCallback(color: string) {
  let callback = moveableRefCallbacks.get(color);
  if (!callback) {
    callback = (instance) => setMoveableRef(instance, color);
    moveableRefCallbacks.set(color, callback);
  }
  return callback;
}

function getTranslation(transform: string): { x: number; y: number } | null {
  try {
    const matrix = new DOMMatrix(transform);
    return { x: matrix.e, y: matrix.f };
  } catch {
    const match = transform.match(/translate(?:3d)?\(\s*(-?[\d.]+)px\s*,\s*(-?[\d.]+)px/);
    if (!match) return null;
    return { x: Number(match[1]), y: Number(match[2]) };
  }
}

const handleDrag = ({ target, transform }: { target: HTMLElement | SVGElement; transform: string }) => {
  if (roundsStore.isViewingHistory || mapSize.value.width <= 0 || mapSize.value.height <= 0) return;
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
    const translation = getTranslation((target as HTMLElement).style.transform || "");
    if (translation && mapSize.value.width > 0 && mapSize.value.height > 0) {
      roundsStore.setMapPosition(props.mapId, color, {
        x: translation.x / mapSize.value.width,
        y: translation.y / mapSize.value.height,
      });
    }
  }
};

const isResetConfirmOpen = ref(false);

const resetPositions = () => {
  if (roundsStore.isViewingHistory) return;
  roundsStore.clearMapPositions(props.mapId);
  applyAllTransforms();
};

const confirmResetPositions = () => {
  isResetConfirmOpen.value = false;
  resetPositions();
};

onMounted(() => {
  updateMapSize();
  if (typeof ResizeObserver !== "undefined" && mapOverlay.value) {
    resizeObserver = new ResizeObserver(() => {
      updateMapSize();
      applyAllTransforms();
    });
    resizeObserver.observe(mapOverlay.value);
  }
  window.addEventListener("resize", updateMapSize);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateMapSize);
});
</script>

<style lang="scss">
.map-player-tracker {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}

.map-player-tracker__toolbar {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  pointer-events: none;
}

.map-player-tracker__toolbar > * {
  pointer-events: auto;
}

.moveable-target {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  touch-action: none;
  cursor: grab;
}

.moveable-target:active {
  cursor: grabbing;
}

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
