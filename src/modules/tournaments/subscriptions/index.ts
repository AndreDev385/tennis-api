import { updateBracketTree } from "../usecase/updateBrackets";
import { AfterTournemntMatchFinished } from "./afterTournamentMatchFinished";

new AfterTournemntMatchFinished(updateBracketTree);
