import { UserModel } from "../../../../shared/infra/database/sequelize/models/BaseUser";
import { ParticipantModel } from "../../../../shared/infra/database/sequelize/models/Participant";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Participant } from "../../domain/participant";
import { ParticipantDto } from "../../dtos/participantDto";
import { ParticipantMap } from "../../mapper/ParticipantMap";
import { ParticipantQuery, ParticipantRepo } from "../participantRepo";

export class SequelizeParticipantRepository implements ParticipantRepo {
    private baseQuery(): any {
        return {
            where: {},
            include: [{ model: UserModel, as: "user" }],
        };
    }

    async paginate(
        q: ParticipantQuery,
        paginate: PaginateQuery
    ): Promise<PaginateResponse<ParticipantDto>> {
        const query = this.baseQuery();
        query.where = q;
        query.limit = paginate.limit ?? 20;
        query.offset = paginate.offset ?? 0;

        const data = await ParticipantModel.findAndCountAll(query);

        return {
            rows: data.rows.map((p) => ParticipantMap.forQuery(p)),
            count: data.count,
        };
    }

    async get(q: ParticipantQuery): Promise<Participant> {
        const query = this.baseQuery();
        query.where = q;

        const participantData = await ParticipantModel.findOne(query);

        if (!participantData) {
            throw new Error("Participante no encontrado");
        }

        return ParticipantMap.toDomain(participantData)!;
    }

    async save(p: Participant): Promise<void> {
        const raw = ParticipantMap.toPersistance(p);

        const participantData = await ParticipantModel.findOne({
            where: { participantId: raw.participantId },
        });

        if (participantData) {
            await ParticipantModel.update(raw, {
                where: { participantId: raw.participantId },
            });
        } else {
            const instance = await ParticipantModel.create(raw);
            await instance.save();
        }
    }
}
