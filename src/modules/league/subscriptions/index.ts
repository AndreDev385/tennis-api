import { finishClash } from "../useCases/finishClash";
import { updateTeamStats } from "../useCases/updateTeamStats";
import { AfterClashFinish } from "./afterClashFinished";
import { AfterMatchCancelled } from "./afterMatchCancelled";
import { AfterMatchFinished } from "./afterMatchFinished";

new AfterClashFinish(updateTeamStats);
new AfterMatchFinished(finishClash);
new AfterMatchCancelled(finishClash);
