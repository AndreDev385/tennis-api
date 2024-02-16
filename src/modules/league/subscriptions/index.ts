import { finishClash } from "../useCases/finishClash";
import { sendNotifications } from "../useCases/sendNotifications";
import { updateTeamRanking } from "../useCases/updateTeamRanking";
import { updateTeamStats } from "../useCases/updateTeamStats";
import { AfterAdCreated } from "./afterAdCreated";
import { AfterClashFinish } from "./afterClashFinished";
import { AfterClubEventCreated } from "./afterClubEventCreated";
import { AfterMatchCancelled } from "./afterMatchCancelled";
import { AfterMatchFinished } from "./afterMatchFinished";

new AfterClashFinish(updateTeamStats, updateTeamRanking);
new AfterMatchFinished(finishClash);
new AfterMatchCancelled(finishClash);
new AfterAdCreated(sendNotifications)
new AfterClubEventCreated(sendNotifications)
