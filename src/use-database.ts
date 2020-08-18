import { useState, useEffect } from "react";

const regex = /([\u4E00-\u9FCC]+)|(\[.*\])|(\/.*\/)/g;

export interface DbRow {
	traditional: string;
	simplified: string;
	pinyin: string[];
	description: string;
}

export interface Database {
	rowsByStr: Map<string, DbRow>
}

export const useDatabase = () => {
	const [database, setDatabase] = useState<Database>({
		rowsByStr: new Map()
	});
	useEffect(() => {
		fetch("./cedict_ts.u8")
			.then((r) => r.text())
			.then((r) => {
				const splittedRows = r.split("\n");
				const dataRows = splittedRows
					.map((p) => p.match(regex))
					.filter((p) => p != null && p.length === 4)
					.map((p: any) => {
						return {
							traditional: p[0],
							simplified: p[1],
							pinyin: p[2]
								.replace("[", "")
								.replace("]", "")
								.split(" "),
							description: p[3],
						};
					});

				const database: Database = {
					rowsByStr: new Map()
				}

				for (const row of dataRows) {
					database.rowsByStr.set(row.simplified, row);
				}

				setDatabase(database);
			});
	}, []);

	return database
}
