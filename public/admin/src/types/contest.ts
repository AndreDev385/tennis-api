import type { InscribedList } from "./inscribed";
import type { ICategory } from "./interfaces";

export type Contest = {
	contestId: string;
	tournamentId: string;
	mode: string;
	categoryType: 0 | 1 | 2;
	category: ICategory | null;
	summation: Summation | null;
	inscribed?: InscribedList[];
};

export type Summation = {
	value: number;
	letter: string;
};
