<template>
  <div class="flex">
    <Modal @close="closeModal">
      <template slot="title">Tasks</template>
      <template slot="body">
        <div class="my-4 flex flex-col gap-1 items-start">
          <MapSelector
            :selectedMap="selectedMap"
            @mapSelected="map => setSelectedMap(map)"
          />
          <button @click="resetAllTasks" class=" button-danger button-sm">
            Reset
          </button>
        </div>
        <table class="table-auto task-list">
          <thead>
            <th>Task</th>
            <th>Type</th>
          </thead>
          <tbody>
            <tr v-for="(task, index) in currentMapTasks" :key="index">
              <td class="pr-4">
                <Checkbox
                  :id="`task-checkbox-${index}`"
                  :isChecked="task.isDone === true"
                  @changed="
                    value =>
                      setTask({
                        map: selectedMap,
                        taskIndex: index,
                        isDone: value,
                      })
                  "
                  >{{ task.name }}
                </Checkbox>
              </td>
              <td>
                <small
                  v-for="(type, index) in task.types"
                  :key="index"
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

<script>
import { mapState, mapActions } from "vuex";
const Modal = () => import("@/components/Modal.vue");
const MapSelector = () => import("@/components/MapSelector.vue");
const Checkbox = () => import("@/components/Checkbox.vue");

export default {
  name: "TasksModal",
  components: {
    Modal,
    MapSelector,
    Checkbox,
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
    ...mapState("maps", ["selectedMap"]),
    currentMapTasks() {
      return this.tasks[this.selectedMap];
    },
  },
  methods: {
    ...mapActions("tasks", ["setTask", "resetAllTasks"]),
    ...mapActions("maps", ["setSelectedMap"]),
    getTaskTypeClass(type) {
      if (type.includes("Long")) {
        return "bg-theme-yellow";
      } else if (type.includes("Short")) {
        return "bg-theme-green";
      } else if (type.includes("Visual")) {
        return "bg-theme-red";
      } else if (type.includes("Common")) {
        return "bg-theme-blue text-white";
      } else {
        return " bg-theme-gray";
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
