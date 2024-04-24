import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ParticipantTracker } from "../domain/participantTracker";
import { TournamentMatch } from "../domain/tournamentMatch";
import { TournamentMatchId } from "../domain/tournamentMatchId";
import { TournamentMatchTracker } from "../domain/tournamentMatchTracker";

type BuildTracker = {
    trackerId: string;
    matchId: string;
    player1: ParticipantTracker;
    player2: ParticipantTracker;
    player3: ParticipantTracker | null;
    player4: ParticipantTracker | null;
}

export class TournamentMatchTrackerMap implements Mapper<TournamentMatch> {


    public static toDomain(raw: BuildTracker) {
        const tracker = TournamentMatchTracker.create({
            matchId: TournamentMatchId.create(new UniqueEntityID(raw.matchId)).getValue(),
            player1: raw.player1,
            player2: raw.player2,
            player3: raw.player3,
            player4: raw.player4,
        }, new UniqueEntityID(raw.trackerId)).getValue()

        return tracker;
    }

    public static toDto() {

    }

    public static toPersitance(tracker: TournamentMatchTracker) {
        return {
            trackerId: tracker.trackerId.id.toString(),
            matchId: tracker.matchId.id.toString(),
            player1: tracker.player1.participantId.id.toString(),
            player2: tracker.player2.participantId.id.toString(),
            player3: tracker.player3?.participantId.id.toString(),
            player4: tracker.player4?.participantId.id.toString(),
        }
    }
}
