import allColors from "@/config/playerColors.js";

const defaultCrewMembers = allColors.map(colorName => {
  return {
    color: colorName,
    playerName: "",
    isPlayer: false,
    isActive: false,
    isImposter: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  };
});

const defaultPlayerColor = "yellow";

const types = {
  SET_CREW: "✔️[Set] crew members",
  SET_PLAYER_COLOR: "✔️ [Set] player color",
};

const state = {
  crewMembers: defaultCrewMembers.map(member => {
    if (member.color === defaultPlayerColor) {
      member.isPlayer = true;
    }
    return member;
  }),
  playerColor: JSON.parse(JSON.stringify(defaultPlayerColor)),
};

const getters = {
  canTrackOwnColor: (state, getters, rootState) => {
    return rootState.settings.canTrackOwnColor;
  },
  crewMembersWithoutPlayer: state => {
    return state.crewMembers.filter(
      member => member.color !== state.playerColor
    );
  },
  usableCrewMembers: (state, getters) => {
    return getters.canTrackOwnColor === true
      ? state.crewMembers
      : getters.crewMembersWithoutPlayer;
  },
  activeCrewMembers: (state, getters) => {
    return getters.usableCrewMembers.filter(member => member.isActive === true);
  },
  activeCrewMembersWithoutPlayer: (state, getters) => {
    return getters.activeCrewMembers.filter(
      member => member.color !== state.playerColor
    );
  },
  inactiveCrewMembers: (state, getters) => {
    return state.crewMembers.filter(member => {
      if (getters.canTrackOwnColor === true) {
        return member.isActive === false;
      } else {
        return member.color !== state.playerColor && member.isActive === false;
      }
    });
  },
  deadCrewMembers: state => {
    return state.crewMembers.filter(member => member.isDead === true);
  },
  aliveCrewMembers: state => {
    return state.crewMembers.filter(member => member.isDead === false);
  },
  crewMembersDoneWithTasks: state => {
    return state.crewMembers.filter(member => member.isDoneWithTasks === true);
  },
  crewMembersNotDoneWithTasks: state => {
    return state.crewMembers.filter(member => member.isDoneWithTasks === false);
  },
  crewMemberWithHighestMeetingsHeld: state => {
    return state.crewMembers.sort((a, b) => {
      let result = 0;
      if (a.totalMeetingsHeld > b.totalMeetingsHeld) {
        result = 1;
      } else if (a.totalMeetingsHeld < b.totalMeetingsHeld) {
        result = -1;
      }
      return result;
    });
  },
  mostSuspectedCrewMember: state => {
    return state.crewMembers.sort((a, b) => {
      let result = 0;
      if (a.suspectedBy.length > b.suspectedBy.length) {
        result = 1;
      } else if (a.suspectedBy.length < b.suspectedBy.length) {
        result = -1;
      }
      return result;
    });
  },
  mostProtectedCrewMember: state => {
    return state.crewMembers.sort((a, b) => {
      let result = 0;
      if (a.protectedBy.length > b.protectedBy.length) {
        result = 1;
      } else if (a.protectedBy.length < b.protectedBy.length) {
        result = -1;
      }
      return result;
    });
  },
  crewMembersProtectedByPlayer: (state, getters) => {
    return getters.usableCrewMembers.filter(member => {
      return (
        member.isActive === true &&
        member.protectedBy.includes(state.playerColor) === true
      );
    });
  },
  unknownCrewMembersForPlayer: (state, getters) => {
    return getters.usableCrewMembers.filter(member => {
      return (
        member.isActive === true &&
        member.isDead === false &&
        member.suspectedBy.includes(state.playerColor) === false &&
        member.protectedBy.includes(state.playerColor) === false
      );
    });
  },
  crewMembersSuspectedByPlayer: (state, getters) => {
    return getters.usableCrewMembers.filter(member => {
      return (
        member.isActive === true &&
        member.suspectedBy.includes(state.playerColor) === true
      );
    });
  },
  getAllMembersSuspectedBy: (state, getters) => accuser => {
    return getters.usableCrewMembers.filter(
      member => member.suspectedBy.includes(accuser.color) === true
    );
  },
  getAllMembersProtectedBy: (state, getters) => protector => {
    return getters.usableCrewMembers.filter(
      member => member.protectedBy.includes(protector.color) === true
    );
  },
  playerCrewMember: state => {
    return state.crewMembers.find(member => member.color === state.playerColor);
  },
  isPlayerImposter: (state, getters) => {
    return getters.playerCrewMember.isImposter === true;
  },
};

