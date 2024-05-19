import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ContestClash } from "../domain/contestClash";
import { ContestId } from "../domain/contestId";
import { TournamentMatchId } from "../domain/tournamentMatchId";
import { TournamentMatchesIds } from "../domain/tournamentMatches";

export class ContestClashMap implements Mapper<ContestClash> {
    public static toDomain(raw: any) {
        const maybeClash = ContestClash.create(
            {
                t1WonClash: raw.t1WonClash,
                contestId: ContestId.create(
                    new UniqueEntityID(raw.contestId)
                ).getValue(),
                isFinish: raw.isFinish,
                matchIds: TournamentMatchesIds.create(
                    raw.matchIds
                        .getItems()
                        .map((i: string) =>
                            TournamentMatchId.create(new UniqueEntityID(i))
                        )
                ),
                team1: raw.team1,
                team2: raw.team2,
            },
            new UniqueEntityID(raw.contestClashId)
        );

        maybeClash.isFailure &&
            console.log(
                `MAPPER ERROR: [ConestClash] ${maybeClash.getErrorValue()}`
            );

        return maybeClash.getValue();
    }

    public static toPersistance(clash: ContestClash) {
        return {
            contestClashId: clash.contestClashId.id.toString(),
            t1WonClash: clash.t1WonClash,
            isFinish: clash.isFinish,
            matchIds: clash.matchIds.getItems().map((i) => i.id.toString()),
            team1Id: clash.team1.contestTeamId.id.toString(),
            team2Id: clash.team2.contestTeamId.id.toString(),
        };
    }
}
