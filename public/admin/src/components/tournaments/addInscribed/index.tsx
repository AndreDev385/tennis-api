import { GameModesValues } from "../../../utils/tennisConfigs";
import { useLocation } from "react-router";
import { AddParticipants } from "./addParticipants";
import { AddCouples } from "./addCouples";
import { AddTeams } from "./addTeams";

export const AddInscribed = () => {
	const {
		state: { contest },
	} = useLocation();

	const render = () => {
		console.log(contest, "contest");

		if (contest.mode === GameModesValues.Team) {
			return AddTeams({ contest });
		}
		if (contest.mode === GameModesValues.Double) {
			return AddCouples();
		}
		return AddParticipants({ contest });
	};

	return render();
};
