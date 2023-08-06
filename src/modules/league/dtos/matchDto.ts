import { SetDto } from "./setDto";
import { TrackerDto } from "./trackerDto";

export interface MatchDto {
    matchId: string;
    clashId: string;
    mode: string;
    category: string;
    setsQuantity: number;
    sets: Array<SetDto>;
    gamesPerSet: number;
    superTieBreak: boolean;
    address: string;
    surface: string;
    player1: {
        playerId: string;
        name: string;
    };
    player2: string;
    player3?: {
        playerId: string;
        name: string;
    };
    player4?: string;
    tracker: TrackerDto;
    isLive: boolean;
    isFinish: boolean;
    isCancelled: boolean;
    matchWon: boolean
}
