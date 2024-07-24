import {
	faBaseballBall,
	faCheck,
	faCircleNotch,
	faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Pagination, Table } from "react-bootstrap";
//import { useNavigate } from "react-router";

import { paginateTournamentMatches } from "../../services/tournamentMatch/paginate";
import type { Participant } from "../../types/participant";
import type { TournamentMatch } from "../../types/tournamentMatch";
import { buildPagination } from "../../utils/buildPagination";
import { formatParticipantName } from "../../utils/formatParticipantName";
import { GameModesValues } from "../../utils/tennisConfigs";

export const MatchesPage = () => {
	//const _navigate = useNavigate();

	const [state, setState] = useState({
		loading: true,
		error: "",
		offset: 0,
		limit: 20,
		count: 0,
	});

	const [matches, setMatches] = useState<TournamentMatch[]>([]);

	const handlePaginateMatches = async () => {
		setState((prev) => ({ ...prev, loading: true, error: "" }));
		const result = await paginateTournamentMatches({
			limit: state.limit,
			offset: state.offset,
		});
		setState((prev) => ({ ...prev, loading: false }));

		if (result.isFailure) {
			setState((prev) => ({ ...prev, error: result.getErrorValue() }));
			return;
		}

		setState((prev) => ({ ...prev, count: result.getValue().count }));
		setMatches(result.getValue().rows);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handlePaginateMatches();
	}, [state.offset]);

	const matchesTable = matches.map((item) => {
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
						<Dropdown.Menu />
					</Dropdown>
				</td>
			</tr>
		);
	});

	function render() {
		if (state.loading) {
			return (
				<FontAwesomeIcon className="center mt-5" icon={faCircleNotch} spin />
			);
		}
		if (state.error.length > 0) {
			return state.error;
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
				<Card>
					<Table responsive="sm">
						<thead>
							<tr>
								<th className="text-center">Jugadores</th>
								<th className="text-center">Sets</th>
								<th className="text-center">Tipo</th>
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
