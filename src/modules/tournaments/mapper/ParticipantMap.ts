import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { UserMap } from "../../users/mappers/userMap";
import { Participant } from "../domain/participant";
import { ParticipantDto } from "../dtos/participantDto";

export class ParticipantMap implements Mapper<Participant> {
    public static forQuery(raw: any) {
        delete raw.user.dataValues.recoverPasswordCode;
        delete raw.user.dataValues.password;
        delete raw.user.dataValues.accessToken;
        console.log(raw, "\n");
        return raw.dataValues;
    }

    public static toDto(p: Participant): ParticipantDto {
        return {
            participantId: p.participantId.id.toString(),
            user: UserMap.toDto(p.user),
            device: p.device,
            avatar: p.avatar,
            isDeleted: p.isDeleted
        }
    }

    public static toDomain(raw: any) {
        const user = UserMap.toDomain(raw.user);

        const mustParticipant = Participant.create(
            {
                user: user!,
                device: raw.device,
                avatar: raw.avatar,
            },
            new UniqueEntityID(raw.participantId)
        );

        mustParticipant.isFailure ??
            console.log(mustParticipant.getErrorValue());

        return mustParticipant.isSuccess ? mustParticipant.getValue() : null;
    }

    public static toPersistance(p: Participant) {
        return {
            participantId: p.participantId.id.toString(),
            userId: p.user.userId.id.toString(),
            device: p.device,
            avatar: p.avatar,
            isDeleted: p.isDeleted,
        };
    }
}
