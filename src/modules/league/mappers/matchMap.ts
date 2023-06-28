import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ClashId } from "../domain/clashId";
import { Match } from "../domain/match";
import { Sets } from "../domain/sets";
import { MatchDto } from "../dtos/matchDto";
import { PlayerMap } from "./playerMap";
import { SetMap } from "./setMap";
import { TrackerMap } from "./trackerMap";

export class MatchMap implements Mapper<Match> {
    public static toDomain(raw: any): Match {
        const setsArr = raw.sets.map((s) => SetMap.toDomain(s));
        const clashIdOrError = ClashId.create(new UniqueEntityID(raw.clashId));

        const sets = Sets.create(setsArr);

        const matchOrError = Match.create(
            {
                clashId: clashIdOrError.getValue(),
                tracker: raw.tracker,
                surface: raw.surface,
                superTieBreak: raw.superTieBreak,
                gamesPerSet: raw.gamesPerSet,
                player2: raw.player2,
                player1: raw.player1,
                sets: sets,
                setsQuantity: raw.setsQuantity,
                mode: raw.mode,
                address: raw.address,
                player3: raw.player3,
                player4: raw.player4,
                category: raw.category,
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
            player3: match.player3.playerId.id.toString() || null,
            player4: match.player4,
        };
    }

    public static toDto(match: Match): MatchDto {
        return {
            tracker: TrackerMap.toDto(match.tracker),
            mode: match.mode.value,
            setsQuantity: match.setsQuantity.value,
            sets: match.sets.getItems().map((set) => SetMap.toDto(set)),
            gamesPerSet: match.gamesPerSet.value,
            superTieBreak: match.superTieBreak,
            address: match.address,
            surface: match.surface.value,
            player1: PlayerMap.toDto(match.player1),
            player2: match.player2,
            player3: match.player3 ? PlayerMap.toDto(match.player1) : null,
            player4: match.player4,
        }
    }
}
