import {
	faCircle,
	faCircleNotch,
	faMapMarkerAlt,
	faPoll,
	faTableTennis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import type { IMatch } from "../../../types/interfaces";
import "./Games.scss";
import { VITE_SERVER_URL } from "../../../env/env.prod";

const Games = () => {
	const [games, setGames] = useState<IMatch[]>([]);
	const [loading, setLoading] = useState(false);
	const token: string = localStorage.getItem("authorization") || "";
	const { id } = useParams();
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getGames();
	}, [id]);

	const getGames = async () => {
		setLoading(true);

		const params = {
			...(id && { clashId: id }),
		};

		const url = `${VITE_SERVER_URL}/api/v1/match?${new URLSearchParams(params)}`;

		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();

			if (response.status === 200) {
				setGames(data);
				setLoading(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const goToStats = (matchId: string) => {
		navigate(`/dashboard/league/results/match/${matchId}`);
	};

	const gamesTable = games.map((item) => {
		return (
			<tr key={item.matchId}>
				<td className="text-center players">
					<p className={item.matchWon ? "bold" : ""}>
						{item.player1.name} {item.mode === "double" ? "/" : " "}{" "}
						{item.player3?.name}
					</p>
					<p className={item.matchWon ? "" : "bold"}>
						{item.player2} {item.mode === "double" ? "/" : " "} {item.player4}
					</p>
				</td>
				<td>
					{item.sets.map((set, index) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<span key={index} className={index === 0 ? "" : "set"}>
								{set.myGames}
							</span>
						);
					})}
					{item.isFinish && item.matchWon && (
						<FontAwesomeIcon className="won" icon={faCircle} />
					)}
					<br />
					{item.sets.map((set, index) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<span key={index + 10} className={index === 0 ? "" : "set"}>
								{set.rivalGames}
							</span>
						);
					})}
					{item.isFinish && !item.matchWon && (
						<FontAwesomeIcon className="won" icon={faCircle} />
					)}
				</td>
				<td className="text-center">{item.mode}</td>
				<td className="text-center">
					<Button variant="primary" onClick={() => goToStats(item.matchId)}>
						<FontAwesomeIcon icon={faPoll} />
						Ver stats
					</Button>
				</td>
			</tr>
		);
	});

	return (
		<div className="games-container">
			<div>
				<h1>
					<FontAwesomeIcon icon={faTableTennis} />
					Partidos
				</h1>
				{games && games.length > 0 && (
					<h6>
						<FontAwesomeIcon icon={faMapMarkerAlt} />
						{games[0].address}
					</h6>
				)}
			</div>

			<Card>
				<Table responsive="sm">
					<thead>
						<tr>
							<th className="text-center players">Jugadores</th>
							<th>Sets</th>
							<th className="text-center">Tipo</th>
							<th className="text-center">Estadísticas</th>
						</tr>
					</thead>

					<tbody>
						{games && gamesTable}
						{loading && (
							<tr className="text-center mt-3">
								<td>
									<FontAwesomeIcon
										className="center mt-5"
										icon={faCircleNotch}
										spin
									/>
								</td>
							</tr>
						)}
						{games.length === 0 && !loading && (
							<tr className="text-center mt-3">
								<td>No hay resultados</td>
							</tr>
						)}
					</tbody>
				</Table>
			</Card>
		</div>
	);
};

export default Games;
