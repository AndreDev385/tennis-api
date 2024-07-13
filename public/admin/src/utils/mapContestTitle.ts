import type { Contest } from "../types/contest";

export function formatContestTitle(c: Contest): string {
	const values = {
		0: `Suma ${c.summation?.value}${c.summation?.letter}`,
		1: `${c.category?.name}`,
		2: "Open",
	};

	return values[c.categoryType];
}
