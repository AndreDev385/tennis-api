import "./brackets.scss";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { deleteBrackets } from "../../../../services/contest/deleteBrackets";
import { listDraw } from "../../../../services/contest/listBrackets";
import { BracketPair } from "./bracketPair";
import { createBrackets } from "../../../../services/contest/createBrackets";
import ModalQuestion from "../../../modalQuestion/ModalQuestion";
import { Loading } from "../../../shared/loading";
import { ErrorMessage } from "../../../shared/errorMessage";
import { BracketContext } from "../../../../shared/context/bracket";
import { buildBracketPairs, getDeep } from "./utils";

export const ContestBrackets: React.FC = () => {
	const { deep, setDeep, bracketPairs, setBracketPairs } =
		useContext(BracketContext)!;

	const token: string = localStorage.getItem("authorization") || "";
	const { state } = useLocation();

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});

	const [deleteBracketsModal, setDeleteBracketsModal] = useState({
		visible: false,
	});
	const [createBracketsModal, setCreateBracketsModal] = useState({
		visible: false,
	});

	const handleListDraw = async (deep: number | null = null) => {
		setStatus({ loading: true, error: "" });
		const result = await listDraw(state.contest.contestId, deep);

		setStatus({
			loading: false,
			error: result.isFailure ? result.getErrorValue() : "",
		});

		if (result.isFailure) {
			return;
		}

		const deepFilter = deep === null ? getDeep(result.getValue()) : deep;

		if (deep === null) setDeep(getDeep(result.getValue()));

		setBracketPairs(
			buildBracketPairs(result.getValue().filter((b) => b.deep === deepFilter)),
		);
	};

	const handleDeleteBrackets = async () => {
		setStatus({ loading: true, error: "" });

		const result = await deleteBrackets(
			{
				contestId: state.contest.contestId,
				phase: bracketPairs[0].first.phase,
			},
			token,
		);

		setStatus({ loading: false, error: "" });

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());
		setDeep(null);
		await handleListDraw();
	};

	const handleCreateBrackets = async () => {
		setStatus({ loading: true, error: "" });

		const result = await createBrackets(
			{
				phase: 0,
				contestId: state.contest.contestId,
			},
			token,
		);

		setStatus({ loading: false, error: "" });

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());

		await handleListDraw();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleListDraw(deep);
	}, []);

	const buildDeepFilters = (value: number) => {
		const filters = [];

		for (let i = value; i >= 1; i--) {
			if (i === 1) {
				filters.push(<option value={i}>Final</option>);
				continue;
			}
			if (i === 2) {
				filters.push(<option value={i}>Semi Final</option>);
				continue;
			}
			if (i === 3) {
				filters.push(<option value={i}>4tos</option>);
				continue;
			}
			filters.push(<option value={i}>{Math.floor(2 ** i / 2)}vos</option>);
		}

		return filters;
	};

	const render = () => {
		if (status.loading) {
			return Loading();
		}

		if (status.error.length > 0) {
			return ErrorMessage(status.error);
		}

		return bracketPairs.map((bp) => (
			<BracketPair key={bp.first.id} pair={bp} />
		));
	};

	return (
		<div>
			{deleteBracketsModal.visible && (
				<ModalQuestion
					title="Eliminar brackets"
					dismiss={() => setDeleteBracketsModal({ visible: false })}
					question="Estas seguro de eliminar los brackets de esta competencia? Esta accion no se pude deshacer"
					accept={() => handleDeleteBrackets()}
				/>
			)}
			{createBracketsModal.visible && (
				<ModalQuestion
					title="Crear brackets"
					dismiss={() => setCreateBracketsModal({ visible: false })}
					question="Quieres crear lo brackets de esta competencia? Por defecto se tomaran en cuenta los participantes inscritos"
					accept={() => handleCreateBrackets()}
				/>
			)}
			<div className="d-flex justify-content-between m-4">
				<div className="d-flex align-items-center">
					<Form.Select
						defaultValue={deep as number}
						className="select_deep"
						aria-label="Filtrar por ronda"
						onChange={(e) => handleListDraw(Number(e.target.value))}
					>
						{buildDeepFilters(deep as number)}
					</Form.Select>
				</div>
				<h2>Brackets</h2>
				<div className="d-flex">
					<div className="d-flex align-items-center mx-2">
						<Button
							onMouseDown={() => setCreateBracketsModal({ visible: true })}
							disabled={bracketPairs.length > 0}
						>
							Crear
						</Button>
					</div>
					<div className="d-flex align-items-center ">
						<Button
							onMouseDown={() => setDeleteBracketsModal({ visible: true })}
							disabled={bracketPairs.length === 0}
							variant="danger"
						>
							Eliminar
						</Button>
					</div>
				</div>
			</div>
			<div className="d-flex flex-column">{render()}</div>
		</div>
	);
};
