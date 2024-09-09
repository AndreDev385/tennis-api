import { useContext } from "react";
import { Form, Table } from "react-bootstrap";
import { UpdateTournamentMatchContext } from "../../../shared/context/updateTournamentMatch";
import type { ParticipantStats } from "../../../types/participantStats";
import type { TournamentMatchTracker } from "../../../types/tournamentTracker";

type InputRow = {
	name: string;
	property: string;
	p1Value: number;
	p2Value: number;
	p3Value?: number;
	p4Value?: number;
};

export type InputSection = {
	title?: string;
	row: InputRow[];
};

type Data = { sections: InputSection[]; double: boolean; idx: number };

type StatName = keyof ParticipantStats;

export function StatsInputs({ sections, double, idx }: Data) {
	const { match, setMatch } = useContext(UpdateTournamentMatchContext)!;

	function getStat(
		player: keyof TournamentMatchTracker,
		statName: keyof ParticipantStats,
		idx: number,
	): string {
		if (idx === match?.sets.length) {
			const playerObj = match.tracker[player] as ParticipantStats;
			const result = `${playerObj[statName]}`;
			return result;
		}
		const playerObj = match?.sets[idx].stats![player] as ParticipantStats;
		const result = `${playerObj[statName]}`;
		return result;
	}

	function updateStat(name: string, value: string, idx: number) {
		const [player, stat] = name.split("-");

		const TOTAL_IDX = idx === match?.sets.length;

		if (TOTAL_IDX) {
			let playerStats = match.tracker[
				player as keyof TournamentMatchTracker
			] as ParticipantStats;

			playerStats = {
				...playerStats,
				[stat]: Number(value),
			};

			setMatch((prev) => ({
				...prev!,
				tracker: {
					...match.tracker,
					[player]: playerStats,
				},
			}));
			return;
		}

		const stats = match!.sets[idx].stats!;

		let playerStats = stats[
			player as keyof TournamentMatchTracker
		] as ParticipantStats;

		playerStats = {
			...playerStats,
			[stat]: Number(value),
		};

		setMatch((prev) => ({
			...prev!,
			sets: prev!.sets.map((s, i) => {
				if (i != idx) return s;
				return { ...s, stats: { ...stats, [player]: { ...playerStats } } };
			}),
		}));
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
					{s.row.map((stats) => (
						<tr key={stats.name}>
							<td className="d-flex gap-2">
								<Form.Control
									style={{ width: "5rem" }}
									name={`player1-${stats.property}`}
									type="number"
									value={getStat("player1", stats.property as StatName, idx)}
									onChange={(e) =>
										updateStat(e.target.name, e.target.value, idx)
									}
								/>
								{double && (
									<Form.Control
										style={{ width: "5rem" }}
										name={`player3-${stats.property}`}
										type="number"
										value={getStat("player3", stats.property as StatName, idx)}
										onChange={(e) =>
											updateStat(e.target.name, e.target.value, idx)
										}
									/>
								)}
							</td>
							<td className="text-center">{stats.name}</td>
							<td className="d-flex gap-2 justify-content-end">
								<Form.Control
									style={{ width: "5rem" }}
									name={`player2-${stats.property}`}
									type="number"
									value={getStat("player2", stats.property as StatName, idx)}
									onChange={(e) =>
										updateStat(e.target.name, e.target.value, idx)
									}
								/>
								{double && (
									<Form.Control
										style={{ width: "5rem" }}
										name={`player4-${stats.property}`}
										type="number"
										value={getStat("player4", stats.property as StatName, idx)}
										onChange={(e) =>
											updateStat(e.target.name, e.target.value, idx)
										}
									/>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	));
}
