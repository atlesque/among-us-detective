<template>
  <Modal @close="emit('close')">
    <template #title>{{ t('dock.notes') }}</template>
    <template #body>
      <Notes />
    </template>
  </Modal>
</template>

<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{ close: [] }>()
</script>
