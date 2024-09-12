import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { IMatch, ISetStats } from "../../../types/interfaces";
import AdvancedTable from "./advancedTable/AdvancedTable";
import CoupleVsTable from "./coupleVsTable/CoupleVsTable";
import "./GameStats.scss";
import { VITE_SERVER_URL } from "../../../env/env.prod";

export interface IPropsTable {
	tracker: ISetStats;
	playerVsPlayer: boolean;
}

const GameStats = () => {
	const [stats, setStats] = useState<IMatch>();
	const [playerVsPlayer, setPlayerVsPlayer] = useState(false);
	const token: string = localStorage.getItem("authorization") || "";
	const { matchId } = useParams();
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};

	useEffect(() => {
		getStats();
	}, [matchId]);

	const getStats = async () => {
		const url = `${VITE_SERVER_URL}/api/v1/match/` + matchId;

		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();

			if (response.status === 200) {
				if (data && data.mode === "single") {
					setPlayerVsPlayer(true);
				}
				setStats(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="game-stats-container">
			<div>
				<h1>
					<FontAwesomeIcon icon={faPoll} />
					Detalle del partido
				</h1>
			</div>

			<ButtonGroup>
				{stats?.mode === "double" && (
					<Button
						active={!playerVsPlayer}
						variant="secondary"
						onClick={() => setPlayerVsPlayer(false)}
					>
						Pareja vs Pareja
					</Button>
				)}

				<Button
					active={playerVsPlayer}
					variant="secondary"
					onClick={() => setPlayerVsPlayer(true)}
				>
					Jugador vs Jugador
				</Button>
			</ButtonGroup>

			{stats && (
				<Card>
					<Table responsive="sm">
						<thead>
							<tr>
								<th className="text-center">Estadísticas</th>
								{playerVsPlayer ? (
									<th className="text-center">{stats?.player1.name}</th>
								) : (
									<th className="text-center">
										{stats?.player1.name}{" "}
										{stats?.mode === "double"
											? " / " + stats?.player3?.name
											: ""}
									</th>
								)}
								{playerVsPlayer ? (
									<th className="text-center">
										{stats?.mode === "double"
											? stats?.player3?.name
											: stats?.player2}
									</th>
								) : (
									<th className="text-center">
										{stats?.player2}{" "}
										{stats?.mode === "double" ? " / " + stats?.player4 : ""}
									</th>
								)}
							</tr>
						</thead>

						{stats?.mode === "double" && (
							<CoupleVsTable
								tracker={stats.tracker}
								playerVsPlayer={playerVsPlayer}
							/>
						)}

						{stats?.mode === "single" && (
							<AdvancedTable
								tracker={stats.tracker}
								playerVsPlayer={playerVsPlayer}
							/>
						)}
					</Table>
				</Card>
			)}
		</div>
	);
};

export default GameStats;
