const types = {
  SET_CREW: "✔️[Set] crew members",
  RESET_ALL_CREW: "✨[Reset] all crew",
  RESET_ACTIVE_CREW: "✨[Reset] active crew",
  SET_PLAYER_COLOR: "✔️ [Set] player color",
  SET_INACTIVE_CREW_MEMBERS: "✔️ [Set] inactive crew members",
  SET_PROTECTED_CREW_MEMBERS: "✔️ [Set] protected crew members",
  SET_UNKNOWN_CREW_MEMBERS: "✔️ [Set] unknown crew members",
  SET_SUSPECTED_CREW_MEMBERS: "✔️ [Set] suspected crew members",
  SET_DEAD_CREW_MEMBERS: "✔️ [Set] dead crew members",
  LINK_SUSPECTS_WITH_ACCUSER: "✔️ [Link] suspects with accuser",
  LINK_INNOCENTS_WITH_PROTECTOR: "✔️ [Link] innocents with protector",
  SET_MEMBER_DONE_WITH_TASKS: "✔️ [Set] member done with tasks",
  SET_MEMBER_MEETINGS_HELD: "✔️ [Set] member total meetings held",
  SET_MEMBER_AS_UNKNOWN: "✔️ [Set] member as unknown",
  SET_MEMBER_AS_INACTIVE: "✔️ [Set] member as inactive",
  REMOVE_PROTECTED_FROM_PROTECTOR: "✔️ [Removed] protected from protector",
  REMOVE_SUSPECT_FROM_ACCUSER: "✔️ [Removed] suspect from accuser",
};

const defaultCrewMembers = [
  {
    color: "red",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "blue",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "green",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "pink",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "orange",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "yellow",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "black",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "white",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "purple",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "brown",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "cyan",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
  {
    color: "lime",
    isActive: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  },
];

const defaultPlayerColor = "yellow";

const state = {
  crewMembers: JSON.parse(JSON.stringify(defaultCrewMembers)),
  playerColor: JSON.parse(JSON.stringify(defaultPlayerColor)),
};

const getters = {
  crewMembersWithoutPlayer: state => {
    return state.crewMembers.filter(
      member => member.color !== state.playerColor
    );
  },
  activeCrewMembers: state => {
    return state.crewMembers.filter(member => member.isActive === true);
  },
  activeCrewMembersWithoutPlayer: (state, getters) => {
    return getters.activeCrewMembers.filter(
      member => member.color !== state.playerColor
    );
  },
  inactiveCrewMembers: state => {
    return state.crewMembers.filter(member => {
      return member.color !== state.playerColor && member.isActive === false;
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
    return getters.crewMembersWithoutPlayer.filter(member => {
      return (
        member.isActive === true &&
        member.protectedBy.includes(state.playerColor) === true
      );
    });
  },
  unknownCrewMembersForPlayer: (state, getters) => {
    return getters.crewMembersWithoutPlayer.filter(member => {
      return (
        member.isActive === true &&
        member.isDead === false &&
        member.suspectedBy.includes(state.playerColor) === false &&
        member.protectedBy.includes(state.playerColor) === false
      );
    });
  },
  crewMembersSuspectedByPlayer: (state, getters) => {
    return getters.crewMembersWithoutPlayer.filter(member => {
      return (
        member.isActive === true &&
        member.suspectedBy.includes(state.playerColor) === true
      );
    });
  },
};

const mutations = {
  [types.SET_CREW](state, newCrew) {
    state.crewMembers = newCrew;
  },
  [types.RESET_ALL_CREW](state) {
    state.crewMembers = JSON.parse(JSON.stringify(defaultCrewMembers));
  },
  [types.RESET_ACTIVE_CREW](state) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
        member.isDead = false;
        member.suspectedBy = [];
        member.protectedBy = [];
        member.isDoneWithTasks = false;
        member.totalMeetingsHeld = 0;
        return member;
      });
  },
  [types.SET_PLAYER_COLOR](state, color) {
    state.playerColor = color;
  },
  [types.SET_INACTIVE_CREW_MEMBERS](state, inactiveMembers) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
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
  },
  [types.SET_PROTECTED_CREW_MEMBERS](state, protectedMembers) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
        if (
          protectedMembers
            .map(protectedMember => protectedMember.color)
            .includes(member.color) === true
        ) {
          member.isActive = true;
          member.isDead = false;
          if (member.protectedBy.includes(state.playerColor) === false) {
            member.protectedBy = member.protectedBy.concat(state.playerColor);
          }
          member.suspectedBy = member.suspectedBy.filter(
            memberColor => memberColor !== state.playerColor
          );
        }
        return member;
      });
  },
  [types.SET_UNKNOWN_CREW_MEMBERS](state, unknownMembers) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
        if (
          unknownMembers
            .map(unknownMember => unknownMember.color)
            .includes(member.color) === true
        ) {
          member.isActive = true;
          member.isDead = false;
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
  },
  [types.SET_SUSPECTED_CREW_MEMBERS](state, suspectedMembers) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
        if (
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
  },
  [types.SET_DEAD_CREW_MEMBERS](state, deadMembers) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
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
  },
  [types.LINK_SUSPECTS_WITH_ACCUSER](state, { suspects, accuser }) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
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
        }
        return member;
      });
  },
  [types.LINK_INNOCENTS_WITH_PROTECTOR](state, { innocents, protector }) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
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
        }
        return member;
      });
  },
  [types.SET_MEMBER_DONE_WITH_TASKS](state, { member, isDone }) {
    state.crewMembers = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.isDoneWithTasks = isDone;
      }
      return someMember;
    });
  },
  [types.SET_MEMBER_MEETINGS_HELD](state, { member, meetingsCount }) {
    state.crewMembers = state.crewMembers.map(someMember => {
      if (someMember.color === member.color) {
        someMember.totalMeetingsHeld = meetingsCount;
      }
      return someMember;
    });
  },
  [types.SET_MEMBER_AS_UNKNOWN](state, member) {
    state.crewMembers = state.crewMembers.map(someMember => {
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
  },
  [types.SET_MEMBER_AS_INACTIVE](state, member) {
    state.crewMembers = state.crewMembers.map(someMember => {
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
  },
  [types.REMOVE_PROTECTED_FROM_PROTECTOR](
    state,
    { protectedMember, protector }
  ) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
        if (member.color === protectedMember.color) {
          member.protectedBy = member.protectedBy.filter(
            memberColor => memberColor !== protector.color
          );
        }
        return member;
      });
  },
  [types.REMOVE_SUSPECT_FROM_ACCUSER](state, { suspect, accuser }) {
    state.crewMembers = state.crewMembers
      .filter(member => member.color !== state.playerColor)
      .map(member => {
        if (member.color === suspect.color) {
          member.suspectedBy = member.suspectedBy.filter(
            memberColor => memberColor !== accuser.color
          );
        }
        return member;
      });
  },
};

