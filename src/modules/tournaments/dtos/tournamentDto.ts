export type TournamentDto = {
    tournamentId: string;
    name: string;
    rules: TournamentRulesDto;
    image: string;
    status: number;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TournamentRulesDto = {
    setsQuantity: number;
    gamesPerSet: number;
    matchesPerClash: number;
};
