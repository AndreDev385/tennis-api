import models from "../../../../shared/infra/database/sequelize/models";
import { TeamStats } from "../../domain/teamStats";
import { TeamStatsMap } from "../../mappers/teamStatsMap";
import { TeamStatsQuery, TeamStatsRepository } from "../teamStatsRepo";

export class SequelizeTeamStatsRepository implements TeamStatsRepository {
    async save(teamStats: TeamStats): Promise<void> {
        const exist = await models.TeamStatsModel.findOne({
            where: { teamStatsId: teamStats.teamStatsId.id.toString() },
        });

        const raw = TeamStatsMap.toPersistance(teamStats);

        if (!!exist == true) {
            await models.TeamStatsModel.update(raw, {
                where: { teamStatsId: raw.teamStatsId },
            });
        } else {
            const instance = await models.TeamStatsModel.create(raw);
            await instance.save();
        }
    }

    async list(query: TeamStatsQuery): Promise<TeamStats[]> {
        const list = await models.TeamStatsModel.findAll({
            where: query as any,
        });

        return list.map((raw: any) => TeamStatsMap.toDomain(raw)!);
    }

    async getStats(
        seasonId: string,
        teamId: string,
        journey: string
    ): Promise<TeamStats> {
        const rawStats = await models.TeamStatsModel.findOne({
            where: { seasonId, teamId, journey },
        });

        if (!!rawStats == false) {
            throw new Error("Estadisticas de equipo no encontradas");
        }

        return TeamStatsMap.toDomain(rawStats)!;
    }
}
