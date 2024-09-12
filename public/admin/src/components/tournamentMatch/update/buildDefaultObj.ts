import type { ParticipantStats } from "../../../types/participantStats";
import type { Set as GameSet } from "../../../types/set";
import type { TournamentMatch } from "../../../types/tournamentMatch";
import { GameModesValues } from "../../../utils/tennisConfigs";

export function buildSetsForUpdate(match: TournamentMatch): GameSet[] {
	const sets: GameSet[] = [];
	for (let i = 0; i < match.rules.setsQuantity; i++) {
		const defaultStats = {
			trackerId: match.tracker.trackerId,
			matchId: match.matchId,
			player1: defaultParticipantStats({
				matchId: match.matchId,
				isDouble: match.mode == GameModesValues.Double,
				tournamentId: match.tournamentId,
				participantId: match.participant1.participantId,
				participantTrackerId: match.tracker.player1!.participantTrackerId,
				createdAt: match.createdAt,
				updatedAt: match.updatedAt,
			}),
			player2: defaultParticipantStats({
				matchId: match.matchId,
				isDouble: match.mode == GameModesValues.Double,
				tournamentId: match.tournamentId,
				participantId: match.participant2.participantId,
				participantTrackerId: match.tracker.player2!.participantTrackerId,
				createdAt: match.createdAt,
				updatedAt: match.updatedAt,
			}),
			player3: match.tracker.player3
				? defaultParticipantStats({
						matchId: match.matchId,
						isDouble: match.mode == GameModesValues.Double,
						tournamentId: match.tournamentId,
						participantId: match.participant3!.participantId,
						participantTrackerId: match.tracker.player3!.participantTrackerId,
						createdAt: match.createdAt,
						updatedAt: match.updatedAt,
					})
				: null,
			player4: match.tracker.player4
				? defaultParticipantStats({
						matchId: match.matchId,
						isDouble: match.mode == GameModesValues.Double,
						tournamentId: match.tournamentId,
						participantId: match.participant4!.participantId,
						participantTrackerId: match.tracker.player4!.participantTrackerId,
						createdAt: match.createdAt,
						updatedAt: match.updatedAt,
					})
				: null,
		};

		const set = match.sets[i];

		if (set) {
			if (set.stats) {
				sets.push(set);
				continue;
			}
			sets.push({
				...set,
				stats: defaultStats,
			});
			continue;
		}
		sets.push({
			myGames: 0,
			rivalGames: 0,
			setWon: null,
			tiebreak: false,
			superTiebreak: false,
			myTiebreakPoints: 0,
			rivalTiebreakPoints: 0,
			stats: defaultStats,
		});
	}
	return sets;
}

type DefaultParticipantStatsParams = {
	participantTrackerId: string;
	participantId: string;
	tournamentId: string;
	matchId: string;
	isDouble: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export function defaultParticipantStats(
	params: DefaultParticipantStatsParams,
): ParticipantStats {
	return {
		participantTrackerId: params.participantTrackerId,
		participantId: params.participantId,
		tournamentId: params.tournamentId,
		matchId: params.matchId,
		isDouble: params.isDouble,

		saveBreakPtsChances: 0,
		breakPtsSaved: 0,
		breakPtsChances: 0,
		breakPts: 0,
		// serv
		firstServIn: 0,
		secondServIn: 0,
		aces: 0,
		dobleFaults: 0,
		firstServWon: 0,
		secondServWon: 0,
		pointsWinnedFirstServ: 0,
		pointsWinnedSecondServ: 0,
		gamesWonServing: 0,
		gamesLostServing: 0,
		gamesWonReturning: 0,
		gamesLostReturning: 0,
		// return
		firstReturnWon: 0,
		secondReturnWon: 0,
		firstReturnWinner: 0,
		secondReturnWinner: 0,
		firstReturnIn: 0,
		secondReturnIn: 0,
		firstReturnOut: 0,
		secondReturnOut: 0,
		pointsWinnedFirstReturn: 0,
		pointsWinnedSecondReturn: 0,
		// places
		meshPointsWon: 0,
		meshPointsLost: 0,
		meshWinner: 0,
		meshError: 0,
		bckgPointsWon: 0,
		bckgPointsLost: 0,
		bckgWinner: 0,
		bckgError: 0,
		// rally
		shortRallyWon: 0,
		shortRallyLost: 0,
		mediumRallyWon: 0,
		mediumRallyLost: 0,
		longRallyWon: 0,
		longRallyLost: 0,
		createdAt: params.createdAt,
		updatedAt: params.updatedAt,
	};
}
