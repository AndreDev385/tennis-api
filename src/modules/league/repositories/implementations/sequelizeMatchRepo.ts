import { GameMode } from "../../domain/gameMode";
import { Match } from "../../domain/match";
import { MatchTracker } from "../../domain/matchTracker";
import { MatchMap } from "../../mappers/matchMap";
import { MatchQuery, MatchRepository } from "../matchRepo";
import { PlayerRepository } from "../playerRepo";
import { TrackerRepository } from "../trackerRepo";

export class SequelizeMatchRepository implements MatchRepository {
    models: any;
    trackerRepo: TrackerRepository;
    playerRepo: PlayerRepository;

    constructor(
        models: any,
        trackerRepo: TrackerRepository,
        playerRepo: PlayerRepository
    ) {
        this.models = models;
        this.trackerRepo = trackerRepo;
        this.playerRepo = playerRepo;
    }

    private baseQuery(): any {
        const models = this.models;
        return {
            where: {},
            include: [{ model: models.CategoryModel, as: "category" }],
        };
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

    async getMatchById(matchId: string): Promise<Match> {
        const MatchModel = this.models.MatchModel;

        const baseQuery = this.baseQuery();
        baseQuery.where["matchId"] = matchId;

        const raw = await MatchModel.findOne(baseQuery);

        if (!!raw === false) {
            throw new Error("Partido no encontrado");
        }

        raw.player1Domain = await this.playerRepo.getPlayerById(raw.player1);
        if (raw.mode == GameMode.double) {
            raw.player3Domain = await this.playerRepo.getPlayerById(
                raw.player3
            );
        }

        let tracker: MatchTracker;
        try {
            tracker = await this.trackerRepo.findTrackerByMatchId(matchId);
        } catch (e) {
            tracker = null;
        }

        return MatchMap.toDomain({
            matchId: raw.matchId,
            clashId: raw.clashId,
            sets: raw.sets,
            setsQuantity: raw.setsQuantity,
            tracker,
            surface: raw.surface,
            superTieBreak: raw.superTieBreak,
            gamesPerSet: raw.gamesPerSet,
            player2: raw.player2,
            player1: raw.player1Domain,
            mode: raw.mode,
            address: raw.address,
            player3: raw.player3Domain,
            player4: raw.player4,
            category: raw.category,
            isLive: raw.isLive,
            isFinish: raw.isFinish,
            isCancelled: raw.isCancelled,
            isPaused: raw.isPaused,
        });
    }

    async getMatchsByClashId(clashId: string): Promise<Match[]> {
        const MatchModel = this.models.MatchModel;

        const baseQuery = this.baseQuery();
        baseQuery.where["clashId"] = clashId;

        const raw = await MatchModel.findAll(baseQuery);

        for (const match of raw) {

            let tracker: MatchTracker;

            try {
                tracker = await this.trackerRepo.findTrackerByMatchId(match.matchId);
            } catch (e) {
                tracker = null;
            }

            match.tracker = tracker;

            match.player1Domain = await this.playerRepo.getPlayerById(
                match.player1
            );
            if (match.mode == GameMode.double) {
                match.player3Domain = await this.playerRepo.getPlayerById(
                    match.player3
                );
            }
        }

        const matchs = raw.map((m: any) =>
            MatchMap.toDomain({
                matchId: m.matchId,
                sets: m.sets,
                clashId: m.clashId,
                tracker: m.tracker,
                surface: m.surface,
                superTieBreak: m.superTieBreak,
                gamesPerSet: m.gamesPerSet,
                player2: m.player2,
                player1: m.player1Domain,
                setsQuantity: m.setsQuantity,
                mode: m.mode,
                address: m.address,
                player3: m.player3Domain,
                player4: m.player4,
                category: m.category,
                isLive: m.isLive,
                isFinish: m.isFinish,
                isCancelled: m.isCancelled,
                isPaused: m.isPaused,
            })
        );

        return matchs;
    }

    async list(query: MatchQuery): Promise<Match[]> {
        const MatchModel = this.models.MatchModel;

        const baseQuery = this.baseQuery();
        baseQuery.where = query;

        const raw = await MatchModel.findAll(baseQuery);

        for (const match of raw) {
            match.player1Domain = await this.playerRepo.getPlayerById(
                match.player1
            );
            if (match.mode == GameMode.double) {
                match.player3Domain = await this.playerRepo.getPlayerById(
                    match.player3
                );
            }
        }

        const matchs = raw.map((m: any) =>
            MatchMap.toDomain({
                matchId: m.matchId,
                sets: m.sets,
                clashId: m.clashId,
                tracker: m.tracker,
                surface: m.surface,
                superTieBreak: m.superTieBreak,
                gamesPerSet: m.gamesPerSet,
                player2: m.player2,
                player1: m.player1Domain,
                setsQuantity: m.setsQuantity,
                mode: m.mode,
                address: m.address,
                player3: m.player3Domain,
                player4: m.player4,
                category: m.category,
                isLive: m.isLive,
                isFinish: m.isFinish,
                isCancelled: m.isCancelled,
                isPaused: m.isPaused,
            })
        );

        return matchs;
    }

    async delete(matchId: string): Promise<void> {
        const MatchModel = this.models.MatchModel;

        const exist = await MatchModel.findOne({ where: { matchId } })

        console.log("EXIST", exist);

        if (!!exist == false) {
            throw new Error("Partido no encontrado");
        }

        await this.trackerRepo.delete(matchId);

        await MatchModel.destroy({ where: { matchId } });
    }
}
