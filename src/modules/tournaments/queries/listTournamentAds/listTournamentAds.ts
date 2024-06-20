import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TournamentAdRepository } from "../../repository/tournamentAdRepo";

type Req = {
    tournamentId: string;
};

type Res = Either<AppError.UnexpectedError, any>;

export class ListTournamentAds implements UseCase<Req, Res> {
    private readonly repo: TournamentAdRepository;

    constructor(repo: TournamentAdRepository) {
        this.repo = repo;
    }

    async execute(request: Req): Promise<Res> {
        try {

            const result = await this.repo.list(request);

            return right(
                result.map((a) => ({
                    link: a.link,
                    image: a.image,
                    tournamentId: a.tournamentId.id.toString(),
                }))
            );
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
