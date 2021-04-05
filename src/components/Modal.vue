<template>
  <div class="fixed inset-0 z-30 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen p-20 px-4 pt-4 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div
          @click="closeModal"
          :class="[
            isDarkMode === true ? 'bg-black' : 'bg-gray-500',
            isTransparent === true ? 'opacity-0' : 'opacity-75',
          ]"
          class="absolute inset-0"
        ></div>
      </div>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <div
        :class="[isDarkMode === true ? 'bg-gray-200 text-black' : 'bg-white']"
        class="inline-block w-full px-6 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            class="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500"
            aria-label="Close"
            @click="closeModal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div class="w-full my-6 sm:my-0">
            <h1
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              <slot name="title"></slot>
            </h1>
            <div class="pb-4 modal-body">
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Modal",
  props: {
    isTransparent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("darkMode", ["isDarkMode"]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
