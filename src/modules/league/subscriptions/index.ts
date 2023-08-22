import { finishClash } from "../useCases/finishClash";
import { updateTeamRanking } from "../useCases/updateTeamRanking";
import { updateTeamStats } from "../useCases/updateTeamStats";
import { AfterClashFinish } from "./afterClashFinished";
import { AfterMatchCancelled } from "./afterMatchCancelled";
import { AfterMatchFinished } from "./afterMatchFinished";

new AfterClashFinish(updateTeamStats, updateTeamRanking);
new AfterMatchFinished(finishClash);
new AfterMatchCancelled(finishClash);
