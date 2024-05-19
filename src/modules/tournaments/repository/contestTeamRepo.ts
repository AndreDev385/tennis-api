import { Result } from "../../../shared/core/Result";
import { ContestTeam } from "../domain/contestTeam";

export type ContestTeamQuery = {
    contestTeamId?: string;
    contestId?: string;
    partiticipantsIds?: string[];
    name?: string;
};

export type ContestTeamRepository = {
    save(team: ContestTeam): Promise<Result<void>>;
    list(q: ContestTeamQuery): Promise<ContestTeam[]>;
    get(q: ContestTeamQuery): Promise<Result<ContestTeam>>;
    delete(q: ContestTeamQuery): Promise<Result<number>>;
};
