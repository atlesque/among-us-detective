<template>
  <div>
    <table class="w-full table-auto table-bordered">
      <thead>
        <tr>
          <td>Color</td>
          <td>Tasks?</td>
          <td>Meeting?</td>
          <td>Innocent</td>
          <td>Suspect</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="color in activeCrew" :key="color">
          <td>
            <div class="flex justify-between">
              <CrewIcon :color="color" />
              <!-- <button
                class="flex items-center justify-center w-4 h-4 button-danger button-sm"
                @click="removeColor(color)"
              >
                X
              </button> -->
            </div>
          </td>
          <td><Checkbox /></td>
          <td><Counter /></td>
          <td><CrewSelector :ownColor="color" /></td>
          <td><CrewSelector :ownColor="color" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const CrewIcon = () => import("@/components/CrewIcon.vue");
const Checkbox = () => import("@/components/Checkbox.vue");
const Counter = () => import("@/components/Counter.vue");
const CrewSelector = () => import("@/components/CrewSelector.vue");

export default {
  name: "CrewStats",
  components: {
    CrewIcon,
    Checkbox,
    Counter,
    CrewSelector,
  },
  props: {
    crewMembers: {
      type: Array,
      required: true,
    },
    deadMembers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeCrew: JSON.parse(JSON.stringify(this.crewMembers)),
    };
  },
  methods: {
    /* removeColor(colorToRemove) {
      this.activeCrew = this.activeCrew.filter(
        color => color !== colorToRemove
      );
    }, */
  },
};
</script>
