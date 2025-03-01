import { Op } from "sequelize";
import { Result } from "../../../../shared/core/Result";
import models from "../../../../shared/infra/database/sequelize/models";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { ContestClash } from "../../domain/contestClash";
import { ContestClashDto } from "../../dtos/contestClashDto";
import { ContestClashMap } from "../../mapper/ContestClashMap";
import { ContestClashQuery, ContestClashRepository } from "../contestClashRepo";
import { ContestTeamRepository } from "../contestTeamRepo";

export class SequelizeContestClashRepository implements ContestClashRepository {
    private readonly contestTeamRepo: ContestTeamRepository;

    constructor(ctr: ContestTeamRepository) {
        this.contestTeamRepo = ctr;
    }

    async delete(q: ContestClashQuery): Promise<Result<void>> {
        try {
            const result = await models.ContestClashModel.destroy({ where: q });
            if (result < 1) {
                return Result.fail("No encontrado");
            }

            return Result.ok();
        } catch (error) {
            return Result.fail("Ha ocurrido un error");
        }
    }

    async paginate(
        q: ContestClashQuery,
        pq: PaginateQuery
    ): Promise<PaginateResponse<ContestClashDto[]>> {
        const query: any = {};

        query.where = q;
        query.limit = pq.limit ?? 10;
        query.offset = pq.offset ?? 0;

        const result = await models.ContestClashModel.findAndCountAll(query);

        let list: any = result;

        for (const clash of list.rows) {
            const team1Result = await this.contestTeamRepo.get({
                contestTeamId: clash.team1Id,
            });
            const team2Result = await this.contestTeamRepo.get({
                contestTeamId: clash.team2Id,
            });

            if (team1Result.isFailure || team2Result.isFailure) {
                throw new Error("Equipo no encontrado");
            }
            const buildData: any = clash;

            buildData.team1 = team1Result.getValue();

            buildData.team2 = team2Result.getValue();
        }

        list.rows = list.rows.map((clash: any) =>
            ContestClashMap.toDomain(clash)
        );

        return {
            rows: list.rows.map((r: any) => ContestClashMap.toDto(r)),
            count: result.count,
        };
    }

    async get(q: ContestClashQuery): Promise<Result<ContestClash>> {
        const query: any = q;
        if (q.matchIds) {
            query.matchIds = { [Op.contains]: q.matchIds };
        }
        const data = await models.ContestClashModel.findOne({ where: query });

        if (!data) {
            return Result.fail("No encontrado");
        }

        const team1Result = await this.contestTeamRepo.get({
            contestTeamId: data.team1Id,
        });
        const team2Result = await this.contestTeamRepo.get({
            contestTeamId: data.team2Id,
        });

        if (team1Result.isFailure || team2Result.isFailure) {
            return Result.fail("Equipo no encontrado");
        }

        const buildData: any = data;

        buildData.team1 = team1Result.getValue();
        buildData.team2 = team2Result.getValue();

        return Result.ok(ContestClashMap.toDomain(data));
    }

    async save(clash: ContestClash): Promise<Result<void>> {
        try {
            const raw = ContestClashMap.toPersistance(clash);

            console.log(`${raw} raw to save`)

            const exist = await models.ContestClashModel.findOne({
                where: { contestClashId: raw.contestClashId },
            });

            if (exist) {
                await models.ContestClashModel.update(raw, {
                    where: { contestClashId: raw.contestClashId },
                });
            } else {
                const instance = await models.ContestClashModel.create(raw);
                await instance.save();
            }

            return Result.ok();
        } catch (e) {
            return Result.fail(
                "Ha ocurrido un error al guardar/actualizar el encuentro"
            );
        }
    }
}
