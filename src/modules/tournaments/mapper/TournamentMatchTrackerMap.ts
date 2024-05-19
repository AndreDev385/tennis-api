import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ParticipantTracker } from "../domain/participantTracker";
import { TournamentMatch } from "../domain/tournamentMatch";
import { TournamentMatchId } from "../domain/tournamentMatchId";
import { TournamentMatchTracker } from "../domain/tournamentMatchTracker";
import { TournamentMatchTrackerDto } from "../dtos/trackerDto";
import { ParticipantTrackerMap } from "./ParticipantTrackerMap";

type BuildTracker = {
    trackerId: string;
    matchId: string;
    player1: ParticipantTracker;
    player2: ParticipantTracker;
    player3: ParticipantTracker | null;
    player4: ParticipantTracker | null;
};

export class TournamentMatchTrackerMap implements Mapper<TournamentMatch> {
    public static toDomain(raw: BuildTracker) {
        const tracker = TournamentMatchTracker.create(
            {
                matchId: TournamentMatchId.create(
                    new UniqueEntityID(raw.matchId)
                ).getValue(),
                player1: raw.player1,
                player2: raw.player2,
                player3: raw.player3,
                player4: raw.player4,
            },
            new UniqueEntityID(raw.trackerId)
        ).getValue();

        return tracker;
    }

    public static toDto(
        t: TournamentMatchTracker | null
    ): TournamentMatchTrackerDto | null {
        if (!t) return null;
        return {
            trackerId: t.trackerId.id.toString(),
            matchId: t.matchId.id.toString(),
            player1: ParticipantTrackerMap.toDto(t.player1),
            player2: ParticipantTrackerMap.toDto(t.player2),
            player3: ParticipantTrackerMap.toDto(t.player3),
            player4: ParticipantTrackerMap.toDto(t.player4),
        };
    }

    public static toPersitance(tracker: TournamentMatchTracker) {
        return {
            trackerId: tracker.trackerId.id.toString(),
            matchId: tracker.matchId.id.toString(),
            playerTracker1: tracker.player1.participantTrackerId.id.toString(),
            playerTracker2: tracker.player2.participantTrackerId.id.toString(),
            playerTracker3: tracker.player3?.participantTrackerId.id.toString(),
            playerTracker4: tracker.player4?.participantTrackerId.id.toString(),
        };
    }
}
