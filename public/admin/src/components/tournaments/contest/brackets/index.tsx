import "./brackets.scss";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { deleteBrackets } from "../../../../services/contest/deleteBrackets";
import { listDraw } from "../../../../services/contest/listBrackets";
import type { Bracket } from "../../../../types/bracket";
import { BracketPair, type BracketPairData } from "./bracketPair";
import { createBrackets } from "../../../../services/contest/createBrackets";
import ModalQuestion from "../../../modalQuestion/ModalQuestion";

function buildBracketPairs(brackets: Bracket[]): BracketPairData[] {
	const pairs: BracketPairData[] = [];

	for (let i = 0; i < brackets.length; i++) {
		if (i % 2 === 0) {
			pairs.push({
				first: brackets[i],
				second: i + 1 > brackets.length ? null : brackets[i + 1],
			});
		}
	}

	return pairs;
}

function getDeep(list: Bracket[]) {
	if (list.length < 1) {
		return 0;
	}

	list.sort((a, b) => {
		return b.deep - a.deep;
	});

	return list[0].deep;
}

export const ContestBrackets: React.FC = () => {
	const token: string = localStorage.getItem("authorization") || "";
	const { state } = useLocation();

	const [status, setStatus] = useState({
		loading: true,
		error: "",
	});

	const [deep, setDeep] = useState<null | number>(null);
	const [bracketPairs, setBracketPairs] = useState<BracketPairData[]>([]);
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

	const render = () => {
		if (status.loading) {
			return <FontAwesomeIcon icon={faCircleNotch} />;
		}

		if (status.error.length > 0) {
			return <h2 className="text-danger">{status.error}</h2>;
		}

		return bracketPairs.map((bp) => (
			<BracketPair key={bp.first.id} pair={bp} />
		));
	};

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
			<div className="d-flex justify-content-between mx-4">
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
				<h1>Brackets</h1>
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
