import { Mapper } from "../../../shared/infra/Mapper";
import { TournamentRules } from "../domain/tournamentRules";

export class TournamentRulesMap implements Mapper<TournamentRules> {
    public static forQuery(raw: string) {
        const obj = JSON.parse(raw);
        return obj;
    }

    public static toDomain(raw: string) {
        const obj = JSON.parse(raw);
        console.log("TO DOMAIN RULES", obj);

        const mustRules = TournamentRules.create(obj);

        mustRules.isFailure ??
            console.log(mustRules.getErrorValue(), "error in rules to domain");

        return mustRules.isSuccess ? mustRules.getValue() : null;
    }

    public static toPersistance(r: TournamentRules) {
        console.log(r, 'IN to persistance de rules, domain', r.setsQuantity.value, r.gamesPerSet.value);
        const obj = {
            setsQuantity: r.setsQuantity.value,
            gamesPerSet: r.gamesPerSet.value,
        };

        console.log("TO persistance rules obj", obj, obj.gamesPerSet, obj.setsQuantity);

        return JSON.stringify(obj);
    }
}
