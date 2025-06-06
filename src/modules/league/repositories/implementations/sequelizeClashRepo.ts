import models from "../../../../shared/infra/database/sequelize/models";
import { ClashData } from "../../../../shared/infra/database/sequelize/models/leagues/ClubClash";
import { PaginateQuery } from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Club } from "../../domain/club";
import { Clash } from "../../domain/clubClash";
import { Matchs } from "../../domain/matchs";
import { Team } from "../../domain/team";
import { ClashMap } from "../../mappers/clashMap";
import { ClashQuery, ClashRepository } from "../clashRepo";
import { ClubRepository } from "../clubRepo";
import { MatchRepository } from "../matchRepo";
import { TeamRepository } from "../teamRepo";

export class SequelizeClashRepo implements ClashRepository {
    private matchRepo: MatchRepository;
    private teamRepo: TeamRepository;
    private clubRepo: ClubRepository;

    constructor(
        matchRepo: MatchRepository,
        teamRepo: TeamRepository,
        clubRepo: ClubRepository
    ) {
        this.matchRepo = matchRepo;
        this.teamRepo = teamRepo;
        this.clubRepo = clubRepo;
    }

    private baseQuery(): any {
        return {
            where: {},
            include: [{ model: models.CategoryModel, as: "category" }],
        };
    }

    async clashExist(
        team1: string,
        team2: string,
        journey: string,
        category: string
    ): Promise<boolean> {
        const exist = await models.ClashModel.findOne({
            where: { team1, team2, journey, categoryId: category },
        });

        return !!exist === true;
    }

    async save(clash: Clash): Promise<void> {
        const raw = ClashMap.toPersistance(clash);

        const exist = await models.ClashModel.findOne({
            where: { clashId: raw.clashId },
        });

        if (clash.matchs.length > 0) {
            for (const match of clash.matchs) {
                await this.matchRepo.save(match);
            }
        }

        if (exist) {
            await models.ClashModel.update(raw, {
                where: { clashId: raw.clashId },
            });
        } else {
            const instance = await models.ClashModel.create(raw);
            await instance.save();
        }
    }

    async getClashById(id: string): Promise<Clash> {
        const query = this.baseQuery();
        query.where["clashId"] = id;

        const clashRaw = await models.ClashModel.findOne(query);

        if (!clashRaw) {
            throw new Error("El encuentro no existe.");
        }

        const matchsArr = await this.matchRepo.getMatchsByClashId(
            clashRaw.clashId
        );
        const team1 = await this.teamRepo.getById(clashRaw.team1);
        const team2 = await this.teamRepo.getById(clashRaw.team2);

        const club = await this.clubRepo.findById(clashRaw.host);

        const matchs = Matchs.create(matchsArr);

        return ClashMap.toDomain(
            {
                journey: clashRaw.journey,
                seasonId: clashRaw.seasonId,
                category: clashRaw.category,
                team1,
                team2,
                clubId: clashRaw.clubId,
                host: club,
                clashId: clashRaw.clashId,
                isFinish: clashRaw.isFinish,
            },
            matchs
        )!;
    }

    async list(filters: ClashQuery): Promise<any[]> {
        const query = this.baseQuery();

        query.where = filters;

        query.order = [["createdAt", "DESC"]];

        const clashes = await models.ClashModel.findAll(query);

        let list: any = clashes;

        for (const clash of list) {
            const team1 = await this.teamRepo.getById(clash.team1);
            const team2 = await this.teamRepo.getById(clash.team2);
            const hostDomain = await this.clubRepo.findById(clash.host);

            const matchsArr = await this.matchRepo.getMatchsByClashId(
                clash.clashId
            );

            const matches = Matchs.create(matchsArr);

            clash.team1Domain = team1;
            clash.team2Domain = team2;
            clash.hostDomain = hostDomain;
            clash.matches = matches;
        }

        return list.map(
            (
                clash: ClashData & {
                    team1Domain: Team;
                    team2Domain: Team;
                    hostDomain: Club;
                    matches: Matchs;
                }
            ) =>
                ClashMap.toDomain(
                    {
                        clashId: clash.clashId,
                        category: clash.category,
                        seasonId: clash.seasonId,
                        team1: clash.team1Domain,
                        team2: clash.team2Domain,
                        clubId: clash.clubId,
                        host: clash.hostDomain,
                        journey: clash.journey,
                        isFinish: clash.isFinish,
                    },
                    clash.matches
                )
        );
    }

    async paginate(
        filters: ClashQuery,
        pagination: PaginateQuery
    ): Promise<any> {
        const query = this.baseQuery();

        query.where = filters;
        query.limit = pagination.limit ?? 6;
        query.offset = pagination.offset ?? 0;
        query.order = [["createdAt", "DESC"]];

        const result = await models.ClashModel.findAndCountAll(query);

        let list: any = result;

        for (const clash of list.rows) {
            const team1 = await this.teamRepo.getById(clash.team1);
            const team2 = await this.teamRepo.getById(clash.team2);
            const hostDomain = await this.clubRepo.findById(clash.host);

            clash.team1Domain = team1;
            clash.team2Domain = team2;
            clash.hostDomain = hostDomain;
        }

        list.rows = result.rows.map((clash: any) =>
            ClashMap.toDomain({
                clashId: clash.clashId,
                category: clash.category,
                seasonId: clash.seasonId,
                clubId: clash.clubId,
                team1: clash.team1Domain,
                team2: clash.team2Domain,
                host: clash.hostDomain,
                journey: clash.journey,
                isFinish: clash.isFinish,
            })
        );

        return result;
    }

    async delete(clashId: string): Promise<void> {
        const exist = await models.ClashModel.findOne({ where: { clashId } });

        if (!!exist == false) {
            throw new Error("El encuentro no existe");
        }

        const matches = await this.matchRepo.getMatchsByClashId(exist!.clashId);

        if (matches.length > 0) {
            for (const match of matches) {
                await this.matchRepo.delete(match.matchId.id.toString());
            }
        }

        await models.ClashModel.destroy({ where: { clashId } });
    }
}
