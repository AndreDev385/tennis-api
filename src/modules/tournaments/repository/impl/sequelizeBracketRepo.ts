import { BracketModel } from "../../../../shared/infra/database/sequelize/models/BracketModel";
import { BracketNode } from "../../domain/brackets";
import { BracketMap } from "../../mapper/BracketMap";
import { BracketsQuery, BracketsRepository } from "../bracketsRepo";
import { TournamentMatchRepo } from "../tournamentMatchRepo";

export class SequelizeBracketRepository implements BracketsRepository {
    private readonly matchRepo: TournamentMatchRepo;

    constructor(matchRepo: TournamentMatchRepo) {
        this.matchRepo = matchRepo;
    }

    private async exist(id: string): Promise<boolean> {
        const exist = await BracketModel.findOne({ where: { id } });
        return !!exist;
    }

    //TODO: fix list for queries
    async list(q: BracketsQuery): Promise<any> {
        const result = await BracketModel.findAll({ where: q });

        const list = [];

        for (const node of result) {
            if (node.matchId) {
                const match = await this.matchRepo.get({
                    matchId: node.matchId,
                });

                list.push({
                    ...node,
                    match,
                });
            }
        }

        return list;
    }

    async get(q: BracketsQuery): Promise<BracketNode> {
        throw Error("not implemented");
    }

    async save(node: BracketNode): Promise<void> {
        const raw = BracketMap.toPersistance(node);

        const exist = await this.exist(raw.id);

        if (exist) {
            await BracketModel.update(raw, { where: { id: raw.id } });
        } else {
            const instance = await BracketModel.create(raw);
            await instance.save();
        }
    }
}
