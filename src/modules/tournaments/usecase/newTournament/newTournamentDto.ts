export type NewTournamentDto = {
    name: string;
    rules: {
        setsQuantity: number;
        gamesPerSet: number;
        categoryType: string;
        categoryId: string;
        summation?: number;
        isTeamClash: boolean;
        mode?: string;
        teamsConfig?: {
            matchesQty: number;
            singlesQty: number;
            doublesQty: number;
        };
    }
}
