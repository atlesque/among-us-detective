<template>
  <div>
    <table class="w-full table-fixed table-bordered">
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
        <tr
          v-for="member in sortedCrewMembers"
          :key="member.color"
          :class="{ 'is-dead': member.isDead === true }"
        >
          <td>
            <div class="flex justify-between">
              <CrewIcon :color="member.color" />
            </div>
          </td>
          <td><Checkbox :isDisabled="member.isDead === true" /></td>
          <td><Counter :isDisabled="member.isDead === true" /></td>
          <td>
            <CrewPool
              :crewMembers="getAllMembersProtectedBy(member)"
              @changed="
                value =>
                  linkInnocentsWithProtector({
                    innocents: value,
                    protector: member,
                  })
              "
              class="td-min-height"
            />
          </td>
          <td class="relative">
            <CrewPool
              :crewMembers="getAllMembersSuspectedBy(member)"
              @changed="
                value =>
                  linkSuspectsWithAccuser({
                    suspects: value,
                    accuser: member,
                  })
              "
              class="td-min-height"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const CrewIcon = () => import("@/components/CrewIcon.vue");
const Checkbox = () => import("@/components/Checkbox.vue");
const Counter = () => import("@/components/Counter.vue");
const CrewPool = () => import("@/components/CrewPool.vue");

import { mapGetters, mapActions } from "vuex";

export default {
  name: "CrewStats",
  components: {
    CrewIcon,
    Checkbox,
    Counter,
    CrewPool,
  },
  props: {
    crewMembers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters("crew", ["crewMembersWithoutPlayer"]),
    sortedCrewMembers() {
      // Use spread operator to avoid mutating original array
      return (
        [...this.crewMembers]
          // Sort by name
          .sort((a, b) => {
            let result = 0;
            if (a.color > b.color) {
              result = 1;
            } else if (a.color < b.color) {
              result = -1;
            }
            return result;
          })
          // Then sort by alive > dead
          .sort((a, b) => {
            let result = 0;
            if (a.isDead === true && b.isDead === false) {
              result = 1;
            } else if (a.isDead === false && b.isDead === true) {
              result = -1;
            }
            return result;
          })
      );
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("crew", [
      "linkSuspectsWithAccuser",
      "linkInnocentsWithProtector",
    ]),
    getAllMembersSuspectedBy(accuser) {
      return this.crewMembersWithoutPlayer.filter(member => {
        return member.suspectedBy.includes(accuser.color) === true;
      });
    },
    getAllMembersProtectedBy(protector) {
      return this.crewMembersWithoutPlayer.filter(member => {
        return member.protectedBy.includes(protector.color) === true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.is-dead {
  @apply bg-theme-gray;
}
table {
  td {
    // height: 0; // HACK: Makes all <td> equal height
  }
  .td-min-height {
    min-height: 56px;
  }
}
</style>
