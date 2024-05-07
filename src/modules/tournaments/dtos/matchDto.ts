import { DoubleServeFlowDto } from "../../league/dtos/doubleServeFlowDto";
import { GameDto } from "../../league/dtos/gameDto";
import { SetDto } from "../../league/dtos/setDto";
import { SingleServeFlowDto } from "../../league/dtos/singleServeFlowDto";
import { ParticipantDto } from "./participantDto";
import { TournamentMatchTrackerDto } from "./trackerDto";

export type TournamentMatchDto = {
    matchId: string;
    tournamentId: string;
    contestId: string;
    rules: {
        gamesPerSet: number;
        setsQuantity: number;
    };
    mode: string;
    surface: string;
    sets: SetDto[];
    superTieBreak: boolean;
    participant1: ParticipantDto;
    participant2: ParticipantDto;
    participant3: ParticipantDto | null;
    participant4: ParticipantDto | null;
    tracker: TournamentMatchTrackerDto;
    status: number;
    matchInfo: {
        currentSetIdx: number | null;
        currentGame: GameDto | null;
        setsWon?: number;
        setsLost?: number;
        matchFinish: boolean | null;
        superTiebreak?: boolean | null;
        initialTeam?: number | null;
        doubleServeFlow: DoubleServeFlowDto | null;
        singleServeFlow?: SingleServeFlowDto | null;
    };
    matchWon: boolean | null;
    createdAt: Date;
    updatedAt: Date;
};
