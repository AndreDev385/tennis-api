import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getTournamentMatch } from "../../../services/tournamentMatch/getMatch";
import type { Participant } from "../../../types/participant";
import type { Set as GameSet } from "../../../types/set";
import type { TournamentMatch } from "../../../types/tournamentMatch";
import type { TournamentMatchTracker } from "../../../types/tournamentTracker";
import { formatParticipantName } from "../../../utils/formatParticipantName";
import {
	type MatchStatus,
	mapMatchStatusToString,
} from "../../../utils/mapMatchStatusToString";
import { GameModesValues } from "../../../utils/tennisConfigs";
import { ErrorMessage } from "../../shared/errorMessage";
import { Loading } from "../../shared/loading";
import {
	buildParticipantsSections,
	buildStandardSections,
} from "./buildStardardSections";
import { calculateStatsBySet } from "./calculateStastBySet";
import { Score } from "./score";
import { StatsTable } from "./statsTable";
import { useQuery } from "@tanstack/react-query";
import { TableOptions, TablesButtons } from "./tablesButtons";
import { buildSelectSetOptions } from "../buildSetOptions";

export const TournamentMatchDetail: React.FC = () => {
	const navigate = useNavigate();
	const { matchId } = useParams();

	const [selectSetOptions, setSelectSetOptions] = useState<boolean[]>([]);
	const [showTable, setShowTable] = useState(TableOptions.standard);

	const result = useQuery({
		queryKey: ["match", matchId],
		queryFn: () => handleGetMatch(matchId as string),
	});

	const match = result.data?.getValue();

	const handleGetMatch = async (matchId: string) => {
		const result = await getTournamentMatch({
			matchId,
		});
		setSelectSetOptions(buildSelectSetOptions(result.getValue().sets.length));
		return result;
	};

	function displayLeftName(tableOption: number): string {
		if (tableOption == TableOptions.j1vsj3) {
			// j1
			return formatParticipantName(match?.participant1 as Participant);
		}

		if (tableOption == TableOptions.j2vsj4) {
			// j3
			return formatParticipantName(match?.participant2 as Participant);
		}

		// couple 1
		if (match?.mode == GameModesValues.Double) {
			return `${formatParticipantName(match?.participant1)} / ${formatParticipantName(match?.participant3 as Participant)}`;
		}
		return formatParticipantName(match?.participant1 as Participant);
	}

	function displayRightName(tableOption: number): string {
		if (tableOption === TableOptions.j1vsj3) {
			return formatParticipantName(match?.participant3 as Participant);
		}

		if (tableOption === TableOptions.j2vsj4) {
			// j3
			return formatParticipantName(match?.participant4 as Participant);
		}

		// couple 1
		if (match?.mode === GameModesValues.Double) {
			return `${formatParticipantName(match?.participant2)} / ${formatParticipantName(match?.participant4 as Participant)}`;
		}
		return formatParticipantName(match?.participant2 as Participant);
	}

	function selectTableStats(option: TableOptions) {
		if (option === TableOptions.j1vsj3) {
			return buildParticipantsSections(
				calculateStatsBySet(
					match?.sets as GameSet[],
					selectSetOptions,
					match?.tracker as TournamentMatchTracker,
				).player1!,
				calculateStatsBySet(
					match?.sets as GameSet[],
					selectSetOptions,
					match?.tracker as TournamentMatchTracker,
				).player3!,
			);
		}
		if (option === TableOptions.j2vsj4) {
			return buildParticipantsSections(
				calculateStatsBySet(
					match?.sets as GameSet[],
					selectSetOptions,
					match?.tracker as TournamentMatchTracker,
				).player2!,
				calculateStatsBySet(
					match?.sets as GameSet[],
					selectSetOptions,
					match?.tracker as TournamentMatchTracker,
				).player4!,
			);
		}
		return buildStandardSections(
			calculateStatsBySet(
				match?.sets as GameSet[],
				selectSetOptions,
				match?.tracker as TournamentMatchTracker,
			),
		);
	}

	if (result.isLoading) return Loading();
	if (result.data?.isFailure) return ErrorMessage(result.data.getErrorValue());
	return (
		<div>
			<div className="d-flex justify-content-between">
				<h1 className="text-center">
					<FontAwesomeIcon icon={faPoll} />
					Detalle del partido
				</h1>
				<div className="d-flex align-items-center">
					<Button
						className="mx-4"
						onMouseDown={() =>
							navigate(
								`/dashboard/tournaments/matches/update/${match!.matchId}`,
							)
						}
					>
						Actualizar
					</Button>
				</div>
			</div>
			<div
				style={{
					margin: "0 2rem",
					padding: "1rem",
					boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
					borderRadius: "1rem",
					border: "none",
				}}
			>
				<div className="d-flex justify-content-between m-2">
					<div>
						<h4>Estado:</h4>
					</div>
					<div>
						<h4>{mapMatchStatusToString(match?.status as MatchStatus)}</h4>
					</div>
				</div>
				<Score match={match as TournamentMatch} />
				<div className="d-flex justify-content-center mb-3">
					{TablesButtons(match?.mode as string, showTable, setShowTable)}
				</div>
				<ButtonGroup className="w-100 mb-3">
					{selectSetOptions.map(function displaySets(active, i) {
						function disable() {
							if (i < selectSetOptions.length - 1) {
								return !match?.sets[i]?.stats;
							}

							return false;
						}

						return (
							<Button
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={i}
								disabled={disable()}
								variant={active ? "primary" : "secondary"}
								onMouseDown={function changeSelectOptions() {
									const options = [];
									for (let j = 0; j < selectSetOptions.length; j++) {
										if (j === i) {
											options[j] = true;
										} else {
											options[j] = false;
										}
									}
									setSelectSetOptions(options);
								}}
							>
								{i === selectSetOptions.length - 1 ? "Total" : `Set ${i + 1}`}
							</Button>
						);
					})}
				</ButtonGroup>
				<Table responsive="sm">
					<tbody className="w-full">
						<tr className="d-flex justify-content-between">
							<div className="text-center">{displayLeftName(showTable)}</div>
							<div className="text-center">Nombre</div>
							<div className="text-center">{displayRightName(showTable)}</div>
						</tr>
					</tbody>
				</Table>
				<StatsTable sections={selectTableStats(showTable)} />
			</div>
		</div>
	);
};
