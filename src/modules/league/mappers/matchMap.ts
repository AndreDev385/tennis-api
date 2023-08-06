import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ClashId } from "../domain/clashId";
import { Mode } from "../domain/gameMode";
import { GamesPerSet } from "../domain/gamesPerSet";
import { Match } from "../domain/match";
import { SetQuantity } from "../domain/setQuantity";
import { Sets } from "../domain/sets";
import { Surface } from "../domain/surface";
import { MatchDto } from "../dtos/matchDto";
import { CategoryMap } from "./categoryMap";
import { SetMap } from "./setMap";
import { TrackerMap } from "./trackerMap";

export class MatchMap implements Mapper<Match> {
    public static toDomain(raw: any): Match {
        const setsArr = raw.sets.map((s) => SetMap.toDomain(s));
        const clashIdOrError = ClashId.create(new UniqueEntityID(raw.clashId));

        const modeOrError = Mode.create({ value: raw.mode });
        const surfaceOrError = Surface.create({ value: raw.surface });
        const setsQuantityOrError = SetQuantity.create({
            value: raw.setsQuantity,
        });
        const gamesPerSetOrError = GamesPerSet.create({
            value: raw.gamesPerSet,
        });

        const sets = Sets.create(setsArr);

        const matchOrError = Match.create(
            {
                clashId: clashIdOrError.getValue(),
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
                category: CategoryMap.toDomain(raw.category),
                isLive: raw.isLive,
                isFinish: raw.isFinish,
                isCancelled: raw.isCancelled,
            },
            new UniqueEntityID(raw.matchId)
        );

        matchOrError.isFailure ? console.log(matchOrError.getErrorValue()) : "";

        return matchOrError.isSuccess ? matchOrError.getValue() : null;
    }

    public static toPersistance(match: Match) {
        const raw = match.sets.getItems().map((s) => SetMap.toPersistance(s));

        return {
            matchId: match.matchId.id.toString(),
            clashId: match.clashId.id.toString(),
            mode: match.mode.value,
            categoryId: match.category.categoryId.id.toString(),
            setsQuantity: match.setsQuantity.value,
            sets: raw,
            gamesPerSet: match.gamesPerSet.value,
            superTieBreak: match.superTieBreak,
            address: match.address,
            surface: match.surface.value,
            player1: match.player1.playerId.id.toString(),
            player2: match.player2,
            player3: match.player3?.playerId?.id?.toString() || null,
            player4: match.player4 || null,
            isLive: match.isLive,
            isFinish: match.isFinish,
            isCancelled: match.isCancelled,
        };
    }

    public static toDto(match: Match): MatchDto {
        return {
            matchId: match.matchId.id.toString(),
            clashId: match.clashId.id.toString(),
            mode: match.mode.value,
            category: match.category.name,
            setsQuantity: match.setsQuantity.value,
            sets: match.sets.getItems().map((set) => SetMap.toDto(set)),
            gamesPerSet: match.gamesPerSet.value,
            superTieBreak: match.superTieBreak,
            address: match.address,
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
            player4: match.player4 || null,
            tracker: match.tracker ? TrackerMap.toDto(match.tracker) : null,
            isLive: match.isLive,
            isFinish: match.isFinish,
            matchWon: match.matchWon,
            isCancelled: match.isCancelled,
        };
    }
}
