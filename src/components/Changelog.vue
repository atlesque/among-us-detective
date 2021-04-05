<template>
  <section class="changelog">
    <h2 class="text-base font-bold">Changelog</h2>
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
          date: "2021-04-04",
          changes: [
            "Add new Airship map <small>(Thx Ezzelin and Triple A!)</small>",
            "Update Mira HQ map <small>(Thx SamuraiPipotchi on Twitter!)</small>",
            "Fix caching so everyone sees the new version",
          ],
        },
        {
          date: "2020-10-28",
          changes: [
            "Rename <b>Player</b> to <b>My color</b> to clarify color picker use <small>(Thx Elle and lustle on Reddit!)</small>",
            "Add hotkeys 'M' to toggle map and 'N' to toggle notes <small>(Thx CadeFromSales on Reddit!)</small>",
          ],
        },
        {
          date: "2020-10-21",
          changes: [
            "Add Speech-to-Text for transcribing notes by voice <small>(Thx CadeFromSales on Reddit!)</small>",
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
            "Show Help modal for new players <small>(Thx peasant-trip on Reddit!)</small>",
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
            "Add Notes modal. You can now add notes per round and per game. <small>(Props to Greedlord and AshamedBrit on Reddit for the suggestion!)</small>",
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
