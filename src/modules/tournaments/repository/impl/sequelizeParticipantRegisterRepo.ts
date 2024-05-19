import { Sequelize } from "sequelize";

import {
    BulkRegisterResponse,
    NewParticipantRecord,
    RegisterParticipantsRepository,
} from "../registerParticipantsRepo";
import config from "../../../../shared/infra/database/sequelize/config/config";
import { UserMap } from "../../../users/mappers/userMap";
import { ParticipantMap } from "../../mapper/ParticipantMap";
import models from "../../../../shared/infra/database/sequelize/models";

const sequelize: Sequelize = config.connection;

export class SequelizeRegisterParticipantsRepository
    implements RegisterParticipantsRepository
{
    async registerBulk(
        records: NewParticipantRecord[]
    ): Promise<BulkRegisterResponse> {
        const response: BulkRegisterResponse = {
            rows: [],
            errors: [],
        };
        for (const r of records) {
            const t = await sequelize.transaction();
            try {
                if (r.user) {
                    const raw = await UserMap.toPersistance(r.user);

                    await models.UserModel.create(raw, { transaction: t });
                }

                const raw = ParticipantMap.toPersistance(r.participant);

                await models.ParticipantModel.create(raw, { transaction: t });

                await t.commit();

                response.rows.push(r.participant);
            } catch (error) {
                await t.rollback();
                console.log(error, "Error bulk register");
                response.errors.push({
                    error: `Error al agregar al participante con CI ${r.participant.user.ci?.value}`,
                    ci: r.participant.user.ci!.value,
                });
            }
        }
        return response;
    }
}
