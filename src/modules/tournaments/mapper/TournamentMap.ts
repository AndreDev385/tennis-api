import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { TournamentData } from "../../../shared/infra/database/sequelize/models/Tournament";
import { Tournament } from "../domain/tournament";
import { TournamentStatus } from "../domain/tournamentStatus";
import { TournamentRulesMap } from "./TournamentRulesMap";

export class TournamentMap implements Mapper<Tournament> {

    public static toDomain(raw: TournamentData) {
        const mustTournamentStatus = TournamentStatus.create({
            value: raw.status,
        });

        const mustTournament = Tournament.create(
            {
                name: raw.name,
                status: mustTournamentStatus.getValue(),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
                rules: TournamentRulesMap.toDomain(raw.rules)!,
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
        return {
            tournamentId: t.tournamentId.id.toString(),
            name: t.name,
            rules: TournamentRulesMap.toPersistance(t.rules),
            status: t.status.value,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
        };
    }
}
