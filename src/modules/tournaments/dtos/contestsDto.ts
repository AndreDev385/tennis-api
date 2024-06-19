import { CategoryDto } from "../../league/dtos/categoryDto";

export type ContestDto = {
    contestId: string;
    tournamentId: string;
    mode: string;
    categoryType: number;
    category: CategoryDto | null;
    summation: SummationDto | null;
    inscribed?: any;
};

export type SummationDto = {
    value: number;
    letter: string;
};
