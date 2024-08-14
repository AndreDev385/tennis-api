export function buildSelectSetOptions(quantity: number): boolean[] {
	const options = [];

	for (let i = 0; i <= quantity; i++) {
		options[i] = false;
	}

	options[quantity] = true;

	return options;
}
