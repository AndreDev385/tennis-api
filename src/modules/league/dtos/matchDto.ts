import { SetDto } from "./setDto";
import { TrackerDto } from "./trackerDto";

export interface MatchDto {
    clashId: string;
    mode: string;
    setsQuantity: number;
    gamesPerSet: number;
    superTieBreak: boolean;
    address: string;
    sets: Array<SetDto>;
    surface: string;
    player1: {
        playerId: string;
        firstName: string;
    };
    player2: string;
    player3?: {
        playerId: string;
        firstName: string;
    };
    player4?: string;
    tracker: TrackerDto;
    isLive: boolean;
    isFinish: boolean;
}
