import {
	faCircleNotch,
	faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { removeInscribed } from "../../../services/contest/removeInscribed";
import type { Contest } from "../../../types/contest";
import type {
	InscribedCouple,
	InscribedParticipant,
	InscribedTeam,
} from "../../../types/inscribed";
import { GameModesValues } from "../../../utils/tennisConfigs";
import { getContest } from "../../../services/contest/getContest";
import ModalQuestion from "../../modalQuestion/ModalQuestion";

export const Inscribed: React.FC = () => {
	const token: string = localStorage.getItem("authorization") || "";
	const navigate = useNavigate();
	const { state } = useLocation();

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});

	const [contest, setContest] = useState<Contest | null>(null);

	const [deleteInscribedModal, setDeleteInscribedModal] = useState({
		visible: false,
	});

	const [selectedInscribed, setSelectedInscribed] = useState<
		InscribedParticipant | InscribedCouple | InscribedTeam | null
	>(null);

	const handleDeleteInscribed = async () => {
		if (selectedInscribed == null) {
			toast.error("Error al selecionar al participante");
			return;
		}

		setStatus({
			loading: true,
			error: "",
		});

		console.log(selectedInscribed);

		const result = await removeInscribed(
			state.contest.contestId,
			selectedInscribed,
			token,
		);

		setStatus({
			loading: false,
			error: "",
		});

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());
		await handleGetContest();
	};

	const handleGetContest = async () => {
		setStatus({ loading: true, error: "" });

		const result = await getContest(state.contest.contestId);

		setStatus((prev) => ({ ...prev, loading: false }));
		if (result.isFailure) {
			setStatus((prev) => ({ ...prev, error: result.getErrorValue() }));
			return;
		}

		setContest(result.getValue());
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleGetContest();
	}, []);

	const couplesTable = () => {
		return (
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
					{contest?.inscribed?.map((c) => (
						<tr key={c.position}>
							<td className="text-center">{c.position}</td>
							<td className="text-center">
								{(c as InscribedCouple).couple.p1.user.firstName}{" "}
								{(c as InscribedCouple).couple.p1.user.lastName}{" "}
								{(c as InscribedCouple).couple.p1.user.ci}
							</td>
							<td className="text-center">
								{(c as InscribedCouple).couple.p2.user.firstName}{" "}
								{(c as InscribedCouple).couple.p2.user.lastName}{" "}
								{(c as InscribedCouple).couple.p2.user.ci}
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
											onMouseDown={() => {
												setSelectedInscribed(c);
												setDeleteInscribedModal({ visible: true });
											}}
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
		);
	};

	const participantsTable = () => {
		return (
			<Table responsive="sm">
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
					{contest?.inscribed.map((p) => (
						<tr key={p.position}>
							<td className="text-center">{p.position}</td>
							<td className="text-center">
								{(p as InscribedParticipant).participant.user.firstName}
							</td>
							<td className="text-center">
								{(p as InscribedParticipant).participant.user.lastName}
							</td>
							<td className="text-center">
								{(p as InscribedParticipant).participant.user.ci}
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
											onMouseDown={() => {
												setSelectedInscribed(p);
												setDeleteInscribedModal({ visible: true });
											}}
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
		);
	};

	const teamsTable = () => {
		return (
			<Table responsive="sm">
				<thead>
					<tr>
						<th className="text-center">Posición</th>
						<th className="text-center">Nombre</th>
						<th className="text-center">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{contest?.inscribed.map((t) => (
						<tr key={t.position}>
							<td className="text-center">{t.position}</td>
							<td className="text-center">
								{(t as InscribedTeam).contestTeam.name}
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
											onMouseDown={() => {
												setSelectedInscribed(t);
												setDeleteInscribedModal({ visible: true });
											}}
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
		);
	};

	const render = () => {
		if (status.loading) {
			return <FontAwesomeIcon icon={faCircleNotch} />;
		}
		if (status.error) {
			return (
				<div className="d-flex justify-content-center align-items-center">
					<h2 className="text-danger">Ha ocurrido un error</h2>
				</div>
			);
		}
		if (contest?.mode === GameModesValues.Team) {
			return teamsTable();
		}
		if (contest?.mode === GameModesValues.Double) {
			return couplesTable();
		}
		return participantsTable();
	};

	return (
		<div className="mt-4">
			{deleteInscribedModal.visible && (
				<ModalQuestion
					title="Eliminar"
					question="¿Estás seguro que deseas eliminar a este participante? Esta acción no se puede deshacer."
					accept={() => handleDeleteInscribed()}
					dismiss={() =>
						setDeleteInscribedModal({
							visible: false,
						})
					}
				/>
			)}

			<Card>
				<div className="row">
					<div className="col" />
					<div className="col">
						<h2 className="text-center">Inscritos</h2>
					</div>
					<div className="col d-flex align-items-center justify-content-end">
						<Button
							onMouseDown={() =>
								contest != null &&
								navigate(
									`/dashboard/tournaments/contest/inscribe/${contest?.contestId}`,
									{
										state,
									},
								)
							}
						>
							Agregar participantes
						</Button>
					</div>
				</div>
				{render()}
			</Card>
		</div>
	);
};
