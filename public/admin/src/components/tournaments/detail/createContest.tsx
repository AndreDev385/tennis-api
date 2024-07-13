import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_SERVER_URL } from "../../../env/env.prod";
import { createContest } from "../../../services/contest/createContest";
import type { ICategory } from "../../../types/interfaces";
import {
	CATEGORY_TYPES,
	CategoryTypesValues,
	GAME_MODES,
	LETTER_VALUES,
	mapCategoryTypesToString,
} from "../../../utils/tennisConfigs";

export type NewContestDto = {
	mode: string;
	categoryType: number;
	categoryId?: string;
	summation?: {
		letter: string;
		value: number;
	};
};

export type AddTournamentContestDto = {
	tournamentId: string;
	contest: NewContestDto;
};

export const CreateContestForm = () => {
	const token: string = localStorage.getItem("authorization") || "";

	const location = useLocation();
	console.log(location.state);
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState(true);

	const [form, setForm] = useState({
		tournamentId: query.get("tournamentId"),
		mode: GAME_MODES[0],
		categoryType: CATEGORY_TYPES[0],
		categoryId: "",
		letter: LETTER_VALUES[0],
		value: 5,
	});

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		let value: string | number = e.target.value;
		if (e.target.name === "categoryType") {
			value = Number(e.target.value);
		}
		setForm((prev) => ({
			...prev,
			[e.target.name]: value,
		}));
	};

	const getCategories = async () => {
		const url = `${VITE_SERVER_URL}/api/v1/categories`;
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();
			if (response.status === 200) {
				setCategories(data);
			}
		} catch (error) {
			toast.error("Ha ocurrido un error");
		}
		setLoading(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getCategories();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!e.currentTarget.checkValidity()) {
			return;
		}
		setLoading(true);
		const result = await createContest(
			{
				tournamentId: form.tournamentId as string,
				contest: {
					categoryType: form.categoryType,
					mode: form.mode,
					categoryId: form.categoryId,
					summation: {
						letter: form.letter,
						value: form.value,
					},
				},
			},
			token,
		);
		setLoading(false);

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());
		navigate(
			`/dashboard/tournaments/${form.tournamentId}?name=${location.state.tournamentName}`,
		);
	};

	return (
		<Container className="p-5 w-75">
			<h1>Crear nueva competencia</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Modo de juego</Form.Label>
					<Form.Select
						required
						name="mode"
						value={form.mode}
						onChange={onFormChange}
					>
						{GAME_MODES.map((v) => (
							<option key={v} value={v}>
								{v}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Tipo de categoría</Form.Label>
					<Form.Select
						required
						name="categoryType"
						value={form.categoryType}
						onChange={onFormChange}
					>
						{CATEGORY_TYPES.map((v) => (
							<option key={v} value={v}>
								{mapCategoryTypesToString(v)}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				{form.categoryType === CategoryTypesValues.Category && (
					<Form.Group className="mb-3">
						<Form.Label>Categoría</Form.Label>
						<Form.Select
							required={form.categoryType === CategoryTypesValues.Category}
							name="categoryId"
							value={form.categoryId}
							onChange={onFormChange}
						>
							<option value="">Selecciona una categoría</option>
							{categories.map((c) => (
								<option key={c.categoryId} value={c.categoryId}>
									{c.fullName}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				)}
				{form.categoryType === CategoryTypesValues.Summation && (
					<div className="d-flex mb-3">
						<Col>
							<Form.Label>Suma #</Form.Label>
							<Form.Control
								required={form.categoryType === CategoryTypesValues.Summation}
								value={form.value}
								type="number"
								name="value"
								onChange={(e) =>
									onFormChange(e as ChangeEvent<HTMLInputElement>)
								}
							/>
							<Form.Text>Suma de la categoría de los jugadores</Form.Text>
						</Col>
						<div className="px-2" />
						<Col>
							<Form.Label>Género</Form.Label>
							<Form.Select
								required={form.categoryType === CategoryTypesValues.Summation}
								value={form.letter}
								name="letter"
								onChange={onFormChange}
							>
								{LETTER_VALUES.map((v) => (
									<option key={v} value={v}>
										{v}
									</option>
								))}
							</Form.Select>
						</Col>
					</div>
				)}
				<div className="d-grid">
					<Button disabled={loading} type="submit" variant="primary">
						Crear {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
					</Button>
				</div>
			</Form>
		</Container>
	);
};
