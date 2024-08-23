import "./brackets.scss";
import type { Bracket } from "../../../../types/bracket";
import { BracketCard } from "./bracketCard";

export type BracketPairData = {
	first: Bracket;
	second: Bracket | null;
};

type Props = {
	pair: BracketPairData;
};

export const BracketPair: React.FC<Props> = ({ pair }) => {
	return (
		<div className="match_pair mb-5">
			<BracketCard bracket={pair.first} />
			{pair.second && (
				<>
					<BracketCard bracket={pair.second} />
					<div className="match_pair_connection" />
				</>
			)}
		</div>
	);
};
