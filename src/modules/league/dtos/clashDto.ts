import { MatchDto } from "./matchDto";
import { TeamDto } from "./teamDto";

export interface ClashDto {
    clashId: string;
    seasonId: string;
    clubId: string;
    category: string;
    team1: TeamDto;
    team2: TeamDto;
    journey: string;
    host: string;
    matchs?: Array<MatchDto>
    isFinish: boolean;
}
