export const GAME_MODES = ["single", "double", "team"];

export enum GameModesValues {
	Single = "single",
	Double = "double",
	Team = "team",
}

export const CATEGORY_TYPES = [0, 1, 2];

export enum CategoryTypesValues {
	Summation = 0,
	Category = 1,
	Open = 2,
}

export const LETTER_VALUES = ["M", "F", "MM", "FEM-MM", "DM"];

export function mapCategoryTypesToString(v: number): string {
	switch (v) {
		case 0:
			return "Sumatoria";
		case 1:
			return "Categoria";
		case 2:
			return "Open";
		default:
			throw new Error();
	}
}
