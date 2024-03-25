import { Mapper } from "../../../shared/infra/Mapper";
import { Mode } from "../../league/domain/gameMode";
import { CategoryMap } from "../../league/mappers/categoryMap";
import { Contest } from "../domain/contest";
import { Contests } from "../domain/contests";
import { Summation } from "../domain/summation";

export class ContestsMap implements Mapper<Contests> {
    public static forQuery(raw: Array<string>) {
        const contestsObjs = raw.map((s) => JSON.parse(s));

        return contestsObjs.map((o) => ({
            ...o,
            summation: this.summationForQuery(o.summation),
            category: o.category,
        }));
    }

    public static toDomain(raw: Array<string>) {
        const contestsObjs = raw.map((s) => JSON.parse(s));

        const contestArr = contestsObjs.map((obj) =>
            Contest.create({
                mode: Mode.create({ value: obj.mode }).getValue(),
                categoryType: obj.categoryType,
                category: obj.category
                    ? CategoryMap.toDomain(obj.category)
                    : null,
                summation: this.summationToDomain(obj.summation),
            }).getValue()
        );

        return Contests.create(contestArr);
    }

    public static toPersistance(contests: Contests) {
        return contests.getItems().map((i) =>
            JSON.stringify({
                mode: i.mode.value,
                categoryType: i.categoryType,
                category: i.category ? CategoryMap.toDto(i.category) : null,
                summation: i.summation
                    ? this.summationToPersistance(i.summation)
                    : null,
            })
        );
    }

    private static summationForQuery(raw: any) {
        if (!raw) {
            return null;
        }

        return {
            value: raw.value,
            letter: raw.letter,
        };
    }

    private static summationToDomain(raw: any) {
        if (!raw) {
            return null;
        }
        return Summation.create({
            value: raw.value,
            letter: raw.letter,
        }).getValue();
    }

    private static summationToPersistance(s: Summation) {
        return {
            letter: s.letter,
            value: s.value,
        };
    }
}
