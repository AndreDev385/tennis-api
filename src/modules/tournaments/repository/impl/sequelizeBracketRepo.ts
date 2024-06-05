import models from "../../../../shared/infra/database/sequelize/models";
import { BracketTreeNode, BracketPlace, BracketNode } from "../../domain/brackets";
import { ContestTeam } from "../../domain/contestTeam";
import { Couple } from "../../domain/couple";
import { Participant } from "../../domain/participant";
import { BracketDto } from "../../dtos/bracketDto";
import { BracketNodeMap, BracketTreeNodeMap } from "../../mapper/BracketMap";
import { ContestClashMap } from "../../mapper/ContestClashMap";
import { ContestTeamMap } from "../../mapper/ContestTeamMap";
import { CoupleMap } from "../../mapper/CoupleMap";
import { ParticipantMap } from "../../mapper/ParticipantMap";
import { TournamentMatchMap } from "../../mapper/TournamentMatchMap";
import { BracketsQuery, BracketsRepository } from "../bracketsRepo";
import { ContestClashRepository } from "../contestClashRepo";
import { ContestTeamRepository } from "../contestTeamRepo";
import { CoupleRepository } from "../coupleRepo";
import { ParticipantRepo } from "../participantRepo";
import { TournamentMatchRepo } from "../tournamentMatchRepo";

export class SequelizeBracketRepository implements BracketsRepository {
    private readonly participantRepo: ParticipantRepo;
    private readonly coupleRepo: CoupleRepository;
    private readonly matchRepo: TournamentMatchRepo;
    private readonly contestTeamRepo: ContestTeamRepository;
    private readonly clashRepo: ContestClashRepository;

    constructor(
        participantRepo: ParticipantRepo,
        coupleRepo: CoupleRepository,
        matchRepo: TournamentMatchRepo,
        contestTeamRepo: ContestTeamRepository,
        clashRepo: ContestClashRepository,
    ) {
        this.participantRepo = participantRepo;
        this.coupleRepo = coupleRepo;
        this.matchRepo = matchRepo;
        this.contestTeamRepo = contestTeamRepo;
        this.clashRepo = clashRepo;
    }

    async delete(q: BracketsQuery): Promise<void> {
        await models.BracketModel.destroy({ where: q });
    }

    private async saveTreeNode(node: BracketTreeNode): Promise<void> {
        const raw = BracketTreeNodeMap.toPersistance(node);

        const exist = await models.BracketModel.findOne({
            where: { id: raw.id },
        });

        if (!!exist === true) {
            await models.BracketModel.update(
                raw,
                { where: { id: raw.id } }
            );
        } else {
            const instance = await models.BracketModel.create(raw);
            await instance.save();
        }
    }

    async saveTree(node: BracketTreeNode): Promise<void> {
        await this.saveTreeNode(node);

        if (!node.right && !node.left) {
            return;
        }

        await this.saveTree(node.right!);
        await this.saveTree(node.left!);
    }

