import { Contest } from "../domain/contest";
import { ContestDto } from "../dtos/contestsDto";

export type ContestQuery = {
    contestId?: string;
    tournamentId?: string;
};

export type ContestRepository = {
    list(q: ContestQuery): Promise<ContestDto[]>;
    get(q: ContestQuery): Promise<Contest>;
    save(contest: Contest): Promise<void>;
};
