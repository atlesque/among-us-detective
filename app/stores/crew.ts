import allColors from "~/utils/playerColors.js";
import { useImpostorStore } from "~/stores/impostor";
import { useSettingsStore } from "~/stores/settings";
import { useRoundsStore } from "~/stores/rounds";

export type ColumnStatus = 'hard_clear' | 'trusted' | 'unknown' | 'suspicious' | 'impostor' | 'dead';

export const IMPOSTOR_ROLES = ['Impostor', 'Shapeshifter', 'Phantom', 'Viper'] as const;
export const CREW_ROLES = ['Detective', 'Judge', 'Scientist', 'Engineer', 'Noisemaker'] as const;

export type ImpostorRole = (typeof IMPOSTOR_ROLES)[number];
export type CrewRole = (typeof CREW_ROLES)[number];
export type Role = ImpostorRole | CrewRole | string | null;

export function isImpostorRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return (IMPOSTOR_ROLES as readonly string[]).includes(role);
}

export function isCrewRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return (CREW_ROLES as readonly string[]).includes(role);
}

function isImposterForState(
  status: ColumnStatus,
  previousStatus: ColumnStatus,
  role: string | null,
  roleConfirmed: boolean = false
): boolean {
  const effectiveStatus = status === 'dead' ? previousStatus : status;
  return effectiveStatus === 'impostor' || (isImpostorRole(role) && roleConfirmed);
}

export interface CrewMember {
  id: string;
  color: string;
  status: ColumnStatus;
  role: string | null;
  roleConfirmed: boolean;
  isDead: boolean;
  diedInRound?: number;
  previousStatus: ColumnStatus;
  mapPosition: { x: number; y: number } | null;
  playerName: string;
  isPlayer: boolean;
  isActive: boolean;
  isImposter: boolean;
  isDoneWithTasks: boolean;
  totalMeetingsHeld: number;
  suspectedBy: string[];
  protectedBy: string[];
}

const DEFAULT_PLAYER_COLOR = "yellow";

function createDefaultCrewMembers(): CrewMember[] {
  return (allColors as string[]).map((colorName, idx) => ({
    id: `player-${colorName}`,
    color: colorName,
    status: 'unknown' as ColumnStatus,
    role: null,
    roleConfirmed: false,
    isDead: false,
    diedInRound: undefined,
    previousStatus: 'unknown' as ColumnStatus,
    mapPosition: null,
    playerName: "",
    isPlayer: colorName === DEFAULT_PLAYER_COLOR,
    isActive: idx < 15,
    isImposter: false,
    isDoneWithTasks: false,
    totalMeetingsHeld: 0,
    suspectedBy: [],
    protectedBy: [],
  }));
}

