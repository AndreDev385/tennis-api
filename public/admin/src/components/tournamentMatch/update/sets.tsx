import { useContext } from "react";
import { Form } from "react-bootstrap";
import { UpdateTournamentMatchContext } from "../../../shared/context/updateTournamentMatch";
import type { Set as GameSet } from "../../../types/set";

export function FormSets() {
	const { match, setMatch } = useContext(UpdateTournamentMatchContext)!;

	function changeSetValues(idx: number, name: string, value: string | boolean) {
		const sets = [...match!.sets];
		const valueFormated = typeof value === "string" ? Number(value) : value;

		sets[idx][name as keyof GameSet] = valueFormated as never;

		setMatch({
			...match!,
			sets,
		});
	}

	return match!.sets.map(function setRowForm(s, i) {
		const LAST_SET = i == match!.sets.length - 1;

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
						name="myGames"
						value={s.myGames}
						onChange={(e) => changeSetValues(i, e.target.name, e.target.value)}
					/>
					{s.tiebreak && (
						<div className="d-flex align-items-start">
							<Form.Control
								defaultValue={s.myTiebreakPoints}
								className="tiebreak"
								type="number"
								name="myTiebreakPoints"
								value={s.myTiebreakPoints}
								onChange={(e) =>
									changeSetValues(i, e.target.name, e.target.value)
								}
							/>
						</div>
					)}
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
							label="Tiebreak"
							name="tiebreak"
							checked={s.tiebreak}
							onChange={(e) =>
								changeSetValues(i, e.target.name, e.target.checked)
							}
						/>
						{LAST_SET && (
							<Form.Check
								defaultChecked={s.superTiebreak}
								type="switch"
								label="Super Tiebreak"
								name="superTiebreak"
								checked={s.superTiebreak}
								onChange={(e) =>
									changeSetValues(i, e.target.name, e.target.checked)
								}
							/>
						)}
					</div>
				</div>
				<div className="set-group">
					<Form.Control
						defaultValue={s.rivalGames}
						className="set"
						type="number"
						name="rivalGames"
						value={s.rivalGames}
						onChange={(e) => changeSetValues(i, e.target.name, e.target.value)}
					/>
					{s.tiebreak && (
						<div className="d-flex align-items-start">
							<Form.Control
								defaultValue={s.rivalTiebreakPoints}
								className="tiebreak"
								type="number"
								name="rivalTiebreakPoints"
								value={s.rivalTiebreakPoints}
								onChange={(e) =>
									changeSetValues(i, e.target.name, e.target.value)
								}
							/>
						</div>
					)}
				</div>
			</div>
		);
	});
}
