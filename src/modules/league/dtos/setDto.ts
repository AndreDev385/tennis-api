export interface SetDto {
    myGames: number;
    rivalGames: number;
    setWon: boolean | null;
    tiebreak: boolean;
    superTiebreak: boolean;
    myTiebreakPoints: number;
    rivalTiebreakPoints: number;
    stats: SetStatsDto | null;
}

export interface SetStatsDto {
    me: SetPlayerStatsDto;
    partner: SetPlayerStatsDto | null;
    gamesWonReturning: number;
    gamesLostReturning: number;
    winBreakPtsChances: number;
    breakPtsWinned: number;
    rivalPointsWinnedFirstServ: number;
    rivalPointsWinnedSecondServ: number;
    rivalFirstServIn: number;
    rivalSecondServIn: number;
    rivalPointsWinnedFirstReturn: number;
    rivalPointsWinnedSecondReturn: number;
    rivalFirstReturnIn: number;
    rivalSecondReturnIn: number;
    rivalAces: number;
    rivalDobleFault: number;
    rivalNoForcedErrors: number;
    rivalWinners: number;
    shortRallyWon: number;
    mediumRallyWon: number;
    longRallyWon: number;
    shortRallyLost: number;
    mediumRallyLost: number;
    longRallyLost: number;
}

export interface SetPlayerStatsDto {
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
    aces: number;
    dobleFaults: number;
    pointsWinnedFirstReturn: number;
    pointsWinnedSecondReturn: number;
    firstReturnIn: number;
    secondReturnIn: number;
    firstReturnOut: number;
    secondReturnOut: number;
    meshPointsWon: number;
    meshPointsLost: number;
    bckgPointsWon: number;
    bckgPointsLost: number;
    winners: number;
    noForcedErrors: number;
}
