import type { ParticipantStats } from "./participantStats";
import type { TournamentMatchTracker } from "./tournamentTracker";

export type Set = {
	myGames: number;
	rivalGames: number;
	setWon: boolean | null;
	tiebreak: boolean;
	superTiebreak: boolean;
	myTiebreakPoints: number;
	rivalTiebreakPoints: number;
	stats: TournamentMatchTracker;
};

export type SetTournamentMatchStats = {
	player1: ParticipantStats;
	player2: ParticipantStats;
	player3: ParticipantStats | null;
	player4: ParticipantStats | null;
};
