import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ParticipantId } from "./participantId";
import { ParticipantTracker } from "./participantTracker";
import { TournamentId } from "./tournamentId";
import { TournamentMatchId } from "./tournamentMatchId";
import { TournamentMatchTrackerId } from "./tournamentMatchTrackerId";

export type TournamentMatchTrackerProps = {
	matchId: TournamentMatchId;
	player1: ParticipantTracker;
	player2: ParticipantTracker;
	player3?: ParticipantTracker | null;
	player4?: ParticipantTracker | null;
};

type NewEmptyTrackerData = {
	isDouble: boolean;
	matchId: TournamentMatchId;
	tournamentId: TournamentId;
	p1Id: ParticipantId;
	p2Id: ParticipantId;
	p3Id?: ParticipantId;
	p4Id?: ParticipantId;
};

export class TournamentMatchTracker extends Entity<TournamentMatchTrackerProps> {
	get trackerId(): TournamentMatchTrackerId {
		return TournamentMatchTrackerId.create(this._id).getValue();
	}
	get matchId(): TournamentMatchId {
		return this.props.matchId;
	}
	get player1(): ParticipantTracker {
		return this.props.player1;
	}
	get player2(): ParticipantTracker {
		return this.props.player2;
	}
	get player3(): ParticipantTracker | null {
		return this.props.player3!;
	}
	get player4(): ParticipantTracker | null {
		return this.props.player4!;
	}

	private constructor(props: TournamentMatchTrackerProps, id?: UniqueEntityID) {
		super(props, id);
	}

	public static newEmptyTracker({
		matchId,
		isDouble,
		tournamentId,
		p1Id,
		p2Id,
		p3Id,
		p4Id,
	}: NewEmptyTrackerData) {
		let p1 = ParticipantTracker.newEmptyTracker(
			isDouble,
			matchId,
			tournamentId,
			p1Id,
		);

		let p2 = ParticipantTracker.newEmptyTracker(
			isDouble,
			matchId,
			tournamentId,
			p2Id,
		);

		let p3: ParticipantTracker | null = null;
		let p4: ParticipantTracker | null = null;

		if (isDouble) {
			p3 = ParticipantTracker.newEmptyTracker(
				isDouble,
				matchId,
				tournamentId,
				p3Id!,
			);
			p4 = ParticipantTracker.newEmptyTracker(
				isDouble,
				matchId,
				tournamentId,
				p4Id!,
			);
		}

		return new TournamentMatchTracker({
			matchId,
			player1: p1,
			player2: p2,
			player3: p3,
			player4: p4,
		});
	}

	public static create(
		props: TournamentMatchTrackerProps,
		id?: UniqueEntityID,
	) {
		return Result.ok(new TournamentMatchTracker(props, id));
	}
}
