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
    stats: SetStatsDto | null;
}

export type SetStatsDto = Omit<TrackerDto, "trackerId" | "matchId" | "me" | "partner"> & {
    me: SetPlayerStatsDto,
    partner: SetPlayerStatsDto | null,
}

export type SetPlayerStatsDto = Omit<PlayerTrackerDto, "playerId" | "seasonId" | "playerTrackerId">;
