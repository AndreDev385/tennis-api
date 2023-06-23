import { PlayerTrackerDto } from "./playerTrackerDto";

export interface TrackerDto {
    matchId: string;

    me: PlayerTrackerDto;
    partner?: PlayerTrackerDto;

    gamesWonServing: number;
    gamesWonReturning: number;
    gamesLostServing: number;
    gamesLostReturning: number;
    winBreakPtsChances: number;
    breakPtsWinned: number;

    rivalPointsWinnedFirstServ?: number;
    rivalPointsWinnedSecondServ?: number;
    rivalFirstServIn?: number;
    rivalSecondServIn?: number;
    rivalPointsWinnedFirstReturn?: number;
    rivalPointsWinnedSecondReturn?: number;
    rivalFirstReturnIn?: number;
    rivalSecondReturnIn?: number;

    rivalAces?: number;
    rivalDobleFault?: number;
    rivalNoForcedErrors?: number;
    rivalWinners?: number;
    shortRallyWon?: number;
    mediumRallyWon?: number;
    longRallyWon?: number;
    shortRallyLost?: number;
    mediumRallyLost?: number;
    longRallyLost?: number;
}
