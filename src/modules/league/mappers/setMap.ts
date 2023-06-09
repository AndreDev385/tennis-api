import { Set } from "../domain/set";
import { Mapper } from "../../../shared/infra/Mapper";
import { SetDto } from "../dtos/setDto";

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
        });

        setOrError.isFailure && console.log(setOrError.getErrorValue());

        return setOrError.isSuccess ? setOrError.getValue() : null;
    }

    public static toDto(set: Set): SetDto {
        return {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon,
        };
    }
}
