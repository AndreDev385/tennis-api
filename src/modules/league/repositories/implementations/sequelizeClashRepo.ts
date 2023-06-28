import { Clash } from "../../domain/clubClash";
import { Matchs } from "../../domain/matchs";
import { ClashMap } from "../../mappers/clashMap";
import { MatchMap } from "../../mappers/matchMap";
import { CategoryRepository } from "../categoryRepo";
import { ClashRepository } from "../clashRepo";
import { MatchRepository } from "../matchRepo";
import { TeamRepository } from "../teamRepo";

export class SequelizeClashRepo implements ClashRepository {
    private models: any;
    private matchRepo: MatchRepository;
    private teamRepo: TeamRepository;
    private categoryRepo: CategoryRepository;

    constructor(
        models: any,
        matchRepo: MatchRepository,
        teamRepo: TeamRepository,
        categoryRepo: CategoryRepository
    ) {
        this.models = models;
        this.matchRepo = matchRepo;
        this.teamRepo = teamRepo;
        this.categoryRepo = categoryRepo;
    }

    private baseQuery(): any {
        const models = this.models;
        return {
            where: {},
            include: [{ model: models.CategoryModel, as: "category" }],
        };
    }

    async clashExist(
        team1: string,
        team2: string,
        journey: string
    ): Promise<boolean> {
        const ClashModel = this.models.ClashModel;

        const exist = await ClashModel.findOne({
            where: { team1, team2, journey },
        });

        return !!exist === true;
    }

    async save(clash: Clash): Promise<void> {
        const ClashModel = this.models.ClashModel;

        const raw = ClashMap.toPersistance(clash);

        const exist = await ClashModel.findOne({
            where: { clashId: raw.clashId },
        });

        console.log("RAW", raw);

        if (exist) {
            await ClashModel.update(raw, { where: { clashId: raw.clashId } });
        } else {
            const instance = await ClashModel.create(raw);
            await instance.save();
        }
    }

    async getClashById(id: string): Promise<Clash> {
        const ClashModel = this.models.ClashModel;

        const query = this.baseQuery();
        query.where["clashId"] = id;

        const clashRaw = await ClashModel.findOne(query);

        if (!clashRaw) {
            throw new Error("Clash no found");
        }

        const rawMatchs = await this.matchRepo.getMatchsByClashId(
            clashRaw.clashId
        );

        const matchsArr = rawMatchs.map((m) => MatchMap.toDomain(m));
        const matchs = Matchs.create(matchsArr);

        return ClashMap.toDomain(clashRaw, matchs);
    }

    async list(filters: any): Promise<any[]> {
        const ClashModel = this.models.ClashModel;

        const query = this.baseQuery();

        query.where = filters;

        const list = await ClashModel.findAll(query);

        for (const clash of list) {
            const team1 = await this.teamRepo.getById(clash.team1);
            const team2 = await this.teamRepo.getById(clash.team2);

            clash.team1Domain = team1;
            clash.team2Domain = team2;
        }

        console.log(JSON.stringify(list));

        return list.map((clash: any) =>
            ClashMap.toDomain({
                category: clash.category,
                seasonId: clash.seasonId,
                team1: clash.team1Domain,
                team2: clash.team2Domain,
                host: clash.host,
                journey: clash.journey,
            })
        );
    }
}
