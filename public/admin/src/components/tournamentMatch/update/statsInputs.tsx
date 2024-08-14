import { nanoid } from "nanoid";
import { Form, Table } from "react-bootstrap";

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

type Data = { sections: InputSection[]; double: boolean };

export function StatsInputs({ sections, double }: Data) {
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
							{/* TODO class colors */}
							<td className="text-center">
								<Form.Control
									key={nanoid()}
									name={`p1-${stats.property}`}
									defaultValue={stats.p1Value}
								/>
								{double && (
									<Form.Control
										key={nanoid()}
										name={`p3-${stats.property}`}
										defaultValue={stats.p3Value}
									/>
								)}
							</td>
							<td className="text-center">{stats.name}</td>
							<td className="text-center">
								<Form.Control
									key={nanoid()}
									name={`p2-${stats.property}`}
									defaultValue={stats.p2Value}
								/>
								{double && (
									<Form.Control
										key={nanoid()}
										name={`p2-${stats.property}`}
										defaultValue={stats.p4Value}
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
