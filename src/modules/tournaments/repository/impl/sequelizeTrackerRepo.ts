import { Result } from "../../../../shared/core/Result";
import { TournamentMatchTrackerModel } from "../../../../shared/infra/database/sequelize/models/TournamentMatchTracker";
import { ParticipantTracker } from "../../domain/participantTracker";
import { TournamentMatchTracker } from "../../domain/tournamentMatchTracker";
import { TournamentMatchTrackerMap } from "../../mapper/TournamentMatchTrackerMap";
import { ParticipantTrackerRepository } from "../participantTrackerRepo";
import {
    TournamentMatchTrackerQuery,
    TournamentMatchTrackerRepo,
} from "../trackerRepo";

export class SequelizeTournamentMatchTrackerRepo
    implements TournamentMatchTrackerRepo
{
    private readonly participantTrackerRepo: ParticipantTrackerRepository;

    constructor(participantTrackerRepo: ParticipantTrackerRepository) {
        this.participantTrackerRepo = participantTrackerRepo;
    }

    async save(tracker: TournamentMatchTracker): Promise<void> {
        await this.participantTrackerRepo.save(tracker.player1);
        await this.participantTrackerRepo.save(tracker.player2);

        if (tracker.player1.isDouble) {
            await this.participantTrackerRepo.save(tracker.player3!);
            await this.participantTrackerRepo.save(tracker.player4!);
        }

        const raw = TournamentMatchTrackerMap.toPersitance(tracker);

        const exist = await TournamentMatchTrackerModel.findOne({
            where: { matchId: raw.matchId },
        });

        if (exist) {
            TournamentMatchTrackerModel.update(raw, {
                where: { matchId: raw.matchId },
            });
        } else {
            const instance = await TournamentMatchTrackerModel.create(raw);
            await instance.save();
        }
    }

    async get(
        q: TournamentMatchTrackerQuery
    ): Promise<Result<TournamentMatchTracker>> {
        const data = await TournamentMatchTrackerModel.findOne({
            where: q,
        });

        if (!data) {
            return Result.fail("No se encontraron estadísticas");
        }

        const mustPlayer1 = await this.participantTrackerRepo.get({
            participantId: data.player1,
        });
        const mustPlayer2 = await this.participantTrackerRepo.get({
            participantId: data.player2,
        });

        const player1 = mustPlayer1.getValue();
        const player2 = mustPlayer2.getValue();

        let player3: ParticipantTracker | null = null;
        let player4: ParticipantTracker | null = null;

        if (player1.isDouble) {
            const mustPlayer3 = await this.participantTrackerRepo.get({
                participantId: data.player3!,
            });
            const mustPlayer4 = await this.participantTrackerRepo.get({
                participantId: data.player4!,
            });

            player3 = mustPlayer3.getValue();
            player4 = mustPlayer4.getValue();
        }

        const tracker = TournamentMatchTrackerMap.toDomain({
            matchId: data.matchId,
            trackerId: data.trackerId,
            player1,
            player2,
            player3,
            player4,
        });

        return Result.ok(tracker);
    }
}
