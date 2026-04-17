<template>
  <div class="flex items-center checkbox">
    <input
      :id="id"
      v-model="isCheckedValue"
      type="checkbox"
      class="w-6 h-6 mb-0 transition duration-150 ease-in-out border-2 border-gray-500 shadow text-theme-green form-checkbox"
      :disabled="isDisabled"
    />
    <label :for="id" class="block mb-0 ml-2 select-none">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isChecked?: boolean;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{ changed: [value: boolean] }>();

const id = props.id ?? `checkbox-${(Math.random() * 1e8).toString(32)}`;

const isCheckedValue = computed({
  get: () => props.isChecked ?? false,
  set: (value: boolean) => emit("changed", value),
});
</script>
