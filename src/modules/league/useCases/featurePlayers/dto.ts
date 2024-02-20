export type FeaturePlayersRequest = {
    teamId: string;
    isDouble: boolean;
    seasonId?: string;
    journey?: string;
};

export type FeaturePlayersRecords = {
    [index: string]: FeaturePlayerStats;
};

export type FeaturePlayerStats = {
    saveBreakPtsChances: number;
    breakPtsSaved: number;
    gamesWonServing: number;
    gamesLostServing: number;
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServ: number;
    firstServIn: number;
    secondServIn: number;
    firstServWon: number;
    secondServWon: number;
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
};

export type FeaturePlayer = FeaturePlayerStats & {
    playerId: string;
    firstName: string;
    lastName: string;
};

export type FeaturePlayerKeys = keyof FeaturePlayerStats;
