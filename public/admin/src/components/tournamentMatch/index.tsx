import "./index.scss";
import {
	faBaseballBall,
	faCheck,
	faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
	Button,
	Card,
	Dropdown,
	Form,
	InputGroup,
	Pagination,
	Table,
} from "react-bootstrap";
import { useNavigate } from "react-router";

import { useQuery } from "@tanstack/react-query";
import { listContest } from "../../services/contest/listContest";
import { paginateTournamentMatches } from "../../services/tournamentMatch/paginate";
import { paginateTournaments } from "../../services/tournaments/listTournaments";
import type { Participant } from "../../types/participant";
import { buildPagination } from "../../utils/buildPagination";
import { formatParticipantName } from "../../utils/formatParticipantName";
import { GameModesValues } from "../../utils/tennisConfigs";
import { ErrorMessage } from "../shared/errorMessage";
import { Loading } from "../shared/loading";
import { formatContestTitle } from "../tournaments/contest/utils";
import {
	type MatchStatus,
	mapMatchStatusToString,
} from "../../utils/mapMatchStatusToString";

export const MatchesPage = () => {
	const navigate = useNavigate();

	const [tournamentId, setTournamentId] = useState("");
	const [contestId, setContestId] = useState("");

	const [state, setState] = useState({
		offset: 0,
		limit: 20,
		count: 0,
	});

	const tournaments = useQuery({
		queryKey: ["tournaments"],
		queryFn: async () => paginateTournaments({ limit: 9999, offset: 0 }),
	});

	const matches = useQuery({
		queryKey: ["tournamentMatches", tournamentId, contestId, state],
		queryFn: async () =>
			paginateTournamentMatches({
				limit: state.limit,
				offset: state.offset,
				tournamentId,
				contestId,
			}),
	});

	const contests = useQuery({
		queryKey: ["contests", tournamentId],
		queryFn: async () => listContest({ tournamentId }),
		//enabled: tournamentId,
	});

	const matchesTable = matches.data?.getValue().rows.map((item) => {
		return (
			<tr key={item.matchId}>
				<td className="text-center players">
					<p className={item.matchWon ? "bold" : ""}>
						{formatParticipantName(item.participant1)}
						{item.mode === GameModesValues.Double &&
							` / ${formatParticipantName(item.participant3 as Participant)}`}
					</p>
					<p className={item.matchWon ? "" : "bold"}>
						{formatParticipantName(item.participant2)}
						{item.mode === GameModesValues.Double &&
							` / ${formatParticipantName(item.participant4 as Participant)}`}
					</p>
				</td>
				<td className="d-flex justify-content-center align-items-center flex-column">
					<div>
						{item.sets.map((set, index) => {
							return (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className={`${index === 0 ? "" : "set"} mx-2`}
								>
									{set.myGames}
								</span>
							);
						})}
						{item.matchWon ? (
							<FontAwesomeIcon style={{ color: "#00E19B" }} icon={faCheck} />
						) : (
							<span style={{ width: "5px" }} />
						)}
					</div>
					<br />
					<div>
						{item.sets.map((set, index) => {
							return (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className={`${index === 0 ? "" : "set"} mx-2`}
								>
									{set.rivalGames}
								</span>
							);
						})}
						{item.matchWon === false ? (
							<FontAwesomeIcon style={{ color: "#00E19B" }} icon={faCheck} />
						) : (
							<span style={{ width: "5px" }} />
						)}
					</div>
				</td>
				<td className="text-center">{item.mode}</td>
				<td className="text-center">
					{mapMatchStatusToString(item.status as MatchStatus)}
				</td>
				<td className="text-center">
					<Dropdown>
						<Dropdown.Toggle
							color="blue"
							as={Button}
							id="dropdown-basic"
							variant="link"
						>
							<FontAwesomeIcon
								color="black"
								className="ellipsis"
								icon={faEllipsisVertical}
							/>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item
								onMouseDown={() =>
									navigate(`${item.matchId}`, {
										state: {
											p1: item.participant1,
											p2: item.participant2,
											p3: item.participant3,
											p4: item.participant4,
										},
									})
								}
							>
								Ver
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		);
	});

	function render() {
		if (matches.isLoading) {
			return Loading();
		}
		if (matches.data?.isFailure) {
			return ErrorMessage(matches.data.getErrorValue());
		}
		return matchesTable;
	}

	return (
		<>
			<div className="content-container">
				<div className="title-wrap">
					<h1>
						<FontAwesomeIcon icon={faBaseballBall} />
						Partidos
					</h1>
				</div>
				<div className="filter-container">
					<InputGroup>
						<Form.Select
							value={tournamentId}
							onChange={(e) => {
								setTournamentId(e.target.value);
								if (e.target.value === "") setContestId("");
							}}
						>
							<option value="">Selecciona un torneo</option>
							{tournaments.data
								?.getValue()
								.rows.map(function tournamentsOptions(t) {
									return (
										<option key={t.tournamentId} value={t.tournamentId}>
											{t.name}
										</option>
									);
								})}
						</Form.Select>
					</InputGroup>
					<div className="mx-2" />
					<InputGroup>
						<Form.Select
							value={contestId}
							disabled={!tournamentId}
							onChange={(e) => setContestId(e.target.value)}
						>
							<option value="">Selecciona una competencia</option>
							{contests.data?.getValue().map(function contestOptions(c) {
								return (
									<option value={c.contestId} key={c.contestId}>
										{formatContestTitle(c)}
									</option>
								);
							})}
						</Form.Select>
					</InputGroup>
				</div>
				<Card>
					<Table responsive="sm">
						<thead>
							<tr>
								<th className="text-center">Jugadores</th>
								<th className="text-center">Sets</th>
								<th className="text-center">Tipo</th>
								<th className="text-center">Status</th>
								<th className="text-center">Acciones</th>
							</tr>
						</thead>
						<tbody>{render()}</tbody>
					</Table>
					<Pagination>
						{buildPagination(state.count, state.limit).map((idx) => (
							<Pagination.Item
								key={idx}
								onMouseDown={() =>
									setState((prev) => ({ ...prev, offset: idx - 1 }))
								}
							>
								{idx}
							</Pagination.Item>
						))}
					</Pagination>
				</Card>
			</div>
		</>
	);
};
