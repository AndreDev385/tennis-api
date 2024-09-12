import { faEllipsisVertical, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import {
	Button,
	Card,
	Dropdown,
	Form,
	InputGroup,
	Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { paginateTournaments } from "../../services/tournaments/listTournaments";
import { useState } from "react";
import { listContest } from "../../services/contest/listContest";
import { formatContestTitle } from "../tournaments/contest/utils";
import { listContestTeams } from "../../services/contestTeam/listContestTeams";
import { Loading } from "../shared/loading";
import { ErrorMessage } from "../shared/errorMessage";
import type { ContestTeam } from "../../types/contestTeam";

export function TournamentTeams() {
	const navigate = useNavigate();

	const token: string = localStorage.getItem("authorization") || "";

	const [tournamentId, setTournamentId] = useState("");
	const [contestId, setContestId] = useState("");

	const tournaments = useQuery({
		queryKey: ["tournaments"],
		queryFn: async () => paginateTournaments({ limit: 9999, offset: 0 }),
	});

	const contests = useQuery({
		queryKey: ["contests", tournamentId],
		queryFn: async () => listContest({ tournamentId }),
	});

	const teams = useQuery({
		queryKey: ["contestTeams", tournamentId, contestId],
		queryFn: async () => listContestTeams({ contestId, tournamentId }, token),
	});

	function render() {
		if (teams.isLoading) {
			return Loading();
		}

		if (teams.data?.isFailure) {
			return ErrorMessage(teams.data.getErrorValue());
		}

		return teams.data?.getValue().map(displayTeamRow);
	}

	return (
		<div className="content-container">
			<div className="title-wrap">
				<h1>
					<FontAwesomeIcon icon={faUsers} />
					Equipos
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
							<th className="text-center">Nombre</th>
							<th className="text-center">Acciones</th>
						</tr>
					</thead>
					<tbody>{render()}</tbody>
				</Table>
			</Card>
		</div>
	);

	function displayTeamRow(t: ContestTeam) {
		return (
			<tr key={t.contestTeamId}>
				<td className="text-center">{t.name}</td>
				<td className="text-center">
					<Dropdown>
						<Dropdown.Toggle
							as={Button}
							id="dropdown-basic"
							variant="link"
							color="blue"
						>
							<FontAwesomeIcon
								color="black"
								className="ellipsis"
								icon={faEllipsisVertical}
							/>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item
								onMouseDown={() => {
									navigate(`${t.contestTeamId}`, {
										state: { team: t },
									});
								}}
							>
								Ver
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		);
	}
}
