import { SetDto } from "../../dtos/setDto";
import { TrackerDto } from "../../dtos/trackerDto";

export interface CancelMatchRequest {
    sets: Array<SetDto>;
    tracker: TrackerDto;
    superTieBreak?: boolean;
    matchWon: boolean | null;
}
