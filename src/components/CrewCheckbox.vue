<template>
  <div class="flex items-center checkbox">
    <input
      :id="id"
      type="checkbox"
      class="w-full h-full mb-0 transition duration-150 ease-in-out border-2 form-checkbox"
      :class="[`text-player-${color}`, `border-player-${color}`]"
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
    color: {
      type: String,
      required: true,
    },
  },
};
</script>
