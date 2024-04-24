import { Result } from "../../../../shared/core/Result";
import { TournamentMatchModel } from "../../../../shared/infra/database/sequelize/models/TournamentMatch";
import { GameMode } from "../../../league/domain/gameMode";
import { Participant } from "../../domain/participant";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { TournamentMatchMap } from "../../mapper/TournamentMatchMap";
import { ParticipantRepo } from "../participantRepo";
import { TournamentMatchQuery, TournamentMatchRepo } from "../tournamentMatchRepo";
import { TournamentMatchTrackerRepo } from "../trackerRepo";

export class SequelizeTournamentMatchRepository implements TournamentMatchRepo {

    private readonly participantRepo: ParticipantRepo;
    private readonly trackerRepo: TournamentMatchTrackerRepo;

    constructor(participantRepo: ParticipantRepo, trackerRepo: TournamentMatchTrackerRepo) {
        this.trackerRepo = trackerRepo;
        this.participantRepo = participantRepo;
    }

    async get(q: TournamentMatchQuery): Promise<Result<TournamentMatch>> {
        const data = await TournamentMatchModel.findOne({ where: q });

        if (!data) {
            return Result.fail("Partido no encontrado");
        }

        let p1 = await this.participantRepo.get({ participantId: data.player1Id });
        let p2 = await this.participantRepo.get({ participantId: data.player2Id });

        let p3: Participant | null = null;
        let p4: Participant | null = null;

        if (data.mode === GameMode.double) {
            p3 = await this.participantRepo.get({ participantId: data.player3Id! });
            p4 = await this.participantRepo.get({ participantId: data.player4Id! });
        }

        let mustTracker = await this.trackerRepo.get({ matchId: data.matchId });

        return Result.ok(TournamentMatchMap.toDomain({
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
        }));
    }

    async save(match: TournamentMatch): Promise<void> {

        const raw = TournamentMatchMap.toPersistance(match);

        const exist = await TournamentMatchModel.findOne({
            where: {
                matchId: raw.matchId,
            }
        });

        if (exist) {
            TournamentMatchModel.update(raw, { where: { matchId: raw.matchId } });
        } else {
            const instance = await TournamentMatchModel.create(raw);
            await instance.save();
        }
    }
}
