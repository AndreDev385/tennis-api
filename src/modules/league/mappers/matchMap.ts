import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Match } from "../domain/match";

export class MatchMap implements Mapper<Match> {
    public static toDomain(raw: any): Match {
        const matchOrError = Match.create(
            {
                tracker: raw.tracker,
                surface: raw.surface,
                superTieBreak: raw.superTieBreak,
                gamesPerSet: raw.gamesPerSet,
                player2: raw.player2,
                player1: raw.player1,
                sets: raw.sets,
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
        return {
            matchId: match.matchId.id.toString(),
            mode: match.mode,
            categoryId: match.category.categoryId.id.toString(),
            setsQuantity: match.setsQuantity,
            gamesPerSet: match.gamesPerSet,
            superTieBreak: match.superTieBreak,
            address: match.address,
            surface: match.surface,
            player1: match.player1.playerId.id.toString(),
            player2: match.player2,
            player3: match.player3.playerId.id.toString() || null,
            player4: match.player4,
        };
    }
}
