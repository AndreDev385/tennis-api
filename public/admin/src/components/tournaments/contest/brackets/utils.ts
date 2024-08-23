import type { Bracket } from "../../../../types/bracket";
import type { BracketPairData } from "./bracketPair";

export function buildBracketPairs(brackets: Bracket[]): BracketPairData[] {
	const pairs: BracketPairData[] = [];

	for (let i = 0; i < brackets.length; i++) {
		if (i % 2 === 0) {
			pairs.push({
				first: brackets[i],
				second: i + 1 > brackets.length ? null : brackets[i + 1],
			});
		}
	}

	return pairs;
}

export function getDeep(list: Bracket[]) {
	if (list.length < 1) {
		return 0;
	}

	list.sort((a, b) => {
		return b.deep - a.deep;
	});

	return list[0].deep;
}