    async list(q: BracketsQuery): Promise<BracketDto[]> {
        const result = await models.BracketModel.findAll({
            where: q,
            order: [["createdAt", "ASC"]],
        });

        const list: Array<any> = result.map((b) => ({
            ...b.dataValues,
            leftPlace: JSON.parse(b.leftPlace),
            rightPlace: JSON.parse(b.rightPlace),
        }));

        for (const node of list) {
            if (node.rightPlace.participantId) {
                let participant = await this.participantRepo.get({
                    participantId: node.rightPlace.participantId,
                });
                node.rightPlace.participant = ParticipantMap.toDto(participant);
            }
            if (node.leftPlace.participantId) {
                let participant = await this.participantRepo.get({
                    participantId: node.leftPlace.participantId,
                });
                node.leftPlace.participant = ParticipantMap.toDto(participant);
            }
            if (node.rightPlace.coupleId) {
                let couple = await this.coupleRepo.get({
                    coupleId: node.rightPlace.coupleId,
                });
                node.rightPlace.couple = CoupleMap.toDto(couple);
            }
            if (node.leftPlace.coupleId) {
                let couple = await this.coupleRepo.get({
                    coupleId: node.leftPlace.coupleId,
                });
                node.leftPlace.couple = CoupleMap.toDto(couple);
            }
            if (node.rightPlace.contestTeamId) {
                let team = await this.contestTeamRepo.get({
                    contestTeamId: node.rightPlace.contestTeamId,
                });
                node.rightPlace.contestTeam = ContestTeamMap.toDto(
                    team.getValue()
                );
            }
            if (node.leftPlace.contestTeamId) {
                let team = await this.contestTeamRepo.get({
                    contestTeamId: node.leftPlace.contestTeamId,
                });
                node.leftPlace.contestTeam = ContestTeamMap.toDto(
                    team.getValue()
                );
            }
        }

        for (const node of list) {
            if (node.matchId) {
                const mustMatch = await this.matchRepo.get({
                    matchId: node.matchId,
                });

                if (mustMatch.isSuccess) {
                    node.match = TournamentMatchMap.toDto(mustMatch.getValue());
                    // remove tracker from match obj
                    node.match.tracker = null;
                }
            }

            if (node.clashId) {
                const clash = await this.clashRepo.get({ contestClashId: node.clashId })

                if (clash.isSuccess) {
                    node.clash = ContestClashMap.toDto(clash.getValue());
                }
            }
        }

        return list;
    }

    // get function search de whole tree
    async get(q: BracketsQuery): Promise<BracketNode> {
        const raw = await models.BracketModel.findOne({ where: q });

        if (!raw) {
            throw new Error("Llave no encontrada");
        }

        const rightPlaceData = JSON.parse(raw.rightPlace);
        const leftPlaceData = JSON.parse(raw.leftPlace);

        let rightP: Participant | null = null;
        let leftP: Participant | null = null;
        let rightC: Couple | null = null;
        let leftC: Couple | null = null;
        let rightT: ContestTeam | null = null;
        let leftT: ContestTeam | null = null;

        if (rightPlaceData.participantId) {
            rightP = await this.participantRepo.get({
                participantId: rightPlaceData.participantId,
            });
        }
        if (leftPlaceData.participantId) {
            leftP = await this.participantRepo.get({
                participantId: leftPlaceData.participantId,
            });
        }
        if (rightPlaceData.coupleId) {
            rightC = await this.coupleRepo.get({
                coupleId: rightPlaceData.coupleId,
            });
        }
        if (leftPlaceData.coupleId) {
            leftC = await this.coupleRepo.get({
                coupleId: leftPlaceData.coupleId,
            });
        }
        if (rightPlaceData.contestTeamId) {
            const result = await this.contestTeamRepo.get({
                contestTeamId: rightPlaceData.contestTeamId,
            });
            rightT = result.getValue();
        }
        if (leftPlaceData.contestTeamId) {
            const result = await this.contestTeamRepo.get({
                contestTeamId: leftPlaceData.contestTeamId,
            });
            leftT = result.getValue();
        }

        return BracketNodeMap.toDomain({
            ...raw.dataValues,
            rightPlaceObj: BracketPlace.create({
                value: rightPlaceData.value,
                participant: rightP,
                couple: rightC,
                contestTeam: rightT,
            }).getValue(),
            leftPlaceObj: BracketPlace.create({
                value: leftPlaceData.value,
                participant: leftP,
                couple: leftC,
                contestTeam: leftT,
            }).getValue(),
        })!;
    }

    async save(node: BracketNode): Promise<void> {
        const raw = BracketNodeMap.toPersistance(node);

        const exist = await models.BracketModel.findOne({
            where: { id: raw.id },
        });

        if (!!exist === true) {
            await models.BracketModel.update(
                raw,
                { where: { id: raw.id } }
            );
        } else {
            const instance = await models.BracketModel.create(raw);
            await instance.save();
        }
    }
}
