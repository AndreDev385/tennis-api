import { FeaturePlayerStats } from "../featurePlayers/dto";

export type FeatureCoupleStats = Omit<FeaturePlayerStats, "saveBreakPtsChances" | "breakPtsSaved"> & {
    winBreakPtsChances: number;
    breakPtsWinned: number;
    gamesWonReturning: number;
    gamesLostReturning: number;

    shortRallyWon: number;
    mediumRallyWon: number;
    longRallyWon: number;
    shortRallyLost: number;
    mediumRallyLost: number;
    longRallyLost: number;
};

export type CoupleStatsKeys = keyof FeatureCoupleStats;

export type FeatureCoupleRecords = {
    [index: string]: FeatureCoupleStats;
};

export type FeatureCouple = FeatureCoupleStats & {
    player: {
        firstName: string;
        lastName: string;
    };
    partner: {
        firstName: string;
        lastName: string;
    };
};
