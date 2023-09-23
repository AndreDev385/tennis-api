import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../domain/club";
import { ClubRepository } from "../../repositories/clubRepo";
import { CreateClubRequest } from "./dto";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class CreateClub implements UseCase<CreateClubRequest, Response> {

    private readonly clubRepo: ClubRepository;

    constructor(clubRepo: ClubRepository) {
        this.clubRepo = clubRepo;
    }

    async execute(request: CreateClubRequest): Promise<Response> {
        let club: Club;
        try {
            const clubOrError = Club.create({
                name: request.name,
                symbol: request.symbol,
            })

            if (clubOrError.isFailure) {
                return left(Result.fail<string>(`${clubOrError.getErrorValue()}`))
            }

            club = clubOrError.getValue();

            await this.clubRepo.save(club);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
