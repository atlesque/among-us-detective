<template>
  <Modal @close="emit('close')">
    <template #title>Notes</template>
    <template #body>
      <Notes
        :round="roundNotes"
        :game="gameNotes"
        @round-notes-changed="value => emit('roundNotesChanged', value)"
        @game-notes-changed="value => emit('gameNotesChanged', value)"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{ round?: string; game?: string }>()
const emit = defineEmits<{
  close: []
  roundNotesChanged: [value: string]
  gameNotesChanged: [value: string]
}>()

const roundNotes = computed(() => props.round ?? '')
const gameNotes = computed(() => props.game ?? '')
</script>
