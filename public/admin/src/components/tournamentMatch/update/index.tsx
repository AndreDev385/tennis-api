import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import { Card, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { getTournamentMatch } from "../../../services/tournamentMatch/getMatch";
import { ErrorMessage } from "../../shared/errorMessage";
import { Loading } from "../../shared/loading";
import { buildDisplayName } from "../detail/score";

export function UpdateTournamentMatch() {
	const { matchId } = useParams();

	const result = useQuery({
		queryKey: ["updateMatch", matchId],
		queryFn: () => getTournamentMatch({ matchId }),
	});

	if (result.isLoading) return Loading();
	if (result.error || result.data?.isFailure) {
		return ErrorMessage(result.data?.getErrorValue() ?? "Ha ocurrido un error");
	}

	const match = result.data?.getValue();
	return (
		<Card>
			<form>
				<div className="d-flex">
					<div>{buildDisplayName(false, match!)}</div>
					<div className="text-center">Nombres</div>
					<div>{buildDisplayName(true, match!)}</div>
				</div>
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
								/>
								<div className="d-flex align-items-start">
									<Form.Control
										defaultValue={s.myTiebreakPoints}
										className="tiebreak"
										type="number"
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
										label="tiebreak"
									/>
									<Form.Check
										defaultChecked={s.superTiebreak}
										type="switch"
										label="super tiebreak"
									/>
								</div>
							</div>
							<div className="set-group">
								<Form.Control
									defaultValue={s.rivalGames}
									className="set"
									type="number"
								/>
								<div className="d-flex align-items-start">
									<Form.Control
										defaultValue={s.rivalTiebreakPoints}
										className="tiebreak"
										type="number"
									/>
								</div>
							</div>
						</div>
					);
				})}
			</form>
		</Card>
	);
}
