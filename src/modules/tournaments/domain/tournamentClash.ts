import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { WatchedList } from "../../../shared/domain/WatchedList";
import { TournamentClashId } from "./tournamentClashId";
import { TournamentId } from "./tournamentId";

type TournamentClashProps = {
    tournamentId: TournamentId;
    matches: WatchedList<any>;
};

export class TournamentClash extends Entity<TournamentClashProps> {
    get clashId(): TournamentClashId {
        return TournamentClashId.create(this._id).getValue();
    }

    get tournamentId(): TournamentId {
        return this.props.tournamentId;
    }

    get matches(): WatchedList<any> {
        return this.props.matches;
    }

    private constructor(props: TournamentClashProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TournamentClashProps, id?: UniqueEntityID) {
        return Result.ok<TournamentClash>(new TournamentClash(props, id));
    }
}
