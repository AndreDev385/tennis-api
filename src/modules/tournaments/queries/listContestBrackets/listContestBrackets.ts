import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketDto } from "../../dtos/bracketDto";
import {
    BracketsQuery,
    BracketsRepository,
} from "../../repository/bracketsRepo";
import { ListContestBracketsDto } from "./listContestBracketsDto";

type Response = Either<AppError.UnexpectedError, BracketDto[]>;

export class ListContestBrackets
    implements UseCase<ListContestBracketsDto, Response>
{
    private readonly bracketRepo: BracketsRepository;

    constructor(repo: BracketsRepository) {
        this.bracketRepo = repo;
    }

    async execute(req: ListContestBracketsDto): Promise<Response> {
        try {
            const query: BracketsQuery = {};

            const validQueryValues: Array<keyof BracketsQuery> = ["deep"];

            for (const [k, v] of Object.entries(req)) {
                if (validQueryValues.includes(k as keyof BracketsQuery)) {
                    query[k as keyof BracketsQuery] = v as any;
                }
            }

            const brackets = await this.bracketRepo.list({
                contestId: req.contestId,
                ...query,
            });

            return right(brackets);
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}
