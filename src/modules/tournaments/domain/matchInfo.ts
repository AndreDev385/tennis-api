import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { DoubleServeFlow } from "../../league/domain/doubleServeFlow";
import { Game } from "../../league/domain/game";
import { SingleServeFlow } from "../../league/domain/serviceFlow";

type MatchInfoProps = {
    currentSetIdx: number;
    currentGame: Game | null;
    setsWon: number;
    setsLost: number;
    matchFinish: boolean;
    superTiebreak?: boolean | null;
    initialTeam?: number | null;
    doubleServeFlow?: DoubleServeFlow | null;
    singleServeFlow?: SingleServeFlow | null;
};

export class MatchInfo extends ValueObject<MatchInfoProps> {
    get currentSetIdx(): number {
        return this.props.currentSetIdx;
    }

    get currentGame(): Game | null {
        return this.props.currentGame;
    }

    get setsWon(): number {
        return this.props.setsWon;
    }

    get setsLost(): number {
        return this.props.setsLost;
    }

    get matchFinish(): boolean {
        return this.props.matchFinish;
    }

    get superTiebreak(): boolean | null {
        return this.props.superTiebreak!;
    }

    get initialTeam(): number | null {
        return this.props.initialTeam!;
    }

    get doubleServeFlow(): DoubleServeFlow | null {
        return this.props.doubleServeFlow!;
    }

    get singleServeFlow(): SingleServeFlow | null {
        return this.props.singleServeFlow!;
    }

    private constructor(props: MatchInfoProps) {
        super(props);
    }

    public static create(props: MatchInfoProps) {
        return Result.ok<MatchInfo>(
            new MatchInfo({
                ...props,
                superTiebreak: props.superTiebreak ?? null,
                initialTeam: props.initialTeam ?? null,
                doubleServeFlow: props.doubleServeFlow ?? null,
                singleServeFlow: props.singleServeFlow ?? null,
            })
        );
    }
}
