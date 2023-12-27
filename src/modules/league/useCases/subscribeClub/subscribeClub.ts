import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../domain/club";
import { ClubRepository } from "../../repositories/clubRepo";
import { SubscribeClubDto } from "./subscribeClubDto";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError, Result<void>>;

export class SubscribeClub implements UseCase<SubscribeClubDto, Response> {

    private clubRepo: ClubRepository

    constructor(clubRepo: ClubRepository) {
        this.clubRepo = clubRepo;
    }

    async execute({ clubId }: SubscribeClubDto): Promise<Response> {
        let club: Club;
        try {
            try {
                club = await this.clubRepo.findById(clubId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            club.subscribe();

            await this.clubRepo.save(club);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.NotFoundError(error));
        }
    }
}
