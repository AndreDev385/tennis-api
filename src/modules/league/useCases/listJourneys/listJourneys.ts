import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { JourneyDto } from "../../dtos/journeyDto";
import { JourneyRepository } from "../../repositories/journeyRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<JourneyDto>>>

export class ListJourneys implements UseCase<void, Response> {

    repo: JourneyRepository

    constructor(repo: JourneyRepository) {
        this.repo = repo;
    }

    async execute(): Promise<Response> {
        try {
            const list = await this.repo.list();
            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error))
        }
    }
}
