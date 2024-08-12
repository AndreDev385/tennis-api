import type { Participant } from "../../../types/participant";
import type { Set as GameSet } from "../../../types/set";
import type { TournamentMatch } from "../../../types/tournamentMatch";
import { formatParticipantName } from "../../../utils/formatParticipantName";
import { GameModesValues } from "../../../utils/tennisConfigs";

type Props = {
	match: TournamentMatch;
};

export function Score({ match }: Props) {
	function buildDisplayName(showRival: boolean) {
		if (match.mode === GameModesValues.Double) {
			if (showRival) {
				return `${formatParticipantName(match.participant2)} / ${formatParticipantName(match.participant4 as Participant)}`;
			}
			return `${formatParticipantName(match.participant1)} / ${formatParticipantName(match.participant3 as Participant)}`;
		}

		if (showRival) {
			return formatParticipantName(match.participant2 as Participant);
		}
		return formatParticipantName(match.participant1);
	}

	return (
		<div className="mb-3">
			<Row
				name={buildDisplayName(false)}
				sets={match.sets}
				showRival={false}
				hasWon={match.matchWon === true}
			/>
			<Row
				name={buildDisplayName(true)}
				sets={match.sets}
				showRival={true}
				hasWon={match.matchWon === false}
			/>
		</div>
	);
}

type RowProps = {
	hasWon?: boolean | null;
	sets?: GameSet[];
	showRival: boolean;
	name: string;
};

function Row({ hasWon, sets, showRival, name }: RowProps) {
	return (
		<div
			className={"d-flex justify-content-between px-5 mb-2"}
			style={{ backgroundColor: hasWon ? "#d9ede6" : "#fff" }}
		>
			<div style={{ fontSize: "18px", padding: ".25rem" }}>{name}</div>
			<div className="d-flex" style={{ gap: "1rem" }}>
				{sets?.map((s, idx) => {
					let setWon: boolean;
					let tieBreakPoints: number;

					if (showRival) {
						setWon = s.setWon === false;
						tieBreakPoints = s.rivalTiebreakPoints;
					} else {
						setWon = s.setWon === true;
						tieBreakPoints = s.myTiebreakPoints;
					}

					if (s.myGames === 0 && s.rivalGames === 0) {
						return <span />;
					}

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={idx} className="d-flex">
							<span
								style={{ fontSize: "18px", color: setWon ? "#00E19B" : "" }}
							>
								{showRival ? s.rivalGames : s.myGames}
							</span>
							{s.tiebreak && (
								<div className="d-flex align-items-start">
									<span
										style={{ color: setWon ? "#00E19B" : "" }}
										className="tiebreak_points"
									>
										{tieBreakPoints}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