const mutations = {
  [types.SET_CREW](state, newCrew) {
    state.crewMembers = newCrew;
  },
  [types.SET_PLAYER_COLOR](state, color) {
    state.playerColor = color;
  },
};

const actions = {
  resetAllCrew({ commit, state }) {
    const defaultCrew = JSON.parse(JSON.stringify(defaultCrewMembers));
    // Preserve player names on reset
    const newCrew = defaultCrew.map(defaultMember => {
      const playerName = state.crewMembers.find(
        originalMember => originalMember.color === defaultMember.color
      ).playerName;
      defaultMember.playerName = playerName;
      defaultMember.isPlayer = defaultMember.color === state.playerColor;
      return defaultMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  resetActiveCrew({ commit, state }) {
    const newCrew = state.crewMembers.map(member => {
      member.isDead = false;
      member.isImposter = false;
      member.suspectedBy = [];
      member.protectedBy = [];
      member.isDoneWithTasks = false;
      member.totalMeetingsHeld = 0;
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setPlayerColor({ commit, state }, color) {
    commit(types.SET_PLAYER_COLOR, color);
    const newCrew = state.crewMembers.map(member => {
      member.isPlayer = member.color === color;
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setInactiveCrewMembers({ commit, state }, inactiveMembers) {
    const newCrew = state.crewMembers.map(member => {
      if (
        inactiveMembers
          .map(inactiveMember => inactiveMember.color)
          .includes(member.color) === true
      ) {
        member.isActive = false;
        member.isDead = false;
        member.suspectedBy = [];
        member.protectedBy = [];
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setProtectedCrewMembers({ commit, state }, protectedMembers) {
    const newCrew = state.crewMembers.map(member => {
      if (
        member.color !== state.playerColor &&
        protectedMembers
          .map(protectedMember => protectedMember.color)
          .includes(member.color) === true
      ) {
        member.isActive = true;
        member.isDead = false;
        member.isImposter = false;
        if (member.protectedBy.includes(state.playerColor) === false) {
          member.protectedBy = member.protectedBy.concat(state.playerColor);
        }
        member.suspectedBy = member.suspectedBy.filter(
          memberColor => memberColor !== state.playerColor
        );
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setUnknownCrewMembers({ commit, state }, unknownMembers) {
    const newCrew = (state.crewMembers = state.crewMembers.map(member => {
      if (
        unknownMembers
          .map(unknownMember => unknownMember.color)
          .includes(member.color) === true
      ) {
        member.isActive = true;
        member.isDead = false;
        member.isImposter = false;
        if (member.protectedBy.includes(state.playerColor) === true) {
          member.protectedBy = member.protectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
        if (member.suspectedBy.includes(state.playerColor) === true) {
          member.suspectedBy = member.suspectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
      }
      return member;
    }));
    commit(types.SET_CREW, newCrew);
  },
  setSuspectedCrewMembers({ commit, state }, suspectedMembers) {
    const newCrew = state.crewMembers.map(member => {
      if (
        member.color !== state.playerColor &&
        suspectedMembers
          .map(suspectedMember => suspectedMember.color)
          .includes(member.color) === true
      ) {
        member.isActive = true;
        member.isDead = false;
        if (member.protectedBy.includes(state.playerColor) === true) {
          member.protectedBy = member.protectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
        if (member.suspectedBy.includes(state.playerColor) === false) {
          member.suspectedBy = member.suspectedBy.concat(state.playerColor);
        }
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setDeadCrewMembers({ commit, state }, deadMembers) {
    const newCrew = state.crewMembers.map(member => {
      if (
        deadMembers
          .map(deadMember => deadMember.color)
          .includes(member.color) === true
      ) {
        member.isActive = true;
        member.isDead = true;
        if (member.protectedBy.includes(state.playerColor) === true) {
          member.protectedBy = member.protectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
        if (member.suspectedBy.includes(state.playerColor) === true) {
          member.suspectedBy = member.suspectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  linkSuspectsWithAccuser({ commit, state }, { suspects, accuser }) {
    const newCrew = state.crewMembers.map(member => {
      if (
        suspects
          .map(suspectedMember => suspectedMember.color)
          .filter(color => color !== accuser.color)
          .includes(member.color) === true
      ) {
        if (member.suspectedBy.includes(accuser.color) === false) {
          member.suspectedBy = member.suspectedBy.concat(accuser.color);
          member.isActive = true;
        }
        member.protectedBy = member.protectedBy.filter(
          protectorColor => protectorColor !== accuser.color
        );
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  linkInnocentsWithProtector({ commit, state }, { innocents, protector }) {
    const newCrew = state.crewMembers.map(member => {
      if (
        innocents
          .map(protectedMember => protectedMember.color)
          .filter(color => color !== protector.color)
          .includes(member.color) === true
      ) {
        if (member.protectedBy.includes(protector.color) === false) {
          member.protectedBy = member.protectedBy.concat(protector.color);
          member.isActive = true;
        }
        member.suspectedBy = member.suspectedBy.filter(
          accuserColor => accuserColor !== protector.color
        );
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setCrewMemberIsDoneWithTasks({ commit, state }, { member, isDone }) {
    const newCrew = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.isDoneWithTasks = isDone;
      }
      return someMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  setMemberIsImposter({ commit, state }, { member, isImposter }) {
    const newCrew = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.isImposter = isImposter;
        if (someMember.isDead === false && member.color !== state.playerColor) {
          someMember.protectedBy = someMember.protectedBy.filter(
            protectorColor => protectorColor !== state.playerColor
          );
          someMember.suspectedBy = [
            // Use Set to avoid duplicates
            ...new Set(someMember.suspectedBy.concat(state.playerColor)),
          ];
        }
      }
      return someMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  setCrewMemberTotalMeetings({ commit, state }, { member, meetingsCount }) {
    const newCrew = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.totalMeetingsHeld = meetingsCount;
      }
      return someMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  setMemberAsUnknown({ commit, state }, member) {
    const newCrew = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.isActive = true;
        someMember.isDead = false;
        if (someMember.protectedBy.includes(state.playerColor) === true) {
          someMember.protectedBy = someMember.protectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
        if (someMember.suspectedBy.includes(state.playerColor) === true) {
          someMember.suspectedBy = someMember.suspectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
      }
      return someMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  setMemberAsInactive({ commit, state }, member) {
    const newCrew = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.isActive = false;
        someMember.isDead = false;
        if (someMember.protectedBy.includes(state.playerColor) === true) {
          someMember.protectedBy = someMember.protectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
        if (someMember.suspectedBy.includes(state.playerColor) === true) {
          someMember.suspectedBy = someMember.suspectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
      }
      return someMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  removeProtectedFromProtector(
    { commit, state },
    { protectedMember, protector }
  ) {
    const newCrew = state.crewMembers.map(member => {
      if (member.color === protectedMember.color) {
        member.protectedBy = member.protectedBy.filter(
          memberColor => memberColor !== protector.color
        );
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  removeSuspectFromAccuser({ commit, state }, { suspect, accuser }) {
    const newCrew = state.crewMembers.map(member => {
      if (member.color === suspect.color) {
        member.suspectedBy = member.suspectedBy.filter(
          memberColor => memberColor !== accuser.color
        );
      }
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setAllMembersAsUnknown({ commit, state }) {
    const newCrew = state.crewMembers.map(member => {
      member.isActive = true;
      member.isDead = false;
      member.suspectedBy = member.suspectedBy.filter(
        memberColor => memberColor !== state.playerColor
      );
      member.protectedBy = member.protectedBy.filter(
        memberColor => memberColor !== state.playerColor
      );
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
  setCrewMemberPlayerName({ commit, state }, { color, playerName }) {
    const newCrew = state.crewMembers.map(someMember => {
      if (someMember.color === color) {
        someMember.playerName = playerName;
      }
      return someMember;
    });
    commit(types.SET_CREW, newCrew);
  },
  resetAllPlayerNames({ commit, state }) {
    const newCrew = state.crewMembers.map(member => {
      member.playerName = "";
      return member;
    });
    commit(types.SET_CREW, newCrew);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
