import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Couple } from "../domain/couple";
import { Participant } from "../domain/participant";
import { CoupleDto } from "../dtos/coupleDto";
import { ParticipantMap } from "./ParticipantMap";

export type BuildCoupleData = {
    coupleId: string;
    p1: Participant;
    p2: Participant;
};

export class CoupleMap implements Mapper<Couple> {
    public static toDto(c: Couple): CoupleDto {
        return {
            coupleId: c.coupleId.id.toString(),
            p1: ParticipantMap.toDto(c.p1),
            p2: ParticipantMap.toDto(c.p2),
        };
    }

    public static toDomain(c: BuildCoupleData) {
        const mustCouple = Couple.create(
            {
                p1: c.p1,
                p2: c.p2,
            },
            new UniqueEntityID(c.coupleId)
        );

        mustCouple.isFailure ?? console.log(mustCouple.getErrorValue());
        return mustCouple.isSuccess ? mustCouple.getValue() : null;
    }

    public static toPersistance(c: Couple) {
        return {
            coupleId: c.coupleId.id.toString(),
            p1Id: c.p1.participantId.id.toString(),
            p2Id: c.p2.participantId.id.toString(),
        };
    }
}
