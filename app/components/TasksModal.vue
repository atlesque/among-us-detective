<template>
  <div class="flex">
    <Modal @close="emit('close')">
      <template #title>Tasks</template>
      <template #body>
        <div class="my-4 flex flex-col gap-1 items-start">
          <MapSelector
            :selected-map="mapsStore.selectedMap"
            @map-selected="(map) => mapsStore.setSelectedMap(map)"
          />
          <button
            class="button-danger button-sm"
            data-test="reset-tasks-btn"
            @click="tasksStore.resetAllTasks()"
          >
            Reset
          </button>
        </div>
        <table class="table-auto task-list">
          <thead>
            <tr>
              <th>Task</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in currentMapTasks" :key="index">
              <td class="pr-4">
                <Checkbox
                  :id="`task-checkbox-${index}`"
                  :is-checked="task.isDone"
                  @changed="
                    (value) =>
                      tasksStore.setTask({
                        map: mapsStore.selectedMap,
                        taskIndex: index,
                        isDone: value,
                      })
                  "
                >
                  {{ task.name }}
                </Checkbox>
              </td>
              <td>
                <small
                  v-for="(type, i) in task.types"
                  :key="i"
                  class="p-1 mr-1 rounded"
                  :class="getTaskTypeClass(type)"
                  >{{ type }}</small
                >
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>();

const tasksStore = useTasksStore();
const mapsStore = useMapsStore();

const currentMapTasks = computed(
  () => tasksStore.tasks[mapsStore.selectedMap] ?? []
);

function getTaskTypeClass(type: string): string {
  if (type.includes("Long")) return "bg-theme-yellow";
  if (type.includes("Short")) return "bg-theme-green";
  if (type.includes("Visual")) return "bg-theme-red";
  if (type.includes("Common")) return "bg-theme-blue text-white";
  return "bg-theme-gray";
}
</script>
