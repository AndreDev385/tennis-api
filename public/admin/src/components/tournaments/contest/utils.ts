import type { Contest } from "../../../types/contest";

export function formatContestTitle(c: Contest): string {
	let title: string;
	if (c.categoryType === 1) {
		title = `${c.category?.name}`;
	} else if (c.categoryType === 0) {
		title = `Suma ${c.summation?.value}${c.summation?.letter}`;
	} else {
		title = "Open";
	}

	return title;
}
