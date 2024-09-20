import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { VITE_SERVER_URL } from "../../../env/env.prod";
import type { IClub } from "../../../types/interfaces";
import { CI_TYPES } from "../../../utils/ci";

interface IProps {
	clubs: IClub[];
	onClose: (value: boolean) => void;
	getPlayers: () => Promise<void>;
}

const CreatePlayerModal = ({ clubs, onClose, getPlayers }: IProps) => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		ciType: "",
		ciValue: "",
		clubSymbol: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [validClub, setValidClub] = useState(false);
	const [loading, setLoading] = useState(false);
	const filterClubs = clubs.filter((item) => item.isSubscribed === true);
	const token: string = localStorage.getItem("authorization") || "";

	const onFormChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		if (event.target.name === "clubSymbol") {
			setValidClub(event.target.value !== "");
		}
		setForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const createPlayer = async () => {
		const url = `${VITE_SERVER_URL}/api/v1/player/register`;
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				firstName: form.firstName,
				lastName: form.lastName,
				ci: `${form.ciType}${form.ciValue}`,
				clubSymbol: form.clubSymbol,
			}),
		};

		try {
			const response = await fetch(url, requestOptions);
			console.log(response);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data?.message);
			}

			toast.success("Jugador agregado correctamente");
			onClose(true);
			await getPlayers();
		} catch (error) {
			toast.error(
				`${
					(error as Error).message ??
					"Ha ocurrido un error al intentar agregar el jugador"
				}`,
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!form.firstName || !form.lastName || !form.clubSymbol) {
			return;
		}
		setSubmitted(true);
		setLoading(true);
		await createPlayer();
	};

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Agregar jugador</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="formFirstName">
								<Form.Label>Nombre</Form.Label>

								<Form.Control
									required
									type="text"
									name="firstName"
									placeholder="Nombre"
									onChange={(e) =>
										onFormChange(e as React.ChangeEvent<HTMLInputElement>)
									}
								/>

								{submitted && !form.firstName && (
									<span className="ms-2 text-error">Nombre es requerido</span>
								)}
							</Form.Group>

							<Form.Group className="mb-3" controlId="formLastName">
								<Form.Label>Apellido</Form.Label>

								<Form.Control
									required
									type="text"
									name="lastName"
									placeholder="Apellido"
									onChange={(e) =>
										onFormChange(e as React.ChangeEvent<HTMLInputElement>)
									}
								/>

								{submitted && !form.firstName && (
									<span className="ms-2 text-error">Apellido es requerido</span>
								)}
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Tipo de documento</Form.Label>
								<Form.Select
									value={form.ciType}
									required
									onChange={onFormChange}
									defaultValue=""
									name="ciType"
								>
									<option value="">Selecciona un tipo de documento</option>
									{CI_TYPES.map((v) => (
										<option key={v} value={v}>
											{v}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>ID Documento</Form.Label>
								<Form.Control
									required
									name="ciValue"
									type="text"
									placeholder="CI"
									onChange={(e) =>
										onFormChange(e as React.ChangeEvent<HTMLInputElement>)
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formClub">
								<Form.Label>Club</Form.Label>
								<Form.Select
									name="clubSymbol"
									required
									aria-label="Selecciona un club"
									defaultValue=""
									onChange={(e) =>
										onFormChange(e as React.ChangeEvent<HTMLSelectElement>)
									}
								>
									<option value="" disabled>
										Selecciona un club
									</option>
									{filterClubs.map((item) => {
										return (
											<option key={item.symbol} value={item.symbol}>
												{item.name}
											</option>
										);
									})}
								</Form.Select>

								{submitted && !validClub && (
									<span className="ms-2 text-error">Club es requerido</span>
								)}
							</Form.Group>
						</Form>
					</Modal.Body>

					<Modal.Footer
						style={{
							justifyContent: "center",
						}}
					>
						<Button variant="secondary" onClick={() => onClose(false)}>
							Cancelar
						</Button>
						<Button variant="primary" onClick={handleSubmit}>
							{loading ? (
								<FontAwesomeIcon icon={faCircleNotch} spin />
							) : (
								<span>
									<FontAwesomeIcon className="me-2" icon={faPlus} />
									Agregar
								</span>
							)}
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
		</>
	);
};

export default CreatePlayerModal;
