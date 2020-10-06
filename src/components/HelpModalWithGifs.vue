<template>
  <Modal @close="closeModal">
    <template slot="title">How to use</template>
    <template slot="body">
      <div
        v-for="(step, index) in steps"
        :key="index"
        v-show="index === currentStep"
        class="mb-4 text-sm leading-5 text-theme-gray-dark"
      >
        <img
          v-if="step.media != null"
          :src="getMediaPath(step.media)"
          class="mx-auto mb-4"
        />
        <div v-html="step.description" class="py-4 text-center"></div>
      </div>
      <div class="flex justify-between">
        <button
          @click="currentStep--"
          class="button"
          :disabled="currentStep <= 0"
        >
          Previous
        </button>
        <span class="flex items-center justify-center text-theme-gray-light"
          >{{ currentStep + 1 }}/{{ steps.length }}</span
        >
        <button
          @click="currentStep++"
          class="button"
          :disabled="currentStep >= steps.length - 1"
          v-show="currentStep < steps.length - 1"
        >
          Next
        </button>
        <button
          @click="closeModal"
          class="button"
          v-show="currentStep >= steps.length - 1"
        >
          Close
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
const Modal = () => import("@/components/Modal.vue");

export default {
  name: "HelpModalWithGifs",
  components: {
    Modal,
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        {
          description: "Select your color by clicking on <b>Player</b>",
          media: "changing-player-color.gif",
        },
        {
          description: `
          Select which colors are active, either by:
          <ol class="pl-4 list-disc list-inside">
            <li>Dragging players from the pool to the <b>Unknown</b> column</li>
            <li>
              Or: clicking on grey arrow near the pool to move
              <i>all</i> players to active
            </li>
          </ol>
          `,
          media: "moving-pool-to-unknown.gif",
        },
        {
          description:
            "While playing, when you suspect someone, drag their color from <b>Unknown</b> to <b>My suspects</b>",
          media: "marking-as-suspect.gif",
        },
        {
          description:
            "When you think someone is innocent, drag them to <b>My innocents</b>",
          media: "marking-as-innocent.gif",
        },
        {
          description: "When someone died, drag them to <b>Dead</b>",
          media: "marking-as-dead.gif",
        },
        {
          description:
            "When someone holds a meeting, click on the green <b>+</b> icon on their row below",
          media: "tracking-meetings.gif",
        },
        {
          description:
            "When someone is done with all tasks, click on the <b>Tasks?</b> checkbox to mark it",
          media: "tracking-tasks.gif",
        },
        {
          description:
            "During voting, when someone suspects another player, drag the suspect's color to the accuser's <b>Suspect</b> column",
          media: "other-marking-as-suspect.gif",
        },
        {
          description:
            "When someone defends another player, drag the protected player's color to the protector's <b>Innocent</b> column",
          media: "other-marking-as-innocent.gif",
        },
        {
          description:
            "The numbers next to each player's color (in the rows below) indicate how many times they were suspected versus how many times they were protected",
          media: "innocent-suspect-count.png",
        },
        {
          description:
            "When the round is over and you're playing again with the same group, click on <b>New round</b> to reset all data but keep the active colors",
          media: "new-round.gif",
        },
        {
          description:
            "When you start a completely new game on another server, click on <b>New game</b> to reset everything and move all players back to the pool",
          media: "new-game.gif",
        },
        {
          description:
            "You can take notes by clicking the <b>Notes</b> button. Round notes will be reset each time you click <b>New round</b>. Game notes will be reset each time you click <b>New game</b>",
          media: "taking-notes.gif",
        },
        {
          description: `
          <span class="block font-bold text-left">A few handy shortcuts:</span>
          <ul class="pl-4 text-left list-disc">
            <li>
              Double-clicking on a color in
              <b>My innocents / My suspects</b> will move it back to
              <b>Unknown</b>
            </li>
            <li>
              Double-clicking on a color in <b>Unknown</b> will move it back to
              the pool
            </li>
            <li>
              Double-clicking on a color in <b>Innocent / Suspect</b> will remove
              it from that list
            </li>
            <li>
              Double-clicking on the meeting counter will reset it
            </li>
          </ul>
          `,
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    getMediaPath(mediaFile) {
      return require(`@/assets/images/help/${mediaFile}`);
    },
  },
};
</script>
