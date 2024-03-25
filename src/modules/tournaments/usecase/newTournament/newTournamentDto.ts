export type NewContestDto = {
    mode: string;
    categoryType: number;
    categoryId?: string;
    summation?: {
        letter: string,
        value: number,
    };
}

export type NewTournamentDto = {
    name: string;
    startDate: Date;
    endDate: Date;
    // rules
    setsQuantity: number;
    gamesPerSet: number;
    // contests
    contests: Array<NewContestDto>
}
