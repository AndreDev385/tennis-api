import { Match } from "../../domain/match";
import { MatchMap } from "../../mappers/matchMap";
import { MatchRepository } from "../matchRepo";
import { TrackerRepository } from "../trackerRepo";

export class SequelizeMatchRepository implements MatchRepository {
    models: any;
    trackerRepo: TrackerRepository;

    constructor(models: any, trackerRepo: TrackerRepository) {
        this.models = models;
        this.trackerRepo = trackerRepo;
    }

    async save(match: Match): Promise<void> {
        const MatchModel = this.models.MatchModel;

        const raw = MatchMap.toPersistance(match);

        const exist = await MatchModel.findOne({
            where: { matchId: match.matchId.id.toString() },
        });

        if (!!exist === true) {
            await MatchModel.update(raw, {
                where: { matchId: match.matchId.id.toString() },
            });
        } else {
            const instance = await MatchModel.create(raw);
            await instance.save();
        }
    }

    async getMatchById(id: string): Promise<Match> {
        const MatchModel = this.models.MatchModel;

        const raw = await MatchModel.findOne({
            where: { matchId: id },
        });

        if (!!raw === false) {
            throw new Error("Match not found");
        }

        const match = MatchMap.toDomain(raw);

        return match;
    }

    async getMatchsByClashId(clashId: string): Promise<Match[]> {
        const MatchModel = this.models.MatchModel;

        const raw = await MatchModel.findAll({
            where: { clashId },
        });

        const matchs = raw.map((m) => MatchMap.toDomain(m));

        return matchs;
    }
}
