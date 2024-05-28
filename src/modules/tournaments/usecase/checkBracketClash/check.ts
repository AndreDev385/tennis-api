import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ContestClashRepository } from "../../repository/contestClashRepo";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";
import { TournamentRepository } from "../../repository/tournamentRepo";

type Req = {
    matchId: string;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class CheckClashIsFinished implements UseCase<Req, Res> {
    private readonly clashRepo: ContestClashRepository;
    private readonly matchRepo: TournamentMatchRepo;
    private readonly tournamentRepo: TournamentRepository;

    constructor(
        clashRepo: ContestClashRepository,
        matchRepo: TournamentMatchRepo,
        tournamentRepo: TournamentRepository
    ) {
        this.clashRepo = clashRepo;
        this.matchRepo = matchRepo;
        this.tournamentRepo = tournamentRepo;
    }

    async execute(request: Req): Promise<Res> {
        try {
            const maybeMatch = await this.matchRepo.get({
                matchId: request.matchId,
            });

            if (maybeMatch.isFailure) {
                return left(
                    new AppError.NotFoundError(maybeMatch.getErrorValue())
                );
            }

            const match = maybeMatch.getValue();
            let tournament;

            try {
                tournament = await this.tournamentRepo.get({
                    tournamentId: match.tournamentId.id.toString(),
                });
            } catch (e) {
                return left(new AppError.NotFoundError(e));
            }

            const maybeClash = await this.clashRepo.get({
                matchIds: [request.matchId],
            });

            console.log(maybeClash);

            if (maybeClash.isFailure) {
                return left(
                    new AppError.NotFoundError(maybeClash.getErrorValue())
                );
            }

            const clash = maybeClash.getValue();

            const result = await this.matchRepo.paginate(
                {
                    matchId: clash.matchIds
                        .getItems()
                        .map((r) => r.id.toString()),
                },
                { limit: 10, offset: 0 }
            );

            console.log(`matches from clash ${result.rows}`);

            const maybeIsFinish = clash.checkIsFinish(
                result.rows,
                tournament.rules
            );

            if (maybeIsFinish.isFailure) {
                return left(
                    Result.fail<string>(`${maybeIsFinish.getErrorValue()}`)
                );
            }

            if (clash.isFinish) {
                await this.clashRepo.save(clash);
            }

            console.log(
                `[CLASH IS FINISH]: ${maybeIsFinish.getValue()}`
            );

            return right(Result.ok());
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}
