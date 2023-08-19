import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Clash } from "./clubClash";
import { journeyValues } from "./journey";
import { RankingId } from "./rankingId";
import { SeasonId } from "./seasonId";
import { TeamId } from "./teamId";

interface RankingProps {
    position: string;
    teamId: TeamId;
    seasonId: SeasonId;
}

export const positions = {
    champion: "Campeon",
    subChampion: "Sub Campeon",
    semiFinals: "Semi Finalista",
    quarterFinals: "Cuartos de final",
    rountOf16: "Octavos de final",
    groups: "Fase de Grupos",
};

export class Ranking extends Entity<RankingProps> {
    get rankindId(): RankingId {
        return RankingId.create(this._id).getValue();
    }

    get position(): string {
        return this.props.position;
    }

    get teamId(): TeamId {
        return this.props.teamId;
    }

    get seasonId(): TeamId {
        return this.props.seasonId;
    }

    public updateRankingPosition(clash: Clash): void {
        if (clash.journey.value == journeyValues.Final) {
            if (clash.wonClash) {
                this.props.position = positions.champion;
                return;
            }
            this.props.position = positions.subChampion;
        }
        if (clash.journey.value == journeyValues.Semifinals) {
            this.props.position = positions.semiFinals;
            return;
        }
        if (clash.journey.value == journeyValues.CuarterFinals) {
            this.props.position = positions.quarterFinals;
            return;
        }
        if (clash.journey.value == journeyValues.RoundOf16) {
            this.props.position = positions.rountOf16;
            return;
        }
        this.props.position = positions.groups;
    }

    private constructor(props: RankingProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: RankingProps,
        id?: UniqueEntityID
    ): Result<Ranking> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.position, argumentName: "posicion" },
        ]);

        if (guard.isFailure) {
            return Result.fail<Ranking>(guard.getErrorValue());
        }

        const instance = new Ranking(props, id);

        return Result.ok<Ranking>(instance);
    }
}
