export type NewTournamentDto = {
    name: string;
    startDate: Date;
    endDate: Date;
    // rules
    setsQuantity: number;
    gamesPerSet: number;
    matchesPerClash: 3 | 5;
    address: string;
};
