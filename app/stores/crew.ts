import allColors from "~/utils/playerColors.js";

export interface CrewMember {
  color: string;
  playerName: string;
  isPlayer: boolean;
  isActive: boolean;
  isImposter: boolean;
  isDead: boolean;
  isDoneWithTasks: boolean;
  totalMeetingsHeld: number;
  suspectedBy: string[];
  protectedBy: string[];
}

const DEFAULT_PLAYER_COLOR = "yellow";

function createDefaultCrewMembers(): CrewMember[] {
  return (allColors as string[]).map((colorName) => ({
    color: colorName,
    playerName: "",
    isPlayer: colorName === DEFAULT_PLAYER_COLOR,
    isActive: false,
    isImposter: false,
    isDead: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  }));
}

export const useCrewStore = defineStore("crew", () => {
  const settingsStore = useSettingsStore();

  const crewMembers = ref<CrewMember[]>(createDefaultCrewMembers());
  const playerColor = ref<string>(DEFAULT_PLAYER_COLOR);

  // Getters
  const canTrackOwnColor = computed(() => settingsStore.canTrackOwnColor);

  const crewMembersWithoutPlayer = computed(() =>
    crewMembers.value.filter((m) => m.color !== playerColor.value)
  );

  const usableCrewMembers = computed(() =>
    canTrackOwnColor.value ? crewMembers.value : crewMembersWithoutPlayer.value
  );

  const activeCrewMembers = computed(() =>
    usableCrewMembers.value.filter((m) => m.isActive)
  );

  const activeCrewMembersWithoutPlayer = computed(() =>
    activeCrewMembers.value.filter((m) => m.color !== playerColor.value)
  );

  const inactiveCrewMembers = computed(() =>
    crewMembers.value.filter((m) => {
      if (canTrackOwnColor.value) return !m.isActive;
      return m.color !== playerColor.value && !m.isActive;
    })
  );

  const deadCrewMembers = computed(() =>
    crewMembers.value.filter((m) => m.isDead)
  );

  const aliveCrewMembers = computed(() =>
    crewMembers.value.filter((m) => !m.isDead)
  );

  const crewMembersDoneWithTasks = computed(() =>
    crewMembers.value.filter((m) => m.isDoneWithTasks)
  );

  const crewMembersNotDoneWithTasks = computed(() =>
    crewMembers.value.filter((m) => !m.isDoneWithTasks)
  );

  const playerCrewMember = computed(() =>
    crewMembers.value.find((m) => m.color === playerColor.value)
  );

  const isPlayerImposter = computed(
    () => playerCrewMember.value?.isImposter === true
  );

  const crewMembersProtectedByPlayer = computed(() =>
    usableCrewMembers.value.filter(
      (m) => m.isActive && m.protectedBy.includes(playerColor.value)
    )
  );

  const unknownCrewMembersForPlayer = computed(() =>
    usableCrewMembers.value.filter(
      (m) =>
        m.isActive &&
        !m.isDead &&
        !m.suspectedBy.includes(playerColor.value) &&
        !m.protectedBy.includes(playerColor.value)
    )
  );

  const crewMembersSuspectedByPlayer = computed(() =>
    usableCrewMembers.value.filter(
      (m) => m.isActive && m.suspectedBy.includes(playerColor.value)
    )
  );

  function getAllMembersSuspectedBy(accuser: CrewMember): CrewMember[] {
    return usableCrewMembers.value.filter((m) =>
      m.suspectedBy.includes(accuser.color)
    );
  }

  function getAllMembersProtectedBy(protector: CrewMember): CrewMember[] {
    return usableCrewMembers.value.filter((m) =>
      m.protectedBy.includes(protector.color)
    );
  }

  // Actions
  function resetAllCrew() {
    const defaultCrew = createDefaultCrewMembers();
    crewMembers.value = defaultCrew.map((defaultMember) => {
      const existing = crewMembers.value.find(
        (m) => m.color === defaultMember.color
      );
      return {
        ...defaultMember,
        playerName: existing?.playerName ?? "",
        isPlayer: defaultMember.color === playerColor.value,
      };
    });
  }

  function resetActiveCrew() {
    crewMembers.value = crewMembers.value.map((m) => ({
      ...m,
      isDead: false,
      isImposter: false,
      suspectedBy: [],
      protectedBy: [],
      isDoneWithTasks: false,
      totalMeetingsHeld: 0,
    }));
  }

  function setPlayerColor(color: string) {
    playerColor.value = color;
    crewMembers.value = crewMembers.value.map((m) => ({
      ...m,
      isPlayer: m.color === color,
    }));
  }

  function setInactiveCrewMembers(inactiveMembers: CrewMember[]) {
    const inactiveColors = inactiveMembers.map((m) => m.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (inactiveColors.includes(m.color)) {
        return {
          ...m,
          isActive: false,
          isDead: false,
          suspectedBy: [],
          protectedBy: [],
        };
      }
      return m;
    });
  }

  function setProtectedCrewMembers(protectedMembers: CrewMember[]) {
    const protectedColors = protectedMembers.map((m) => m.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color !== playerColor.value && protectedColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          isDead: false,
          isImposter: false,
          protectedBy: m.protectedBy.includes(playerColor.value)
            ? m.protectedBy
            : [...m.protectedBy, playerColor.value],
          suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
        };
      }
      return m;
    });
  }

  function setUnknownCrewMembers(unknownMembers: CrewMember[]) {
    const unknownColors = unknownMembers.map((m) => m.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (unknownColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          isDead: false,
          isImposter: false,
          protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
          suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
        };
      }
      return m;
    });
  }

  function setSuspectedCrewMembers(suspectedMembers: CrewMember[]) {
    const suspectedColors = suspectedMembers.map((m) => m.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color !== playerColor.value && suspectedColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          isDead: false,
          protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
          suspectedBy: m.suspectedBy.includes(playerColor.value)
            ? m.suspectedBy
            : [...m.suspectedBy, playerColor.value],
        };
      }
      return m;
    });
  }

  function setDeadCrewMembers(deadMembers: CrewMember[]) {
    const deadColors = deadMembers.map((m) => m.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (deadColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          isDead: true,
          protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
          suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
        };
      }
      return m;
    });
  }

  function linkSuspectsWithAccuser({
    suspects,
    accuser,
  }: {
    suspects: CrewMember[];
    accuser: CrewMember;
  }) {
    const suspectColors = suspects
      .map((m) => m.color)
      .filter((c) => c !== accuser.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (suspectColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          suspectedBy: m.suspectedBy.includes(accuser.color)
            ? m.suspectedBy
            : [...m.suspectedBy, accuser.color],
          protectedBy: m.protectedBy.filter((c) => c !== accuser.color),
        };
      }
      return m;
    });
  }

  function linkInnocentsWithProtector({
    innocents,
    protector,
  }: {
    innocents: CrewMember[];
    protector: CrewMember;
  }) {
    const innocentColors = innocents
      .map((m) => m.color)
      .filter((c) => c !== protector.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (innocentColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          protectedBy: m.protectedBy.includes(protector.color)
            ? m.protectedBy
            : [...m.protectedBy, protector.color],
          suspectedBy: m.suspectedBy.filter((c) => c !== protector.color),
        };
      }
      return m;
    });
  }

  function setCrewMemberIsDoneWithTasks({
    member,
    isDone,
  }: {
    member: CrewMember;
    isDone: boolean;
  }) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === member.color) return { ...m, isDoneWithTasks: isDone };
      return m;
    });
  }

  function setMemberIsImposter({
    member,
    isImposter,
  }: {
    member: CrewMember;
    isImposter: boolean;
  }) {
    const isPlayerCurrentlyImposter =
      playerCrewMember.value?.isImposter === true;
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === member.color) {
        let updated = { ...m, isImposter };
        if (!m.isDead && m.color !== playerColor.value) {
          if (isImposter && isPlayerCurrentlyImposter) {
            updated = {
              ...updated,
              suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
              protectedBy: [...new Set([...m.protectedBy, playerColor.value])],
            };
          } else if (!isImposter && isPlayerCurrentlyImposter) {
            updated = {
              ...updated,
              protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
              suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
            };
          } else {
            updated = {
              ...updated,
              protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
              suspectedBy: [...new Set([...m.suspectedBy, playerColor.value])],
            };
          }
        }
        return updated;
      }
      return m;
    });
  }

  function setCrewMemberTotalMeetings({
    member,
    meetingsCount,
  }: {
    member: CrewMember;
    meetingsCount: number;
  }) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === member.color)
        return { ...m, totalMeetingsHeld: meetingsCount };
      return m;
    });
  }

  function setMemberAsUnknown(member: CrewMember) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === member.color) {
        return {
          ...m,
          isActive: true,
          isDead: false,
          protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
          suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
        };
      }
      return m;
    });
  }

  function setMemberAsInactive(member: CrewMember) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === member.color) {
        return {
          ...m,
          isActive: false,
          isDead: false,
          protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
          suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
        };
      }
      return m;
    });
  }

  function removeProtectedFromProtector({
    protectedMember,
    protector,
  }: {
    protectedMember: CrewMember;
    protector: CrewMember;
  }) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === protectedMember.color) {
        return {
          ...m,
          protectedBy: m.protectedBy.filter((c) => c !== protector.color),
        };
      }
      return m;
    });
  }

  function removeSuspectFromAccuser({
    suspect,
    accuser,
  }: {
    suspect: CrewMember;
    accuser: CrewMember;
  }) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === suspect.color) {
        return {
          ...m,
          suspectedBy: m.suspectedBy.filter((c) => c !== accuser.color),
        };
      }
      return m;
    });
  }

  function setAllMembersAsUnknown() {
    crewMembers.value = crewMembers.value.map((m) => ({
      ...m,
      isActive: true,
      isDead: false,
      suspectedBy: m.suspectedBy.filter((c) => c !== playerColor.value),
      protectedBy: m.protectedBy.filter((c) => c !== playerColor.value),
    }));
  }

  function setCrewMemberPlayerName({
    color,
    playerName,
  }: {
    color: string;
    playerName: string;
  }) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === color) return { ...m, playerName };
      return m;
    });
  }

  function resetAllPlayerNames() {
    crewMembers.value = crewMembers.value.map((m) => ({
      ...m,
      playerName: "",
    }));
  }

  return {
    crewMembers,
    playerColor,
    canTrackOwnColor,
    crewMembersWithoutPlayer,
    usableCrewMembers,
    activeCrewMembers,
    activeCrewMembersWithoutPlayer,
    inactiveCrewMembers,
    deadCrewMembers,
    aliveCrewMembers,
    crewMembersDoneWithTasks,
    crewMembersNotDoneWithTasks,
    playerCrewMember,
    isPlayerImposter,
    crewMembersProtectedByPlayer,
    unknownCrewMembersForPlayer,
    crewMembersSuspectedByPlayer,
    getAllMembersSuspectedBy,
    getAllMembersProtectedBy,
    resetAllCrew,
    resetActiveCrew,
    setPlayerColor,
    setInactiveCrewMembers,
    setProtectedCrewMembers,
    setUnknownCrewMembers,
    setSuspectedCrewMembers,
    setDeadCrewMembers,
    linkSuspectsWithAccuser,
    linkInnocentsWithProtector,
    setCrewMemberIsDoneWithTasks,
    setMemberIsImposter,
    setCrewMemberTotalMeetings,
    setMemberAsUnknown,
    setMemberAsInactive,
    removeProtectedFromProtector,
    removeSuspectFromAccuser,
    setAllMembersAsUnknown,
    setCrewMemberPlayerName,
    resetAllPlayerNames,
  };
});
