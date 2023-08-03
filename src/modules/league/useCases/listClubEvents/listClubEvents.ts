import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClubEventMap } from "../../mappers/clubEventMap";
import {
    ClubEventQuery,
    ClubEventRepository,
} from "../../repositories/clubEventRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<any>>>;

export class ListClubEvents implements UseCase<any, Response> {
    private clubEventRepo: ClubEventRepository;

    constructor(repo: ClubEventRepository) {
        this.clubEventRepo = repo;
    }

    async execute(request: any): Promise<Response> {
        try {
            const query: ClubEventQuery = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "clubId") {
                    query.clubId = value as string;
                }
            }

            const list = await this.clubEventRepo.list(query);

            return right(
                Result.ok(
                    list.map((event) => ClubEventMap.toPersistance(event))
                )
            );
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
