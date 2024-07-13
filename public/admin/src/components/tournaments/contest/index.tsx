import { Card, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import { formatContestTitle } from "./utils";
import { useEffect, useState } from "react";
import { getContest } from "../../../services/contest/getContest";
import type { Contest } from "../../../types/contest";

export const ContestDetail = () => {
	const { state } = useLocation();

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});

	const [contest, setContest] = useState<Contest | null>(null);

	const handleGetContest = async () => {
		setStatus({ loading: true, error: "" });

		const result = await getContest(state.contest.contestId);

		setStatus((prev) => ({ ...prev, loading: false }));
		if (result.isFailure) {
			setStatus((prev) => ({ ...prev, error: result.getErrorValue() }));
			return;
		}

		setContest(result.getValue());
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleGetContest();
	}, []);

	const table = () => {};

	return (
		<div>
			<div className="title-wrap">
				<h1>
					{state.tournamentName} {formatContestTitle(state.contest)}
				</h1>
			</div>
			<Card>
				<h2 className="text-center">Participantes</h2>
				<Table responsive="sm">
					<thead>
						<tr>
							<th className="text-center">Nombre</th>
							<th className="text-center">Apellido</th>
							<th className="text-center">CI</th>
							<th className="text-center">Acciones</th>
						</tr>
					</thead>
					<tbody>{}</tbody>
				</Table>
			</Card>
		</div>
	);
};
