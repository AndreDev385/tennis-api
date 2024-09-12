import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";
import type { TournamentMatch } from "../../types/tournamentMatch";
import type { ParticipantStats } from "../../types/participantStats";
import type { TournamentMatchTracker } from "../../types/tournamentTracker";

type Req = {
	match: TournamentMatch;
	token: string;
};

function validateSetsWon(match: TournamentMatch): TournamentMatch {
	let mySetsWon = 0;
	let rivalSetsWon = 0;
	for (const set of match.sets) {
		const setType = match.rules.gamesPerSet;
		if (
			differenceOfTwo(set.myGames, set.rivalGames, setType) ||
			tiebreakWin(set.myGames, setType)
		) {
			set.setWon = true;
			mySetsWon++;
		}

		// win game with 2 or more games of difference
		if (
			differenceOfTwo(set.rivalGames, set.myGames, setType) ||
			tiebreakWin(set.rivalGames, setType)
		) {
			set.setWon = false;
			rivalSetsWon++;
		}
	}

	return match;

	function differenceOfTwo(
		games1: number,
		games2: number,
		total: number,
	): boolean {
		return games1 == total && games1 - games2 >= 2;
	}

	function tiebreakWin(games: number, total: number): boolean {
		return games == total + 1;
	}
}

function participantHasStats(stats: ParticipantStats): boolean {
	return Object.values(stats).some((v) => typeof v == "number" && v > 0);
}

function validateSetsStats(match: TournamentMatch): TournamentMatch {
	for (const set of match.sets) {
		const objs: (keyof TournamentMatchTracker)[] = [
			"player1",
			"player2",
			"player3",
			"player4",
		];
		let hasStats = false;
		for (const value of objs) {
			const stats = set.stats![value] as ParticipantStats | null;
			if (stats && participantHasStats(stats)) {
				hasStats = true;
				break;
			}
		}
		if (!hasStats) set.stats = null;
	}
	return match;
}

export async function updateTournamentMatch(req: Req): Promise<Result<string>> {
	validateSetsWon(req.match);
	validateSetsStats(req.match);

	const options: RequestInit = {
		method: "PUT",
		headers: {
			Authorization: req.token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ data: req.match }),
	};

	const URL = `${VITE_SERVER_URL}/api/v1/tournament-match`;

	try {
		const response = await fetch(URL, options);

		const body = await response.json();

		if (!response.ok) {
			return Result.fail(body.message);
		}

		return Result.ok(body.message);
	} catch (e) {
		return Result.fail("Ha ocurrido un error");
	}
}
