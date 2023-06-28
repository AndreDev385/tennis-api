import { PlayerDto } from "./playerDto";
import { SetDto } from "./setDto";
import { TrackerDto } from "./trackerDto";

export interface MatchDto {
    mode: string;
    setsQuantity: number;
    gamesPerSet: number;
    superTieBreak: boolean;
    address: string;
    sets: Array<SetDto>;
    surface: string;
    player1: PlayerDto,
    player2: string,
    player3?: PlayerDto,
    player4?: string,
    tracker: TrackerDto;
}
