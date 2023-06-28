export interface CreateClashDto {
    seasonId: string;
    categoryId: string;
    team1: {
        clubId: string,
        name: string;
    };
    team2: {
        clubId: string,
        name: string;
    };
    journey: string;
    host: string;
}
