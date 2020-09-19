<template>
  <div>
    <table class="w-full table-fixed table-bordered">
      <thead>
        <tr>
          <td>Color</td>
          <td>Tasks?</td>
          <td>Meeting?</td>
          <td colspan="3">Innocent</td>
          <td colspan="3">Suspect</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in sortedCrewMembers"
          :key="member.color"
          :class="{ 'is-dead': member.isDead === true }"
        >
          <td>
            <div class="flex items-center justify-evenly">
              <CrewIcon :color="member.color" />
              <span
                v-show="member.isDead === false"
                :class="getSuspectCounterClass(member.suspectedBy.length)"
                >{{ member.suspectedBy.length }}</span
              >
            </div>
          </td>
          <td>
            <Checkbox
              v-show="member.isDead === false"
              :isDisabled="member.isDead === true"
              class="justify-center"
              :isChecked="member.isDoneWithTasks === true"
              @changed="
                value => setCrewMemberIsDoneWithTasks({ member, isDone: value })
              "
            />
          </td>
          <td>
            <Counter
              v-show="member.isDead === false"
              :count="member.totalMeetingsHeld"
              :isDisabled="member.isDead === true"
              @changed="
                value =>
                  setCrewMemberTotalMeetings({ member, meetingsCount: value })
              "
            />
          </td>
          <td colspan="3">
            <CrewPool
              :crewMembers="getAllMembersProtectedBy(member)"
              @changed="
                value =>
                  linkInnocentsWithProtector({
                    innocents: value,
                    protector: member,
                  })
              "
              @removed="
                value =>
                  removeProtectedFromProtector({
                    protectedMember: value,
                    protector: member,
                  })
              "
              class="td-min-height"
            />
          </td>
          <td class="relative" colspan="3">
            <CrewPool
              :crewMembers="getAllMembersSuspectedBy(member)"
              @changed="
                value =>
                  linkSuspectsWithAccuser({
                    suspects: value,
                    accuser: member,
                  })
              "
              @removed="
                value =>
                  removeSuspectFromAccuser({ suspect: value, accuser: member })
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
      "setCrewMemberIsDoneWithTasks",
      "setCrewMemberTotalMeetings",
      "removeProtectedFromProtector",
      "removeSuspectFromAccuser",
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
    getSuspectCounterClass(suspectedByCount) {
      if (suspectedByCount >= 2) {
        return "font-bold text-player-red";
      } else if (0 < suspectedByCount && suspectedByCount < 2) {
        return "text-player-orange";
      } else {
        return "text-theme-gray-light";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.is-dead {
  @apply bg-theme-gray-light;
}
table {
  .td-min-height {
    min-height: 56px;
  }
}
</style>
