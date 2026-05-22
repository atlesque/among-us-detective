<template>
  <section class="relative map-player-tracker">
    <button
      v-if="activeCrewMembers.length > 0"
      class="absolute right-0 button-sm"
      @click="resetPositions"
    >
      Reset positions
    </button>
    <div class="container">
      <template v-for="(item, index) in moveableItems" :key="item.member.color">
        <div
          :ref="(el) => setTargetRef(el, item.member.color)"
          class="inline-flex moveable-target"
        >
          <CrewIcon
            :color="item.member.color"
            :show-color-name="showColorNames"
            :show-player-name="showPlayerNames"
            :is-imposter="item.member.isImposter"
            :is-player="item.member.isPlayer"
            :is-dead="item.member.isDead"
            :player-name="item.member.playerName"
            class="inline-flex map-player-tracker--crew-icon"
          />
        </div>
        <Moveable
          v-if="item.target"
          :key="`${item.member.color}-moveable`"
          :target="item.target"
          v-bind="moveableOptions"
          @drag="handleDrag"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import Moveable from "vue3-moveable";

const crewStore = useCrewStore();
const settingsStore = useSettingsStore();
const { activeCrewMembers } = storeToRefs(crewStore);
const { showColorNames, showPlayerNames } = storeToRefs(settingsStore);

const targetRefs = ref<Record<string, HTMLElement | null>>({});

const moveableItems = computed(() =>
  activeCrewMembers.value.map((member, index) => ({
    member,
    target: targetRefs.value[member.color] ?? null,
  }))
);

const moveableOptions = { draggable: true };

const setTargetRef = (
  el: Element | { $el?: Element } | null,
  color: string
) => {
  const element = el instanceof Element ? el : el?.$el;
  targetRefs.value[color] = element instanceof HTMLElement ? element : null;
};

const handleDrag = ({
  target,
  transform,
}: {
  target: HTMLElement | SVGElement;
  transform: string;
}) => {
  target.style.transform = transform;
};

const resetPositions = () => {
  Object.values(targetRefs.value).forEach((target) => {
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
  filter: drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)
    drop-shadow(0 0 1px white) drop-shadow(0 0 1px white);
}
</style>
