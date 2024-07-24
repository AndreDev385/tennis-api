import "../index.scss";
import {
	faCircleNotch,
	faEllipsisVertical,
	faMedal,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Table } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { Contest } from "../../../types/contest";
import { formatContestTitle } from "../contest/utils";
import { listContest } from "../../../services/contest/listContest";
import { deleteContest } from "../../../services/contest/deleteContest";
import { toast } from "react-toastify";
import ModalQuestion from "../../modalQuestion/ModalQuestion";

export const TournamentDetail = () => {
	const navigate = useNavigate();
	const { tournamentId } = useParams();
	const [state, setState] = useState({
		loading: true,
		error: "",
	});
	const [query] = useSearchParams();
	const [tournament, setTournament] = useState({
		name: "",
	});

	const [contest, setContest] = useState<Contest[]>([]);
	const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
	const [deleteModal, setDeleteModal] = useState({
		isVisible: false,
	});
	const token: string = localStorage.getItem("authorization") || "";

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setState({ loading: true, error: "" });
		const tournamentName = query.get("name");

		if (!tournamentName || !tournamentId) {
			setState({ loading: false, error: "URL invalida" });
			return;
		}

		setTournament({ name: tournamentName });

		setState((prev) => ({ ...prev, loading: true }));
		const result = await listContest({ tournamentId });
		setState((prev) => ({ ...prev, loading: false }));

		if (result.isFailure) {
			setState((prev) => ({ ...prev, error: result.getErrorValue() }));
			return;
		}

		setState((prev) => ({ ...prev, error: "" }));
		setContest(result.getValue());
	};

	const handleDeleteContest = async () => {
		if (!selectedContest) {
			return;
		}

		setState((prev) => ({ ...prev, loading: true }));
		const result = await deleteContest(selectedContest.contestId, token);

		setSelectedContest(null);
		setState((prev) => ({ ...prev, loading: false }));

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		await getData();
		toast.success(result.getValue());
	};

	const table = contest.map((c) => (
		<tr key={c.contestId}>
			<td className="text-center">{c.mode}</td>
			<td className="text-center">{formatContestTitle(c)}</td>
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
								navigate(`/dashboard/tournaments/contest/${c.contestId}`, {
									state: {
										tournament: tournament,
										contest: c,
									},
								})
							}
						>
							Ver
						</Dropdown.Item>
						<Dropdown.Item
							onMouseDown={() => {
								setSelectedContest(c);
								setDeleteModal({ isVisible: true });
							}}
						>
							Eliminar
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</td>
		</tr>
	));

	function render() {
		if (state.loading) {
			return (
				<FontAwesomeIcon className="center mt-5" icon={faCircleNotch} spin />
			);
		}
		if (state.error.length > 0) {
			return (
				<div className="d-flex align-items-center">
					<h2 className="text-danger text-center">Ha ocurrido un error</h2>
				</div>
			);
		}
		return (
			<Table responsive="sm">
				<thead>
					<tr>
						<th className="text-center">Tipo de juego</th>
						<th className="text-center">Modalidad</th>
						<th className="text-center">Acciones</th>
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</Table>
		);
	}

	return (
		<>
			{deleteModal.isVisible && (
				<ModalQuestion
					title="Eliminar Competencia"
					question="¿Estás seguro que deseas eliminarla? Esta acción no se puede deshacer."
					dismiss={() => setDeleteModal({ isVisible: false })}
					accept={handleDeleteContest}
				/>
			)}
			<div className="content-container">
				<div className="title-wrap">
					<h1>
						<FontAwesomeIcon icon={faMedal} />
						{tournament.name}
					</h1>
					<Button
						variant="primary"
						onMouseDown={() =>
							navigate(
								`/dashboard/tournaments/contest/create?tournamentId=${tournamentId}`,
								{ state: { tournamentName: tournament.name } },
							)
						}
					>
						<FontAwesomeIcon icon={faPlus} />
						Crear competencia
					</Button>
				</div>
				<Card>{render()}</Card>
			</div>
		</>
	);
};
