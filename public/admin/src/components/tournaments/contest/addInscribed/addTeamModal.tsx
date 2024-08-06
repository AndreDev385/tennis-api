import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

type Props = {
	addTeam: (p: {
		name: string;
		position: number | null;
	}) => void;
	close: () => void;
};

export const AddTeamModal: React.FC<Props> = ({ addTeam, close }) => {
	const [form, setForm] = useState({
		name: "",
		position: "",
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		addTeam({
			position: form.position ? Number(form.position) : null,
			name: form.name, //TODO
		});

		toast.success("Equipo agregado");

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
							<Modal.Title>Agregar equipo</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Form.Group className="mb-3" controlId="formFirstName">
								<Form.Label>Nombre</Form.Label>

								<Form.Control
									required
									name="name"
									type="text"
									placeholder="Nombre"
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
