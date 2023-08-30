import { TeamDto } from "./teamDto";

export interface RankingDto {
    rankingId: string;
    position: string;
    team: TeamDto;
    seasonId: string;
}
