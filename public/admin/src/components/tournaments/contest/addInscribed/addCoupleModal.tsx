import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import type { AddCoupleDto } from "../../../../services/contest/addContestCouples";
import { CI_TYPES } from "../../../../utils/ci";

type Props = {
	addCouple: (c: AddCoupleDto) => void;
	close: () => void;
};

export const AddCoupleModal: React.FC<Props> = ({ addCouple, close }) => {
	const [form, setForm] = useState({
		position: "",
		firstNameP1: "",
		lastNameP1: "",
		ciTypeP1: "",
		ciP1: "",
		firstNameP2: "",
		lastNameP2: "",
		ciTypeP2: "",
		ciP2: "",
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!e.currentTarget.checkValidity()) {
			return;
		}

		const ci1 = `${form.ciTypeP1}${form.ciP1}`;
		const ci2 = `${form.ciTypeP2}${form.ciP2}`;

		const re = /^[V|E|J|P][0-9]{5,9}$/;
		const isValidC1 = re.test(ci1);
		const isValidC2 = re.test(ci2);

		if (!isValidC1 || !isValidC2) {
			toast.error("CI invalida");
			return;
		}

		addCouple({
			position: form.position ? Number(form.position) : null,
			p1: {
				firstName: form.firstNameP1,
				lastName: form.lastNameP1,
				ci: ci1,
			},
			p2: {
				firstName: form.firstNameP2,
				lastName: form.lastNameP2,
				ci: ci2,
			},
		});

		toast.success("Participante agregado");

		close();
	};

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog size="lg">
					<Form onSubmit={onSubmit}>
						<Modal.Header>
							<Modal.Title>Agregar participante</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<div className="d-flex justify-content-around">
								<div className="mb-3">
									<h3 className="mb-3">Jugador 1</h3>
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>Nombre</Form.Label>

										<Form.Control
											required
											name="firstNameP1"
											type="text"
											placeholder="Nombre"
											onChange={(e) =>
												onFormChange(e as React.ChangeEvent<HTMLInputElement>)
											}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>Apellido</Form.Label>
										<Form.Control
											required
											name="lastNameP1"
											type="text"
											placeholder="Apellido"
											onChange={(e) =>
												onFormChange(e as React.ChangeEvent<HTMLInputElement>)
											}
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Tipo de documento</Form.Label>
										<Form.Select
											value={form.ciTypeP1}
											required
											onChange={onFormChange}
											defaultValue=""
											name="ciTypeP1"
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
											name="ciP1"
											type="text"
											placeholder="CI"
											onChange={(e) =>
												onFormChange(e as React.ChangeEvent<HTMLInputElement>)
											}
										/>
									</Form.Group>
								</div>
								<div className="mb-3">
									<h3 className="mb-3">Jugador 2</h3>
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>Nombre</Form.Label>

										<Form.Control
											required
											name="firstNameP2"
											type="text"
											placeholder="Nombre"
											onChange={(e) =>
												onFormChange(e as React.ChangeEvent<HTMLInputElement>)
											}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>Apellido</Form.Label>
										<Form.Control
											required
											name="lastNameP2"
											type="text"
											placeholder="Apellido"
											onChange={(e) =>
												onFormChange(e as React.ChangeEvent<HTMLInputElement>)
											}
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Tipo de documento</Form.Label>
										<Form.Select
											value={form.ciTypeP2}
											required
											onChange={onFormChange}
											defaultValue=""
											name="ciTypeP2"
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
										<Form.Label>CI</Form.Label>
										<Form.Control
											required
											name="ciP2"
											type="text"
											placeholder="CI"
											onChange={(e) =>
												onFormChange(e as React.ChangeEvent<HTMLInputElement>)
											}
										/>
									</Form.Group>
								</div>
							</div>
							<Form.Group className="mb-3 w-50 mx-auto">
								<Form.Label>Posición</Form.Label>
								<Form.Control
									name="position"
									type="number"
									onChange={(e) =>
										onFormChange(e as React.ChangeEvent<HTMLInputElement>)
									}
								/>
							</Form.Group>
						</Modal.Body>

						<Modal.Footer
							style={{
								justifyContent: "center",
							}}
						>
							<Button variant="secondary" onClick={() => close()}>
								Cancelar
							</Button>
							<Button variant="primary" type="submit">
								<span>
									<FontAwesomeIcon className="me-2" icon={faPlus} />
									Agregar
								</span>
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Dialog>
			</div>
		</>
	);
};
