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
    } | null;
    player4?: string | null;
    tracker: TrackerDto | null;
    status: number;
    matchWon: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}
