<template>
  <section class="relative map-player-tracker">
    <button
      v-if="activeCrewMembers.length > 0"
      @click="resetPositions"
      class="absolute right-0 button-sm"
    >
      Reset positions
    </button>
    <div class="container">
      <Moveable
        v-for="(member, index) in activeCrewMembers"
        :key="index"
        :ref="`crew-member-${index}`"
        v-bind="moveable"
        @drag="handleDrag"
        class="inline-flex moveable"
      >
        <CrewIcon
          :color="member.color"
          :showColorName="showColorNames === true"
          :showPlayerName="showPlayerNames === true"
          :is-imposter="member.isImposter"
          :is-player="member.isPlayer"
          :player-name="member.playerName"
          class="inline-flex map-player-tracker--crew-icon"
        />
      </Moveable>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Moveable from "vue-moveable";
const CrewIcon = () => import("@/components/CrewIcon.vue");

export default {
  name: "MapPlayerTracker",
  components: {
    Moveable,
    CrewIcon,
  },
  data() {
    return {
      moveable: {
        draggable: true,
      },
    };
  },
  computed: {
    ...mapGetters("crew", ["activeCrewMembers"]),
    ...mapState("settings", ["showColorNames", "showPlayerNames"]),
  },
  methods: {
    handleDrag({ target, transform }) {
      target.style.transform = transform;
      // target.style.zIndex = "auto"; // TODO: Set last dragged element on top
    },
    resetPositions() {
      // eslint-disable-next-line no-unused-vars
      Object.keys(this.$refs).forEach(refKey => {
        const crewIconReference = this.$refs[refKey][0];
        if (crewIconReference != null) {
          crewIconReference.$el.style.transform = "";
        }
      });
    },
  },
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
</style>
