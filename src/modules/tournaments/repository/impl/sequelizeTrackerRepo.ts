import { Result } from "../../../../shared/core/Result";
import models from "../../../../shared/infra/database/sequelize/models";
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

        if (tracker.player3 != null && tracker.player4 != null) {
            await this.participantTrackerRepo.save(tracker.player3!);
            await this.participantTrackerRepo.save(tracker.player4!);
        }

        const raw = TournamentMatchTrackerMap.toPersitance(tracker);

        const exist = await models.TournamentMatchTrackerModel.findOne({
            where: { matchId: raw.matchId },
        });

        if (exist) {
            models.TournamentMatchTrackerModel.update(raw, {
                where: { matchId: raw.matchId },
            });
        } else {
            const instance =
                await models.TournamentMatchTrackerModel.create(raw);
            await instance.save();
        }
    }

    async get(
        q: TournamentMatchTrackerQuery
    ): Promise<Result<TournamentMatchTracker>> {
        const data = await models.TournamentMatchTrackerModel.findOne({
            where: q,
        });

        if (!data) {
            return Result.fail("No se encontraron estadísticas");
        }

        const mustPlayer1 = await this.participantTrackerRepo.get({
            participantTrackerId: data.playerTracker1,
        });
        const mustPlayer2 = await this.participantTrackerRepo.get({
            participantTrackerId: data.playerTracker2,
        });

        const player1 = mustPlayer1.getValue();
        const player2 = mustPlayer2.getValue();

        let player3: ParticipantTracker | null = null;
        let player4: ParticipantTracker | null = null;

        if (player1.isDouble && player2.isDouble) {
            const mustPlayer3 = await this.participantTrackerRepo.get({
                participantTrackerId: data.playerTracker3!,
            });
            const mustPlayer4 = await this.participantTrackerRepo.get({
                participantTrackerId: data.playerTracker4!,
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
