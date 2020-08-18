import { DbRow, Database } from "./use-database";

export interface FilterGroup {
	str: string;
	description?: string;
}

export const filterDbRows = (database: Database, filter: string): FilterGroup[] => {
	const filttered: FilterGroup[] = [];

	let start = 0;
	let len = filter.length;

	while (len > 0) {
		const sub = filter.substr(start, len);

		const row = database.rowsByStr.get(sub);

		if (!row) {
			len--;

			if (len <= 0) {
				filttered.push({
					str: sub
				})
				start++;
				len = filter.length - start;
			}
			continue;
		}

		start += len;
		len = filter.length - start;

		filttered.push({
			str: sub,
			description: row.description
		});
	}


	return filttered;
}
