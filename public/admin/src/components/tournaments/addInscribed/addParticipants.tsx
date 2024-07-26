import {
	faCircleNotch,
	faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
	type AddParticipantData,
	addContestParticipants,
} from "../../../services/contest/addContestParticipants";
import { formatContestTitle } from "../contest/utils";
import { AddParticipantModal } from "./addParticipantModal";
import { UploadParticipantsModal } from "./uploadParticipantsModal";

export const AddParticipants: React.FC = () => {
	const {
		state: { tournament, contest },
	} = useLocation();
	const navigate = useNavigate();

	const [state, setState] = useState({ loading: false });
	const [participants, setParticipants] = useState<AddParticipantData[]>([]);

	const [participantModal, setParticipantModal] = useState({
		visible: false,
	});
	const [uploadParticipantsModal, setUploadParticipantsModal] = useState({
		visible: false,
	});

	const token: string = localStorage.getItem("authorization") || "";

	const addParticipant = (data: AddParticipantData) => {
		setParticipants((prev) => [...prev, data]);
	};

	const addParticipants = (data: AddParticipantData[]) => {
		setParticipants((prev) => [...prev, ...data]);
	};

	const removeParticipant = (ci: string) => {
		setParticipants(participants.filter((p) => p.ci !== ci));
	};

	const handleAddParticipants = async () => {
		setState({ loading: true });
		const result = await addContestParticipants(
			{
				contestId: contest.contestId,
				participants,
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
				{participantModal.visible && (
					<AddParticipantModal
						addParticipant={addParticipant}
						close={() => setParticipantModal({ visible: false })}
					/>
				)}
				{uploadParticipantsModal.visible && (
					<UploadParticipantsModal
						onClose={() => setUploadParticipantsModal({ visible: false })}
						addParticipants={addParticipants}
					/>
				)}
				<div className="d-flex justify-content-between mx-4">
					<h1>Inscribir participantes {formatContestTitle(contest)}</h1>
					<div className="d-flex align-items-center">
						<Button onClick={() => setParticipantModal({ visible: true })}>
							Agregar +
						</Button>
						<div className="mx-2" />
						<Button
							onMouseDown={() => setUploadParticipantsModal({ visible: true })}
						>
							Cargar lista +
						</Button>
					</div>
				</div>
				<Table style={{ minHeight: "10rem" }} responsive="sm">
					<thead>
						<tr>
							<th className="text-center">Posición</th>
							<th className="text-center">Nombre</th>
							<th className="text-center">Apellido</th>
							<th className="text-center">CI</th>
							<th className="text-center">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{participants.map((p) => (
							<tr key={p.position}>
								<td className="text-center">{p.position}</td>
								<td className="text-center">{p.firstName}</td>
								<td className="text-center">{p.lastName}</td>
								<td className="text-center">{p.ci}</td>
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
											<Dropdown.Item
												onMouseDown={() => removeParticipant(p.ci)}
											>
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
						disabled={state.loading || participants.length === 0}
						onMouseDown={() => handleAddParticipants()}
					>
						Aceptar {state.loading && <FontAwesomeIcon icon={faCircleNotch} />}
					</Button>
				</div>
			</div>
		</>
	);
};
