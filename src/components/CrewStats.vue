<template>
  <div>
    <table
      class="w-full overflow-hidden divide-y divide-gray-200 rounded shadow table-auto lg:table-fixed"
    >
      <thead>
        <tr>
          <th>Color</th>
          <th>Tasks?</th>
          <th>Meeting?</th>
          <th colspan="3">Innocent</th>
          <th colspan="3">Suspect</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="member in sortedCrewMembers"
          :key="member.color"
          :class="{ 'is-dead': member.isDead === true }"
        >
          <td>
            <div
              class="flex flex-col-reverse items-center py-1 lg:flex-row justify-evenly"
            >
              <CrewIcon
                :color="member.color"
                :showColorNames="areColorNamesVisible"
              />
              <div v-show="member.isDead === false" class="flex lg:flex-col">
                <span
                  v-show="member.suspectedBy.length > 0"
                  class="px-1"
                  :class="getSuspectCounterClass(member.suspectedBy.length)"
                  >{{ member.suspectedBy.length }}</span
                >
                <span
                  v-show="member.protectedBy.length > 0"
                  class="px-1"
                  :class="getProtectedCounterClass(member.protectedBy.length)"
                  >{{ member.protectedBy.length }}</span
                >
              </div>
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
          <td class="px-1">
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
              :showColorNames="areColorNamesVisible === true"
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
              :showColorNames="areColorNamesVisible === true"
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
    areColorNamesVisible: {
      type: Boolean,
      default: false,
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
      if (suspectedByCount >= 1) {
        return "font-bold text-player-red";
      } else {
        return "text-theme-gray-light";
      }
    },
    getProtectedCounterClass(protectedByCount) {
      if (protectedByCount >= 1) {
        return "font-bold text-player-green";
      } else {
        return "text-theme-gray-light";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  @screen md {
    .td-min-height {
      min-height: 56px;
    }
  }

  thead {
    th {
      @apply py-1;
      @apply px-3;

      &:not(:last-of-type) {
        @apply border-r;
      }
    }
  }

  td:not(:last-of-type) {
    @apply border-r;
  }
}
</style>
