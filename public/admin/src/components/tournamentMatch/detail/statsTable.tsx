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

export function StatsTable(sections: Section[]) {
	function mapPercentageToColor(v?: number) {
		if (!v) {
			return;
		}
		if (v > 85) return "#00c853"; //green
		if (v < 15) return "#d50000"; // red
	}

	return sections.map((s) => (
		<>
			<div key={s.title} className="title">
				<span>Servicio </span>
			</div>
			<tbody key={s.title}>
				{s.stats.map((stats) => (
					<tr key={stats.name}>
						{/* TODO class colors */}
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
		</>
	));
}
