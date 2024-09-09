import type { ParticipantStats } from "../../../types/participantStats";
import type { Set as GameSet } from "../../../types/set";
import type { TournamentMatchTracker } from "../../../types/tournamentTracker";

export function calculateStatsBySet(
	sets: GameSet[],
	options: boolean[],
	total: TournamentMatchTracker,
): TournamentMatchTracker {
	for (let i = 0; i < options.length - 1; i++) {
		if (options[i] === true) {
			// i == 0
			if (sets[i].stats == null) {
				return total;
			}

			if (i === 0) {
				return sets[i].stats!;
			}

			if (sets[i - 1].stats == null || sets[i].stats == null) {
				return total;
			}

			return calculateSetStats(sets[i].stats!, sets[i - 1].stats!);
		}
	}
	return total;
}

function calculateSetStats(
	first: TournamentMatchTracker,
	second: TournamentMatchTracker,
): TournamentMatchTracker {
	return {
		matchId: first.matchId,
		trackerId: first.trackerId,
		player1: calculateParticipantStatsBySet(
			first.player1 as ParticipantStats,
			second.player1 as ParticipantStats,
		),
		player2: calculateParticipantStatsBySet(
			first.player2 as ParticipantStats,
			second.player2 as ParticipantStats,
		),
		player3: first.player1?.isDouble
			? calculateParticipantStatsBySet(
					first.player3 as ParticipantStats,
					second.player3 as ParticipantStats,
				)
			: null,
		player4: first.player1?.isDouble
			? calculateParticipantStatsBySet(
					first.player4 as ParticipantStats,
					second.player4 as ParticipantStats,
				)
			: null,
	};
}

function calculateParticipantStatsBySet(
	first: ParticipantStats,
	second: ParticipantStats,
): ParticipantStats {
	return {
		...first,
		saveBreakPtsChances: first.saveBreakPtsChances - second.saveBreakPtsChances,
		breakPtsSaved: first.breakPtsSaved - second.breakPtsSaved,
		breakPtsChances: first.breakPtsChances - second.breakPtsChances,
		breakPts: first.breakPts - second.breakPts,
		// serv
		firstServIn: first.firstServIn - second.firstServIn,
		secondServIn: first.secondServIn - second.secondServIn,
		aces: first.aces - second.aces,
		dobleFaults: first.dobleFaults - second.dobleFaults,
		firstServWon: first.firstServWon - second.firstServWon,
		secondServWon: first.secondServWon - second.secondServWon,
		pointsWinnedFirstServ:
			first.pointsWinnedFirstServ - second.pointsWinnedFirstServ,
		pointsWinnedSecondServ:
			first.pointsWinnedSecondServ - second.pointsWinnedSecondServ,
		gamesWonServing: first.gamesWonServing - second.gamesWonServing,
		gamesLostServing: first.gamesLostServing - second.gamesLostServing,
		gamesWonReturning: first.gamesWonReturning - second.gamesWonReturning,
		gamesLostReturning: first.gamesLostReturning - second.gamesLostReturning,
		// return
		firstReturnWon: first.firstReturnWon - second.firstReturnWon,
		secondReturnWon: first.secondReturnWon - second.secondReturnWon,
		firstReturnWinner: first.firstReturnWinner - second.firstReturnWinner,
		secondReturnWinner: first.secondReturnWinner - second.secondReturnWinner,
		firstReturnIn: first.firstReturnIn - second.firstReturnIn,
		secondReturnIn: first.secondReturnIn - second.secondReturnIn,
		firstReturnOut: first.firstReturnOut - second.firstReturnOut,
		secondReturnOut: first.secondReturnOut - second.secondReturnOut,
		pointsWinnedFirstReturn:
			first.pointsWinnedFirstReturn - second.pointsWinnedFirstReturn,
		pointsWinnedSecondReturn:
			first.pointsWinnedSecondReturn - second.pointsWinnedSecondReturn,
		// places
		meshPointsWon: first.meshPointsWon - second.meshPointsWon,
		meshPointsLost: first.meshPointsLost - second.meshPointsLost,
		meshWinner: first.meshWinner - second.meshWinner,
		meshError: first.meshError - second.meshError,
		bckgPointsWon: first.bckgPointsWon - second.bckgPointsWon,
		bckgPointsLost: first.bckgPointsLost - second.bckgPointsLost,
		bckgWinner: first.bckgWinner - second.bckgWinner,
		bckgError: first.bckgError - second.bckgError,
		// rally
		shortRallyWon: first.shortRallyWon - second.shortRallyWon,
		shortRallyLost: first.shortRallyLost - second.shortRallyLost,
		mediumRallyWon: first.mediumRallyWon - second.mediumRallyWon,
		mediumRallyLost: first.mediumRallyLost - second.mediumRallyLost,
		longRallyWon: first.longRallyWon - second.longRallyWon,
		longRallyLost: first.longRallyLost - second.longRallyLost,
	};
}
