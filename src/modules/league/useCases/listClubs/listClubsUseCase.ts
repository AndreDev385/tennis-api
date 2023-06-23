import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClubDto } from "../../dtos/clubDto";
import { ClubRepository } from "../../repositories/clubRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<ClubDto>>>;

export class ListClubs implements UseCase<void, Response> {
    private repo: ClubRepository;

    constructor(repo: ClubRepository) {
        this.repo = repo;
    }

    async execute(request?: void): Promise<Response> {
        try {
            const list = await this.repo.list();
            return right(Result.ok(list));
        } catch (error) {
            console.log('error', error)
            return left(new AppError.UnexpectedError(error));
        }
    }
}
