<template>
  <Modal @close="closeModal">
    <template slot="title">How to use</template>
    <template slot="body">
      <ol
        class="pl-4 text-sm leading-5 list-decimal list-outside text-theme-gray-dark"
      >
        <li>Select your color by clicking on <b>Player</b></li>
        <li>Select which colors are active, either by:</li>
        <ol class="pl-4 list-disc list-inside">
          <li>Dragging players from the pool to the <b>Unknown</b> column</li>
          <li>
            Or: clicking on grey arrow near the pool to move
            <i>all</i> players to active
          </li>
        </ol>
        <li>
          While playing, when you suspect someone, drag their color from
          <b>Unknown</b> to <b>My suspects</b>
        </li>
        <li>
          When you think someone is innocent, drag them to
          <b>My innocents</b>
        </li>
        <li>When someone died, drag them to <b>Dead</b></li>
        <li>
          When someone holds a meeting, click on the green <b>+</b> icon on
          their row below
        </li>
        <li>
          When someone is done with all tasks, click on the
          <b>Tasks?</b>
          checkbox to mark it
        </li>
        <li>
          During voting, when someone suspects another player, drag the
          suspect's color to the accuser's <b>Suspect</b> column
        </li>
        <li>
          When someone defends another player, drag the protected player's color
          to the protector's <b>Innocent</b> column
        </li>
        <li>
          The numbers next to each player's color (in the rows below) indicate
          how many times they were suspected versus how many times they were
          protected
        </li>
        <li>
          When the round is over and you're playing again with the same group,
          click on <b>New round</b> to reset all data but keep the active colors
        </li>
        <li>
          When you start a completely new game on another server, click on
          <b>New game</b> to reset everything and move all players back to the
          pool
        </li>
      </ol>
      <h1 class="text-lg font-medium leading-6 text-gray-900">
        Shortcuts
      </h1>
      <div class="text-sm leading-5 text-theme-gray-dark">
        <ul class="pl-4 list-disc">
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
      </div>
    </template>
  </Modal>
</template>

<script>
const Modal = () => import("@/components/Modal.vue");

export default {
  name: "HelpModal",
  components: {
    Modal,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
