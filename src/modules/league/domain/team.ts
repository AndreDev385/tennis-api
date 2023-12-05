import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { Club } from "./club";
import { TeamDeleted } from "./events/teamDeleted";
import { TeamId } from "./teamId";

interface TeamProps {
    name: string;
    club: Club;
    category: Category;
    isDeleted?: boolean;
}

export class Team extends AggregateRoot<TeamProps> {
    get teamId(): TeamId {
        return TeamId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get club(): Club {
        return this.props.club;
    }

    get category(): Category {
        return this.props.category;
    }

    get isDeleted(): boolean {
        return this.props.isDeleted!;
    }

    public delete(): void {
        this.props.isDeleted = true;
        this.addDomainEvent(new TeamDeleted(this));
    }

    public restore(): void {
        this.props.isDeleted = false;
    }

    private static validate(value: string): boolean {
        const validTeams = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

        return validTeams.indexOf(value) >= 0;
    }

    private constructor(props: TeamProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TeamProps, id?: UniqueEntityID): Result<Team> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.category, argumentName: "categoria" },
            { argument: props.name, argumentName: "equipo" },
            { argument: props.club, argumentName: "club" },
        ]);

        if (guard.isFailure) {
            return Result.fail<Team>(guard.getErrorValue());
        }

        if (!this.validate(props.name)) {
            return Result.fail<Team>("Equipo invalido.");
        }

        const instance = new Team({
            ...props,
            isDeleted: props.isDeleted ?? false,
        }, id);

        return Result.ok(instance);
    }
}
