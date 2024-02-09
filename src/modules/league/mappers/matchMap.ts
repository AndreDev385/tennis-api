import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Mode } from "../domain/gameMode";
import { GamesPerSet } from "../domain/gamesPerSet";
import { Match } from "../domain/match";
import { MatchStatus } from "../domain/matchStatus";
import { MatchTracker } from "../domain/matchTracker";
import { Player } from "../domain/player";
import { Set } from "../domain/set";
import { SetQuantity } from "../domain/setQuantity";
import { Sets } from "../domain/sets";
import { Surface } from "../domain/surface";
import { CategoryDto } from "../dtos/categoryDto";
import { MatchDto } from "../dtos/matchDto";
import { CategoryMap } from "./categoryMap";
import { SetMap } from "./setMap";
import { TrackerMap } from "./trackerMap";

export interface MatchDataForMapper {
    matchId: string;
    sets: string[];
    clashId: string;
    mode: string;
    surface: string;
    superTieBreak: boolean;
    gamesPerSet: number;
    setsQuantity: number;
    status: number;
    category: CategoryDto;
    address: string | null;
    player1: Player;
    player2: string;
    player3?: Player | null;
    player4?: string | null;
    tracker: MatchTracker | null;
    matchWon: boolean | null;
}

export class MatchMap implements Mapper<Match> {
    public static toDomain(raw: MatchDataForMapper): Match | null {
        const setsArr = raw.sets.map((s: any) => SetMap.toDomain(s));

        const modeOrError = Mode.create({ value: raw.mode });
        const surfaceOrError = Surface.create({ value: raw.surface });
        const setsQuantityOrError = SetQuantity.create({
            value: raw.setsQuantity,
        });
        const gamesPerSetOrError = GamesPerSet.create({
            value: raw.gamesPerSet,
        });

        const sets = Sets.create(setsArr as Set[]);

        const status = MatchStatus.create({ value: raw.status });

        const matchOrError = Match.create(
            {
                clashId: new UniqueEntityID(raw.clashId),
                tracker: raw.tracker,
                surface: surfaceOrError.getValue(),
                superTieBreak: raw.superTieBreak,
                gamesPerSet: gamesPerSetOrError.getValue(),
                sets: sets,
                setsQuantity: setsQuantityOrError.getValue(),
                mode: modeOrError.getValue(),
                address: raw.address,
                player1: raw.player1,
                player2: raw.player2,
                player3: raw.player3,
                player4: raw.player4,
                category: CategoryMap.toDomain(raw.category)!,
                status: status.getValue(),
                matchWon: raw.matchWon,
            },
            new UniqueEntityID(raw.matchId)
        );

        matchOrError.isFailure ? console.log(matchOrError.getErrorValue()) : "";

        return matchOrError.isSuccess ? matchOrError.getValue() : null;
    }

    public static toPersistance(match: Match) {
        return {
            matchId: match.matchId.id.toString(),
            clashId: match.clashId.toString(),
            mode: match.mode.value,
            categoryId: match.category.categoryId.id.toString(),
            setsQuantity: match.setsQuantity.value,
            sets: match.sets.getItems().map((s) => SetMap.toPersistance(s)),
            gamesPerSet: match.gamesPerSet.value,
            superTieBreak: match.superTieBreak,
            address: match.address,
            surface: match.surface.value,
            player1: match.player1.playerId.id.toString(),
            player2: match.player2,
            player3: match.player3?.playerId?.id?.toString() ?? null,
            player4: match.player4 ?? null,
            status: match.status.value,
            matchWon: match.matchWon ?? null,
        };
    }

    public static toDto(match: Match): MatchDto {
        return {
            matchId: match.matchId.id.toString(),
            clashId: match.clashId.toString(),
            mode: match.mode.value,
            category: match.category.name,
            setsQuantity: match.setsQuantity.value,
            sets: match.sets.getItems().map((set) => SetMap.toDto(set)),
            gamesPerSet: match.gamesPerSet.value,
            superTieBreak: match.superTieBreak,
            address: match.address ?? "",
            surface: match.surface.value,
            player1: {
                playerId: match.player1.playerId.id.toString(),
                name: `${match.player1.firstName.value} ${match.player1.lastName.value}`,
            },
            player2: match.player2,
            player3: match.player3
                ? {
                      playerId: match.player3.playerId.id.toString(),
                      name: `${match.player3.firstName.value} ${match.player3.lastName.value}`,
                  }
                : null,
            player4: match.player4 ?? null,
            tracker: match.tracker ? TrackerMap.toDto(match.tracker) : null,
            matchWon: match.matchWon ?? null,
            status: match.status.value,
        };
    }
}
