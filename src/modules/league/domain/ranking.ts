import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Clash } from "./clubClash";
import { journeyValues } from "./journey";
import { RankingId } from "./rankingId";
import { SeasonId } from "./seasonId";
import { Team } from "./team";
import { TeamId } from "./teamId";

interface RankingProps {
    position: string;
    team: Team;
    seasonId: SeasonId;
    symbol: string;
}

export const positions = {
    champion: "Campeón",
    subChampion: "Subcampeón",
    semiFinals: "Semifinalista",
    quarterFinals: "Cuartos de final",
    roundOf16: "Octavos de final",
    groups: "Fase de grupos",
};

export const symbols = {
    champion: "1",
    subChampion: "2",
    semiFinals: "4",
    quarterFinals: "8",
    roundOf16: "16",
    groups: "G",
}

export class Ranking extends Entity<RankingProps> {
    get rankingId(): RankingId {
        return RankingId.create(this._id).getValue();
    }

    get position(): string {
        return this.props.position;
    }

    get team(): Team {
        return this.props.team;
    }

    get seasonId(): TeamId {
        return this.props.seasonId;
    }

    get symbol(): string {
        return this.props.symbol;
    }

    public updateRankingPosition(clash: Clash): void {
        if (clash.journey.value == journeyValues.Final) {
            if (clash.wonClash) {
                this.props.position = positions.champion;
                this.props.symbol = symbols.champion;
                return;
            }
            this.props.position = positions.subChampion;
            this.props.symbol = symbols.subChampion
            return;
        }
        if (clash.journey.value == journeyValues.Semifinals) {
            this.props.position = positions.semiFinals;
            this.props.symbol = symbols.semiFinals;
            return;
        }
        if (clash.journey.value == journeyValues.CuarterFinals) {
            this.props.position = positions.quarterFinals;
            this.props.symbol = symbols.quarterFinals;
            return;
        }
        if (clash.journey.value == journeyValues.RoundOf16) {
            this.props.position = positions.roundOf16;
            this.props.symbol = symbols.roundOf16;
            return;
        }
        this.props.position = positions.groups;
        this.props.symbol = symbols.groups;
    }

    private constructor(props: RankingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: RankingProps,
        id?: UniqueEntityID
    ): Result<Ranking> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.position, argumentName: "posición" },
        ]);

        if (guard.isFailure) {
            return Result.fail<Ranking>(guard.getErrorValue());
        }

        const instance = new Ranking(props, id);

        return Result.ok<Ranking>(instance);
    }
}
