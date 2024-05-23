import models from "../../../../shared/infra/database/sequelize/models";
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
            include: [{ model: models.UserModel, as: "user" }],
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

        const data = await models.ParticipantModel.findAndCountAll(query);

        console.log("DATA", data);

        return {
            rows: data.rows.map((p) => ParticipantMap.forQuery(p)),
            count: data.count,
        };
    }

    async get(q: ParticipantQuery): Promise<Participant> {
        const query = this.baseQuery();
        query.where = q;

        const participantData = await models.ParticipantModel.findOne(query);

        if (!participantData) {
            throw new Error("Participante no encontrado");
        }

        return ParticipantMap.toDomain(participantData)!;
    }

    async save(p: Participant): Promise<void> {
        const raw = ParticipantMap.toPersistance(p);

        const participantData = await models.ParticipantModel.findOne({
            where: { participantId: raw.participantId },
        });

        if (participantData) {
            await models.ParticipantModel.update(raw, {
                where: { participantId: raw.participantId },
            });
        } else {
            const instance = await models.ParticipantModel.create(raw);
            await instance.save();
        }
    }
}
