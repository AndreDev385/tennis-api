import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClubEventRepository } from "../../repositories/clubEventRepo";
import { DeleteEventRequest } from "./dto";

type Response = Either<AppError.NotFoundError | AppError.UnexpectedError, Result<void>>;

export class DeleteEvent implements UseCase<DeleteEventRequest, Response> {

    private readonly eventRepo: ClubEventRepository;

    constructor(eventRepo: ClubEventRepository) {
        this.eventRepo = eventRepo;
    }

    async execute(request: DeleteEventRequest): Promise<Response> {

        try {

            try {
                await this.eventRepo.delete(request.eventId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error))
        }
    }

}
