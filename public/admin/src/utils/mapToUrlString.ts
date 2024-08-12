function mapToUrlString(object: Record<string, any>) {
	let url = "";

	let firstEntry = true;

	for (const [key, value] of Object.entries(object)) {
		if (!value) continue;
		if (firstEntry) {
			url += `${key}=${value}`;
			firstEntry = false;
		} else {
			url += `&${key}=${value}`;
		}
	}

	return url;
}

export { mapToUrlString };
