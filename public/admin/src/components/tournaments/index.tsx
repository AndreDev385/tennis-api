import "./index.scss";
import { useEffect, useState } from "react";

import {
	faCircleNotch,
	faEllipsisVertical,
	faPlus,
	faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Dropdown, Pagination, Table } from "react-bootstrap";

import type { Tournament } from "../../types/tournament";
import { paginateTournaments } from "../../services/tournaments/listTournaments";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router";
import { deleteTournament } from "../../services/tournaments/deleteTournament";
import { toast } from "react-toastify";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import { buildPagination } from "../../utils/buildPagination";

export function TournamentsPage() {
	const navigate = useNavigate();
	const [state, setState] = useState({
		loading: true,
		error: "",
		offset: 0,
		limit: 10,
		count: 0,
	});

	const [tournaments, setTournaments] = useState<Tournament[]>([]);
	const [selectedTournament, setSelectedTournament] =
		useState<Tournament | null>(null);
	const [deleteModal, setDeleteModal] = useState({
		isVisible: false,
	});
	const token: string = localStorage.getItem("authorization") || "";

	const handleListTournaments = async () => {
		setState((prev) => ({
			...prev,
			loading: true,
			error: "",
		}));

		const result = await paginateTournaments({
			offset: state.offset,
			limit: state.limit,
		});

		if (result.isFailure) {
			setState((prev) => ({
				...prev,
				loading: false,
				error: result.getErrorValue() as string,
			}));
			return;
		}

		const response = result.getValue();

		setState((prev) => ({
			...prev,
			loading: false,
			error: "",
			count: response.count,
		}));
		setTournaments(response.rows);
	};

	const handleDeleteTournament = async () => {
		if (selectedTournament == null) {
			return;
		}

		setState((prev) => ({ ...prev, loading: true }));

		const result = await deleteTournament(
			selectedTournament.tournamentId,
			token,
		);

		setSelectedTournament(null);
		setState((prev) => ({ ...prev, loading: false }));

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue);
		handleListTournaments();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleListTournaments();
	}, [state.offset]);

	const tournamentsTable = tournaments.map((t) => {
		return (
			<tr key={t.tournamentId}>
				<td>{t.name}</td>
				<td className="text-center">
					<img src={t.image} alt="ad" />
				</td>
				<td className="text-center">{formatDate(t.startDate)}</td>
				<td className="text-center">{formatDate(t.endDate)}</td>
				<td className="text-center">{t.address}</td>
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
								onMouseDown={() =>
									navigate(`${t.tournamentId}?name=${t.name}`, {
										state: { tournament: t },
									})
								}
							>
								Ver
							</Dropdown.Item>
							{/*<Dropdown.Item>Editar</Dropdown.Item>*/}
							<Dropdown.Item
								onMouseDown={() => {
									setSelectedTournament(t);
									setDeleteModal({ isVisible: true });
								}}
							>
								Eliminar
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		);
	});

	function render() {
		if (state.loading) {
			return (
				<FontAwesomeIcon className="center mt-5" icon={faCircleNotch} spin />
			);
		}
		if (state.error.length > 0) {
			return state.error;
		}
		return tournamentsTable;
	}

	return (
		<>
			{deleteModal.isVisible && (
				<ModalQuestion
					title="Eliminar Torneo"
					question="¿Estás seguro que deseas eliminarlo? Esta acción no se puede deshacer."
					dismiss={() => setDeleteModal({ isVisible: false })}
					accept={handleDeleteTournament}
				/>
			)}
			<div className="content-container">
				<div className="title-wrap">
					<h1>
						<FontAwesomeIcon icon={faTrophy} />
						Torneos
					</h1>

					<Button variant="primary" onMouseDown={() => navigate("create")}>
						<FontAwesomeIcon icon={faPlus} />
						Crear nuevo
					</Button>
				</div>
				<Card>
					<Table responsive="sm">
						<thead>
							<tr>
								<th>Nombre</th>
								<th className="text-center">Imagen</th>
								<th className="text-center">Fecha de inicio</th>
								<th className="text-center">Fecha de cierre</th>
								<th className="text-center">Direccion</th>
								<th className="text-center">Acciones</th>
							</tr>
						</thead>
						<tbody>{render()}</tbody>
					</Table>
					<Pagination>
						{buildPagination(state.count, state.limit).map((idx) => (
							<Pagination.Item
								key={idx}
								onMouseDown={() =>
									setState((prev) => ({ ...prev, offset: idx - 1 }))
								}
							>
								{idx}
							</Pagination.Item>
						))}
					</Pagination>
				</Card>
			</div>
		</>
	);
}
