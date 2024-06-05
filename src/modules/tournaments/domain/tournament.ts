import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TournamentId } from "./tournamentId";
import { TournamentRules } from "./tournamentRules";
import { TournamentStatus } from "./tournamentStatus";

type TournamentProps = {
    name: string;
    rules: TournamentRules;
    status: TournamentStatus;
    startDate: Date;
    endDate: Date;
    image: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Tournament extends Entity<TournamentProps> {
    get tournamentId(): TournamentId {
        return TournamentId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get rules(): TournamentRules {
        return this.props.rules;
    }

    get status(): TournamentStatus {
        return this.props.status;
    }

    get startDate() {
        return this.props.startDate;
    }

    get endDate() {
        return this.props.endDate;
    }

    get image() {
        return this.props.image;
    }

    get address() {
        return this.props.address;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }

    get updatedAt(): Date {
        return this.props.updatedAt!;
    }

    private constructor(props: TournamentProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: TournamentProps,
        id?: UniqueEntityID
    ): Result<Tournament> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "nombre" },
            { argument: props.rules, argumentName: "reglas" },
            { argument: props.status, argumentName: "estado" },
            { argument: props.startDate, argumentName: "fecha de inicio" },
            { argument: props.endDate, argumentName: "fecha de cierre" },
            { argument: props.image, argumentName: "imagen" },
        ]);

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        return Result.ok<Tournament>(
            new Tournament(
                {
                    ...props,
                    createdAt: props.createdAt ?? new Date(),
                    updatedAt: props.updatedAt ?? new Date(),
                },
                id
            )
        );
    }
}
