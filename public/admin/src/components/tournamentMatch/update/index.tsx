import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { getTournamentMatch } from "../../../services/tournamentMatch/getMatch";
import {
	StatusValues,
	mapMatchStatusToString,
} from "../../../utils/mapMatchStatusToString";
import { GameModesValues } from "../../../utils/tennisConfigs";
import { ErrorMessage } from "../../shared/errorMessage";
import { Loading } from "../../shared/loading";
import { buildDisplayName } from "../detail/score";
import { TableOptions, TablesButtons } from "../detail/tablesButtons";
import { buildStatsInputsSections } from "./buildStatsInputsSections";
import { StatsInputs } from "./statsInputs";
import { buildSelectSetOptions } from "../buildSetOptions";

export function UpdateTournamentMatch() {
	const { matchId } = useParams();
	const formRef = useRef<HTMLFormElement | null>(null);

	const result = useQuery({
		queryKey: ["updateMatch", matchId],
		queryFn: () => handleGetMatch(matchId!),
	});

	const [showTable, setShowTable] = useState(TableOptions.standard);
	const [setsOptions, setSetsOptions] = useState<boolean[]>([]);

	const handleGetMatch = async (matchId: string) => {
		const result = await getTournamentMatch({
			matchId,
		});

		const options = buildSelectSetOptions(result.getValue().sets.length);

		setSetsOptions(options);
		return result;
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(e);
		console.log(e.currentTarget, "current target");
		console.log(e.currentTarget.elements);
		console.log(new FormData(e.currentTarget));
	}

	if (result.isLoading) return Loading();
	if (result.error || result.data?.isFailure) {
		return ErrorMessage(result.data?.getErrorValue() ?? "Ha ocurrido un error");
	}

	const match = result.data?.getValue();

	return (
		<div className="mx-4 mb-5">
			<div>
				<h1>Actualizar partido</h1>
			</div>
			<div className="mx-4 d-flex justify-content-between mb-3">
				<div style={{ fontSize: "1.2rem" }}>
					{buildDisplayName(false, match!)}
				</div>
				<div style={{ fontSize: "1.2rem" }}>Nombres</div>
				<div style={{ fontSize: "1.2rem" }}>
					{buildDisplayName(true, match!)}
				</div>
			</div>
			<form ref={formRef} onSubmit={handleSubmit}>
				<InputGroup className="d-flex mb-3">
					<InputGroup.Text>Estado</InputGroup.Text>
					<Form.Select
						name="state"
						aria-label="Estado"
						defaultValue={match?.status}
					>
						{Object.values(StatusValues).map(function displayOptions(v) {
							return (
								<option key={v} value={v}>
									{mapMatchStatusToString(v)}
								</option>
							);
						})}
					</Form.Select>
				</InputGroup>
				{match?.sets.map(function setRowForm(s, i) {
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className="d-flex justify-content-between set-container"
						>
							<div className="set-group">
								<Form.Control
									defaultValue={s.myGames}
									className="set"
									type="number"
									name={`set${i}-myGames`}
								/>
								<div className="d-flex align-items-start">
									<Form.Control
										defaultValue={s.myTiebreakPoints}
										className="tiebreak"
										type="number"
										name={`set${i}-myTieBreakPoints`}
									/>
								</div>
							</div>
							<div className="d-flex flex-column align-items-center justify-content-center">
								<span className="bold">Set {i + 1}</span>
								<div
									className="d-flex justify-content-around"
									style={{ gap: "2rem" }}
								>
									<Form.Check
										defaultChecked={s.tiebreak}
										type="switch"
										label="Tiebreak"
										name={`set${i}-tiebreak`}
									/>
									<Form.Check
										defaultChecked={s.superTiebreak}
										type="switch"
										label="Super Tiebreak"
										name={`set${i}-superTiebreak`}
									/>
								</div>
							</div>
							<div className="set-group">
								<Form.Control
									defaultValue={s.rivalGames}
									className="set"
									type="number"
									name={`set${i}-rivalGames`}
								/>
								<div className="d-flex align-items-start">
									<Form.Control
										defaultValue={s.rivalTiebreakPoints}
										className="tiebreak"
										type="number"
										name={`set${i}-rivalTiebreakPoints`}
									/>
								</div>
							</div>
						</div>
					);
				})}
				<div className="d-flex justify-content-center mb-3">
					{TablesButtons(match?.mode as string, showTable, setShowTable)}
				</div>
				<ButtonGroup className="w-100 mb-3">
					{setsOptions.map(function displaySets(active, i) {
						function disable() {
							if (i < setsOptions.length - 1) {
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
								onMouseDown={() => changeSelectOptions(i)}
							>
								{i === setsOptions.length - 1 ? "Total" : `Set ${i + 1}`}
							</Button>
						);
					})}
				</ButtonGroup>
				<div>
					<StatsInputs
						double={match?.mode === GameModesValues.Double}
						sections={buildStatsInputsSections(sendStats())}
					/>
				</div>
				<div className="d-grid">
					<Button size="lg" type="submit">
						Actualizar
					</Button>
				</div>
			</form>
		</div>
	);

	function changeSelectOptions(i: number) {
		const options = [];
		for (let j = 0; j < setsOptions.length; j++) {
			if (j === i) {
				options[j] = true;
			} else {
				options[j] = false;
			}
		}
		setSetsOptions(options);
	}

	function sendStats() {
		var sets = match?.sets;
		for (let i = 0; i < setsOptions.length - 1; i++) {
			if (setsOptions[i] === true) {
				// i == 0
				if (sets![i].stats == null) {
					return {
						p1: match!.tracker.player1!,
						p2: match!.tracker.player2!,
						p3: match!.tracker.player3,
						p4: match!.tracker.player4,
					};
				}

				return {
					p1: match!.sets[i].stats.player1!,
					p2: match!.sets[i].stats.player2!,
					p3: match!.sets[i].stats.player3!,
					p4: match!.sets[i].stats.player4!,
				};
			}
		}
		return {
			p1: match!.tracker.player1!,
			p2: match!.tracker.player2!,
			p3: match!.tracker.player3,
			p4: match!.tracker.player4,
		};
	}
}
