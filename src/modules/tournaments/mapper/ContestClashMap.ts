import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ContestClash } from "../domain/contestClash";
import { ContestId } from "../domain/contestId";
import { TournamentMatchId } from "../domain/tournamentMatchId";
import { TournamentMatchesIds } from "../domain/tournamentMatches";
import { ContestClashDto } from "../dtos/contestClashDto";
import { ContestTeamMap } from "./ContestTeamMap";

export class ContestClashMap implements Mapper<ContestClash> {
    public static toDomain(raw: any) {
        console.log(`${JSON.stringify(raw)} RAW to domain`);
        const maybeClash = ContestClash.create(
            {
                t1WonClash: raw.t1WonClash,
                contestId: ContestId.create(
                    new UniqueEntityID(raw.contestId)
                ).getValue(),
                isFinish: raw.isFinish,
                matchIds: TournamentMatchesIds.create(
                    raw.matchIds.map((i: string) =>
                        TournamentMatchId.create(
                            new UniqueEntityID(i)
                        ).getValue()
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
            contestId: clash.contestId.id.toString(),
            t1WonClash: clash.t1WonClash,
            isFinish: clash.isFinish,
            matchIds: clash.matchIds.getItems().map((i) => i.id.toString()),
            team1Id: clash.team1.contestTeamId.id.toString(),
            team2Id: clash.team2.contestTeamId.id.toString(),
        };
    }

    public static toDto(clash: ContestClash): ContestClashDto {
        return {
            contestClashId: clash.contestClashId.id.toString(),
            contestId: clash.contestId.id.toString(),
            t1WonClash: clash.t1WonClash,
            isFinish: clash.isFinish,
            matchIds: clash.matchIds.getItems().map((i) => i.id.toString()),
            team1: ContestTeamMap.toDto(clash.team1),
            team2: ContestTeamMap.toDto(clash.team2),
        };
    }
}
