import { faEllipsisVertical, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, Dropdown, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { listContestTeams } from "../../services/contestTeam/listContestTeams";
import { paginateParticipants } from "../../services/participants/paginateParticipants";
import { Modal } from "../modalQuestion/Modal";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import { ErrorMessage } from "../shared/errorMessage";
import { Loading } from "../shared/loading";
import { AddParticipantToTeamModal } from "./addParticipantToTeamModal";
import type { Participant } from "../../types/participant";
import { removeParticipantFromTeam } from "../../services/contestTeam/removeParticipantFromTeam";
import { toast } from "react-toastify";

export function ContestTeamDetail() {
	const token: string = localStorage.getItem("authorization") || "";

	const { teamId } = useParams();

	const [addParticipantModal, setAddParticipantModal] = useState({
		visible: false,
	});
	const [removeParticipantModal, setRemoveParticipantModal] = useState({
		visible: false,
	});
	const [selectedParticipant, setSelectedParticipant] =
		useState<Participant | null>(null);

	async function handleRemoveParticipant() {
		const response = await removeParticipantFromTeam(
			{
				contestTeamId: teamId!,
				participantId: selectedParticipant!.participantId,
			},
			token,
		);

		if (response.isFailure) {
			toast.error(response.getErrorValue());
			return;
		}
		toast.success(response.getValue());
		await teams.refetch({});
		await participants.refetch({});
	}

	const teams = useQuery({
		queryKey: ["contestTeamDetail", teamId],
		queryFn: async () => listContestTeams({ contestTeamId: teamId }, token),
	});

	const team = teams.data?.getValue()[0];

	const participants = useQuery({
		queryKey: ["participants", team?.participantsIds ?? []],
		queryFn: async () =>
			paginateParticipants(
				{
					participantId: team?.participantsIds ?? [],
					offset: 0,
					limit: 9999,
				},
				token,
			),
		enabled: team ? team.participantsIds.length > 0 : false,
	});

	const participantsTable = participants.data
		?.getValue()
		.rows.filter((p) => team!.participantsIds.includes(p.participantId))
		.map((p) => (
			<tr key={p.participantId}>
				<td className="text-center">{p.user.firstName}</td>
				<td className="text-center">{p.user.lastName}</td>
				<td className="text-center">{p.user.ci}</td>
				<td className="text-center">
					<Dropdown>
						<Dropdown.Toggle
							as={Button}
							id="dropdown-basic"
							variant="link"
							color="blue"
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
									setSelectedParticipant(p);
									setRemoveParticipantModal({ visible: true });
								}}
							>
								Remover
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		));

	if (teams.isLoading) {
		return Loading();
	}

	if (teams.isError || teams.data?.isFailure) {
		return ErrorMessage(teams.data?.getErrorValue() ?? "Ha ocurrido un error");
	}

	if (participants.isLoading) {
		return Loading();
	}

	if (participants.isError || participants.data?.isFailure) {
		return ErrorMessage(
			participants.data?.getErrorValue() ?? "Ha ocurrido un error",
		);
	}

	return (
		<div>
			{addParticipantModal.visible && (
				<Modal>
					<AddParticipantToTeamModal
						contestTeamId={team!.contestTeamId}
						dismiss={async (value: boolean) => {
							if (value) {
								await teams.refetch({});
								await participants.refetch({});
							}
							setAddParticipantModal({ visible: false });
						}}
					/>
				</Modal>
			)}
			{removeParticipantModal.visible && (
				<ModalQuestion
					title="Remover participante"
					question={`Quieres remover al participante ${selectedParticipant?.user.firstName}  ${selectedParticipant?.user.lastName}`}
					dismiss={() => setRemoveParticipantModal({ visible: false })}
					accept={handleRemoveParticipant}
				/>
			)}
			<div className="d-flex justify-content-between">
				<h1>
					<FontAwesomeIcon icon={faUsers} />
					{team?.name}
				</h1>
				<div className="d-flex align-items-center mx-5">
					<Button onMouseDown={() => setAddParticipantModal({ visible: true })}>
						Agregar
					</Button>
				</div>
			</div>
			<div>
				<Card>
					<Table responsive="sm">
						<thead>
							<tr>
								<th className="text-center">Nombre</th>
								<th className="text-center">Apellido</th>
								<th className="text-center">CI</th>
								<th className="text-center">Acciones</th>
							</tr>
						</thead>
						{!participantsTable ? (
							<h2 className="text-center my-5">
								No hay participantes inscritos
							</h2>
						) : (
							<tbody>{participantsTable}</tbody>
						)}
					</Table>
				</Card>
			</div>
		</div>
	);
}
