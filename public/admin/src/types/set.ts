import type { ParticipantStats } from "./participantStats";

export type Set = {
	myGames: number;
	rivalGames: number;
	setWon: boolean | null;
	tiebreak: boolean;
	superTiebreak: boolean;
	myTiebreakPoints: number;
	rivalTiebreakPoints: number;
	stats: ParticipantStats;
};

export type SetTournamentMatchStats = {
	player1: ParticipantStats;
	player2: ParticipantStats;
	player3: ParticipantStats | null;
	player4: ParticipantStats | null;
};
