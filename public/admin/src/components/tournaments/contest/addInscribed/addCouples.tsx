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
	type AddCoupleDto,
	addContestCouples,
} from "../../../../services/contest/addContestCouples";
import { AddCoupleModal } from "./addCoupleModal";
import { UploadCouplesModal } from "./uploadCouplesModal";
import { formatContestTitle } from "../utils";

export const AddCouples = () => {
	const {
		state: { contest, tournament },
	} = useLocation();

	const navigate = useNavigate();

	const [state, setState] = useState({ loading: false });
	const [couples, setCouples] = useState<AddCoupleDto[]>([]);
	const [addCoupleModal, setAddCoupleModal] = useState({
		visible: false,
	});

	const [uploadCouplesModal, setUploadCouplesModal] = useState({
		visible: false,
	});

	const token: string = localStorage.getItem("authorization") || "";

	const addCouple = (c: AddCoupleDto) => {
		setCouples((prev) => [...prev, c]);
	};

	const addCouples = (c: AddCoupleDto[]) => {
		setCouples((prev) => [...prev, ...c]);
	};

	const removeCouple = (p1CI: string, p2CI: string) => {
		setCouples(couples.filter((c) => c.p1.ci !== p1CI && c.p2.ci !== p2CI));
	};

	const handleAddCouples = async () => {
		setState({ loading: true });
		const result = await addContestCouples(
			{ contestId: contest.contestId, couples },
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
				tournament,
				contest,
			},
		});
	};

	return (
		<div>
			{addCoupleModal.visible && (
				<AddCoupleModal
					addCouple={addCouple}
					close={() => setAddCoupleModal({ visible: false })}
				/>
			)}
			{uploadCouplesModal.visible && (
				<UploadCouplesModal
					onClose={() => setUploadCouplesModal({ visible: false })}
					addCouples={addCouples}
				/>
			)}
			<div className="d-flex justify-content-between mx-4">
				<h1>Inscribir parejas {formatContestTitle(contest)}</h1>
				<div className="d-flex align-items-center">
					<Button onMouseDown={() => setAddCoupleModal({ visible: true })}>
						Agregar +
					</Button>
					<div className="mx-2" />
					<Button onMouseDown={() => setUploadCouplesModal({ visible: true })}>
						Cargar lista +
					</Button>
				</div>
			</div>
			<Table style={{ minHeight: "10rem" }} responsive="sm">
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
								{c.p1.firstName} {c.p1.lastName} {c.p1.ci}
							</td>
							<td className="text-center">
								{c.p2.firstName} {c.p2.lastName} {c.p2.ci}
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
									<Dropdown.Menu>
										<Dropdown.Item
											onMouseDown={() => removeCouple(c.p1.ci, c.p2.ci)}
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
					disabled={state.loading || couples.length === 0}
					onMouseDown={() => handleAddCouples()}
				>
					Aceptar {state.loading && <FontAwesomeIcon icon={faCircleNotch} />}
				</Button>
			</div>
		</div>
	);
};
