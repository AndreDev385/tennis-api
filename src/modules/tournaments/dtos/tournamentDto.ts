import { ContestDto } from "./contestsDto";

export type TournamentDto = {
    name: string;
    rules: TournamentRulesDto;
    status: number;
    startDate: Date;
    endDate: Date;
    contests: ContestDto[];
    createdAt?: Date;
    updatedAt?: Date;
};

export type TournamentRulesDto = {
    setsQuantity: number;
    gamesPerSet: number;
};
