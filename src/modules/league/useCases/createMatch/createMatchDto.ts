export interface CreateMatchDto {
    clashId: string;
    mode: string;
    setsQuantity: 1 | 3 | 5;
    gamesPerSet: 4 | 6 | 9;
    superTieBreak: boolean;
    categoryId: string;
    surface: string;
    player1: string;
    player2: string;
    address?: string;
    player3?: string;
    player4?: string;
}
