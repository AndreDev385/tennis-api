export type NewContestDto = {
    mode: string;
    categoryType: number;
    categoryId?: string;
    summation?: {
        letter: string;
        value: number;
    };
};

export type AddTournamentContestDto = {
    tournamentId: string;
    contest: NewContestDto;
};
