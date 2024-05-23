import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketNode } from "../../domain/brackets";
import { TournamentMatch } from "../../domain/tournamentMatch";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";

type Req = {
    matchId: string;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class UpdateMatchBrackets implements UseCase<Req, Res> {
    private readonly bracketRepo: BracketsRepository;
    private readonly matchRepo: TournamentMatchRepo;

    constructor(
        bracketRepo: BracketsRepository,
        matchRepo: TournamentMatchRepo
    ) {
        this.bracketRepo = bracketRepo;
        this.matchRepo = matchRepo;
    }

    async execute(request: Req): Promise<Res> {
        let bracket: BracketNode;
        let match: TournamentMatch;

        try {
            try {
                bracket = await this.bracketRepo.get(
                    { matchId: request.matchId },
                    true
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const IS_ROOT = bracket.deep == 1;

            if (IS_ROOT) {
                return left(Result.fail("Ultimo partido del draw"));
            }

            const maybeMatch = await this.matchRepo.get({
                matchId: request.matchId,
            });

            if (maybeMatch.isFailure) {
                return left(
                    new AppError.NotFoundError(maybeMatch.getErrorValue())
                );
            }

            match = maybeMatch.getValue();

            if (match.matchWon == null) {
                return left(Result.fail("El partido no ha terminado"));
            }

            const WINNER_ADVANCE_TO_LEFT_IN_PARENT_NODE =
                bracket.placeThatAdvance % 2 == 0;

            if (WINNER_ADVANCE_TO_LEFT_IN_PARENT_NODE) {
                if (bracket.match?.matchWon) {
                    bracket.parent!.leftPlace.setInscribed(
                        bracket.rightPlace.participant,
                        bracket.rightPlace.couple,
                        bracket.rightPlace.contestTeam
                    );
                } else {
                    bracket.parent!.leftPlace.setInscribed(
                        bracket.leftPlace.participant,
                        bracket.leftPlace.couple,
                        bracket.leftPlace.contestTeam
                    );
                }
            } else {
                if (bracket.match?.matchWon) {
                    bracket.parent!.rightPlace.setInscribed(
                        bracket.rightPlace.participant,
                        bracket.rightPlace.couple,
                        bracket.rightPlace.contestTeam
                    );
                } else {
                    bracket.parent!.rightPlace.setInscribed(
                        bracket.leftPlace.participant,
                        bracket.leftPlace.couple,
                        bracket.leftPlace.contestTeam
                    );
                }
            }

            await this.bracketRepo.save(bracket.parent!);

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