export const useCrewStore = defineStore("crew", () => {
  const settingsStore = useSettingsStore();
  const impostorStore = useImpostorStore();

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

  const aliveCrewMembers = computed(() =>
    crewMembers.value.filter((m) => !m.isDead && m.status !== 'dead')
  );

  // Canonical 6-column hierarchy getters (only for active in-game players, excluding ME)
  const hardClearCrewMembers = computed(() =>
    crewMembers.value.filter((m) => m.isActive && m.color !== playerColor.value && m.status === 'hard_clear' && !m.isDead)
  );

  const trustedCrewMembers = computed(() =>
    crewMembers.value.filter((m) => m.isActive && m.color !== playerColor.value && m.status === 'trusted' && !m.isDead)
  );

  const unknownCrewMembers = computed(() =>
    crewMembers.value.filter(
      (m) => m.isActive && m.color !== playerColor.value && (m.status === 'unknown' || !m.status) && !m.isDead && m.status !== 'dead'
    )
  );

  const suspiciousCrewMembers = computed(() =>
    crewMembers.value.filter((m) => m.isActive && m.color !== playerColor.value && m.status === 'suspicious' && !m.isDead)
  );

  const impostorCrewMembers = computed(() =>
    crewMembers.value.filter((m) => m.isActive && m.color !== playerColor.value && m.status === 'impostor' && !m.isDead)
  );

  const deadCrewMembers = computed(() =>
    crewMembers.value.filter((m) => m.isActive && m.color !== playerColor.value && (m.isDead || m.status === 'dead'))
  );

  // Confirmed dead impostors (unverified suspect column placements do NOT count)
  const confirmedDeadImpostorsCount = computed(() => {
    const isImpMode = impostorStore.isImpostorModeActive;
    return crewMembers.value.filter((m) => {
      if (!m.isActive || (!m.isDead && m.status !== 'dead')) return false;
      // In Impostor mode, player or fellow impostor who died is a confirmed dead impostor
      if (isImpMode && (m.color === playerColor.value || impostorStore.isFellowImpostor(m.color))) {
        return true;
      }
      // In standard crew mode, only confirmed impostor role (e.g. verified role) counts
      return isImpostorRole(m.role) && m.roleConfirmed;
    }).length;
  });

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
    () => impostorStore.isImpostorModeActive || playerCrewMember.value?.isImposter === true
  );

  function syncFellowImpostor(member: CrewMember) {
    const confirmedImpostorRole = member.roleConfirmed && isImpostorRole(member.role)
      ? member.role
      : null;
    impostorStore.setFellowImpostorRole(
      member.color,
      impostorStore.isImpostorModeActive ? confirmedImpostorRole : null
    );
  }

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
        isActive: existing ? existing.isActive : defaultMember.isActive,
        playerName: existing?.playerName ?? "",
        isPlayer: defaultMember.color === playerColor.value,
        diedInRound: undefined,
      };
    });
  }

  function resetActiveCrew() {
    const roundsStore = useRoundsStore();
    crewMembers.value = crewMembers.value.map((m) => {
      // In a new round, dead players stay dead with their recorded diedInRound
      if (m.isDead || m.status === 'dead') {
        const previousStatus = m.previousStatus || 'unknown';
        return {
          ...m,
          isDead: true,
          status: 'dead' as ColumnStatus,
          isImposter: isImposterForState('dead', previousStatus, m.role, m.roleConfirmed),
          diedInRound: m.diedInRound || (roundsStore.currentRoundNumber - 1) || 1,
          mapPosition: null,
        };
      }
      // All deductions, roles, and claims persist seamlessly into the next round
      return {
        ...m,
        mapPosition: null,
      };
    });
  }

  function sanitizeRoleForStatus(
    role: Role,
    targetStatus: ColumnStatus,
    currentConfirmed: boolean
  ): { role: Role; roleConfirmed: boolean } {
    let nextRole = role;
    let nextConfirmed = currentConfirmed;
    const isImp = isImpostorRole(role);
    const isCrew = isCrewRole(role);

    // Hard Clear and Impostor are explicit confirmation points for matching role claims.
    if (targetStatus === 'hard_clear' && isImp) {
      nextRole = null;
      nextConfirmed = false;
    } else if (targetStatus === 'hard_clear' && isCrew) {
      nextConfirmed = true;
    } else if (targetStatus === 'impostor') {
      if (isCrew) {
        nextConfirmed = false;
      } else if (isImp) {
        nextConfirmed = true;
      }
    }

    const nextIsImp = isImpostorRole(nextRole);
    const nextIsCrew = isCrewRole(nextRole);

    // If crew role moved out of hard_clear, unverify!
    if (targetStatus !== 'dead' && nextIsCrew && targetStatus !== 'hard_clear' && nextConfirmed) {
      nextConfirmed = false;
    }
    // If impostor role moved out of impostor, unverify claim so it shows '?' instead of disappearing!
    if (targetStatus !== 'dead' && targetStatus !== 'impostor') {
      if (nextIsImp && nextConfirmed) {
        nextConfirmed = false;
      }
    }

    return { role: nextRole, roleConfirmed: nextConfirmed };
  }

  function setPlayerStatus(colorOrId: string, newStatus: ColumnStatus) {
    const roundsStore = useRoundsStore();
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === colorOrId || m.id === colorOrId) {
        const { role, roleConfirmed } = sanitizeRoleForStatus(m.role, newStatus, m.roleConfirmed);
        if (newStatus === 'dead') {
          const updated = {
            ...m,
            previousStatus: m.status !== 'dead' ? m.status : m.previousStatus || 'unknown',
            isDead: true,
            diedInRound: m.diedInRound || roundsStore.currentRoundNumber,
            status: 'dead' as ColumnStatus,
            role,
            roleConfirmed,
            isImposter: isImposterForState('dead', m.status !== 'dead' ? m.status : m.previousStatus, role, roleConfirmed),
          };
          return updated;
        } else {
          return {
            ...m,
            isDead: false,
            diedInRound: undefined,
            previousStatus: m.status !== 'dead' ? m.status : m.previousStatus,
            status: newStatus,
            role,
            roleConfirmed,
            isImposter: isImposterForState(newStatus, m.previousStatus, role, roleConfirmed),
          };
        }
      }
      return m;
    });
    const updatedMember = crewMembers.value.find((m) => m.color === colorOrId || m.id === colorOrId);
    if (updatedMember) syncFellowImpostor(updatedMember);
  }

  function togglePlayerDead(colorOrId: string) {
    const roundsStore = useRoundsStore();
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === colorOrId || m.id === colorOrId) {
        if (m.isDead || m.status === 'dead') {
          // Manual toggle reversal strictly for error correction
          const restoredStatus = (m.previousStatus && m.previousStatus !== 'dead')
            ? m.previousStatus
            : 'unknown';
          const { role } = sanitizeRoleForStatus(
            m.role,
            restoredStatus as ColumnStatus,
            false
          );
          const updated = {
            ...m,
            isDead: false,
            diedInRound: undefined,
            status: restoredStatus as ColumnStatus,
            role,
            roleConfirmed: false,
            isImposter: isImposterForState(restoredStatus, m.previousStatus, role, false),
          };
          return updated;
        } else {
          const roleConfirmed = m.roleConfirmed;
          const updated = {
            ...m,
            previousStatus: m.status,
            isDead: true,
            diedInRound: roundsStore.currentRoundNumber,
            status: 'dead' as ColumnStatus,
            roleConfirmed,
            isImposter: isImposterForState('dead', m.status, m.role, roleConfirmed),
          };
          return updated;
        }
      }
      return m;
    });
    const updatedMember = crewMembers.value.find((m) => m.color === colorOrId || m.id === colorOrId);
    if (updatedMember) syncFellowImpostor(updatedMember);
  }

  function setColumnMembers(status: ColumnStatus, members: CrewMember[]) {
    const memberColors = members.map((m) => m.color);
    const updatedMembers = crewMembers.value.map((m) => {
      if (memberColors.includes(m.color)) {
        const { role, roleConfirmed } = sanitizeRoleForStatus(m.role, status, m.roleConfirmed);
        if (status === 'dead') {
          const roundsStore = useRoundsStore();
          return {
            ...m,
            previousStatus: m.status !== 'dead' ? m.status : m.previousStatus || 'unknown',
            isDead: true,
            diedInRound: m.diedInRound || roundsStore.currentRoundNumber,
            status: 'dead' as ColumnStatus,
            role,
            roleConfirmed,
            isImposter: isImposterForState('dead', m.status !== 'dead' ? m.status : m.previousStatus, role, roleConfirmed),
          };
        } else {
          return {
            ...m,
            isDead: false,
            diedInRound: undefined,
            previousStatus: m.status !== 'dead' ? m.status : m.previousStatus,
            status: status,
            role,
            roleConfirmed,
            isImposter: isImposterForState(status, m.previousStatus, role, roleConfirmed),
          };
        }
      }
      return m;
    });

    // Preserve the order emitted by drag-and-drop within this column.
    const orderedMembers = new Map(members.map((member) => [member.color, memberColors.indexOf(member.color)]));
    const orderedColumnMembers = updatedMembers
      .filter((member) => orderedMembers.has(member.color))
      .sort((a, b) => (orderedMembers.get(a.color) ?? 0) - (orderedMembers.get(b.color) ?? 0));
    let columnIndex = 0;
    crewMembers.value = updatedMembers.map((member) => {
      if (!orderedMembers.has(member.color)) return member;
      return orderedColumnMembers[columnIndex++];
    });
    for (const color of memberColors) {
      const updatedMember = crewMembers.value.find((member) => member.color === color);
      if (updatedMember) syncFellowImpostor(updatedMember);
    }
  }

  function setPlayerRole(colorOrId: string, role: string | null, roleConfirmed = false) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === colorOrId || m.id === colorOrId) {
        const isCrew = isCrewRole(role);
        const isImp = isImpostorRole(role);
        if (isImp && m.status === 'hard_clear') {
          return {
            ...m,
            role: null,
            roleConfirmed: false,
            isImposter: isImposterForState(m.status, m.previousStatus, null),
          };
        }
        const isRoleConfirmedByColumn = !m.isDead && (
          (isCrew && m.status === 'hard_clear') ||
          (isImp && m.status === 'impostor')
        );

        let newStatus = m.status;
        if (isImp && (roleConfirmed || isRoleConfirmedByColumn) && !m.isDead && newStatus !== 'impostor') {
          newStatus = 'impostor';
        }

        const wasImposter = m.isImposter || m.status === 'impostor' || m.previousStatus === 'impostor';
        const isDeadPlayer = m.isDead || newStatus === 'dead';
        const finalConfirmed = roleConfirmed || isRoleConfirmedByColumn;
        const updated = {
          ...m,
          role,
          roleConfirmed: finalConfirmed,
          status: newStatus,
          isImposter: isImposterForState(newStatus, m.previousStatus, role, finalConfirmed),
        };
        return updated;
      }
      return m;
    });
    const updatedMember = crewMembers.value.find((m) => m.color === colorOrId || m.id === colorOrId);
    if (updatedMember) syncFellowImpostor(updatedMember);
  }

  function toggleRoleConfirmed(colorOrId: string) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === colorOrId || m.id === colorOrId) {
        const newConfirmed = !m.roleConfirmed;
        const isImp = isImpostorRole(m.role);
        const wasImposter = m.isImposter || m.status === 'impostor' || m.previousStatus === 'impostor';
        const isDeadPlayer = m.isDead || m.status === 'dead';
        const updated = {
          ...m,
          roleConfirmed: newConfirmed,
          isImposter: isImposterForState(m.status, m.previousStatus, m.role, newConfirmed),
        };

        if (newConfirmed) {
          if (!updated.isDead) {
            updated.previousStatus = updated.status;
            if (isImp) {
              // Confirmed Impostor role moves to "impostor"!
              updated.status = 'impostor' as ColumnStatus;
              updated.isImposter = true;
            } else {
              // Confirmed Crew role moves to "hard_clear"!
              updated.status = 'hard_clear' as ColumnStatus;
            }
          }
        } else {
          // If reverted to unverified:
          if (!updated.isDead) {
            if (isImp) {
              if (updated.status === 'impostor') {
                updated.status = (updated.previousStatus && updated.previousStatus !== 'impostor')
                  ? updated.previousStatus
                  : (impostorStore.isImpostorModeActive ? 'unknown' : 'suspicious') as ColumnStatus;
              }
            } else {
              if (updated.status === 'hard_clear') {
                updated.status = (updated.previousStatus && updated.previousStatus !== 'hard_clear')
                  ? updated.previousStatus
                  : (impostorStore.isImpostorModeActive ? 'unknown' : 'trusted') as ColumnStatus;
              }
            }
            updated.isImposter = isImposterForState(updated.status, updated.previousStatus, updated.role, updated.roleConfirmed);
          }
        }
        return updated;
      }
      return m;
    });
    const updatedMember = crewMembers.value.find((m) => m.color === colorOrId || m.id === colorOrId);
    if (updatedMember) syncFellowImpostor(updatedMember);
  }

  function togglePlayerActive(colorOrId: string) {
    crewMembers.value = crewMembers.value.map((m) => {
      if (m.color === colorOrId || m.id === colorOrId) {
        // Prevent disabling ME (the user's own player is always active)
        if (m.color === playerColor.value && m.isActive) {
          return m;
        }
        const newActive = !m.isActive;
        return {
          ...m,
          isActive: newActive,
          // When turning back on, ALWAYS reset to 'unknown' cleanly
          status: newActive ? ('unknown' as ColumnStatus) : m.status,
          isDead: newActive ? false : m.isDead,
          diedInRound: newActive ? undefined : m.diedInRound,
          role: newActive ? null : m.role,
          roleConfirmed: newActive ? false : m.roleConfirmed,
          isImposter: newActive ? false : m.isImposter,
          previousStatus: newActive ? ('unknown' as ColumnStatus) : m.previousStatus,
        };
      }
      return m;
    });
  }

  function setPresetPlayerCount(count: number) {
    if (count <= 0) {
      // The 'Clear' preset deactivates everyone so players can pick custom lobby colors from scratch.
      // Having 0 active players temporarily pauses the round buttons until players are picked.
      crewMembers.value = crewMembers.value.map((m) => ({
        ...m,
        isActive: false,
      }));
      return;
    }

    if (count >= crewMembers.value.length) {
      crewMembers.value = crewMembers.value.map((m) => {
        const wasInactive = !m.isActive;
        return {
          ...m,
          isActive: true,
          status: wasInactive
            ? ('unknown' as ColumnStatus)
            : (m.status || ('unknown' as ColumnStatus)),
          isDead: wasInactive ? false : m.isDead,
          diedInRound: wasInactive ? undefined : m.diedInRound,
          role: wasInactive ? null : m.role,
          roleConfirmed: wasInactive ? false : m.roleConfirmed,
          isImposter: wasInactive ? false : m.isImposter,
          previousStatus: wasInactive ? ('unknown' as ColumnStatus) : m.previousStatus,
        };
      });
      return;
    }

    // Determine the exact set of colors to activate (exactly `count` members, guaranteeing ME is included)
    const targetColors = new Set<string>();

    // 1. Ensure ME is included if a player color is selected
    const meMember = crewMembers.value.find((m) => m.color === playerColor.value);
    if (meMember) {
      targetColors.add(meMember.color);
    }

    // 2. Fill the remaining slots in standard roster order until we reach `count`
    for (const color of (allColors as string[])) {
      if (targetColors.size >= count) break;
      targetColors.add(color);
    }

    // 3. Update crewMembers
    crewMembers.value = crewMembers.value.map((m) => {
      const isActive = targetColors.has(m.color);
      const wasInactive = !m.isActive && isActive;
      return {
        ...m,
        isActive,
        status: wasInactive
          ? ('unknown' as ColumnStatus)
          : (isActive && (!m.status || m.status === 'unknown') ? ('unknown' as ColumnStatus) : m.status),
        isDead: wasInactive ? false : m.isDead,
        diedInRound: wasInactive ? undefined : m.diedInRound,
        role: wasInactive ? null : m.role,
        roleConfirmed: wasInactive ? false : m.roleConfirmed,
        isImposter: wasInactive ? false : m.isImposter,
        previousStatus: wasInactive ? ('unknown' as ColumnStatus) : m.previousStatus,
      };
    });
  }

  function setPlayerColor(color: string) {
    playerColor.value = color;
    crewMembers.value = crewMembers.value.map((m) => ({
      ...m,
      isPlayer: m.color === color,
      isActive: m.color === color ? true : m.isActive,
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
    const roundsStore = useRoundsStore();
    const deadColors = deadMembers.map((m) => m.color);
    crewMembers.value = crewMembers.value.map((m) => {
      if (deadColors.includes(m.color)) {
        return {
          ...m,
          isActive: true,
          isDead: true,
          status: 'dead' as ColumnStatus,
          diedInRound: m.diedInRound || roundsStore.currentRoundNumber,
          previousStatus: m.status !== 'dead' ? m.status : m.previousStatus || 'unknown',
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
      status: 'unknown' as ColumnStatus,
      diedInRound: undefined,
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
    hardClearCrewMembers,
    trustedCrewMembers,
    unknownCrewMembers,
    suspiciousCrewMembers,
    impostorCrewMembers,
    confirmedDeadImpostorsCount,
    setPlayerStatus,
    togglePlayerDead,
    setColumnMembers,
    setPlayerRole,
    toggleRoleConfirmed,
    togglePlayerActive,
    setPresetPlayerCount,
    setCrewMemberPlayerName,
    resetAllPlayerNames,
  };
}, {
  persist: {
    afterHydrate: ({ store, pinia }) => {
      const hydratedStore = store as typeof store & { crewMembers: CrewMember[] };
      const normalizedMembers = hydratedStore.crewMembers.map((member) => {
        const effectiveStatus = member.status === 'dead' ? member.previousStatus : member.status;
        const hasIncompatibleImpostorRole = effectiveStatus === 'hard_clear' && isImpostorRole(member.role);
        const role = hasIncompatibleImpostorRole ? null : member.role;
        const roleConfirmed = hasIncompatibleImpostorRole ? false : member.roleConfirmed;

        const isImposter = isImposterForState(member.status, member.previousStatus, role, roleConfirmed);

        return { ...member, role, roleConfirmed, isImposter };
      });
      hydratedStore.crewMembers = normalizedMembers;

      // Rebuild partner badges from confirmed roles so stale persisted roles
      // cannot survive an incompatible role or hard-clear transition.
      const hydratedImpostorStore = useImpostorStore(pinia);
      hydratedImpostorStore.clearFellowImpostors();
      if (hydratedImpostorStore.isImpostorModeActive) {
        for (const member of normalizedMembers) {
          if (member.roleConfirmed && isImpostorRole(member.role)) {
            hydratedImpostorStore.setFellowImpostorRole(member.color, member.role);
          }
        }
      }
    },
  },
});
