<template>
  <section class="changelog">
    <div class="p-2 overflow-y-scroll bg-gray-100 rounded max-h-64">
      <div
        v-for="(changelogItem, index) in changelog"
        :key="index"
        class="mb-4 text-sm leading-5 text-theme-gray-dark "
      >
        <span class="text-xs font-bold">{{ changelogItem.date }}</span>
        <ul
          class="pl-4 list-disc"
          v-if="(changelogItem.changes || []).length > 0"
        >
          <li
            v-for="(changeNotes, index) in changelogItem.changes"
            :key="index"
            v-html="changeNotes"
          ></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Changelog",
  data() {
    return {
      changelog: [
        {
          date: "2021-07-19",
          changes: ["Add new Clean Vent task"],
        },
        {
          date: "2021-06-25",
          changes: ["Add new colors"],
        },
        {
          date: "2021-04-12",
          changes: [
            "Adjust map constrast and color scheme <small>(Thx u/Greenbay7115!)</small>",
          ],
        },
        {
          date: "2021-04-09",
          changes: [
            "Add imposter mode <small>(Thx u/Cantwaitforyandere and S.P. Eieye!)</small>",
            "Add tasks logger <small>(Thx Trolliant, tacallender and u/Cantwaitforyandere!)</small>",
            "Add Mira HQ map overlay to help with door logs <small>(Thx u/XanderTheV!)</small>",
            "Increase map player contrast",
            "Fix Notes on iOS <small>(Thx S.P. Eieye!)</small>",
          ],
        },
        {
          date: "2021-04-08",
          changes: ["Track dead players on map"],
        },
        {
          date: "2021-04-07",
          changes: [
            "Add player location tracker <small>(Thx u/PacoZK1 and u/SteelFrog21_YT!)</small>",
          ],
        },
        {
          date: "2021-04-05",
          changes: [
            "Change player color selector to use modal",
            "Highlight own color when tracking yourself is enabled",
            "Disable adding member to both innocent and suspect",
            "Add option to use your own color <small>(Thx connor and Triple A!)</small>",
            "Misc. internal improvements and refactoring",
          ],
        },
        {
          date: "2021-04-04",
          changes: [
            "Add option to hide round notes (useful if you need to save space)",
            "Add voice transcription to Game notes too",
            "Add option to preserve Game notes after new game",
            "Allow editing player names <small>(Thx teeny!)</small>",
            "Preserve settings on page refresh (including Dark mode)",
            "Make Tasks, Meetings and Imposter checkboxes configurable in Settings",
            "Group all settings under Settings modal to free up space",
            "Add checkbox for marking someone as an imposter (when you're 100% sure) <small>(Thx u/__Glaceyy and u/EhCrumb!)</small>",
            "Add new The Airship map <small>(Thx Ezzelin and Triple A!)</small>",
            "Update Mira HQ map <small>(Thx SamuraiPipotchi on Twitter!)</small>",
            "Fix caching so everyone sees the new version",
            "Fix player color names resetting to icons",
            "Fix new round button being disabled in some cases",
            "Misc. UI improvements",
          ],
        },
        {
          date: "2020-10-28",
          changes: [
            "Rename <b>Player</b> to <b>My color</b> to clarify color picker use <small>(Thx u/Elle and u/lustle!)</small>",
            "Add hotkeys 'M' to toggle map and 'N' to toggle notes <small>(Thx u/CadeFromSales!)</small>",
          ],
        },
        {
          date: "2020-10-21",
          changes: [
            "Add Speech-to-Text for transcribing notes by voice <small>(Thx u/CadeFromSales!)</small>",
          ],
        },
        {
          date: "2020-10-20",
          changes: [
            "Moving inactive crew will make them active",
            "Add feedback form",
            "Add PWA support for adding to mobile home screen",
            "Improve crew icon quality",
            "Fix crew icons disappearing while moving",
            "Misc. Dark mode fixes",
          ],
        },
        {
          date: "2020-10-14",
          changes: [
            "Update maps with better versions <small>(Thx Ezzelin!)</small>",
            "Auto-detect dark mode",
            "Make bottom buttons larger and mention them in Help",
          ],
        },
        {
          date: "2020-10-06",
          changes: [
            "Show Help modal for new players <small>(Thx u/peasant-trip!)</small>",
          ],
        },
        {
          date: "2020-10-05",
          changes: [
            "Move Notes button to top button row for easier access",
            "Reduce font-size on large screens",
            "Remake How to use into a GIF slideshow",
          ],
        },
        {
          date: "2020-09-30",
          changes: [
            "Make table UI prettier",
            "Move Changelog into separate modal",
            "Improve 'Show map' button layout",
            "Add Notes modal. You can now add notes per round and per game. <small>(Thx u/Greedlord and u/AshamedBrit!)</small>",
            "Improve mobile UI",
          ],
        },
        {
          date: "2020-09-22",
          changes: [
            "Added Dark mode",
            "Show player icons by default. Color names can be enabled in footer",
          ],
        },
      ],
    };
  },
};
</script>
