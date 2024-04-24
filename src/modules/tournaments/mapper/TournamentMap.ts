import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { TournamentData } from "../../../shared/infra/database/sequelize/models/Tournament";
import { GamesPerSet } from "../../league/domain/gamesPerSet";
import { SetQuantity } from "../../league/domain/setQuantity";
import { Tournament } from "../domain/tournament";
import { TournamentRules } from "../domain/tournamentRules";
import { TournamentStatus } from "../domain/tournamentStatus";

export class TournamentMap implements Mapper<Tournament> {
    public static forQuery(raw: TournamentData) {
        const rules = JSON.parse(raw.rules);
        return {
            tournamentId: raw.tournamentId,
            name: raw.name,
            status: raw.status,
            rules: rules,
            startDate: raw.startDate,
            endDate: raw.endDate,
            image: raw.image,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    }

    public static toDomain(raw: TournamentData) {
        const mustTournamentStatus = TournamentStatus.create({
            value: raw.status,
        });

        const rulesObj = JSON.parse(raw.rules);

        const mustRules = TournamentRules.create({
            setsQuantity: SetQuantity.create({
                value: rulesObj.setsQuantity,
            }).getValue(),
            gamesPerSet: GamesPerSet.create({
                value: rulesObj.gamesPerSet,
            }).getValue(),
        });

        const mustTournament = Tournament.create(
            {
                name: raw.name,
                status: mustTournamentStatus.getValue(),
                startDate: raw.startDate,
                endDate: raw.endDate,
                image: raw.image,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
                rules: mustRules.getValue(),
            },
            new UniqueEntityID(raw.tournamentId)
        );

        mustTournament.isFailure ??
            console.log(
                mustTournament.getErrorValue(),
                "error tournament to domain"
            );

        return mustTournament.isSuccess
            ? mustTournament.getValue()
            : mustTournament.getErrorValue();
    }

    public static toPersistance(t: Tournament) {
        const rules = JSON.stringify({
            setsQuantity: t.rules.setsQuantity.value,
            gamesPerSet: t.rules.gamesPerSet.value,
        });

        return {
            tournamentId: t.tournamentId.id.toString(),
            name: t.name,
            rules,
            status: t.status.value,
            startDate: t.startDate,
            endDate: t.endDate,
            image: t.image,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
        };
    }
}
