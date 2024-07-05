import { type ChangeEvent, useState } from "react";
import "@mantine/dates/styles.css";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { createTournament } from "../../../services/tournaments/createTournament";

const setsQuantityOptions = [1, 3, 5];
const gamesPerSetOptions = [4, 6, 9];

export function CreateTournamentForm() {
	const token: string = localStorage.getItem("authorization") || "";
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);
	const [preview, setPreview] = useState("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [image, setImage] = useState<any>();
	const [form, setForm] = useState({
		name: "",
		startDate: null,
		endDate: null,
		// rules
		setsQuantity: 3,
		gamesPerSet: 6,
		matchesPerClash: 5,
		goldenPoint: false,
		address: "",
	});

	const isValidDate = (): boolean => {
		return (
			dayjs(endDate).isAfter(startDate) || dayjs(endDate).isSame(startDate)
		);
	};

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeImage = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		const files = event.target.files;
		if (files?.[0]) {
			const value = files[0];
			const objectUrl = URL.createObjectURL(value);
			setImage(value);
			setPreview(objectUrl);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!e.currentTarget.checkValidity() || !startDate || !endDate) {
			return;
		}

		const formData = new FormData();

		formData.append("name", form.name);
		formData.append("startDate", startDate.toLocaleString());
		formData.append("endDate", endDate.toLocaleString());
		formData.append("setsQuantity", `${form.setsQuantity}`);
		formData.append("gamesPerSet", `${form.gamesPerSet}`);
		formData.append("matchesPerClash", `${form.matchesPerClash}`);
		formData.append("goldenPoint", `${form.goldenPoint}`);
		formData.append("address", form.address);
		formData.append("image", image);

		setLoading(true);
		const result = await createTournament(formData, token);
		setLoading(false);

		if (result.isFailure) {
			toast.error(result.getValue());
			return;
		}

		toast.success(result.getValue());
		navigate("/dashboard/tournaments");
	};

	return (
		<Container className="p-5">
			<h1>Crear nuevo torneo</h1>
			<Form onSubmit={handleSubmit}>
				<div className="d-flex">
					<Col className="mb-3">
						<Form.Group>
							<Form.Label htmlFor="name">Nombre</Form.Label>
							<Form.Control
								required
								name="name"
								value={form.name}
								onChange={(e) =>
									onFormChange(e as ChangeEvent<HTMLInputElement>)
								}
							/>
						</Form.Group>
					</Col>
					<div className="px-3" />
					<Col className="mb-3">
						<Form.Label>Dirección</Form.Label>
						<Form.Control
							name="address"
							value={form.address}
							onChange={(e) => onFormChange(e as ChangeEvent<HTMLInputElement>)}
						/>
					</Col>
				</div>
				<div className="d-flex">
					<Col className="mb-3">
						<DateInput
							clearable
							required
							valueFormat="DD/MM/YYYY"
							label="Fecha inicial"
							minDate={new Date()}
							value={startDate}
							onChange={setStartDate}
						/>
					</Col>
					<div className="px-3" />
					<Col className="mb-3">
						<DateInput
							valueFormat="DD/MM/YYYY"
							clearable
							required
							label="Fecha final"
							minDate={startDate ?? new Date()}
							value={endDate}
							onChange={setEndDate}
						/>
						{startDate && endDate && !isValidDate() && (
							<small className="text-error">
								La fecha final debe ser despues de la inicial
							</small>
						)}
					</Col>
				</div>
				<div className="d-flex">
					<Col className="mb-3">
						<Form.Group>
							<Form.Label>Cantidad de sets</Form.Label>
							<Form.Select
								value={form.setsQuantity}
								onChange={(e) => onFormChange(e)}
								name="setsQuantity"
							>
								{setsQuantityOptions.map((v) => (
									<option key={v} value={v}>
										{v}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Col>
					<div className="px-3" />
					<Col className="mb-3">
						<Form.Group>
							<Form.Label>Games por set</Form.Label>
							<Form.Select
								value={form.gamesPerSet}
								onChange={(e) => onFormChange(e)}
								name="gamesPerSet"
							>
								{gamesPerSetOptions.map((v) => (
									<option key={v} value={v}>
										{v}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Col>
				</div>
				<div className="d-flex">
					<Col className="mb-3">
						<Form.Group>
							<Form.Label>Partidos por encuentro</Form.Label>
							<Form.Select
								value={form.matchesPerClash}
								onChange={(e) => onFormChange(e)}
								name="matchesPerClash"
							>
								<option value={3}>3</option>
								<option value={5}>5</option>
							</Form.Select>
							<Form.Text>Competencias en equipo</Form.Text>
						</Form.Group>
					</Col>
					<div className="px-3" />
					<Col className="mb-3">
						<Form.Group>
							<Form.Label>Punto de oro</Form.Label>
							<Form.Check
								type="switch"
								name="goldenPoint"
								checked={form.goldenPoint}
								onChange={(e) => onFormChange(e)}
							/>
						</Form.Group>
					</Col>
				</div>
				<Form.Group className="mb-3" controlId="formImage">
					<Form.Label>Imagen</Form.Label>

					<Form.Control
						required
						lang="es"
						type="file"
						accept="image/png, image/jpeg"
						placeholder="Imagen"
						onChange={handleChangeImage}
					/>
					<div className="d-flex justify-content-center mt-3">
						<img src={preview} className="img w-50 h-50" alt="tournament" />
					</div>
				</Form.Group>
				<div className="d-grid">
					<Button disabled={loading} type="submit" variant="primary">
						Crear {loading && <FontAwesomeIcon icon={faCircleNotch} spin />}
					</Button>
				</div>
			</Form>
		</Container>
	);
}
