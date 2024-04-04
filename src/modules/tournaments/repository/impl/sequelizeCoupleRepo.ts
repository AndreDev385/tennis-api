import { CoupleModel } from "../../../../shared/infra/database/sequelize/models/Couple";
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
            const firstWay = await CoupleModel.findOne({
                where: {
                    p1Id: q.participantsId.p1Id,
                    p2Id: q.participantsId.p2Id,
                },
            });

            console.log(firstWay, 'firstWay');

            const secondWay = await CoupleModel.findOne({
                where: {
                    p1Id: q.participantsId.p2Id,
                    p2Id: q.participantsId.p1Id,
                },
            });

            console.log(secondWay, 'secondWay');

            if (!firstWay && !secondWay) {
                console.log("Not found");
                throw new Error("Pareja no encontrada");
            }

            const p1 = await this.participantRepo.get({
                participantId: q.participantsId.p1Id,
            });

            const p2 = await this.participantRepo.get({
                participantId: q.participantsId.p2Id,
            });

            if (firstWay) {
                console.log('return first')
                return CoupleMap.toDomain({
                    p1,
                    p2,
                    coupleId: firstWay.coupleId,
                })!;
            }

            console.log('return second')
            return CoupleMap.toDomain({
                p1: p2,
                p2: p1,
                coupleId: secondWay!.coupleId,
            })!;
        }

        const coupleData = await CoupleModel.findOne({
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

        const exist = await CoupleModel.findByPk(raw.coupleId);

        if (exist) {
            await CoupleModel.update(raw, {
                where: { coupleId: raw.coupleId },
            });
        } else {
            const instance = await CoupleModel.create(raw);
            await instance.save();
        }
    }
}
