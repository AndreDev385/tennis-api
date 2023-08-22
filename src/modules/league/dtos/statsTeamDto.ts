export interface StatsDto {
    teamStatsId: string;
    seasonId: string;
    journey: string;
    teamId: string;
    //games
    gamesWonAsLocal: number;
    gamesPlayedAsLocal: number;
    gamesWonAsVisitor: number;
    gamesPlayedAsVisitor: number;
    totalGamesWon: number;
    totalGamesPlayed: number;
    //sets
    setsWonAsLocal: number;
    setsPlayedAsLocal: number;
    setsWonAsVisitor: number;
    setsPlayedAsVisitor: number;
    totalSetsWon: number;
    totalSetsPlayed: number;
    // super tie-break
    superTieBreaksWonAsLocal: number;
    superTieBreaksPlayedAsLocal: number;
    superTieBreaksWonAsVisitor: number;
    superTieBreaksPlayedAsVisitor: number;
    totalSuperTieBreaksWon: number;
    totalSuperTieBreaksPlayed: number;
    // Match
    matchWonAsLocal: number;
    matchLostAsLocal: number;
    matchPlayedAsLocal: number;
    matchWonAsVisitor: number;
    matchLostAsVisitor: number;
    matchPlayedAsVisitor: number;
    totalMatchWon: number;
    totalMatchPlayed: number;
    // match won with first set won
    matchsWonWithFirstSetWonAsLocal: number;
    matchsPlayedWithFirstSetWonAsLocal: number;
    matchsWonWithFirstSetWonAsVisitor: number;
    matchsPlayedWithFirstSetWonAsVisitor: number;
    totalMatchsWonWithFirstSetWon: number;
    totalMatchsPlayedWithFirstSetWon: number;
    // clash won
    clashWonAsLocal: number;
    clashPlayedAsLocal: number;
    clashWonAsVisitor: number;
    clashPlayedAsVisitor: number;
    totalClashWon: number;
    totalClashPlayed: number;
}
