import React, { useState } from "react";
import "./App.css";
import { useDatabase } from "./use-database";
import { filterDbRows, FilterGroup } from "./filter-db";

function App() {
	const database = useDatabase();
	const [filter, setFilter] = useState<string>();
	const [hovered, setHovered] = useState<FilterGroup>();

	const filttered = filter ? filterDbRows(database, filter) : [];

	return (
		<div className="App">
			<input
				type="text"
				value={filter}
				style={{ width: "100%" }}
				onChange={(e) => setFilter(e.target.value)}
			/>
			<div
				style={{
					fontSize: "25px",
				}}
			>
				{filttered.map((p) => (
					<span
						style={{
							cursor: "pointer",
						}}
						className="match-group"
						onMouseOver={() => {
							setHovered(p);
						}}
					>
						{p.str}
					</span>
				))}
			</div>
			<div>{hovered?.description}</div>
		</div>
	);
}

export default App;
