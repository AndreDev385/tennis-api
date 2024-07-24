// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type { Set } from "./set";
import type { Participant } from "./participant";
import type { DoubleServeFlow, SingleServeFlow } from "./serveFlow";
import type { TournamentMatchTracker } from "./tournamentTracker";
import type { Game } from "./game";

export type TournamentMatch = {
	matchId: string;
	tournamentId: string;
	contestId: string;
	rules: {
		gamesPerSet: number;
		setsQuantity: number;
		goldenPoint: boolean;
	};
	mode: string;
	surface: string;
	sets: Set[];
	superTieBreak: boolean | null;
	participant1: Participant;
	participant2: Participant;
	participant3: Participant | null;
	participant4: Participant | null;
	tracker: TournamentMatchTracker;
	status: number;
	matchInfo: {
		currentSetIdx: number | null;
		currentGame: Game | null;
		setsWon?: number;
		setsLost?: number;
		matchFinish: boolean | null;
		superTiebreak?: boolean | null;
		initialTeam?: number | null;
		doubleServeFlow: DoubleServeFlow | null;
		singleServeFlow?: SingleServeFlow | null;
	};
	matchWon: boolean | null;
	createdAt: Date;
	updatedAt: Date;
};
