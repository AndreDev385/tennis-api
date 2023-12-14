export interface PlayerTrackerDto {
    playerId: string;
    seasonId: string;
    playerTrackerId: string;
    isDouble: boolean;
    pointsWon: number;
    pointsWonServing: number;
    pointsWonReturning: number;
    pointsLost: number;
    pointsLostReturning: number;
    pointsLostServing: number;
    saveBreakPtsChances: number;
    breakPtsSaved: number;
    gamesWonServing: number;
    gamesLostServing: number;
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServ: number;
    firstServIn: number;
    secondServIn: number;
    firstServWon: number; // Saque no devuelto
    secondServWon: number; // Saque no devuelto
    aces: number;
    dobleFaults: number;
    pointsWinnedFirstReturn: number;
    pointsWinnedSecondReturn: number;
    firstReturnIn: number;
    secondReturnIn: number;
    firstReturnOut: number;
    secondReturnOut: number;
    firstReturnWon: number;
    secondReturnWon: number;
    firstReturnWinner: number;
    secondReturnWinner: number;
    meshPointsWon: number;
    meshPointsLost: number;
    meshWinner: number;
    meshError: number;
    bckgPointsWon: number;
    bckgPointsLost: number;
    bckgWinner: number;
    bckgError: number;
}
