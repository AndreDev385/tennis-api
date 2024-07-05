import "../index.scss";
import {
	faCircleNotch,
	faEye,
	faMedal,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import type { Contest } from "../../../types/contest";
import { formatContestTitle } from "../contest/utils";
import { listContest } from "../../../services/contest/listContest";

export const TournamentDetail = () => {
	const { tournamentId } = useParams();
	const [state, setState] = useState({
		loading: true,
		error: "",
	});
	const [query] = useSearchParams();
	const [tournament, setTournament] = useState({
		name: "",
	});

	const [contest, setContest] = useState<Contest[]>([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const tournamentName = query.get("name");

		if (!tournamentName || !tournamentId) {
			setState({ loading: false, error: "URL invalida" });
			return;
		}

		setTournament({ name: tournamentName });

		setState((prev) => ({ ...prev, loading: true }));
		const result = await listContest({ tournamentId });
		setState((prev) => ({ ...prev, loading: false }));

		if (result.isFailure) {
			setState((prev) => ({ ...prev, error: result.getErrorValue() }));
			return;
		}

		setState((prev) => ({ ...prev, error: "" }));
		setContest(result.getValue());
	};

	const table = contest.map((c) => (
		<tr key={c.contestId}>
			<td className="text-center">{c.mode}</td>
			<td className="text-center">{formatContestTitle(c)}</td>
			<td className="text-center">
				<FontAwesomeIcon
					onMouseDown={() => console.log("click")}
					color="primary"
					icon={faEye}
				/>
			</td>
		</tr>
	));

	function render() {
		if (state.loading) {
			return (
				<FontAwesomeIcon className="center mt-5" icon={faCircleNotch} spin />
			);
		}
		if (state.error.length > 0) {
			return (
				<div className="d-flex align-items-center">
					<h2 className="text-danger text-center">Ha ocurrido un error</h2>
				</div>
			);
		}
		return (
			<Table responsive="sm">
				<thead>
					<tr>
						<th className="text-center">Tipo de juego</th>
						<th className="text-center">Modalidad</th>
						<th className="text-center">Ver</th>
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</Table>
		);
	}

	return (
		<>
			<div className="content-container">
				<div className="title-wrap">
					<h1>
						<FontAwesomeIcon icon={faMedal} />
						{tournament.name}
					</h1>
					<Button variant="primary" onClick={() => console.log("create")}>
						<FontAwesomeIcon icon={faPlus} />
						Nueva
					</Button>
				</div>
				<Card>{render()}</Card>
			</div>
		</>
	);
};
