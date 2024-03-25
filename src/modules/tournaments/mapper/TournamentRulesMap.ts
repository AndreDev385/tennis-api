import { Mapper } from "../../../shared/infra/Mapper";
import { TournamentRules } from "../domain/tournamentRules";

export class TournamentRulesMap implements Mapper<TournamentRules> {
    public static forQuery(raw: string) {
        return JSON.parse(raw);
    }

    public static toDomain(raw: string) {
        const obj = JSON.parse(raw);

        const mustRules = TournamentRules.create({
            setsQuantity: obj.setsQuantity.value,
            gamesPerSet: obj.gamesPerSet.value,
        });

        mustRules.isFailure ??
            console.log(mustRules.getErrorValue(), "error in rules to domain");

        return mustRules.isSuccess ? mustRules.getValue() : null;
    }

    public static toPersistance(r: TournamentRules) {
        const obj = {
            setsQuantity: r.setsQuantity.value,
            gamesPerSet: r.gamesPerSet.value,
        };

        return JSON.stringify(obj);
    }
}
