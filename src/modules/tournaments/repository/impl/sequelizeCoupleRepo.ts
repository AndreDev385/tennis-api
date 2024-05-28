import models from "../../../../shared/infra/database/sequelize/models";
import { Couple } from "../../domain/couple";
import { CoupleMap } from "../../mapper/CoupleMap";
import { CoupleQuery, CoupleRepository } from "../coupleRepo";
import { ParticipantRepo } from "../participantRepo";

export class SequelizeCoupleRepository implements CoupleRepository {
    private readonly participantRepo: ParticipantRepo;

    constructor(repo: ParticipantRepo) {
        this.participantRepo = repo;
    }

    async get(q: CoupleQuery): Promise<Couple> {
        if (q.participantsId) {
            const firstWay = await models.CoupleModel.findOne({
                where: {
                    p1Id: q.participantsId.p1Id,
                    p2Id: q.participantsId.p2Id,
                },
            });

            const secondWay = await models.CoupleModel.findOne({
                where: {
                    p1Id: q.participantsId.p2Id,
                    p2Id: q.participantsId.p1Id,
                },
            });

            if (!firstWay && !secondWay) {
                throw new Error("Pareja no encontrada");
            }

            const p1 = await this.participantRepo.get({
                participantId: q.participantsId.p1Id,
            });

            const p2 = await this.participantRepo.get({
                participantId: q.participantsId.p2Id,
            });

            if (firstWay) {
                return CoupleMap.toDomain({
                    p1,
                    p2,
                    coupleId: firstWay.coupleId,
                })!;
            }

            return CoupleMap.toDomain({
                p1: p2,
                p2: p1,
                coupleId: secondWay!.coupleId,
            })!;
        }

        const coupleData = await models.CoupleModel.findOne({
            where: { coupleId: q.coupleId },
        });

        if (!coupleData) {
            throw new Error("Pareja no encontrada");
        }

        const p1 = await this.participantRepo.get({
            participantId: coupleData?.p1Id,
        });

        const p2 = await this.participantRepo.get({
            participantId: coupleData?.p2Id,
        });

        return CoupleMap.toDomain({
            coupleId: coupleData.coupleId,
            p1,
            p2,
        })!;
    }

    async save(couple: Couple): Promise<void> {
        const raw = CoupleMap.toPersistance(couple);

        const exist = await models.CoupleModel.findByPk(raw.coupleId);

        if (exist) {
            await models.CoupleModel.update(raw, {
                where: { coupleId: raw.coupleId },
            });
        } else {
            const instance = await models.CoupleModel.create(raw);
            await instance.save();
        }
    }
}
