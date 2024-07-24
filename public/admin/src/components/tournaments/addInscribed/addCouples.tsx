import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import type { InscribedCouple } from "../../../types/inscribed";
import { formatContestTitle } from "../contest/utils";

export const AddCouples = () => {
	const {
		state: { contest },
	} = useLocation();

	const [couples, setCouples] = useState<InscribedCouple[]>([]);

	return (
		<div>
			<div className="d-flex justify-content-between mx-4">
				<h1>Inscribir participantes {formatContestTitle(contest)}</h1>
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
						<th className="text-center">J1</th>
						<th className="text-center">J2</th>
						<th className="text-center">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{couples.map((c) => (
						<tr key={c.position}>
							<td className="text-center">{c.position}</td>
							<td className="text-center">
								{c.couple.p1.user.firstName} {c.couple.p1.user.lastName}
							</td>
							<td className="text-center">
								{c.couple.p2.user.firstName} {c.couple.p2.user.lastName}
							</td>
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
	);
};
