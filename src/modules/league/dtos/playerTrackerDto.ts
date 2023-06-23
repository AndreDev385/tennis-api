export interface PlayerTrackerDto {
    playerTrackerId: string;
    pointsWon: number;
    pointsWonServing: number;
    pointsWonReturning: number;
    pointsLost: number;
    pointsLostReturning: number;
    pointsLostServing: number;
    saveBreakPtsChances: number;
    breakPtsSaved: number;
    pointsWinnedFirstServ?: number;
    pointsWinnedSecondServ?: number;
    firstServIn?: number;
    secondServIn?: number;
    aces?: number;
    dobleFaults?: number;
    pointsWinnedFirstReturn?: number;
    pointsWinnedSecondReturn?: number;
    firstReturnIn?: number;
    secondReturnIn?: number;
    meshPointsWon?: number;
    meshPointsLost?: number;
    bckgPointsWon?: number;
    bckgPointsLost?: number;
    winners?: number;
    noForcedErrors?: number;
}
