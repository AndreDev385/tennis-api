import { SetQuantity } from "./setQuantity";
import { GamesPerSet } from "./gamesPerSet";
import { Surface } from "./surface";
import { Sets } from "./sets";
import { MatchTracker } from "./matchTracker";
import { MatchId } from "./matchId";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Mode } from "./gameMode";
import { DoubleServeFlow } from "./doubleServeFlow";
import { SingleServeFlow } from "./serviceFlow";
import { Game } from "./game";

interface PausedMatchProps {
    matchId: MatchId;
    mode: Mode
    setsQuantity: SetQuantity;
    gamesPerSet: GamesPerSet;
    surface: Surface;
    direction: string;
    statistics: string;
    tracker: MatchTracker;
    player1: string;
    player2: string;
    player3?: string;
    player4?: string;
    // serving
    sets: Sets;
    currentSetIdx: number;
    currentGame: Game;
    setsWon: number;
    setsLost: number;
    matchFinish: boolean;
    superTiebreak?: boolean;
    initialTeam?: number;
    matchWon?: boolean;
    doubleServeFlow?: DoubleServeFlow,
    singleServeFlow?: SingleServeFlow,
}

export class PausedMatch extends ValueObject<PausedMatchProps> {

    get matchId(): MatchId {
        return this.props.matchId;
    }
    get mode(): Mode {
        return this.props.mode;
    }
    get setsQuantity(): SetQuantity {
        return this.props.setsQuantity;
    }
    get gamesPerSet(): GamesPerSet {
        return this.props.gamesPerSet;
    }
    get surface(): Surface {
        return this.props.surface;
    }
    get superTiebreak(): boolean {
        return this.props.superTiebreak;
    }
    get direction(): string {
        return this.props.direction;
    }
    get statistics(): string {
        return this.props.statistics;
    }
    get tracker(): MatchTracker {
        return this.props.tracker;
    }
    get player1(): string {
        return this.props.player1;
    }
    get player2(): string {
        return this.props.player2;
    }
    get player3(): string {
        return this.props.player3;
    }
    get player4(): string {
        return this.props.player4;
    }
    // serving
    get initialTeam(): number {
        return this.props.initialTeam;
    }
    get doubleServeFlow(): DoubleServeFlow {
        return this.props.doubleServeFlow;
    }
    get singleServeFlow(): SingleServeFlow {
        return this.props.singleServeFlow;
    }
    get sets(): Sets {
        return this.props.sets;
    }
    get currentSetIdx(): number {
        return this.props.currentSetIdx;
    }
    get currentGame(): Game {
        return this.props.currentGame;
    }
    get setsWon(): number {
        return this.props.setsWon;
    }
    get setsLost(): number {
        return this.props.setsLost;
    }
    get matchWon(): boolean {
        return this.props.matchWon;
    }
    get matchFinish(): boolean {
        return this.props.matchFinish;
    }

    private constructor(props: PausedMatchProps) {
        super(props);
    }

    public static create(props: PausedMatchProps): Result<PausedMatch> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: "matchId", argumentName: "id del partido" },
            { argument: "mode", argumentName: "modo" },
            { argument: "setsQuantity", argumentName: "cantidad de sets" },
            { argument: "gamesPerSet", argumentName: "games por set" },
            { argument: "surface", argumentName: "superficie" },
            { argument: "statistics", argumentName: "tipo de estadistica" },
            { argument: "tracker", argumentName: "estadisticas" },
            { argument: "player1", argumentName: "jugador 1" },
            { argument: "player2", argumentName: "jugador 2" },
            { argument: "sets", argumentName: "sets" },
            { argument: "currentSetIdx", argumentName: "indice de set actual" },
            { argument: "currentGame", argumentName: "game actual" },
            { argument: "setsWon", argumentName: "sets ganados" },
            { argument: "setsLost", argumentName: "sets perdidos" },
            { argument: "matchWon", argumentName: "partido ganado" },
            { argument: "matchFinish", argumentName: "partido terminado" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<PausedMatch>(guardResult.getErrorValue());
        }

        const instance = new PausedMatch({
            ...props,
            doubleServeFlow: props.doubleServeFlow ?? null,
            singleServeFlow: props.singleServeFlow ?? null,
            player3: props.player3 ?? null,
            player4: props.player4 ?? null,
            matchWon: props.matchWon ?? null,
            initialTeam: props.initialTeam ?? null,
            superTiebreak: props.superTiebreak ?? null,
        });

        return Result.ok<PausedMatch>(instance)
    }
}