const actions = {
  async resetAllCrew({ commit }) {
    commit(types.RESET_ALL_CREW);
  },
  async resetActiveCrew({ commit }) {
    commit(types.RESET_ACTIVE_CREW);
  },
  async setPlayerColor({ commit }, color) {
    commit(types.SET_PLAYER_COLOR, color);
  },
  async setInactiveCrewMembers({ commit }, members) {
    commit(types.SET_INACTIVE_CREW_MEMBERS, members);
  },
  async setProtectedCrewMembers({ commit }, members) {
    commit(types.SET_PROTECTED_CREW_MEMBERS, members);
  },
  async setUnknownCrewMembers({ commit }, members) {
    commit(types.SET_UNKNOWN_CREW_MEMBERS, members);
  },
  async setSuspectedCrewMembers({ commit }, members) {
    commit(types.SET_SUSPECTED_CREW_MEMBERS, members);
  },
  async setDeadCrewMembers({ commit }, members) {
    commit(types.SET_DEAD_CREW_MEMBERS, members);
  },
  async linkSuspectsWithAccuser({ commit }, { suspects, accuser }) {
    commit(types.LINK_SUSPECTS_WITH_ACCUSER, { suspects, accuser });
  },
  async linkInnocentsWithProtector({ commit }, { innocents, protector }) {
    commit(types.LINK_INNOCENTS_WITH_PROTECTOR, { innocents, protector });
  },
  async setCrewMemberIsDoneWithTasks({ commit }, { member, isDone }) {
    commit(types.SET_MEMBER_DONE_WITH_TASKS, { member, isDone });
  },
  async setCrewMemberTotalMeetings({ commit }, { member, meetingsCount }) {
    commit(types.SET_MEMBER_MEETINGS_HELD, { member, meetingsCount });
  },
  async setMemberAsUnknown({ commit }, member) {
    commit(types.SET_MEMBER_AS_UNKNOWN, member);
  },
  async setMemberAsInactive({ commit }, member) {
    commit(types.SET_MEMBER_AS_INACTIVE, member);
  },
  async removeProtectedFromProtector(
    { commit },
    { protectedMember, protector }
  ) {
    commit(types.REMOVE_PROTECTED_FROM_PROTECTOR, {
      protectedMember,
      protector,
    });
  },
  async removeSuspectFromAccuser({ commit }, { suspect, accuser }) {
    commit(types.REMOVE_SUSPECT_FROM_ACCUSER, { suspect, accuser });
  },
  async setAllMembersAsUnknown({ commit, state, getters }) {
    const newCrew = getters.crewMembersWithoutPlayer.map(member => {
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
