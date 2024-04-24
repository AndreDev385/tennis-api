import { CoupleDto } from "./coupleDto";
import { ParticipantDto } from "./participantDto";

type Place = {
    value: number;
    participant?: ParticipantDto;
    couple?: CoupleDto;
};

export type BracketDto = {
    //TODO: add Tournamnet match dto
    id: string;
    contestId: string;
    matchId: string | null;
    match: any | null;
    left: string | null;
    right: string | null;
    parent: string | null;
    rightPlace: Place;
    leftPlace: Place;
    deep: number;
};
