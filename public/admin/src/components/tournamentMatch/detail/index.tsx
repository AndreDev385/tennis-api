import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useParams } from "react-router";
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
import { buildStandardSections } from "./buildStardardSections";
import { calculateStatsBySet } from "./calculateStastBySet";
import { Score } from "./score";
import { StatsTable } from "./statsTable";

function buildSelectSetOptions(quantity: number): boolean[] {
	const options = [];

	for (let i = 0; i <= quantity; i++) {
		options[i] = false;
	}

	options[quantity] = true;

	return options;
}

enum TableOptions {
	standard = 0,
	j1vsj2 = 1,
	j3vsj4 = 2,
}

export const TournamentMatchDetail: React.FC = () => {
	const { matchId } = useParams();

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});

	const [selectSetOptions, setSelectSetOptions] = useState<boolean[]>([]);

	const [match, setMatch] = useState<TournamentMatch>();

	const [showTable, setShowTable] = useState(TableOptions.standard);

	const handleGetMatch = async (matchId: string) => {
		setStatus({
			loading: true,
			error: "",
		});
		const result = await getTournamentMatch({
			matchId,
		});

		setStatus({
			loading: false,
			error: result.isFailure ? result.getErrorValue() : "",
		});

		if (result.isFailure) {
			return;
		}

		setSelectSetOptions(buildSelectSetOptions(result.getValue().sets.length));
		setMatch(result.getValue());
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleGetMatch(matchId as string);
	}, []);

	if (status.loading) {
		return Loading();
	}

	if (status.error.length > 0) {
		return ErrorMessage(status.error);
	}

	function renderStatsButtons() {
		if (match?.mode === "single") {
			return (
				<ButtonGroup>
					<Button variant="primary">Jugador vs Jugador</Button>
				</ButtonGroup>
			);
		}

		return (
			<ButtonGroup>
				<Button
					variant={showTable == TableOptions.standard ? "primary" : "secondary"}
					onClick={() => setShowTable(TableOptions.standard)}
				>
					Pareja vs Pareja
				</Button>
				<Button
					variant={showTable == TableOptions.j1vsj2 ? "primary" : "secondary"}
					onClick={() => setShowTable(TableOptions.j1vsj2)}
				>
					J1 vs J2
				</Button>
				<Button
					variant={showTable == TableOptions.j3vsj4 ? "primary" : "secondary"}
					onClick={() => setShowTable(TableOptions.j3vsj4)}
				>
					J3 vs J4
				</Button>
			</ButtonGroup>
		);
	}

	function displayLeftName(tableOption: number): string {
		if (tableOption == TableOptions.j1vsj2) {
			// j1
			return formatParticipantName(match?.participant1 as Participant);
		}

		if (tableOption == TableOptions.j3vsj4) {
			// j3
			return formatParticipantName(match?.participant3 as Participant);
		}

		// couple 1
		if (match?.mode == GameModesValues.Double) {
			return `${formatParticipantName(match?.participant1)} / ${formatParticipantName(match?.participant3 as Participant)}`;
		}
		return formatParticipantName(match?.participant1 as Participant);
	}

	function displayRightName(tableOption: number): string {
		if (tableOption === TableOptions.j1vsj2) {
			return formatParticipantName(match?.participant2 as Participant);
		}

		if (tableOption === TableOptions.j3vsj4) {
			// j3
			return formatParticipantName(match?.participant4 as Participant);
		}

		// couple 1
		if (match?.mode === GameModesValues.Double) {
			return `${formatParticipantName(match?.participant2)} / ${formatParticipantName(match?.participant4 as Participant)}`;
		}
		return formatParticipantName(match?.participant2 as Participant);
	}

	if (status.loading) return Loading();
	if (status.error) return ErrorMessage(status.error);
	return (
		<div>
			<div>
				<h1>
					<FontAwesomeIcon icon={faPoll} />
					Detalle del partido
				</h1>
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
				{/* Score board */}
				<Score match={match as TournamentMatch} />
				{/* End Score board */}
				{/* Select table buttons */}
				<div className="d-flex justify-content-center mb-3">
					{renderStatsButtons()}
				</div>
				{/* End */}
				{/* Sets filter Table */}
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
								disabled={disable()}
								variant={active ? "primary" : "secondary"}
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={i}
								onMouseDown={() => {
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
				{/* End */}
				<Table responsive="sm">
					<tbody>
						<tr>
							<td className="text-center">{displayLeftName(showTable)}</td>
							<td className="text-center">Nombre</td>
							<td className="text-center">{displayRightName(showTable)}</td>
						</tr>
					</tbody>
				</Table>
				{/* Table */}
				<StatsTable
					sections={buildStandardSections(
						calculateStatsBySet(
							match?.sets as GameSet[],
							selectSetOptions,
							match?.tracker as TournamentMatchTracker,
						),
					)}
				/>
				{/* End */}
			</div>
		</div>
	);
};
