export const fileSizeInKB = (size: number) => {
	const kbSize = Math.round(size / 1024);

	return `${kbSize} KB`;
};
