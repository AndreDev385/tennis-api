import { FeaturePlayerStats } from "../featurePlayers/dto";

export interface FeatureCoupleStats extends FeaturePlayerStats {
    winBreakPtsChances: number;
    breakPtsWinned: number;
}

export interface FeatureCoupleRecords {
    [index: string]: FeatureCoupleStats;
}

export interface FeatureCoupleObj extends FeatureCoupleStats {
    player: {
        firstName: string;
        lastName: string;
    }
    partner: {
        firstName: string;
        lastName: string;
    }
}
