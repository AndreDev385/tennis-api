import { PausedMatch } from "../../domain/pausedMatch";
import { PausedMatchMap } from "../../mappers/pausedMatchMap";
import { PausedMatchRepository } from "../pausedMatchRepo";
import { TrackerRepository } from "../trackerRepo";

export class SequelizePausedMatchRepository implements PausedMatchRepository {

    private models: any;
    private trackerRepo: TrackerRepository;

    constructor(models: any, trackerRepo: TrackerRepository) {
        this.models = models;
        this.trackerRepo = trackerRepo;
    }

    async save(value: PausedMatch): Promise<void> {
        const PausedMatchModel = this.models.PausedMatchModel;

        const raw = PausedMatchMap.toPersistance(value);

        console.log("TO SAVEE", raw);

        const exist = await PausedMatchModel.findOne({
            where: { matchId: raw.matchId }
        })

        if (!!exist == true) {
            await PausedMatchModel.update(raw, { where: { matchId: raw.matchId } })
        } else {
            const instance = await PausedMatchModel.create(raw);
            await instance.save()
        }
    }

    async getByMatchId(matchId: string): Promise<PausedMatch> {
        const PausedMatchModel = this.models.PausedMatchModel;

        const rawMatch = await PausedMatchModel.findOne({
            where: { matchId }
        })

        console.log(rawMatch, "SETSWON FROM DB");

        if (!!rawMatch == false) {
            throw new Error("Partido no encontrado");
        }

        const tracker = await this.trackerRepo.findTrackerByMatchId(matchId);

        const match = PausedMatchMap.toDomain({
            matchId: rawMatch.matchId,
            mode: rawMatch.mode,
            setsQuantity: rawMatch.setsQuantity,
            surface: rawMatch.surface,
            gamesPerSet: rawMatch.gamesPerSet,
            superTiebreak: rawMatch.superTiebreak,
            direction: rawMatch.direction,
            statistics: rawMatch.statistics,
            tracker,
            player1: rawMatch.player1,
            player2: rawMatch.player2,
            player3: rawMatch.player3,
            player4: rawMatch.player4,
            initialTeam: rawMatch.initialTeam,
            doubleServeFlow: rawMatch.doubleServeFlow,
            singleServeFlow: rawMatch.singleServeFlow,
            sets: rawMatch.sets,
            currentSetIdx: rawMatch.currentSetIdx,
            currentGame: rawMatch.currentGame,
            setsWon: rawMatch.setsWon,
            setsLost: rawMatch.setsLost,
            matchWon: rawMatch.matchWon,
            matchFinish: rawMatch.matchFinish,
        })

        return match;
    }

}
