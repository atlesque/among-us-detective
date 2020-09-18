const types = {
  SET_PLAYER_COLOR: "✔️ [Set] player color",
};

const state = {
  crewMembers: [
    {
      color: "red",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "blue",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "green",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "pink",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "orange",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "yellow",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "black",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "white",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "purple",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "brown",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "cyan",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
    {
      color: "lime",
      isDead: false,
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
      suspectedBy: [],
      protectedBy: [],
    },
  ],
  playerColor: "yellow",
};

const getters = {};

const mutations = {
  [types.SET_PLAYER_COLOR](state, { color }) {
    state.playerColor = color;
  },
};

const actions = {
  async setPlayerColor({ commit }, { color }) {
    commit(types.SET_PLAYER_COLOR, { color });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
