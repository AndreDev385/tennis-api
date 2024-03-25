import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TournamentId } from "./tournamentId";
import { TournamentMatch } from "./tournamentMatch";

type BracketNodeProps = {
    tournamentId: TournamentId;
    match?: TournamentMatch | null;
    left?: BracketNode | null;
    right?: BracketNode | null;
    parent?: BracketNode | null;
    rightPlace: number;
    leftPlace: number;
    deep: number;
};

export class BracketNode extends Entity<BracketNodeProps> {
    get id() {
        return this._id;
    }
    get tournamentId(): TournamentId {
        return this.props.tournamentId;
    }
    get match(): TournamentMatch | null {
        return this.props.match!;
    }
    get left(): BracketNode | null {
        return this.props.left!;
    }
    get right(): BracketNode | null {
        return this.props.right!;
    }
    get parent(): BracketNode | null {
        return this.props.parent!;
    }
    get rightPlace(): number {
        return this.props.rightPlace
    }
    get leftPlace(): number {
        return this.props.leftPlace
    }
    get deep(): number {
        return this.props.deep;
    }

    set right(node: BracketNode) {
        this.props.right = node
    }

    set left(node: BracketNode) {
        this.props.left = node
    }

    public setMatch(match: TournamentMatch) {
        this.props.match = match;
    }

    private constructor(props: BracketNodeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: BracketNodeProps,
        id?: UniqueEntityID
    ): Result<BracketNode> {
        return Result.ok(
            new BracketNode(
                {
                    ...props,
                    match: props.match ?? null,
                    parent: props.parent ?? null,
                    left: props.left ?? null,
                    right: props.right ?? null,
                },
                id
            )
        );
    }
}
