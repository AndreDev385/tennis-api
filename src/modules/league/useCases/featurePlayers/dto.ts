export interface FeaturePlayersRequest {
    teamId: string;
    seasonId?: string;
    journey?: string;
}

export interface FeaturePlayersRecords {
    [index: string]: FeaturePlayerStats;
}

export interface FeaturePlayerStats {
    meshPointsWon: number;
    meshPointsLost: number;
    firstServIn: number;
    secondServIn: number;
    dobleFaults: number;
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServe: number;
}

export interface FeaturePlayer extends FeaturePlayerStats {
    playerId: string;
    firstName: string;
    lastName: string;
}

