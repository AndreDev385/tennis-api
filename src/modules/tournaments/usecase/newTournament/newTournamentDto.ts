export type NewTournamentDto = {
    name: string;
    startDate: Date;
    endDate: Date;
    // rules
    setsQuantity: number;
    gamesPerSet: number;
};
