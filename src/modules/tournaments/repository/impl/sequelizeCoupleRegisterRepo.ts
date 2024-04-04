import { Sequelize } from "sequelize";

import {
    BulkRegisterResponse,
    NewCoupleRecord,
    RegisterCouplesRepository,
} from "../registerCouplesRepo";
import { UserMap } from "../../../users/mappers/userMap";
import { UserModel } from "../../../../shared/infra/database/sequelize/models/BaseUser";
import config from "../../../../shared/infra/database/sequelize/config/config";
import { ParticipantModel } from "../../../../shared/infra/database/sequelize/models/Participant";
import { ParticipantMap } from "../../mapper/ParticipantMap";
import { CoupleMap } from "../../mapper/CoupleMap";
import { CoupleModel } from "../../../../shared/infra/database/sequelize/models/Couple";

const sequelize: Sequelize = config.connection;

export class SequelizeCoupleRegisterRepository
    implements RegisterCouplesRepository {
    async registerBulk(
        records: NewCoupleRecord[]
    ): Promise<BulkRegisterResponse> {
        const response: BulkRegisterResponse = {
            rows: [],
            errors: [],
        };

        console.log(records, "RECORDS");

        for (const r of records) {
            const t = await sequelize.transaction();

            if (r.couple == null) {
                console.log("enteer continue")
                continue;
            }

            try {
                if (r.user1) {
                    const raw = await UserMap.toPersistance(r.user1);

                    await UserModel.create(raw, { transaction: t });
                }

                if (r.user2) {
                    const raw = await UserMap.toPersistance(r.user2);

                    await UserModel.create(raw, { transaction: t });
                }

                if (r.participant1) {
                    const raw = ParticipantMap.toPersistance(r.participant1);

                    await ParticipantModel.create(raw, { transaction: t });
                }

                if (r.participant2) {
                    const raw = ParticipantMap.toPersistance(r.participant2);

                    await ParticipantModel.create(raw, { transaction: t });
                }

                const raw = CoupleMap.toPersistance(r.couple);

                await CoupleModel.create(raw, { transaction: t });

                await t.commit();

                response.rows.push(r.couple);
            } catch (error) {
                await t.rollback();
                console.log(error, "Error bulk register");
                response.errors.push({
                    error: `Error al agregar a la pareja, ${r.couple.p1.user.ci?.value} y ${r.couple.p2.user.ci?.value}`,
                    coupleId: r.couple.coupleId.id.toString(),
                });
            }
        }
        return response;
    }
}
