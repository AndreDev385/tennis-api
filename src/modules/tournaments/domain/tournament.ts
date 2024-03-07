import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TournamentId } from "./tournamentId";

type TournamentProps = {
    name: string;
    rules: any;
};

export class Tournament extends Entity<TournamentProps> {
    get tournamentId(): TournamentId {
        return TournamentId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }
    get rules(): any {
        return this.props.rules;
    }

    private constructor(props: TournamentProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TournamentProps, id?: UniqueEntityID) {
        return Result.ok<Tournament>(new Tournament(props, id));
    }
}
