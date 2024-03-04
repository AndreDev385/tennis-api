import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClubDto } from "../../dtos/clubDto";
import { ClubRepository } from "../../repositories/clubRepo";
import { ListQueryDto } from "./requestListQueryDto";

type Response = Either<AppError.UnexpectedError, Result<Array<ClubDto>>>;

export class ListClubs implements UseCase<any, Response> {
    private repo: ClubRepository;

    constructor(repo: ClubRepository) {
        this.repo = repo;
    }

    async execute(request: any): Promise<Response> {
        try {
            const query: ListQueryDto = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "isSubscribed") {
                    if (value == 'true') {
                        query.isSubscribed = true;
                    }
                    if (value == 'false') {
                        query.isSubscribed = false;
                    }
                }
                if (key == "symbol") {
                    query.symbol = value as string;
                }
            }

            const list = await this.repo.list(query);

            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
