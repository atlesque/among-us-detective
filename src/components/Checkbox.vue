<template>
  <div class="flex items-center checkbox">
    <input
      :id="id"
      type="checkbox"
      class="w-6 h-6 mb-0 transition duration-150 ease-in-out border-2 border-gray-500 text-theme-green form-checkbox"
    />
    <label :for="id" class="block mb-0 ml-2 select-none">
      <slot></slot>
    </label>
  </div>
</template>
<script>
export default {
  name: "Checkbox",
  data() {
    return {
      isChecked: false,
    };
  },
  props: {
    id: {
      type: String,
      default: `checkbox-${(Math.random() * 1e8).toString(32)}`, // Generate random ID if none provided
    },
  },
};
</script>
