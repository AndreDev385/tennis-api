import { Clash } from "../../domain/clubClash";
import { Matchs } from "../../domain/matchs";
import { ClashMap } from "../../mappers/clashMap";
import { ClashQuery, ClashRepository } from "../clashRepo";
import { ClubRepository } from "../clubRepo";
import { MatchRepository } from "../matchRepo";
import { TeamRepository } from "../teamRepo";

export class SequelizeClashRepo implements ClashRepository {
    private models: any;
    private matchRepo: MatchRepository;
    private teamRepo: TeamRepository;
    private clubRepo: ClubRepository;

    constructor(
        models: any,
        matchRepo: MatchRepository,
        teamRepo: TeamRepository,
        clubRepo: ClubRepository,
    ) {
        this.models = models;
        this.matchRepo = matchRepo;
        this.teamRepo = teamRepo;
        this.clubRepo = clubRepo;
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
        journey: string,
        category: string,
    ): Promise<boolean> {
        const ClashModel = this.models.ClashModel;

        const exist = await ClashModel.findOne({
            where: { team1, team2, journey, categoryId: category },
        });

        return !!exist === true;
    }

    async save(clash: Clash): Promise<void> {
        const ClashModel = this.models.ClashModel;

        const raw = ClashMap.toPersistance(clash);

        const exist = await ClashModel.findOne({
            where: { clashId: raw.clashId },
        });

        if (clash.matchs.length > 0) {
            for (const match of clash.matchs) {
                await this.matchRepo.save(match);
            }
        }

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
            throw new Error("El encuentro no existe.");
        }

        const matchsArr = await this.matchRepo.getMatchsByClashId(
            clashRaw.clashId
        );
        const team1 = await this.teamRepo.getById(clashRaw.team1);
        const team2 = await this.teamRepo.getById(clashRaw.team2);

        const club = await this.clubRepo.findById(clashRaw.host)

        const matchs = Matchs.create(matchsArr);

        return ClashMap.toDomain(
            {
                journey: clashRaw.journey,
                seasonId: clashRaw.seasonId,
                category: clashRaw.category,
                team1,
                team2,
                host: club,
                clashId: clashRaw.clashId,
            },
            matchs
        );
    }

    async list(filters: ClashQuery): Promise<any[]> {
        const ClashModel = this.models.ClashModel;

        const query = this.baseQuery();

        query.where = filters;

        query.order = [['createdAt', "DESC"]];

        const list = await ClashModel.findAll(query);

        for (const clash of list) {
            const team1 = await this.teamRepo.getById(clash.team1);
            const team2 = await this.teamRepo.getById(clash.team2);
            const hostDomain = await this.clubRepo.findById(clash.host);

            clash.team1Domain = team1;
            clash.team2Domain = team2;
            clash.hostDomain = hostDomain
        }

        return list.map((clash: any) =>
            ClashMap.toDomain({
                clashId: clash.clashId,
                category: clash.category,
                seasonId: clash.seasonId,
                team1: clash.team1Domain,
                team2: clash.team2Domain,
                host: clash.hostDomain,
                journey: clash.journey,
            })
        );
    }
}
