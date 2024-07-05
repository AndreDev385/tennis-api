export type Tournament = {
    tournamentId: string;
    name: string;
    rules: TournamentRules;
    image: string;
    status: number;
    startDate: Date;
    endDate: Date;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TournamentRules = {
    setsQuantity: number;
    gamesPerSet: number;
    matchesPerClash: number;
};
