import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { TournamentId } from "./tournamentId";

type TournamentAdProps = {
    link?: string | null;
    image: string;
    tournamentId: TournamentId;
};

export class TournamentAd extends ValueObject<TournamentAdProps> {
    get link(): string | null {
        return this.props.link!;
    }
    get image(): string {
        return this.props.image;
    }
    get tournamentId(): TournamentId {
        return this.props.tournamentId;
    }

    private constructor(props: TournamentAdProps) {
        super(props);
    }

    public static create(props: TournamentAdProps): Result<TournamentAd> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.image, argumentName: "imagen" },
            { argument: props.tournamentId, argumentName: "id de torneo" },
        ]);

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        const instance = new TournamentAd(props);

        return Result.ok(instance);
    }
}
