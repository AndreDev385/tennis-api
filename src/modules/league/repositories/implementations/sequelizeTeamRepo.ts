import { Team } from "../../domain/team";
import { TeamMap } from "../../mappers/teamMap";
import { TeamQuery, TeamRepository } from "../teamRepo";

export class SequelizeTeamRepository implements TeamRepository {
    models: any;

    constructor(models: any) {
        this.models = models;
    }

    private baseQuery(): any {
        const models = this.models;
        return {
            where: {},
            include: [
                { model: models.ClubModel, as: "club" },
                { model: models.CategoryModel, as: "category" },
            ],
        };
    }

    async save(team: Team): Promise<void> {
        const TeamModel = this.models.TeamModel;

        const raw = TeamMap.toPersistance(team);

        const exist = await TeamModel.findOne({
            where: { teamId: raw.teamId },
        });

        if (!!exist === true) {
            await TeamModel.update(raw, { where: { teamId: raw.teamId } });
        } else {
            const instance = await TeamModel.create(raw);
            await instance.save();
        }
    }

    async getTeam(name: string, clubId: string, categoryId: string): Promise<Team> {
        const TeamModel = this.models.TeamModel;

        const query = this.baseQuery();
        query.where = {
            name,
            clubId,
            categoryId,
        }

        const rawTeam = await TeamModel.findOne(query);

        if (!!rawTeam == false) {
            throw new Error("Equipo no encontrado");
        }

        return TeamMap.toDomain(rawTeam);
    }

    async getById(teamId: string): Promise<Team> {
        const TeamModel = this.models.TeamModel;

        const query = this.baseQuery();
        query.where["teamId"] = teamId;

        const rawTeam = await TeamModel.findOne(query);

        if (!!rawTeam == false) {
            throw new Error("Equipo no encontrado");
        }

        return TeamMap.toDomain(rawTeam);
    }

    async listByClubId(clubId: string): Promise<Team[]> {
        const TeamModel = this.models.TeamModel;

        const query = this.baseQuery();
        query.where["clubId"] = clubId;
        query.where["isDeleted"] = false;

        const rawList = await TeamModel.findAll(query);

        return rawList.map((team: any) => TeamMap.toDomain(team));
    }

    async list(query: TeamQuery = {}): Promise<Team[]> {
        const TeamModel = this.models.TeamModel;

        const baseQuery = this.baseQuery();
        baseQuery.where = query;
        baseQuery.where["isDeleted"] = false;

        const rawList = await TeamModel.findAll(baseQuery);

        return rawList.map((team: any) => TeamMap.toDomain(team));
    }

    async delete(teamId: string): Promise<void> {
        const TeamModel = this.models.TeamModel;

        const exist = await TeamModel.findOne({ where: { teamId } });

        if (!!exist == false) {
            throw new Error("Equipo no encontrado");
        }

        const raw = TeamMap.toPersistance(exist);

        await TeamModel.update(raw, { where: { teamId } });
    }

}
