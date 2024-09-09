import type { TournamentMatchTracker } from "./tournamentTracker";

export type Set = {
	myGames: number;
	rivalGames: number;
	setWon: boolean | null;
	tiebreak: boolean;
	superTiebreak: boolean;
	myTiebreakPoints: number;
	rivalTiebreakPoints: number;
	stats: TournamentMatchTracker | null;
};
