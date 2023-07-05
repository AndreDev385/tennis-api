import { SetDto } from "../../dtos/setDto";
import { TrackerDto } from "../../dtos/trackerDto";

export interface FinishMatchRequest {
    sets: Array<SetDto>;
    tracker: TrackerDto;
}
