import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import { getContest } from "../../../../services/contest/getContest";
import type { Bracket } from "../../../../types/bracket";
import { ErrorMessage } from "../../../shared/errorMessage";
import { Loading } from "../../../shared/loading";
import { buildNameForDisplay } from "./formatNames";
import type {
	InscribedCouple,
	InscribedParticipant,
	InscribedTeam,
} from "../../../../types/inscribed";
import { formatInscribedString } from "../../../../utils/formatInscribedString";
import { useContext, useState } from "react";
import { updateBracket } from "../../../../services/contest/updateBracket";
import { toast } from "react-toastify";
import { GameModesValues } from "../../../../utils/tennisConfigs";
import { BracketContext } from "../../../../shared/context/bracket";
import { buildBracketPairs, getDeep } from "./utils";
import { listDraw } from "../../../../services/contest/listBrackets";

type Props = {
	dismiss: () => void;
	bracket: Bracket;
};

export function UpdateBracketModal({ dismiss, bracket }: Props) {
	const { state } = useLocation();

	const { setBracketPairs, deep } = useContext(BracketContext)!;

	const handleListDraw = async (deep: number | null = null) => {
		const result = await listDraw(state.contest.contestId, deep);

		if (result.isFailure) {
			return;
		}

		const deepFilter = deep === null ? getDeep(result.getValue()) : deep;

		setBracketPairs(
			buildBracketPairs(result.getValue().filter((b) => b.deep === deepFilter)),
		);
	};

	const {
		state: {
			contest: { contestId, mode },
		},
	} = useLocation();

	const token: string = localStorage.getItem("authorization") || "";

	const [rightValue, setRightValue] = useState("");
	const [leftValue, setleftValue] = useState("");

	const result = useQuery({
		queryKey: ["contest", contestId],
		queryFn: () => getContest(contestId),
	});

	if (result.isLoading) return Loading();
	if (result.isError || result.data?.isFailure)
		return ErrorMessage(result.data!.getErrorValue());

	const contest = result.data?.getValue();

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog>
					<Form className="mx-2" onSubmit={handleSubmit}>
						<Modal.Header>
							<Modal.Title>Actualizar llave</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="">Puesto superior</Form.Label>
								<Form.Select
									name="rightPlace"
									defaultValue=""
									onChange={(e) => setRightValue(e.target.value)}
								>
									<option value="">
										{buildNameForDisplay(bracket.rightPlace)}
									</option>
									{contest?.inscribed.map(displayInscribed)}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="">Puesto superior</Form.Label>
								<Form.Select
									name="leftPlace"
									defaultValue=""
									onChange={(e) => setleftValue(e.target.value)}
								>
									<option value="">
										{buildNameForDisplay(bracket.leftPlace)}
									</option>
									{contest?.inscribed.map(displayInscribed)}
								</Form.Select>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer onClick={dismiss}>
							<Button variant="secondary">Cancelar</Button>
							<Button onClick={handleSubmit} variant="primary">
								Actualizar
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Dialog>
			</div>
		</>
	);

	function inscribedData(
		i: InscribedTeam | InscribedCouple | InscribedParticipant,
	) {
		if (mode == GameModesValues.Team) {
			return (i as InscribedTeam).contestTeam;
		}

		if (mode == GameModesValues.Double) {
			return (i as InscribedCouple).couple;
		}

		return (i as InscribedParticipant).participant;
	}

	function displayInscribed(
		i: InscribedTeam | InscribedCouple | InscribedParticipant,
		idx: number,
	) {
		return (
			<option key={idx} value={JSON.stringify(inscribedData(i))}>
				{formatInscribedString(i)}
			</option>
		);
	}

	async function handleSubmit() {
		const rightParticipant =
			mode == GameModesValues.Single && rightValue
				? JSON.parse(rightValue)
				: null;
		const leftParticipant =
			mode == GameModesValues.Single && leftValue
				? JSON.parse(leftValue)
				: null;

		const rightCouple =
			mode == GameModesValues.Single && rightValue
				? JSON.parse(rightValue)
				: null;
		const leftCouple =
			mode == GameModesValues.Single && leftValue
				? JSON.parse(leftValue)
				: null;

		const rightTeam =
			mode == GameModesValues.Single && rightValue
				? JSON.parse(rightValue)
				: null;
		const leftTeam =
			mode == GameModesValues.Single && leftValue
				? JSON.parse(leftValue)
				: null;

		const result = await updateBracket(
			{
				id: bracket.id,
				mode,
				rightPlace: {
					participant: rightParticipant,
					couple: rightCouple,
					contestTeam: rightTeam,
				},
				leftPlace: {
					participant: leftParticipant,
					couple: leftCouple,
					contestTeam: leftTeam,
				},
			},
			token,
		);

		if (result.isFailure) {
			toast.error(result.getErrorValue());
			return;
		}

		await handleListDraw(deep);
		toast.success(result.getValue());
	}
}
