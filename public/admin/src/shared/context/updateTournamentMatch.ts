import { createContext } from "react";
import type { TournamentMatch } from "../../types/tournamentMatch";

type ContextValues = {
	match: TournamentMatch | null;
	setMatch: React.Dispatch<React.SetStateAction<TournamentMatch | null>>;
};

export const UpdateTournamentMatchContext = createContext<ContextValues | null>(
	null,
);
