import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { ContestId } from "./contestId";
import { Couple } from "./couple";
import { Participant } from "./participant";
import { Phase } from "./phase";
import { TournamentId } from "./tournamentId";
import { TournamentMatch } from "./tournamentMatch";

type BracketNodeProps = {
    contestId: ContestId;
    phase: Phase;
    match?: TournamentMatch | null;
    left?: BracketNode | null;
    right?: BracketNode | null;
    parent?: BracketNode | null;
    rightPlace: BracketPlace;
    leftPlace: BracketPlace;
    deep: number;
};

type BracketPlaceProps = {
    value: number;
    participant?: Participant | null;
    couple?: Couple | null;
};

export class BracketPlace extends ValueObject<BracketPlaceProps> {
    get value(): number {
        return this.props.value;
    }

    get participant(): Participant | null {
        return this.props.participant!;
    }

    get couple(): Couple | null {
        return this.props.couple!;
    }

    setParticipant(p: Participant) {
        this.props.participant = p;
    }

    setCouple(c: Couple) {
        this.props.couple = c;
    }

    setInscribed(p: Participant | null, c: Couple | null) {
        this.props.participant = p;
        this.props.couple = c;
    }

    private constructor(props: BracketPlaceProps) {
        super(props);
    }

    public static create(props: BracketPlaceProps): Result<BracketPlace> {
        const guard = Guard.againstNullOrUndefined(props.value, "position");

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        return Result.ok<BracketPlace>(new BracketPlace(props));
    }
}

export class BracketNode extends Entity<BracketNodeProps> {
    get id() {
        return this._id;
    }
    get contestId(): TournamentId {
        return this.props.contestId;
    }
    get phase() {
        return this.props.phase;
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
    get rightPlace(): BracketPlace {
        return this.props.rightPlace;
    }
    get leftPlace(): BracketPlace {
        return this.props.leftPlace;
    }
    get deep(): number {
        return this.props.deep;
    }

    get placeThatAdvance(): number {
        return this.props.rightPlace.value < this.props.leftPlace.value
            ? this.props.rightPlace.value
            : this.props.leftPlace.value;
    }

    setRight(node: BracketNode): void {
        this.props.right = node;
    }

    setLeft(node: BracketNode): void {
        this.props.left = node;
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
