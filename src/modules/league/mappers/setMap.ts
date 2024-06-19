import { Set } from "../domain/set";
import { Mapper } from "../../../shared/infra/Mapper";
import { SetDto, SetPlayerStatsDto, SetStatsDto } from "../dtos/setDto";
import { SetStats } from "../domain/setStats";
import { SetPlayerStats } from "../domain/playerSetStats";

export class SetMap implements Mapper<Set> {

    public static toPersistance(set: Set) {
        const object = {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon,
            tiebreak: set.tiebreak,
            superTiebreak: set.superTiebreak,
            myTiebreakPoints: set.myTiebreakPoints,
            rivalTiebreakPoints: set.rivalTiebreakPoints,
            stats: set.stats,
        };

        return JSON.stringify(object);
    }

    public static toDomain(raw: SetDto | string): Set | null {
        let object: any;
        if (typeof raw == 'string') {
            object = JSON.parse(raw);
        } else {
            object = raw;
        }

        const setOrError = Set.create({
            setWon: object.setWon,
            myGames: object.myGames,
            rivalGames: object.rivalGames,
            tiebreak: object.tiebreak ?? false,
            superTiebreak: object.superTiebreak ?? false,
            myTiebreakPoints: object.myTiebreakPoints ?? 0,
            rivalTiebreakPoints: object.rivalTiebreakPoints ?? 0,
            stats: object.stats,
        });

        setOrError.isFailure && console.log(setOrError.getErrorValue());

        return setOrError.isSuccess ? setOrError.getValue() : null;
    }

    public static toDto(set: Set): SetDto {
        return {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon ?? null,
            tiebreak: set.tiebreak,
            superTiebreak: set.superTiebreak,
            myTiebreakPoints: set.myTiebreakPoints,
            rivalTiebreakPoints: set.rivalTiebreakPoints,
            stats: set.stats,
        };
    }
}
