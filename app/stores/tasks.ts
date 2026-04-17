import allMaps from "~/utils/maps.js";
import allTasksConfig from "~/utils/tasks.js";

export interface Task {
  name: string;
  types: string[];
  locations: string[];
  isDone: boolean;
}

export type TaskMap = Record<string, Task[]>;

function buildDefaultTasks(): TaskMap {
  const tasks: TaskMap = {};
  const maps = allMaps as string[];
  const config = allTasksConfig as Record<string, Omit<Task, "isDone">[]>;
  maps
    .filter((mapName) => config[mapName] != null)
    .forEach((mapName) => {
      tasks[mapName] = config[mapName].map((t) => ({ ...t, isDone: false }));
    });
  return tasks;
}

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<TaskMap>(buildDefaultTasks());

  function setTask({
    map,
    taskIndex,
    isDone,
  }: {
    map: string;
    taskIndex: number;
    isDone: boolean;
  }) {
    const newTasks = JSON.parse(JSON.stringify(tasks.value)) as TaskMap;
    newTasks[map][taskIndex].isDone = isDone;
    tasks.value = newTasks;
  }

  function resetAllTasks() {
    tasks.value = buildDefaultTasks();
  }

  return {
    tasks,
    setTask,
    resetAllTasks,
  };
});
