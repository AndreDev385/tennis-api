import { Result } from "../../../../shared/core/Result";
import models from "../../../../shared/infra/database/sequelize/models";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { GameMode } from "../../../league/domain/gameMode";
import { Participant } from "../../domain/participant";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchMap } from "../../mapper/TournamentMatchMap";
import { ParticipantRepo } from "../participantRepo";
import {
    TournamentMatchQuery,
    TournamentMatchRepo,
} from "../tournamentMatchRepo";
import { TournamentMatchTrackerRepo } from "../trackerRepo";

export class SequelizeTournamentMatchRepository implements TournamentMatchRepo {
    private readonly participantRepo: ParticipantRepo;
    private readonly trackerRepo: TournamentMatchTrackerRepo;

    constructor(
        participantRepo: ParticipantRepo,
        trackerRepo: TournamentMatchTrackerRepo
    ) {
        this.trackerRepo = trackerRepo;
        this.participantRepo = participantRepo;
    }

    async paginate(
        q: TournamentMatchQuery,
        p: PaginateQuery
    ): Promise<PaginateResponse<TournamentMatch>> {
        const query: any = {};
        query.where = q;
        query.limit = p.limit ?? 10;
        query.offset = p.offset ?? 0;
        query.order = [["status", "ASC"]];

        const data = await models.TournamentMatchModel.findAndCountAll(query);

        const rows = [];

        for (const match of data.rows) {
            match.sets = match.sets.map((s) => JSON.parse(s));

            let p1 = await this.participantRepo.get({
                participantId: match.player1Id,
            });
            let p2 = await this.participantRepo.get({
                participantId: match.player2Id,
            });

            let p3: Participant | null = null;
            let p4: Participant | null = null;

            if (match.mode === GameMode.double) {
                p3 = await this.participantRepo.get({
                    participantId: match.player3Id!,
                });
                p4 = await this.participantRepo.get({
                    participantId: match.player4Id!,
                });
            }

            rows.push(
                TournamentMatchMap.toDomain({
                    player1: p1,
                    player2: p2,
                    player3: p3,
                    player4: p4,
                    tracker: null,
                    matchId: match.matchId,
                    tournamentId: match.tournamentId,
                    contestId: match.contestId,
                    rules: match.rules,
                    mode: match.mode,
                    surface: match.surface,
                    sets: match.sets,
                    superTieBreak: match.superTieBreak,
                    status: match.status,
                    matchInfo: match.matchInfo,
                    matchWon: match.matchWon,
                    createdAt: match.createdAt,
                    updatedAt: match.updatedAt,
                })
            );
        }

        return {
            count: data.count,
            rows,
        };
    }

    async get(q: TournamentMatchQuery): Promise<Result<TournamentMatch>> {
        const data = await models.TournamentMatchModel.findOne({ where: q });

        if (!data) {
            return Result.fail("Partido no encontrado");
        }

        let p1 = await this.participantRepo.get({
            participantId: data.player1Id,
        });
        let p2 = await this.participantRepo.get({
            participantId: data.player2Id,
        });

        let p3: Participant | null = null;
        let p4: Participant | null = null;

        if (data.mode === GameMode.double) {
            p3 = await this.participantRepo.get({
                participantId: data.player3Id!,
            });
            p4 = await this.participantRepo.get({
                participantId: data.player4Id!,
            });
        }

        let mustTracker = await this.trackerRepo.get({ matchId: data.matchId });

        return Result.ok(
            TournamentMatchMap.toDomain({
                player1: p1,
                player2: p2,
                player3: p3,
                player4: p4,
                tracker: mustTracker.isSuccess ? mustTracker.getValue() : null,
                matchId: data.matchId,
                tournamentId: data.tournamentId,
                contestId: data.contestId,
                rules: data.rules,
                mode: data.mode,
                surface: data.surface,
                sets: data.sets,
                superTieBreak: data.superTieBreak,
                status: data.status,
                matchInfo: data.matchInfo,
                matchWon: data.matchWon,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            })
        );
    }

    async save(match: TournamentMatch): Promise<void> {
        const raw = TournamentMatchMap.toPersistance(match);

        const exist = await models.TournamentMatchModel.findOne({
            where: {
                matchId: raw.matchId,
            },
        });

        if (exist) {
            models.TournamentMatchModel.update(raw, {
                where: { matchId: raw.matchId },
            });
        } else {
            const instance = await models.TournamentMatchModel.create(raw);
            await instance.save();
        }
    }
}
