import "./brackets.scss";
import type { Bracket } from "../../../../types/bracket";
import type { Set as GameSet } from "../../../../types/set";
import { useState } from "react";
import { buildNameForDisplay } from "./formatNames";
import { UpdateBracketModal } from "./updateBracket";
import { Modal } from "../../../modalQuestion/Modal";

type Props = {
	bracket: Bracket;
};

export const BracketCard: React.FC<Props> = ({ bracket }) => {
	const { match } = bracket;

	const [updateModal, setUpdateModal] = useState({
		visible: false,
	});

	function hideModal() {
		setUpdateModal({ visible: false });
	}

	return (
		<div
			onMouseDown={() => setUpdateModal({ visible: true })}
			className="bracket__card d-flex flex-column"
		>
			{updateModal.visible && (
				<Modal>
					<UpdateBracketModal bracket={bracket} dismiss={hideModal} />
				</Modal>
			)}
			<ScoreRow
				isTop
				hasWon={match?.matchWon === true}
				sets={match?.sets}
				showRival={false}
				name={buildNameForDisplay(bracket.rightPlace)}
			/>
			<div className="divider" />
			<ScoreRow
				isTop={false}
				hasWon={match?.matchWon === false}
				sets={match?.sets}
				showRival
				name={buildNameForDisplay(bracket.leftPlace)}
			/>
		</div>
	);
};

type RowProps = {
	isTop: boolean;
	hasWon?: boolean | null;
	sets?: GameSet[];
	showRival: boolean;
	name: string;
};

export const ScoreRow: React.FC<RowProps> = ({
	isTop,
	hasWon,
	sets,
	showRival,
	name,
}) => {
	return (
		<div
			className={`${isTop ? "bracket__top_field" : "bracket__bottom_field"} d-flex justify-content-between px-5`}
			style={{ backgroundColor: hasWon ? "#d9ede6" : "#fff" }}
		>
			<div>{name}</div>
			<div className="d-flex" style={{ gap: "1rem" }}>
				{sets?.map((s, idx) => {
					let setWon: boolean;
					let tieBreakPoints: number;

					if (showRival) {
						setWon = s.setWon === false;
						tieBreakPoints = s.rivalTiebreakPoints;
					} else {
						setWon = s.setWon === true;
						tieBreakPoints = s.myTiebreakPoints;
					}

					if (s.myGames === 0 && s.rivalGames === 0) {
						return <span />;
					}

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={idx} className="d-flex">
							<span
								style={{ fontSize: "18px", color: setWon ? "#00E19B" : "" }}
							>
								{showRival ? s.rivalGames : s.myGames}
							</span>
							{s.tiebreak && (
								<div className="d-flex align-items-start">
									<span
										style={{ color: setWon ? "#00E19B" : "" }}
										className="tiebreak_points"
									>
										{tieBreakPoints}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
