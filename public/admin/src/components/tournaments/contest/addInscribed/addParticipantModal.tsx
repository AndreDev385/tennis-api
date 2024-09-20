import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import type { AddParticipantData } from "../../../../services/contest/addContestParticipants";
import { CI_TYPES } from "../../../../utils/ci";

type Props = {
	addParticipant: (p: AddParticipantData) => void;
	close: () => void;
};

export const AddParticipantModal: React.FC<Props> = ({
	addParticipant,
	close,
}) => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		ciType: "",
		ci: "",
		position: "",
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!e.currentTarget.checkValidity()) {
			return;
		}

		const ci = `${form.ciType}${form.ci}`;

		const re = /^[V|E|J|P][0-9]{5,9}$/;
		const isValid = re.test(ci);

		if (!isValid) {
			toast.error("CI invalida");
			return;
		}

		addParticipant({
			ci,
			position: form.position ? Number(form.position) : null,
			firstName: form.firstName,
			lastName: form.lastName,
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
				<Modal.Dialog>
					<Form onSubmit={onSubmit}>
						<Modal.Header>
							<Modal.Title>Agregar participante</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Form.Group className="mb-3" controlId="formFirstName">
								<Form.Label>Nombre</Form.Label>

								<Form.Control
									required
									name="firstName"
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
									name="lastName"
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
									name="ci"
									type="text"
									placeholder="CI"
									onChange={(e) =>
										onFormChange(e as React.ChangeEvent<HTMLInputElement>)
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
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
