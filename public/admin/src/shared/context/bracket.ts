import { createContext } from "react";
import type { BracketPairData } from "../../components/tournaments/contest/brackets/bracketPair";

type BracketContextValues = {
	bracketPairs: BracketPairData[];
	setBracketPairs: React.Dispatch<React.SetStateAction<BracketPairData[]>>;
	deep: number | null;
	setDeep: React.Dispatch<React.SetStateAction<number | null>>;
};

export const BracketContext = createContext<BracketContextValues | null>(null);
