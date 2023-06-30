export interface CreateClashMatchsDto {
    clashId: string;
    surface: string;
    matchs: Array<MatcData>
}

interface MatcData {
    mode: string;
    player1: string;
    player2: string;
    player3?: string;
    player4?: string;
}

