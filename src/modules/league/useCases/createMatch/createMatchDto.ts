export interface CreateClashMatchsDto {
    clashId: string;
    surface: string;
    matchs: Array<MatchData>
}

interface MatchData {
    mode: string;
    player1: string;
    player2: string;
    player3?: string;
    player4?: string;
}

