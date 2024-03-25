import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { TournamentData } from "../../../shared/infra/database/sequelize/models/Tournament";
import { Tournament } from "../domain/tournament";
import { TournamentStatus } from "../domain/tournamentStatus";
import { ContestsMap } from "./ContestsMap";
import { TournamentRulesMap } from "./TournamentRulesMap";

export class TournamentMap implements Mapper<Tournament> {
    public static forQuery(raw: TournamentData) {
        return {
            tournamentId: raw.tournamentId,
            name: raw.name,
            status: raw.status,
            rules: TournamentRulesMap.forQuery(raw.rules)!,
            contests: ContestsMap.forQuery(raw.contests),
            startDate: raw.startDate,
            endDate: raw.endDate,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }
    }

    public static toDomain(raw: TournamentData) {
        const mustTournamentStatus = TournamentStatus.create({
            value: raw.status,
        });

        const mustTournament = Tournament.create(
            {
                name: raw.name,
                status: mustTournamentStatus.getValue(),
                startDate: raw.startDate,
                endDate: raw.endDate,
                contests: ContestsMap.toDomain(raw.contests),
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
            startDate: t.startDate,
            endDate: t.endDate,
            contests: ContestsMap.toPersistance(t.contests),
            participants: t.participants.map(p => p.id.toString()),
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
        };
    }
}
