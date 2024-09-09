import { Table } from "react-bootstrap";

type Stat = {
	name: string;
	firstValue: string;
	secondValue: string;
	percentage1?: number;
	percentage2?: number;
};

export type Section = {
	title?: string;
	stats: Stat[];
};

export function StatsTable({ sections }: { sections: Section[] }) {
	function mapPercentageToColor(v?: number) {
		if (!v) {
			return;
		}
		if (v > 85) return "#00c853"; //green
		if (v < 15) return "#d50000"; // red
	}

	return sections.map((s) => (
		<div key={s.title}>
			<div
				style={{ backgroundColor: "#011755", color: "#fff", padding: ".25rem" }}
				className="title"
			>
				<h5 className="text-center m-0">{s.title}</h5>
			</div>
			<Table responsive="sm">
				<tbody className="w-full">
					{s.stats.map((stats) => (
						<tr key={stats.name}>
							<td
								style={{ color: mapPercentageToColor(stats.percentage1) }}
								className="text-center"
							>
								{stats.firstValue}
							</td>
							<td className="text-center">{stats.name}</td>
							<td
								style={{ color: mapPercentageToColor(stats.percentage2) }}
								className="text-center"
							>
								{stats.secondValue}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	));
}
