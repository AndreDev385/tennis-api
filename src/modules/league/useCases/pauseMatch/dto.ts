import { SetDto } from "../../dtos/setDto";
import { TrackerDto } from "../../dtos/trackerDto";

export interface PauseMatchRequest {
    sets: Array<SetDto>;
    tracker: TrackerDto;
}
