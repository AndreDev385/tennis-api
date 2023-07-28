import { TeamStats } from "../../domain/teamStats";
import { TeamStatsMap } from "../../mappers/teamStatsMap";
import { TeamStatsQuery, TeamStatsRepository } from "../teamStatsRepo";

export class SequelizeTeamStatsRepository implements TeamStatsRepository {
    models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(teamStats: TeamStats): Promise<void> {
        const TeamStatsModel = this.models["TeamStatsModel"];

        const exist = await TeamStatsModel.findOne({
            where: { teamStatsId: teamStats.teamStatsId.id.toString() },
        });

        const raw = TeamStatsMap.toPersistance(teamStats);

        if (!!exist == true) {
            await TeamStatsModel.update(raw, {
                where: { teamStatsId: raw.teamStatsId },
            });
        } else {
            const instance = await TeamStatsModel.create(raw);
            await instance.save();
        }
    }

    async list(query: TeamStatsQuery): Promise<TeamStats[]> {
        const TeamStatsModel = this.models["TeamStatsModel"];

        const list = await TeamStatsModel.findAll({ where: query });

        return list.map((raw: any) => TeamStatsMap.toDomain(raw));
    }

    async getStats(seasonId: string, teamId: string, journey: string): Promise<TeamStats> {
        const TeamStatsModel = this.models["TeamStatsModel"];

        const rawStats = await TeamStatsModel.findOne({ where: { seasonId, teamId, journey } })

        if (!!rawStats == false) {
            throw new Error("Estadisticas de equipo no encontradas");
        }

        return TeamStatsMap.toDomain(rawStats);
    }

}
