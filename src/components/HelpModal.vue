<template>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 transition-opacity">
        <div
          @click="closeModal"
          class="absolute inset-0 bg-gray-500 opacity-75"
        ></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block px-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
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
            <!-- Heroicon name: x -->
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
          <div class="mt-3 sm:mt-0 sm:ml-4">
            <h1
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              How to use
            </h1>
            <div class="mt-2">
              <ol
                class="pl-4 text-sm leading-5 list-decimal list-outside text-theme-gray-dark"
              >
                <li>Select your color by clicking on <b>Player</b></li>
                <li>Select which colors are active, either by:</li>
                <ol class="pl-4 list-disc list-inside">
                  <li>
                    Dragging players from the pool to the <b>Unknown</b> column
                  </li>
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
                  When someone holds a meeting, click on the green <b>+</b> icon
                  on their row below
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
                  When someone defends another player, drag the protected
                  player's color to the protector's <b>Innocent</b> column
                </li>
                <li>
                  The numbers next to each player's color (in the rows below)
                  indicate how many times they were suspected versus how many
                  times they were protected
                </li>
                <li>
                  When the round is over and you're playing again with the same
                  group, click on <b>New round</b> to reset all data but keep
                  the active colors
                </li>
                <li>
                  When you start a completely new game on another server, click
                  on <b>New game</b> to reset everything and move all players
                  back to the pool
                </li>
              </ol>
            </div>
            <h1
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
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
                  Double-clicking on a color in <b>Unknown</b> will move it back
                  to the pool
                </li>
                <li>
                  Double-clicking on a color in <b>Innocent / Suspect</b> will
                  remove it from that list
                </li>
              </ul>
            </div>
            <hr class="mt-6 border-theme-gray-extra-light" />
            <h1
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              Changelog
            </h1>
            <div class="text-xs leading-5 text-theme-gray-dark">
              <span>2020-09-22</span>
              <ul class="pl-4 list-disc">
                <li>
                  Added Dark mode
                </li>
                <li>
                  Show player icons by default. Color names can be enabled in
                  footer
                </li>
              </ul>
            </div>
            <div class="mt-10 text-xs leading-5 text-theme-gray-dark">
              <p class="text-xs">
                Made with ❤ by <a href="https://atlesque.com">Atlesque</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpModal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
