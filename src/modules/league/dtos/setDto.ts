import { ParticipantTrackerDto } from "../../tournaments/dtos/participantTrackerDto";
import { PlayerTrackerDto } from "./playerTrackerDto";
import { TrackerDto } from "./trackerDto";

export interface SetDto {
    myGames: number;
    rivalGames: number;
    setWon: boolean | null;
    tiebreak: boolean;
    superTiebreak: boolean;
    myTiebreakPoints: number;
    rivalTiebreakPoints: number;
    stats: any | null;
}

export type SetTournamentMatchStats = {
    player1: ParticipantTrackerDto,
    player2: ParticipantTrackerDto,
    player3: ParticipantTrackerDto | null,
    player4: ParticipantTrackerDto | null,
}

export type ParticipantStats = Omit<
    ParticipantTrackerDto,
    "participantTrackerId" | "participantId" | "tournamentId" | "matchId"
>;

export type SetStatsDto = Omit<
    TrackerDto,
    "trackerId" | "matchId" | "me" | "partner"
> & {
    me: SetPlayerStatsDto;
    partner: SetPlayerStatsDto | null;
};

export type SetPlayerStatsDto = Omit<
    PlayerTrackerDto,
    "playerId" | "seasonId" | "playerTrackerId"
>;
