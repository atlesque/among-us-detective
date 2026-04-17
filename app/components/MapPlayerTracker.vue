<template>
  <section class="relative map-player-tracker">
    <button
      v-if="activeCrewMembers.length > 0"
      class="absolute right-0 button-sm"
      @click="resetPositions"
    >
      Reset positions
    </button>
    <div ref="containerEl" class="container">
      <Moveable
        v-for="(member, index) in activeCrewMembers"
        :key="member.color"
        :ref="(el: any) => setMoveableRef(el, index)"
        v-bind="moveableOptions"
        class="inline-flex moveable"
        @drag="handleDrag"
      >
        <CrewIcon
          :color="member.color"
          :show-color-name="showColorNames"
          :show-player-name="showPlayerNames"
          :is-imposter="member.isImposter"
          :is-player="member.isPlayer"
          :is-dead="member.isDead"
          :player-name="member.playerName"
          class="inline-flex map-player-tracker--crew-icon"
        />
      </Moveable>
    </div>
  </section>
</template>

<script setup lang="ts">
import Moveable from 'vue3-moveable'

const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const { activeCrewMembers } = storeToRefs(crewStore)
const { showColorNames, showPlayerNames } = storeToRefs(settingsStore)

const containerEl = ref<HTMLElement | null>(null)
const moveableRefs: any[] = []

const moveableOptions = { draggable: true }

function setMoveableRef(el: any, index: number) {
  moveableRefs[index] = el
}

onBeforeUpdate(() => {
  moveableRefs.length = 0
})

function handleDrag({ target, transform }: { target: HTMLElement; transform: string }) {
  target.style.transform = transform
}

function resetPositions() {
  moveableRefs.forEach(ref => {
    if (ref?.$el) {
      ref.$el.style.transform = ''
    }
  })
}
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
