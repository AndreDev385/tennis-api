import { CoupleDto } from "./coupleDto";
import { ParticipantDto } from "./participantDto";

type Place = {
    value: number;
    participant?: ParticipantDto;
    couple?: CoupleDto;
};

export type BracketDto = {
    id: string;
    contestId: string;
    match: string;
    left: string;
    right: string;
    parent: string;
    rightPlace: Place;
    leftPlace: Place;
    deep: number;
};
