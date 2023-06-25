import { Set } from "../domain/set";
import { Mapper } from "../../../shared/infra/Mapper";

export class SetMap implements Mapper<Set> {
    public static toPersistance(set: Set) {
        const object = {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon,
        };

        return JSON.stringify(object);
    }

    public static toDomain(raw: any): Set {
        const object = JSON.parse(raw);

        const setOrError = Set.create({
            setWon: object.setWon,
            myGames: object.myGames,
            rivalGames: object.rivalGames,
            matchId: object.matchId,
        });

        setOrError.isFailure && console.log(setOrError.getErrorValue());

        return setOrError.isSuccess ? setOrError.getValue() : null;
    }
}
