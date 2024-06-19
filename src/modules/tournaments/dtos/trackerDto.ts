import { ParticipantTrackerDto } from "./participantTrackerDto";

export type TournamentMatchTrackerDto = {
    trackerId: string;
    matchId: string;
    player1: ParticipantTrackerDto | null,
    player2: ParticipantTrackerDto | null,
    player3: ParticipantTrackerDto | null,
    player4: ParticipantTrackerDto | null,
}
