import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ContestId } from "../domain/contestId";
import { ContestTeam } from "../domain/contestTeam";
import { ParticipantId } from "../domain/participantId";
import { ParticipantsIds } from "../domain/participantsIds";
import { ContestTeamDto } from "../dtos/contestTeamDto";

export class ContestTeamMap implements Mapper<ContestTeam> {
    static toDto(c: ContestTeam | null): ContestTeamDto | null {
        if (c == null) return null;

        return {
            contestTeamId: c.contestTeamId.id.toString(),
            contestId: c.contestId.id.toString(),
            name: c.name,
            participantsIds: c.participantsIds
                .getItems()
                .map((id) => id.id.toString()),
        };
    }

    public static toDomain(raw: any) {
        const maybeTeam = ContestTeam.create(
            {
                name: raw.name,
                contestId: ContestId.create(
                    new UniqueEntityID(raw.contestId)
                ).getValue(),
                participantsIds: ParticipantsIds.create(
                    raw.participantsIds.map((i: any) =>
                        ParticipantId.create(new UniqueEntityID(i.id))
                    )
                ),
            },
            new UniqueEntityID(raw.contestTeamId)
        );

        return maybeTeam.getValue();
    }
}
