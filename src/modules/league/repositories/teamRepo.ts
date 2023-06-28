import { Team } from "../domain/team";

export interface TeamRepository {
    save(team: Team): Promise<void>;
    getTeam(name: string, clubId: string): Promise<Team>;
    getById(teamId: string): Promise<Team>;
    listByClubId(clubId: string): Promise<Array<Team>>;
}
