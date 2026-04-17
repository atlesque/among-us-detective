<template>
  <div class="crew-tracker" data-test="crew-tracker">
    <table class="w-full overflow-hidden rounded shadow table-fixed">
      <thead>
        <tr>
          <th class="bg-theme-green-light dark--text-dark" data-test="crew-col-header-innocent">
            {{ isPlayerImposter ? 'My protectors' : 'My innocents' }}
          </th>
          <th class="unknown-column" data-test="crew-col-header-unknown">Unknown</th>
          <th class="bg-theme-yellow-light dark--text-dark" data-test="crew-col-header-suspect">
            {{ isPlayerImposter ? 'Hitlist' : 'My suspects' }}
          </th>
          <th class="text-theme-red-light bg-theme-gray-dark" data-test="crew-col-header-dead">
            Dead
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-test="crew-column-innocent">
            <CrewPool
              class="pool--innocent"
              :crew-members="innocentList"
              :show-color-names="showColorNames"
              :show-player-names="showPlayerNames"
              @changed="value => emit('changed', { type: 'innocent', value })"
              @removed="member => emit('removed', { list: 'innocent', member })"
            />
          </td>
          <td data-test="crew-column-unknown">
            <CrewPool
              class="pool--unknown"
              :crew-members="unknownList"
              :show-color-names="showColorNames"
              :show-player-names="showPlayerNames"
              @changed="value => emit('changed', { type: 'unknown', value })"
              @removed="member => emit('removed', { list: 'unknown', member })"
            />
          </td>
          <td data-test="crew-column-suspect">
            <CrewPool
              class="pool--suspect"
              :crew-members="suspectList"
              :show-color-names="showColorNames"
              :show-player-names="showPlayerNames"
              @changed="value => emit('changed', { type: 'suspect', value })"
              @removed="member => emit('removed', { list: 'suspect', member })"
            />
          </td>
          <td class="bg-theme-gray-dark" data-test="crew-column-dead">
            <CrewPool
              class="pool--dead"
              :crew-members="deadList"
              :show-color-names="showColorNames"
              :show-player-names="showPlayerNames"
              @changed="value => emit('changed', { type: 'dead', value })"
              @removed="member => emit('removed', { list: 'dead', member })"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { CrewMember } from '~/app/stores/crew';

const props = defineProps<{
  playerColor: string
  innocent: CrewMember[]
  unknown: CrewMember[]
  suspect: CrewMember[]
  dead: CrewMember[]
  showColorNames?: boolean
  showPlayerNames?: boolean
}>()

const emit = defineEmits<{
  changed: [payload: { type: string; value: CrewMember[] }]
  removed: [payload: { list: string; member: CrewMember }]
}>()

const crewStore = useCrewStore()
const { isPlayerImposter } = storeToRefs(crewStore)

function sortByColor(arr: CrewMember[]) {
  return [...arr].sort((a, b) => (a.color > b.color ? 1 : a.color < b.color ? -1 : 0))
}

const innocentList = computed({
  get: () => sortByColor(props.innocent),
  set: (value: CrewMember[]) => emit('changed', { type: 'innocent', value }),
})

const unknownList = computed({
  get: () => sortByColor(props.unknown),
  set: (value: CrewMember[]) => emit('changed', { type: 'unknown', value }),
})

const suspectList = computed({
  get: () => sortByColor(props.suspect),
  set: (value: CrewMember[]) => emit('changed', { type: 'suspect', value }),
})

const deadList = computed({
  get: () => sortByColor(props.dead),
  set: (value: CrewMember[]) => emit('changed', { type: 'dead', value }),
})
</script>

<style lang="scss" scoped>
table {
  thead {
    th {
      @apply p-1;
    }
  }

  td {
    @apply shadow-inner;
    height: 3rem;
  }
}
</style>
