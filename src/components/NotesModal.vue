<template>
  <Modal @close="closeModal">
    <template slot="title">Notes</template>
    <template slot="body">
      <Notes
        :round="roundNotes"
        :game="gameNotes"
        @roundNotesChanged="value => (roundNotes = value)"
        @gameNotesChanged="value => (gameNotes = value)"
      />
    </template>
  </Modal>
</template>

<script>
const Modal = () => import("@/components/Modal.vue");
const Notes = () => import("@/components/Notes.vue");

export default {
  name: "NotesModal",
  components: {
    Modal,
    Notes,
  },
  props: {
    round: {
      type: String,
      default: "",
    },
    game: {
      type: String,
      default: "",
    },
  },
  computed: {
    roundNotes: {
      get() {
        return this.round;
      },
      set(value) {
        this.$emit("roundNotesChanged", value);
      },
    },
    gameNotes: {
      get() {
        return this.game;
      },
      set(value) {
        this.$emit("gameNotesChanged", value);
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
