import { Button, ButtonGroup } from "react-bootstrap";

export enum TableOptions {
	standard = 0,
	j1vsj3 = 1,
	j2vsj4 = 2,
}

export function TablesButtons(
	mode: string,
	showTable: number,
	setShowTable: (n: number) => void,
) {
	if (mode === "single") {
		return (
			<ButtonGroup>
				<Button variant="primary">Jugador vs Jugador</Button>
			</ButtonGroup>
		);
	}

	return (
		<ButtonGroup>
			<Button
				variant={showTable == TableOptions.standard ? "primary" : "secondary"}
				onClick={() => setShowTable(TableOptions.standard)}
			>
				Pareja vs Pareja
			</Button>
			<Button
				variant={showTable == TableOptions.j1vsj3 ? "primary" : "secondary"}
				onClick={() => setShowTable(TableOptions.j1vsj3)}
			>
				J1 vs J2
			</Button>
			<Button
				variant={showTable == TableOptions.j2vsj4 ? "primary" : "secondary"}
				onClick={() => setShowTable(TableOptions.j2vsj4)}
			>
				J3 vs J4
			</Button>
		</ButtonGroup>
	);
}
