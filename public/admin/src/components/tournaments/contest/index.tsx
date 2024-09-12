import { useState } from "react";
import { useLocation } from "react-router";
import { ContestBrackets } from "./brackets";
import { Inscribed } from "./inscribed";
import { formatContestTitle } from "./utils";
import { Button, ButtonGroup } from "react-bootstrap";

export const ContestDetail = () => {
	const { state } = useLocation();

	const [showInscribed, setShowInscribed] = useState(true);

	const render = () => {
		if (showInscribed) {
			return <Inscribed />;
		}
		return <ContestBrackets />;
	};

	return (
		<div>
			<h1 className="text-center">
				{state.tournament.name} {state.contest?.mode}{" "}
				{formatContestTitle(state.contest)}
			</h1>
			<div className="d-flex justify-content-center">
				<ButtonGroup>
					<Button
						variant={showInscribed ? "primary" : "secondary"}
						onMouseDown={() => setShowInscribed(true)}
					>
						Participantes
					</Button>
					<Button
						variant={!showInscribed ? "primary" : "secondary"}
						onMouseDown={() => setShowInscribed(false)}
					>
						Brackets
					</Button>
				</ButtonGroup>
			</div>
			{render()}
		</div>
	);
};
