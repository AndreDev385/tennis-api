export function mapToUrlString(object: Record<string, any>) {
	let url = "";

	let firstEntry = true;

	for (const [key, value] of Object.entries(object)) {
		if (value === undefined || value === null || value === "") continue;
		if (Array.isArray(value)) {
			url += addArray(key, value);
		} else {
			url += addValue(key, value);
		}
	}

	return url;

	function addValue<T>(key: string, v: T): string {
		let url = "";
		if (firstEntry) {
			url += `${key}=${v}`;
			firstEntry = false;
		} else {
			url += `&${key}=${v}`;
		}
		return url;
	}

	function addArray<T>(key: string, arr: Array<T>): string {
		let url = "";
		for (const v of arr) {
			if (v === undefined || v === null || v === "") continue;
			if (firstEntry) {
				url += `${key}=${v}`;
				firstEntry = false;
			} else {
				url += `&${key}=${v}`;
			}
		}
		return url;
	}
}
