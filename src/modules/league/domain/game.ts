import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface GameProps {
    myPoints: number;
    rivalPoints: number;
    winGame: boolean;
    loseGame: boolean;
    tieBreak: boolean;
    superTiebreak: boolean;
    pointsToWin: number;
    deucePoints: number;
}

export class Game extends ValueObject<GameProps> {

    get myPoints(): number {
        return this.props.myPoints;
    }
    get rivalPoints(): number {
        return this.props.rivalPoints;
    }
    get winGame(): boolean {
        return this.props.winGame;
    }
    get loseGame(): boolean {
        return this.props.loseGame;
    }
    get tieBreak(): boolean {
        return this.props.tieBreak;
    }
    get superTiebreak(): boolean {
        return this.props.superTiebreak;
    }
    get pointsToWin(): number {
        return this.props.pointsToWin;
    }
    get deucePoints(): number {
        return this.props.deucePoints;
    }

    private constructor(props: GameProps) {
        super(props);
    }

    public static create(props: GameProps): Result<Game> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.myPoints, argumentName: "puntos" },
            { argument: props.rivalPoints, argumentName: "puntos rival" },
            { argument: props.winGame, argumentName: "juego ganado" },
            { argument: props.loseGame, argumentName: "juego perdido" },
            { argument: props.tieBreak, argumentName: "tie break" },
            { argument: props.superTiebreak, argumentName: "super tie break" },
            { argument: props.pointsToWin, argumentName: "puntos para ganar" },
            { argument: props.deucePoints, argumentName: "puntos para deuce" },
        ])

        if (guard.isFailure) {
            return Result.fail<Game>(guard.getErrorValue())
        }

        return Result.ok<Game>(new Game(props));
    }
}
