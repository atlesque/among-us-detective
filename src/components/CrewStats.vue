<template>
  <div>
    <table
      class="w-full overflow-hidden divide-y divide-gray-200 rounded shadow table-auto crew-stats lg:table-fixed"
    >
      <thead>
        <tr>
          <th>Color</th>
          <th v-if="showImposterCheckbox === true">Imp?</th>
          <th v-if="showTasksCheckbox === true">Tasks?</th>
          <th v-if="showMeetingsCount === true">Meeting?</th>
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
                :showColorName="showColorNames === true"
                :showPlayerName="showPlayerNames === true"
                :is-imposter="member.isImposter"
                :is-player="member.isPlayer"
                :player-name="member.playerName"
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
          <td v-if="showImposterCheckbox === true">
            <Checkbox
              class="justify-center"
              :isChecked="member.isImposter === true"
              @changed="
                value => setMemberIsImposter({ member, isImposter: value })
              "
            />
          </td>
          <td v-if="showTasksCheckbox === true">
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
          <td class="px-1" v-if="showMeetingsCount === true">
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
              :showColorNames="showColorNames === true"
              :showPlayerName="showPlayerNames === true"
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
              :showColorNames="showColorNames === true"
              :showPlayerName="showPlayerNames === true"
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

import { mapGetters, mapActions, mapState } from "vuex";

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
    showColorNames: {
      type: Boolean,
      default: false,
    },
    showPlayerNames: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("crew", [
      "crewMembersWithoutPlayer",
      "getAllMembersSuspectedBy",
      "getAllMembersProtectedBy",
    ]),
    ...mapState("settings", [
      "showImposterCheckbox",
      "showTasksCheckbox",
      "showMeetingsCount",
    ]),
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
      "setMemberIsImposter",
      "setCrewMemberTotalMeetings",
      "removeProtectedFromProtector",
      "removeSuspectFromAccuser",
    ]),
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

  tr {
    &.is-dead {
      @apply bg-theme-gray-dark;
      @apply text-theme-gray-extra-light;
    }
  }

  td:not(:last-of-type) {
    @apply border-r;
  }
}
</style>
