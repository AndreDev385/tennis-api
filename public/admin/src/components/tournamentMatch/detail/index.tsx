// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTournamentMatch } from "../../../services/tournamentMatch/getMatch";
import type { TournamentMatch } from "../../../types/tournamentMatch";
import { formatParticipantName } from "../../../utils/formatParticipantName";
import { ErrorMessage } from "../../shared/errorMessage";
import { Loading } from "../../shared/loading";

export const TournamentMatchDetail: React.FC = () => {
	const { matchId } = useParams();

	const {
		state: { p1, p2, p3, p4 },
	} = useLocation();

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});
	const [match, setMatch] = useState<TournamentMatch>();

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
					<Button
						//active={playerVsPlayer}
						variant="secondary"
						//onClick={() => setPlayerVsPlayer(true)}
					>
						Jugador vs Jugador
					</Button>
				</ButtonGroup>
			);
		}

		return (
			<ButtonGroup>
				<Button
					//active={!playerVsPlayer}
					variant="secondary"
					//onClick={() => setPlayerVsPlayer(false)}
				>
					Pareja vs Pareja
				</Button>
				<Button
					//active={!playerVsPlayer}
					variant="secondary"
					//onClick={() => setPlayerVsPlayer(false)}
				>
					J1 vs J2
				</Button>
				<Button
					//active={!playerVsPlayer}
					variant="secondary"
					//onClick={() => setPlayerVsPlayer(false)}
				>
					J1 vs J2
				</Button>
			</ButtonGroup>
		);
	}

	return (
		<div>
			<div>
				<h1>
					<FontAwesomeIcon icon={faPoll} />
					Detalle del partido
				</h1>
			</div>
			<div className="d-flex justify-content-center">
				{renderStatsButtons()}
			</div>
			<Card></Card>
		</div>
	);
};
