import { DoubleServeFlowDto } from "../../dtos/doubleServeFlowDto";
import { GameDto } from "../../dtos/gameDto";
import { SetDto } from "../../dtos/setDto";
import { SingleServeFlowDto } from "../../dtos/singleServeFlowDto";
import { TrackerDto } from "../../dtos/trackerDto";

export interface PauseMatchRequest {
    mode: string;
    setsQuantity: number;
    surface: string;
    gamesPerSet: number;
    superTiebreak: boolean;
    direction: string;
    statistics: string;
    tracker: TrackerDto;
    player1: string;
    player2: string;
    player3: string;
    player4: string;
    initialTeam: number;
    doubleServeFlow?: DoubleServeFlowDto;
    singleServeFlow?: SingleServeFlowDto;
    sets: Array<SetDto>;
    currentSetIdx: number;
    currentGame: GameDto;
    setsWon: number;
    setsLost: number;
    matchWon: boolean;
    matchFinish: boolean;
};

