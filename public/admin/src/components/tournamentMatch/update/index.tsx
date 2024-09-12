import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getTournamentMatch } from "../../../services/tournamentMatch/getMatch";
import {
	StatusValues,
	mapMatchStatusToString,
} from "../../../utils/mapMatchStatusToString";
import { GameModesValues } from "../../../utils/tennisConfigs";
import { ErrorMessage } from "../../shared/errorMessage";
import { Loading } from "../../shared/loading";
import { buildDisplayName } from "../detail/score";
import { buildStatsInputsSections } from "./buildStatsInputsSections";
import { StatsInputs } from "./statsInputs";
import { buildSelectSetOptions } from "../buildSetOptions";
import { UpdateTournamentMatchContext } from "../../../shared/context/updateTournamentMatch";
import type { TournamentMatch } from "../../../types/tournamentMatch";
import { buildSetsForUpdate } from "./buildDefaultObj";
import { FormSets } from "./sets";
import { updateTournamentMatch } from "../../../services/tournamentMatch/update";
import { toast } from "react-toastify";

export function UpdateTournamentMatch() {
	const navigate = useNavigate();
	const { matchId } = useParams();
	const formRef = useRef<HTMLFormElement | null>(null);
	const token: string = localStorage.getItem("authorization") || "";

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});
	const [match, setMatch] = useState<TournamentMatch | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleGetMatch(matchId!);
	}, []);

	const [setsOptions, setSetsOptions] = useState<boolean[]>([]);

	const handleGetMatch = async (matchId: string) => {
		setStatus({ loading: true, error: "" });
		const result = await getTournamentMatch({
			matchId,
		});
		setStatus({
			loading: false,
			error: result.isFailure ? result.getErrorValue() : "",
		});
		if (result.isFailure) return;

		const match = result.getValue();
		const sets = buildSetsForUpdate(match);
		const options = buildSelectSetOptions(sets.length);
		setSetsOptions(options);
		setMatch({ ...match, sets });
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const result = await updateTournamentMatch({
			match: match!,
			token,
		});

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());
		navigate(`/dashboard/tournaments/matches/${match?.matchId}`);
	}

	if (status.loading) return Loading();
	if (status.error.length > 0) {
		return ErrorMessage(status.error);
	}

	return (
		<UpdateTournamentMatchContext.Provider value={{ match, setMatch }}>
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
							value={match?.status}
							onChange={(e) =>
								setMatch((prev) => ({
									...prev!,
									status: Number(e.target.value),
								}))
							}
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
					<div className="mb-3">
						<InputGroup>
							<InputGroup.Text>Ganador</InputGroup.Text>
							<Form.Select
								name="matchWon"
								value={`${match?.matchWon}`}
								onChange={(e) =>
									setMatch((prev) => ({
										...prev!,
										matchWon: JSON.parse(e.target.value),
									}))
								}
							>
								<option value="null">Elige un ganador</option>
								<option value="true">{buildDisplayName(false, match!)}</option>
								<option value="false">{buildDisplayName(true, match!)}</option>
							</Form.Select>
						</InputGroup>
					</div>
					<div className="mb-3">
						<InputGroup>
							<InputGroup.Text>Sets jugados</InputGroup.Text>
							<Form.Select
								name="currentSetIdx"
								id="currentSetIdx"
								value={match!.matchInfo.currentSetIdx ?? 0}
								onChange={(e) => setCurrentSetIdx(e.target.value)}
							>
								{Array.from(Array(match?.sets.length).keys()).map((n) => (
									<option value={n} key={n}>
										{n + 1}
									</option>
								))}
							</Form.Select>
						</InputGroup>
						<Form.Text id="currentSetIdx">
							Cantidad de sets que se mostraran en la app
						</Form.Text>
					</div>
					<FormSets />
					<ButtonGroup className="w-100 mb-3">
						{setsOptions.map(function displaySets(active, i) {
							return (
								<Button
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={i}
									variant={active ? "primary" : "secondary"}
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
							idx={setsOptions.indexOf(true)}
						/>
					</div>
					<div className="d-grid">
						<Button size="lg" type="submit">
							Actualizar
						</Button>
					</div>
				</form>
			</div>
		</UpdateTournamentMatchContext.Provider>
	);

	function setCurrentSetIdx(value: string) {
		setMatch((prev) => ({
			...prev!,
			matchInfo: {
				...prev!.matchInfo,
				currentSetIdx: Number(value),
			},
		}));
	}

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
					p1: match!.sets[i].stats!.player1!,
					p2: match!.sets[i].stats!.player2!,
					p3: match!.sets[i].stats!.player3!,
					p4: match!.sets[i].stats!.player4!,
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
