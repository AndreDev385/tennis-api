import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../domain/club";
import { ClubRepository } from "../../repositories/clubRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

type UnsubscribeClubDto = {
    clubId: string;
};

export class UnsubscribeClub implements UseCase<UnsubscribeClubDto, Response> {
    private readonly repo: ClubRepository;

    constructor(repo: ClubRepository) {
        this.repo = repo;
    }

    async execute(request: UnsubscribeClubDto): Promise<Response> {
        let club: Club;

        try {
            try {
                club = await this.repo.findById(request.clubId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            club.unsubscribe();

            await this.repo.save(club);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
