import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { ContestClash } from "./contestClash";
import { ContestClashId } from "./contestClashId";
import { ContestId } from "./contestId";
import { ContestTeam } from "./contestTeam";
import { Couple } from "./couple";
import { Participant } from "./participant";
import { Phase } from "./phase";
import { TournamentId } from "./tournamentId";
import { TournamentMatch } from "./tournamentMatch";
import { TournamentMatchId } from "./tournamentMatchId";

type BracketPlaceProps = {
    value: number;
    participant?: Participant | null;
    couple?: Couple | null;
    contestTeam?: ContestTeam | null;
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

    get contestTeam(): ContestTeam | null {
        return this.props.contestTeam!;
    }

    setParticipant(p: Participant) {
        this.props.participant = p;
    }

    setCouple(c: Couple) {
        this.props.couple = c;
    }

    setTeam(t: ContestTeam) {
        this.props.contestTeam = t;
    }

    setInscribed(
        p: Participant | null,
        c: Couple | null,
        t: ContestTeam | null
    ) {
        this.props.participant = p;
        this.props.couple = c;
        this.props.contestTeam = t;
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

type BracketTreeNodeProps = {
    contestId: ContestId;
    phase: Phase;
    match?: TournamentMatch | null;
    clash?: ContestClash | null;
    left?: BracketTreeNode | null;
    right?: BracketTreeNode | null;
    parent?: BracketTreeNode | null;
    rightPlace: BracketPlace;
    leftPlace: BracketPlace;
    deep: number;
};

export class BracketTreeNode extends Entity<BracketTreeNodeProps> {
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
    get clash(): ContestClash | null {
        return this.props.clash!;
    }
    get left() {
        return this.props.left!;
    }
    get right() {
        return this.props.right!;
    }
    get parent() {
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

    public setRight(node: BracketTreeNode): void {
        this.props.right = node;
    }

    public setLeft(node: BracketTreeNode): void {
        this.props.left = node;
    }

    public setMatch(match: TournamentMatch) {
        this.props.match = match;
    }

    public setClash(clash: ContestClash) {
        this.props.clash = clash;
    }

    private constructor(props: BracketTreeNodeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: BracketTreeNodeProps,
        id?: UniqueEntityID
    ): Result<BracketTreeNode> {
        return Result.ok(
            new BracketTreeNode(
                {
                    ...props,
                    match: props.match ?? null,
                    clash: props.clash ?? null,
                    parent: props.parent ?? null,
                    left: props.left ?? null,
                    right: props.right ?? null,
                },
                id
            )
        );
    }
}

type BracketNodeProps = {
    contestId: ContestId;
    phase: Phase;
    matchId?: TournamentMatchId | null;
    clashId?: ContestClashId | null;
    leftId?: UniqueEntityID | null;
    rightId?: UniqueEntityID | null;
    parentId?: UniqueEntityID | null;
    rightPlace: BracketPlace;
    leftPlace: BracketPlace;
    deep: number;
}

export class BracketNode extends Entity<BracketNodeProps> {
    get id() {
        return this._id;
    }
    get contestId(): ContestId {
        return this.props.contestId;
    }
    get phase(): Phase {
        return this.props.phase;
    }
    get matchId(): TournamentMatchId | null {
        return this.props.matchId!;
    }
    get clashId(): ContestClashId | null {
        return this.props.clashId!;
    }
    get leftId(): UniqueEntityID | null {
        return this.props.leftId!;
    }
    get rightId(): UniqueEntityID | null {
        return this.props.rightId!;
    }
    get parentId(): UniqueEntityID | null {
        return this.props.parentId!;
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
    public setMatch(matchId: TournamentMatchId) {
        this.props.matchId = matchId;
    }

    public setClash(clashId: ContestClashId) {
        this.props.clashId = clashId;
    }

    private constructor(props: BracketNodeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: BracketNodeProps, id?: UniqueEntityID) {
        return Result.ok(new BracketNode({
            ...props,
            matchId: props.matchId ?? null,
            clashId: props.clashId ?? null,
            leftId: props.leftId ?? null,
            rightId: props.rightId ?? null,
            parentId: props.parentId ?? null,
        }, id))
    }
}
