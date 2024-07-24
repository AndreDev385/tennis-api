import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import type { InscribedTeam } from "../../../types/inscribed";
import { formatContestTitle } from "../contest/utils";
import type { Contest } from "../../../types/contest";

type Props = {
	contest: Contest;
};

export const AddTeams: React.FC<Props> = (props) => {
	const [teams, _setTeams] = useState<InscribedTeam[]>([]);

	return (
		<>
			<div>
				<div className="d-flex justify-content-between mx-4">
					<h1>Inscribir participantes {formatContestTitle(props.contest)}</h1>
					<div className="d-flex align-items-center">
						<Button>Agregar +</Button>
						<div className="mx-2" />
						<Button>Cargar lista +</Button>
					</div>
				</div>
				<Table responsive="sm">
					<thead>
						<tr>
							<th className="text-center">Posición</th>
							<th className="text-center">Nombre</th>
							<th className="text-center">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{teams.map((t) => (
							<tr key={t.position}>
								<td className="text-center">{t.position}</td>
								<td className="text-center">{t.contestTeam.name}</td>
								<td className="text-center">
									<Dropdown>
										<Dropdown.Toggle
											color="blue"
											as={Button}
											id="dropdown-basic"
											variant="link"
										>
											<FontAwesomeIcon
												color="black"
												className="ellipsis"
												icon={faEllipsisVertical}
											/>
										</Dropdown.Toggle>
										<Dropdown.Menu />
									</Dropdown>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</>
	);
};
