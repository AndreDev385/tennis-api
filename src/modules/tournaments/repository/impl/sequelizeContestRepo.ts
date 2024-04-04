import { ContestModel } from "../../../../shared/infra/database/sequelize/models/Contest";
import { CoupleModel } from "../../../../shared/infra/database/sequelize/models/Couple";
import { ParticipantModel } from "../../../../shared/infra/database/sequelize/models/Participant";
import { GameMode } from "../../../league/domain/gameMode";
import { Contest } from "../../domain/contest";
import { Inscribed } from "../../domain/inscribed";
import { ContestDto } from "../../dtos/contestsDto";
import { ContestMap } from "../../mapper/ContestMap";
import { ContestQuery, ContestRepository } from "../contestRepo";
import { CoupleRepository } from "../coupleRepo";
import { ParticipantRepo } from "../participantRepo";

export class SequlizeContestRepository implements ContestRepository {
    private readonly participantRepo: ParticipantRepo;
    private readonly coupleRepo: CoupleRepository;

    constructor(
        participantRepo: ParticipantRepo,
        coupleRepo: CoupleRepository
    ) {
        this.participantRepo = participantRepo;
        this.coupleRepo = coupleRepo;
    }

    async list(q: ContestQuery): Promise<ContestDto[]> {
        const contests = await ContestModel.findAll({ where: q });

        return contests.map((c) => ContestMap.forQuery(c));
    }

    async get(q: ContestQuery): Promise<Contest> {
        const contestData = await ContestModel.findOne({
            where: q,
            include: [
                {
                    model: ParticipantModel,
                    through: { attributes: ["position"] },
                },
                {
                    model: CoupleModel,
                    through: { attributes: ["position"] },
                },
            ],
        });

        if (!contestData) {
            throw new Error("Competencia no encontrada");
        }

        let inscribed: Inscribed[] = [];

        if (contestData.mode == GameMode.single) {
            for (const p of contestData.participants ?? []) {
                const participant = await this.participantRepo.get({
                    userId: p.userId,
                });
                inscribed.push(
                    Inscribed.create({
                        position: p.participantInscription.position,
                        participant,
                    }).getValue()
                );
            }
        }

        if (contestData.mode == GameMode.double) {
            for (const c of contestData.couples ?? []) {
                const couple = await this.coupleRepo.get({
                    coupleId: c.coupleId,
                });
                console.log(c.coupleInscription.position, 'coupleInscription')
                const mustInscribed = Inscribed.create({
                    position: c.coupleInscription.position,
                    couple: couple,
                }).getValue();
                inscribed.push(mustInscribed);
            }
        }

        return ContestMap.toDomain(contestData, inscribed)!;
    }

    async save(contest: Contest): Promise<void> {
        const raw = ContestMap.toPersistance(contest);

        const dbData = await ContestModel.findByPk(raw.contestId, {
            include: [
                {
                    model: ParticipantModel,
                    through: { attributes: ["position"] },
                },
                {
                    model: CoupleModel,
                    through: { attributes: ["position"] },
                },
            ],
        });

        if (dbData) {
            if (
                contest.inscribed.getRemovedItems().length > 0 ||
                contest.inscribed.getNewItems().length > 0
            ) {
                if (contest.mode.value == GameMode.single) {
                    await Promise.all(
                        contest.inscribed
                            .getItems()
                            .map((i) =>
                                (dbData as any).addParticipant(
                                    i.participant!.participantId.id.toString(),
                                    { through: { position: i.position } }
                                )
                            )
                    );
                } else {
                    await Promise.all(
                        contest.inscribed
                            .getItems()
                            .map((i) =>
                                (dbData as any).addCouple(
                                    i.couple!.coupleId.id.toString(),
                                    { through: { position: i.position } }
                                )
                            )
                    );
                }
            }
            await ContestModel.update(raw, {
                where: { contestId: raw.contestId },
            });
        } else {
            const instance = await ContestModel.create(raw, {
                include: ParticipantModel,
            });
            await instance.save();
        }
    }
}
