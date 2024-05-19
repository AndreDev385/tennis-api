import { DoubleServeFlowDto } from "../../../league/dtos/doubleServeFlowDto";
import { GameDto } from "../../../league/dtos/gameDto";
import { SetDto } from "../../../league/dtos/setDto";
import { SingleServeFlowDto } from "../../../league/dtos/singleServeFlowDto";

export type Req = {
    // required for request
    matchId: string;
    status: number;
    sets: Array<SetDto>;
    tracker: any;
    matchWon: boolean | null;
    superTieBreak: boolean | null;
    // optional for pause 
    matchInfo: {

        currentSetIdx: number;
        currentGame: GameDto;
        setsWon: number;
        setsLost: number;
        matchFinish: boolean;
        initialTeam?: number;
        doubleServeFlow?: DoubleServeFlowDto;
        singleServeFlow?: SingleServeFlowDto;
    }
};

export type LiveReq = {
    matchId: string;
    status: number;
};
