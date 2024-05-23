import { checkClashIsFinish } from "../usecase/checkBracketClash";
import { updateClashBrackets } from "../usecase/updateClashBrackets";
import { updateMatchBracketTree } from "../usecase/updateMatchBrackets";

import { AfterContestClashFinished } from "./afterContestClashFinished";
import { AfterTournemntMatchFinished } from "./afterTournamentMatchFinished";

new AfterTournemntMatchFinished(updateMatchBracketTree, checkClashIsFinish);
new AfterContestClashFinished(updateClashBrackets)
