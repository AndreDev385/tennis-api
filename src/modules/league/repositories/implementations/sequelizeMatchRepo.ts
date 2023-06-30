import { GameMode } from "../../domain/gameMode";
import { Match } from "../../domain/match";
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

    async getMatchById(id: string): Promise<Match> {
        const MatchModel = this.models.MatchModel;

        const raw = await MatchModel.findOne({
            where: { matchId: id },
        });

        if (!!raw === false) {
            throw new Error("Partido no encontrado");
        }

        const match = MatchMap.toDomain(raw);

        return match;
    }

    async getMatchsByClashId(clashId: string): Promise<Match[]> {
        const MatchModel = this.models.MatchModel;

        const baseQuery = this.baseQuery();
        baseQuery.where["clashId"] = clashId;

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
            })
        );

        return matchs;
    }

    async list(query: MatchQuery): Promise<Match[]> {
        const MatchModel = this.models.MatchModel;

        const baseQuery = this.baseQuery();
        if (!!query.clashId === true) {
            baseQuery.where["clashId"] = query.clashId;
        }

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
            })
        );

        return matchs;
    }
}
