import type { ParticipantStats } from "./participantStats";

export type TournamentMatchTracker = {
	trackerId: string;
	matchId: string;
	player1: ParticipantStats | null;
	player2: ParticipantStats | null;
	player3: ParticipantStats | null;
	player4: ParticipantStats | null;
};
