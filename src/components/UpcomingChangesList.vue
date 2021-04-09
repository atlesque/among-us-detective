<template>
  <section class="upcoming-changes">
    <div
      class="p-2 overflow-y-scroll bg-gray-100 rounded max-h-64 text-theme-gray-dark"
    >
      <span class="text-xs font-bold">
        The following features are planned for the near future:
      </span>
      <ul class="pl-4 mb-4 text-sm leading-5 list-disc ">
        <li v-for="(upcomingItem, index) in upcomingChanges" :key="index">
          {{ upcomingItem }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "UpcomingChangesList",
  data() {
    return {
      upcomingChanges: [
        "Text guide",
        "Optional saving all state after page reload",
        "Fix double-click shortcuts on mobile",
      ],
    };
  },
};
</script>
