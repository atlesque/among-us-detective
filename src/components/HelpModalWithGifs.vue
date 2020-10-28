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
        <template v-if="step.media != null">
          <picture v-if="step.media.type === 'image'" class="mx-auto mb-4">
            <source :srcset="getMediaPath(step.media.webp)" type="image/webp" />
            <source :srcset="getMediaPath(step.media.png)" type="image/png" />
            <img :src="getMediaPath(step.media.png)" alt="Step demonstration" />
          </picture>
          <video
            v-else-if="step.media.type === 'video'"
            autoplay
            loop
            class="mx-auto mb-4"
          >
            <source :src="getMediaPath(step.media.webm)" type="video/webm" />
            <source :src="getMediaPath(step.media.mp4)" type="video/mp4" />
          </video>
          <img v-else :src="getMediaPath(step.media)" class="mx-auto mb-4" />
        </template>
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
          description: "Select your color by clicking on <b>My color</b>",
          media: {
            type: "video",
            webm: "changing-player-color.webm",
            mp4: "changing-player-color.mp4",
          },
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
          media: {
            type: "video",
            webm: "moving-pool-to-unknown.webm",
            mp4: "moving-pool-to-unknown.mp4",
          },
        },
        {
          description:
            "While playing, when you suspect someone, drag their color from <b>Unknown</b> to <b>My suspects</b>",
          media: {
            type: "video",
            webm: "marking-as-suspect.webm",
            mp4: "marking-as-suspect.mp4",
          },
        },
        {
          description:
            "When you think someone is innocent, drag them to <b>My innocents</b>",
          media: {
            type: "video",
            webm: "marking-as-innocent.webm",
            mp4: "marking-as-innocent.mp4",
          },
        },
        {
          description: "When someone died, drag them to <b>Dead</b>",
          media: {
            type: "video",
            webm: "marking-as-dead.webm",
            mp4: "marking-as-dead.mp4",
          },
        },
        {
          description:
            "When someone holds a meeting, click on the green <b>+</b> icon on their row below",
          media: {
            type: "video",
            webm: "tracking-meetings.webm",
            mp4: "tracking-meetings.mp4",
          },
        },
        {
          description:
            "When someone is done with all tasks, click on the <b>Tasks?</b> checkbox to mark it",
          media: {
            type: "video",
            webm: "tracking-tasks.webm",
            mp4: "tracking-tasks.mp4",
          },
        },
        {
          description:
            "During voting, when someone suspects another player, drag the suspect's color to the accuser's <b>Suspect</b> column",
          media: {
            type: "video",
            webm: "other-marking-as-suspect.webm",
            mp4: "other-marking-as-suspect.mp4",
          },
        },
        {
          description:
            "When someone defends another player, drag the protected player's color to the protector's <b>Innocent</b> column",
          media: {
            type: "video",
            webm: "other-marking-as-innocent.webm",
            mp4: "other-marking-as-innocent.mp4",
          },
        },
        {
          description:
            "The numbers next to each player's color (in the rows below) indicate how many times they were suspected versus how many times they were protected",
          media: {
            type: "image",
            webp: "innocent-suspect-count.webp",
            png: "innocent-suspect-count.png",
          },
        },
        {
          description:
            "When the round is over and you're playing again with the same group, click on <b>New round</b> to reset all data but keep the active colors",
          media: {
            type: "video",
            webm: "new-round.webm",
            mp4: "new-round.mp4",
          },
        },
        {
          description:
            "When you start a completely new game on another server, click on <b>New game</b> to reset everything and move all players back to the pool",
          media: {
            type: "video",
            webm: "new-game.webm",
            mp4: "new-game.mp4",
          },
        },
        {
          description:
            "You can take notes by clicking the <b>Notes</b> button. Round notes will be reset each time you click <b>New round</b>. Game notes will be reset each time you click <b>New game</b>. You can also dictate notes using your mic",
          media: {
            type: "video",
            webm: "taking-notes.webm",
            mp4: "taking-notes.mp4",
          },
        },
        {
          description: `
          <span class="block font-bold text-left">A few handy shortcuts:</span>
          <ul class="pl-4 text-left list-disc">
            <li>
              Press <b>N</b> to toggle Notes
            </li>
            <li>
              Press <b>M</b> to toggle Map
            </li>
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
        {
          description: `
          <span class="block font-bold text-left">The bottom of the screen contains some settings:</span>
          <ul class="pl-4 text-left list-disc">
            <li>
              <b>Names/Icons</b>: Toggles showing color names instead of player icons
            </li>
            <li>
              <b>Light/Dark</b>: Toggles showing Light/Dark mode
            </li>
            <li>
              <b>Help</b>: Shows this Help menu
            </li>
            <li>
              <b>About</b>: Shows development information about this app
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
