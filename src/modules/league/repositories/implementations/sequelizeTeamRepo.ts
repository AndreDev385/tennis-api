import models from "../../../../shared/infra/database/sequelize/models";
import { Team } from "../../domain/team";
import { TeamMap } from "../../mappers/teamMap";
import { TeamQuery, TeamRepository } from "../teamRepo";

export class SequelizeTeamRepository implements TeamRepository {
    private baseQuery(): any {
        return {
            where: {},
            include: [
                { model: models.ClubModel, as: "club" },
                { model: models.CategoryModel, as: "category" },
            ],
        };
    }

    async save(team: Team): Promise<void> {
        const raw = TeamMap.toPersistance(team);

        const exist = await models.TeamModel.findOne({
            where: { teamId: raw.teamId },
        });

        if (!!exist === true) {
            await models.TeamModel.update(raw, {
                where: { teamId: raw.teamId },
            });
        } else {
            const instance = await models.TeamModel.create(raw);
            await instance.save();
        }
    }

    async getTeam(
        name: string,
        clubId: string,
        categoryId: string
    ): Promise<Team> {
        const query = this.baseQuery();
        query.where = {
            name,
            clubId,
            categoryId,
        };

        const rawTeam = await models.TeamModel.findOne(query);

        if ((!!rawTeam as boolean) == false) {
            throw new Error("Equipo no encontrado");
        }

        return TeamMap.toDomain(rawTeam)!;
    }

    async getById(teamId: string): Promise<Team> {
        const query = this.baseQuery();
        query.where["teamId"] = teamId;

        const rawTeam = await models.TeamModel.findOne(query);

        if ((!!rawTeam as boolean) == false) {
            throw new Error("Equipo no encontrado");
        }

        return TeamMap.toDomain(rawTeam)!;
    }

    async listByClubId(clubId: string): Promise<Team[]> {
        const query = this.baseQuery();
        query.where["clubId"] = clubId;
        query.where["isDeleted"] = false;

        const rawList = await models.TeamModel.findAll(query);

        return rawList.map((team: any) => TeamMap.toDomain(team)!);
    }

    async list(query: TeamQuery = {}): Promise<Team[]> {
        const baseQuery = this.baseQuery();
        baseQuery.where = query;
        baseQuery.where["isDeleted"] = false;

        const rawList = await models.TeamModel.findAll(baseQuery);

        return rawList.map((team: any) => TeamMap.toDomain(team)!);
    }

    async delete(teamId: string): Promise<void> {
        const exist = await models.TeamModel.findOne({ where: { teamId } });

        if (!!exist == false) {
            throw new Error("Equipo no encontrado");
        }

        await models.TeamModel.update(exist!, { where: { teamId } });
    }
}
