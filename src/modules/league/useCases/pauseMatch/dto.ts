import { SetDto } from "../../dtos/setDto";
import { TrackerDto } from "../../dtos/trackerDto";

export interface PauseMatchRequest {
    superTieBreak?: boolean;
    sets: Array<SetDto>;
    tracker: TrackerDto;
}
