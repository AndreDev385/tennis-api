import { Team } from "../domain/team";

export interface TeamQuery {
    clubId?: string;
    name?: string;
    teamId?: string;
}

export interface TeamRepository {
    save(team: Team): Promise<void>;
    getTeam(name: string, clubId: string, categoryId: string): Promise<Team>;
    getById(teamId: string): Promise<Team>;
    listByClubId(clubId: string): Promise<Array<Team>>;
    list(query: TeamQuery): Promise<Array<Team>>;
    delete(teamId: string): Promise<void>;
}
