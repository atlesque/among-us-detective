<template>
  <Modal @close="emit('close')">
    <template #title>How to use</template>
    <template #body>
      <pre>{{ currentStepData }}</pre>
      <div
        v-if="currentStepData"
        class="mb-4 text-sm leading-5 text-theme-gray-dark"
      >
        <template v-if="currentStepData.media != null">
          <picture
            v-if="currentStepData.media.type === 'image'"
            class="mx-auto mb-4"
          >
            <source
              :srcset="`/help/${currentStepData.media.webp}`"
              type="image/webp"
            />
            <source
              :srcset="`/help/${currentStepData.media.png}`"
              type="image/png"
            />
            <img
              :src="`/help/${currentStepData.media.png}`"
              alt="Step demonstration"
            />
          </picture>
          <video
            v-else-if="currentStepData.media.type === 'video'"
            autoplay
            loop
            class="mx-auto mb-4"
          >
            <source
              :src="`/help/${currentStepData.media.webm}`"
              type="video/webm"
            />
            <source
              :src="`/help/${currentStepData.media.mp4}`"
              type="video/mp4"
            />
          </video>
          <img
            v-else
            :src="`/help/${currentStepData.media}`"
            class="mx-auto mb-4"
          />
        </template>
        <div v-html="currentStepData.description" class="py-4 text-center" />
      </div>
      <div class="flex justify-between">
        <button
          class="button"
          :disabled="currentStep <= 0"
          data-test="help-prev-btn"
          @click="currentStep--"
        >
          Previous
        </button>
        <span
          class="flex items-center justify-center text-theme-gray-light"
          data-test="help-step-counter"
          >{{ currentStep + 1 }}/{{ steps.length }}</span
        >
        <button
          v-show="currentStep < steps.length - 1"
          class="button"
          :disabled="currentStep >= steps.length - 1"
          data-test="help-next-btn"
          @click="currentStep++"
        >
          Next
        </button>
        <button
          v-show="currentStep >= steps.length - 1"
          class="button"
          data-test="help-close-btn"
          @click="emit('close')"
        >
          Close
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
interface StepMedia {
  type: "image" | "video";
  webp?: string;
  png?: string;
  webm?: string;
  mp4?: string;
}

interface Step {
  description: string;
  media?: StepMedia | string | null;
}

const emit = defineEmits<{ close: [] }>();

const currentStepIndex = ref(0);

const steps: Step[] = [
  {
    description:
      "Select your color by clicking on <b>My player</b>.<br/>Optionally: select if you're an imposter",
    media: {
      type: "video",
      webm: "changing-player-color.webm",
      mp4: "changing-player-color.mp4",
    },
  },
  {
    description: `
    Select which colors are active, either by:
    <ol class="pl-4 text-left list-disc">
      <li>Dragging players from the pool to the <b>Unknown</b> column</li>
      <li>Or: clicking on grey arrow near the pool to move <i>all</i> players to active</li>
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
    media: { type: "video", webm: "new-round.webm", mp4: "new-round.mp4" },
  },
  {
    description:
      "When you start a completely new game on another server, click on <b>New game</b> to reset everything and move all players back to the pool",
    media: { type: "video", webm: "new-game.webm", mp4: "new-game.mp4" },
  },
  {
    description:
      "You can take notes by clicking the <b>Notes</b> button.<br/>Round notes will be reset each time you click <b>New round</b>.<br/>Game notes will be reset each time you click <b>New game</b>.<br/>You can also dictate notes using your mic",
    media: {
      type: "video",
      webm: "taking-notes.webm",
      mp4: "taking-notes.mp4",
    },
  },
  {
    description:
      "You can track player locations by opening the map and dragging players onto it.<br/>Click <b>Reset positions</b> to reset them",
    media: {
      type: "video",
      webm: "tracking-on-map.webm",
      mp4: "tracking-on-map.mp4",
    },
  },
  {
    description:
      "You can track tasks by clicking <b>Tasks</b> and selecting your map.<br/>Click on a task to check it.<br/>Click on <b>Reset</b> to reset them",
    media: { type: "video", webm: "tasks.webm", mp4: "tasks.mp4" },
  },
  {
    description: `
    <span class="block font-bold text-left">A few handy shortcuts:</span>
    <ul class="pl-4 text-left list-disc">
      <li>Press <b>N</b> to toggle Notes</li>
      <li>Press <b>M</b> to toggle Map</li>
      <li>Double-clicking on a color in <b>My innocents / My suspects</b> will move it back to <b>Unknown</b></li>
      <li>Double-clicking on a color in <b>Unknown</b> will move it back to the pool</li>
      <li>Double-clicking on a color in <b>Innocent / Suspect</b> will remove it from that list</li>
      <li>Double-clicking on the meeting counter will reset it</li>
    </ul>
    `,
  },
  {
    description: `
    <span class="block font-bold text-left">The bottom of the screen has a few links:</span>
    <ul class="pl-4 text-left list-disc">
      <li><b>Settings</b>: Lets you customize the app to your liking</li>
      <li><b>Help</b>: Shows this tutorial again</li>
      <li><b>About</b>: Shows information about the app</li>
    </ul>
    `,
  },
];

const currentStepData = computed((): Step => steps[currentStepIndex.value]);

const currentStep = computed({
  get: (): number => currentStepIndex.value,
  set: (value: number) => {
    currentStepIndex.value = value;
  },
});
</script>
