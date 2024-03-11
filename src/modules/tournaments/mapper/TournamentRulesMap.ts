import { Mapper } from "../../../shared/infra/Mapper";
import { CategoryMap } from "../../league/mappers/categoryMap";
import { TeamsConfig } from "../domain/teamsConfig";
import { TournamentRules } from "../domain/tournamentRules";

export class TournamentRulesMap implements Mapper<TournamentRules> {
    private static teamConfigToPersistance(tc: TeamsConfig | null) {
        if (!tc) {
            return null;
        }

        return {
            matchesQty: tc.matchesQty,
            singlesQty: tc.singlesQty,
            doublesQty: tc.doublesQty,
        };
    }

    private static teamConfigToDomain(raw?: {
        matchesQty: number;
        singlesQty: number;
        doublesQty: number;
    }) {
        if (!raw) {
            return null;
        }
        const mustConfig = TeamsConfig.create(raw);

        return mustConfig.isSuccess ? mustConfig.getValue() : null;
    }

    public static toDomain(raw: string) {
        const obj = JSON.parse(raw);

        const mustRules = TournamentRules.create({
            setsQuantity: obj.setsQuantity.value,
            gamesPerSet: obj.gamesPerSet.value,
            categoryType: obj.categoryType,
            category: obj.category ? CategoryMap.toDomain(obj.category!) : null,
            summation: obj.summation,
            isTeamClash: obj.isTeamClash,
            mode: obj.mode?.value ?? null,
            teamsConfig: this.teamConfigToDomain(obj.teamsConfig),
        });

        mustRules.isFailure ??
            console.log(mustRules.getErrorValue(), "error in rules to domain");

        return mustRules.isSuccess ? mustRules.getValue() : null;
    }

    public static toPersistance(r: TournamentRules) {
        const obj = {
            setsQuantity: r.setsQuantity.value,
            gamesPerSet: r.gamesPerSet.value,
            categoryType: r.categoryType,
            category: r.category ? CategoryMap.toDto(r.category!) : null,
            summation: r.summation,
            isTeamClash: r.isTeamClash,
            mode: r.mode?.value ?? null,
            teamsConfig: this.teamConfigToPersistance(r.teamsConfig),
        };

        return JSON.stringify(obj);
    }
}
