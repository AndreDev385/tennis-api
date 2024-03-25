import { CategoryDto } from "../../league/dtos/categoryDto";

export type ContestDto = {
    mode: string;
    categoryType: number;
    category: CategoryDto | null;
    summation: SummationDto | null;
};

export type SummationDto = {
    value: number;
    letter: string;
};
