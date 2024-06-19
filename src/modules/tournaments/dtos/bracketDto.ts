import { PhaseValues } from "../domain/phase";
import { ContestClashDto } from "./contestClashDto";
import { ContestTeamDto } from "./contestTeamDto";
import { CoupleDto } from "./coupleDto";
import { TournamentMatchDto } from "./matchDto";
import { ParticipantDto } from "./participantDto";

export type PlaceDto = {
    value: number;
    participant?: ParticipantDto;
    couple?: CoupleDto;
    contestTeam?: ContestTeamDto;
};

export type BracketDto = {
    id: string;
    contestId: string;
    phase: PhaseValues;
    matchId: string | null;
    match: TournamentMatchDto | null;
    clashId: string | null;
    clash: ContestClashDto | null;
    left: string | null;
    right: string | null;
    parent: string | null;
    rightPlace: PlaceDto;
    leftPlace: PlaceDto;
    deep: number;
};
