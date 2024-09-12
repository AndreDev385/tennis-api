import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { listUsers } from "../../services/user/listUsers";
import { addParticipantToTeam } from "../../services/contestTeam/addParticipantToTeam";
import { toast } from "react-toastify";

type Props = {
	contestTeamId: string;
	dismiss: (value: boolean) => void;
};

export function AddParticipantToTeamModal({ dismiss, contestTeamId }: Props) {
	const token: string = localStorage.getItem("authorization") || "";

	const users = useQuery({
		queryKey: ["users"],
		queryFn: async () => listUsers({ token, query: {} }),
	});

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
	});

	function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function onInput() {
		var val = (document.getElementById("ci") as HTMLInputElement).value;
		var opts = (document.getElementById("list-ci") as HTMLDataListElement)
			.children;
		for (let i = 0; i < opts.length; i++) {
			if ((opts[i] as HTMLInputElement).value === val) {
				const user = users.data?.getValue().find((u) => u.ci === val);
				setForm({
					firstName: user!.firstName,
					lastName: user!.lastName,
				});
			}
		}
	}

	async function onSubmit() {
		var ci = (document.getElementById("ci") as HTMLInputElement).value;
		const result = await addParticipantToTeam(
			{
				contestTeamId,
				participants: [
					{
						...form,
						ci,
					},
				],
			},
			token,
		);

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		toast.success(result.getValue());
		dismiss(true);
	}

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog>
					<Form id="addParticipant" className="mx-2">
						<Modal.Header>
							<Modal.Title>Agregar participante</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-2">
								<Form.Label htmlFor="ci">CI</Form.Label>
								<Form.Control
									type="text"
									name="ci"
									list="list-ci"
									id="ci"
									placeholder="V26985900"
									onInput={() => onInput()}
								/>
								<datalist id="list-ci">
									{users.data
										?.getValue()
										.filter((u) => !!u.ci)
										.map(function userOption(u) {
											return (
												<option key={u.ci} value={u.ci!}>
													{u.ci}
												</option>
											);
										})}
								</datalist>
							</Form.Group>

							<Form.Group className="mb-2">
								<Form.Label htmlFor="firstName">Nombre</Form.Label>
								<Form.Control
									value={form.firstName}
									onChange={onFormChange}
									placeholder="John"
									type="text"
									name="firstName"
								/>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Label htmlFor="lastName">Apellido</Form.Label>
								<Form.Control
									value={form.lastName}
									onChange={onFormChange}
									placeholder="Doe"
									type="text"
									name="lastName"
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button onMouseDown={() => dismiss(false)} variant="secondary">
								Cancelar
							</Button>
							<Button onMouseDown={onSubmit} type="submit" variant="primary">
								Agregar
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Dialog>
			</div>
		</>
	);
}
