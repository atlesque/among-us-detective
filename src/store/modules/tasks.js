import allMaps from "@/config/maps.js";
import allTasks from "@/config/tasks.js";

let defaultTasks = {};
allMaps
  .filter(mapName => allTasks[mapName] != null)
  .forEach(mapName => {
    defaultTasks[mapName] = allTasks[mapName].map(mapTasks => {
      mapTasks.isDone = false;
      return mapTasks;
    });
  });

const types = {
  SET_TASKS: "✔️[Set] tasks",
};

const state = {
  tasks: JSON.parse(JSON.stringify(defaultTasks)),
};

const getters = {};

const mutations = {
  [types.SET_TASKS](state, value) {
    state.tasks = value;
  },
};

const actions = {
  async setTask({ commit, state }, { map, taskIndex, isDone }) {
    const newTasks = JSON.parse(JSON.stringify(state.tasks));
    newTasks[map][taskIndex].isDone = isDone;
    commit(types.SET_TASKS, newTasks);
  },
  async resetAllTasks({ commit }) {
    commit(types.SET_TASKS, JSON.parse(JSON.stringify(defaultTasks)));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
