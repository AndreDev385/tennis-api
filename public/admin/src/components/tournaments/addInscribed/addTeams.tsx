import {
	faCircleNotch,
	faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { addContestTeams } from "../../../services/contest/addContestTeams";
import { formatContestTitle } from "../contest/utils";
import { AddTeamModal } from "./addTeamModal";
import { UploadTeamsModal } from "./uploadTeamsModal";

export const AddTeams: React.FC = () => {
	const {
		state: { tournament, contest },
	} = useLocation();
	const navigate = useNavigate();

	const [state, setState] = useState({ loading: false });
	const [teams, setTeams] = useState<
		{ name: string; position: number | null }[]
	>([]);
	const [addTeamModal, setAddTeamModal] = useState({
		visible: false,
	});

	const [uploadTeamsModal, setUploadTeamsModal] = useState({
		visible: false,
	});
	const token: string = localStorage.getItem("authorization") || "";

	const addTeam = (data: { name: string; position: number | null }) => {
		setTeams((prev) => [...prev, data]);
	};

	const removeTeam = (name: string) => {
		setTeams(teams.filter((t) => t.name !== name));
	};

	const addTeams = (data: { name: string; position: number | null }[]) => {
		setTeams((prev) => [...prev, ...data]);
	};

	const handleAddTeams = async () => {
		setState({ loading: true });
		// service
		const result = await addContestTeams(
			{
				contestId: contest.contestId,
				teams,
			},
			token,
		);

		setState({ loading: false });
		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());
		navigate(`/dashboard/tournaments/contest/${contest.contestId}`, {
			state: {
				tournament: tournament,
				contest: contest,
			},
		});
	};

	return (
		<>
			<div>
				{addTeamModal.visible && (
					<AddTeamModal
						addTeam={addTeam}
						close={() => setAddTeamModal({ visible: false })}
					/>
				)}
				{uploadTeamsModal.visible && (
					<UploadTeamsModal
						addTeams={addTeams}
						onClose={() => setUploadTeamsModal({ visible: false })}
					/>
				)}
				<div className="d-flex justify-content-between mx-4">
					<h1>Inscribir equipos {formatContestTitle(contest)}</h1>
					<div className="d-flex align-items-center">
						<Button onClick={() => setAddTeamModal({ visible: true })}>
							Agregar +
						</Button>
						<div className="mx-2" />
						<Button onMouseDown={() => setUploadTeamsModal({ visible: true })}>
							Cargar lista +
						</Button>
					</div>
				</div>
				<Table style={{ minHeight: "10rem" }} responsive="sm">
					<thead>
						<tr>
							<th className="text-center">Posición</th>
							<th className="text-center">Nombre</th>
						</tr>
					</thead>
					<tbody>
						{teams.map((t) => (
							<tr key={t.position}>
								<td className="text-center">{t.position}</td>
								<td className="text-center">{t.name}</td>
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
										<Dropdown.Menu>
											<Dropdown.Item onMouseDown={() => removeTeam(t.name)}>
												Eliminar
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div className="d-grid mt-5 col-4 mx-auto">
					<Button
						disabled={state.loading || teams.length === 0}
						onMouseDown={() => handleAddTeams()}
					>
						Aceptar {state.loading && <FontAwesomeIcon icon={faCircleNotch} />}
					</Button>
				</div>
			</div>
		</>
	);
};
