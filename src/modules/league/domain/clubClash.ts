import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { ClashId } from "./clashId";
import { Club } from "./club";
import { ClubId } from "./clubId";
import { ClashCreated } from "./events/clashCreated";
import { ClashFinished } from "./events/clashFinished";
import { GameMode } from "./gameMode";
import { Journey } from "./journey";
import { Match } from "./match";
import { Matchs } from "./matchs";
import { SeasonId } from "./seasonId";
import { Team } from "./team";

interface ClubClashProps {
    seasonId: SeasonId;
    clubId: ClubId;
    team1: Team;
    team2: Team;
    category: Category;
    journey: Journey;
    host: Club;
    matchs: Matchs;
    isFinish?: boolean;
}

export class Clash extends AggregateRoot<ClubClashProps> {
    get clashId(): ClashId {
        return ClashId.create(this._id).getValue();
    }

    get seasonId(): SeasonId {
        return this.props.seasonId;
    }

    get clubId(): ClubId {
        return this.props.clubId;
    }

    get matchs(): Array<Match> {
        return this.props.matchs.getItems();
    }

    get team1(): Team {
        return this.props.team1;
    }

    get team2(): Team {
        return this.props.team2;
    }

    get category(): Category {
        return this.props.category;
    }

    get journey(): Journey {
        return this.props.journey;
    }

    get host(): Club {
        return this.props.host;
    }

    get isFinish(): boolean {
        return this.props.isFinish!;
    }

    get isLocal(): boolean {
        return this.props.team1.club.clubId.equals(this.props.host.clubId);
    }

    get wonClash(): boolean {
        const result = this.matchs.filter((match) => match.matchWon == true);
        return result.length > 2;
    }

    public finishClash() {
        this.props.isFinish = true;
        this.addDomainEvent(new ClashFinished(this));
    }

    public createMatchs(matchs: Matchs) {
        const playersIds: Array<string> = [];

        for (const match of matchs.getItems()) {
            if (playersIds.includes(match.player1.playerId.id.toString())) {
                throw new Error(
                    `El jugador ${match.player1.firstName.value} esta repetido`
                );
            }
            if (
                match.mode.value == GameMode.double &&
                playersIds.includes(match.player3!.playerId.id.toString())
            ) {
                throw new Error(
                    `El jugador ${match.player1.firstName.value} esta repetido`
                );
            }

            playersIds.push(match.player1.playerId.id.toString());
            if (match.mode.value == GameMode.double) {
                playersIds.push(match.player3!.playerId.id.toString());
            }
        }

        this.props.matchs = matchs;
    }

    private constructor(props: ClubClashProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: ClubClashProps,
        id?: UniqueEntityID
    ): Result<Clash> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.seasonId, argumentName: "season id" },
            { argument: props.seasonId, argumentName: "clubId" },
            { argument: props.matchs, argumentName: "matchs" },
            { argument: props.team1, argumentName: "team 1" },
            { argument: props.team2, argumentName: "team 2" },
            { argument: props.category, argumentName: "category" },
            { argument: props.journey, argumentName: "journey" },
            { argument: props.host, argumentName: "host" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Clash>(guardResult.getErrorValue());
        }

        const isNew = !!id == false;

        const clash = new Clash(
            { ...props, isFinish: props.isFinish ?? false },
            id
        );

        if (isNew) {
            clash.addDomainEvent(new ClashCreated(clash));
        }

        return Result.ok<Clash>(clash);
    }
}
