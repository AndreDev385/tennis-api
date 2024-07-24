export function buildPagination(count: number, limit: number) {
	const pages = Math.ceil(count / limit);

	return Array.from({ length: pages }, (_, i) => i + 1);
}
