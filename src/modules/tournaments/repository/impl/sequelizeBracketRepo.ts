import { BracketModel } from "../../../../shared/infra/database/sequelize/models/Bracket";
import { BracketNode, BracketPlace } from "../../domain/brackets";
import { Couple } from "../../domain/couple";
import { Participant } from "../../domain/participant";
import { BracketMap, BuildBracketData } from "../../mapper/BracketMap";
import { CoupleMap } from "../../mapper/CoupleMap";
import { ParticipantMap } from "../../mapper/ParticipantMap";
import { BracketsQuery, BracketsRepository } from "../bracketsRepo";
import { CoupleRepository } from "../coupleRepo";
import { ParticipantRepo } from "../participantRepo";
import { TournamentMatchRepo } from "../tournamentMatchRepo";

export class SequelizeBracketRepository implements BracketsRepository {
    private readonly participantRepo: ParticipantRepo;
    private readonly coupleRepo: CoupleRepository;
    private readonly matchRepo: TournamentMatchRepo;

    constructor(
        participantRepo: ParticipantRepo,
        coupleRepo: CoupleRepository,
        matchRepo: TournamentMatchRepo
    ) {
        this.participantRepo = participantRepo;
        this.coupleRepo = coupleRepo;
        this.matchRepo = matchRepo;
    }

    private async exist(id: string): Promise<boolean> {
        const exist = await BracketModel.findOne({ where: { id } });
        return !!exist;
    }

    async saveTree(node: BracketNode): Promise<void> {
        await this.save(node);

        if (!node.right && !node.left) {
            return;
        }

        await this.saveTree(node.right!);
        await this.saveTree(node.left!);
    }

    //TODO: fix list for queries
    async list(q: BracketsQuery): Promise<any> {
        const result = await BracketModel.findAll({ where: q });

        const list = result.map((b) => ({
            ...b.dataValues,
            leftPlace: JSON.parse(b.leftPlace),
            rightPlace: JSON.parse(b.rightPlace),
        }));

        for (const node of list) {
            if (node.rightPlace.participantId) {
                let participant = await this.participantRepo.get({ participantId: node.rightPlace.participantId });
                node.rightPlace.participant = ParticipantMap.toDto(participant);
            }
            if (node.leftPlace.participantId) {
                let participant = await this.participantRepo.get({ participantId: node.leftPlace.participantId });
                node.leftPlace.participant = ParticipantMap.toDto(participant);
            }
            if (node.rightPlace.coupleId) {
                let couple = await this.coupleRepo.get({ coupleId: node.rightPlace.coupleId });
                node.rightPlace.coupleId = CoupleMap.toDto(couple);
            }
            if (node.leftPlace.coupleId) {
                let couple = await this.coupleRepo.get({ coupleId: node.leftPlace.coupleId });
                node.leftPlace.coupleId = CoupleMap.toDto(couple);
            }
        }

        //for (const node of result) {
        //    if (node.matchId) {
        //        const match = await this.matchRepo.get({
        //            matchId: node.matchId,
        //        });

        //        list.push({
        //            ...node,
        //            match,
        //        });
        //    }
        //}

        return list;
    }

    // TODO: Refactorizar get function to find just core bracket data;
    // match, participants | couples, ids of others nodes;
    // now is searching the whole tree
    async get(q: BracketsQuery): Promise<BracketNode> {
        const raw = await BracketModel.findOne({ where: q });

        if (!raw) {
            throw new Error("Llave no encontrada");
        }

        const rightPlaceData = JSON.parse(raw.rightPlace);
        const leftPlaceData = JSON.parse(raw.leftPlace);

        let rightP: Participant | null = null;
        let leftP: Participant | null = null;
        let rightC: Couple | null = null;
        let leftC: Couple | null = null;

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
        if (rightPlaceData.participantId) {
            rightC = await this.coupleRepo.get({
                coupleId: rightPlaceData.coupleId,
            });
        }
        if (leftPlaceData.participantId) {
            leftC = await this.coupleRepo.get({
                coupleId: leftPlaceData.coupleId,
            });
        }

        const obj: BuildBracketData = {
            ...raw,
            match: null,
            right: null,
            left: null,
            parent: null,
            rightPlace: BracketPlace.create({
                value: rightPlaceData.value,
                participant: rightP,
                couple: rightC,
            }).getValue(),
            leftPlace: BracketPlace.create({
                value: leftPlaceData.value,
                participant: leftP,
                couple: leftC,
            }).getValue(),
        };

        //if (raw?.matchId) {
        //    const match = await this.matchRepo.get({ matchId: raw.matchId });
        //    obj.match = match;
        //}

        if (raw?.parent) {
            obj.parent = (await this.get({ id: raw.parent })) ?? null;
        }

        if (raw?.right) {
            obj.right = (await this.get({ id: raw.right })) ?? null;
        }

        if (raw?.left) {
            obj.left = (await this.get({ id: raw.left })) ?? null;
        }

        return BracketMap.toDomain(obj)!;
    }

    async save(node: BracketNode): Promise<void> {
        const raw = BracketMap.toPersistance(node);

        console.log(raw, "SAVE");

        const exist = await this.exist(raw.id);

        if (exist) {
            await BracketModel.update(raw, { where: { id: raw.id } });
        } else {
            const instance = await BracketModel.create(raw);
            await instance.save();
        }
    }
}
