import { PhaseValues } from "../domain/phase";
import { CoupleDto } from "./coupleDto";
import { TournamentMatchDto } from "./matchDto";
import { ParticipantDto } from "./participantDto";

export type PlaceDto = {
    value: number;
    participant?: ParticipantDto;
    couple?: CoupleDto;
};

export type BracketDto = {
    id: string;
    contestId: string;
    phase: PhaseValues;
    matchId: string | null;
    match: TournamentMatchDto | null;
    left: string | null;
    right: string | null;
    parent: string | null;
    rightPlace: PlaceDto;
    leftPlace: PlaceDto;
    deep: number;
};
