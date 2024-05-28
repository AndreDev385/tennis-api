import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketNode } from "../../domain/brackets";
import { ContestClash } from "../../domain/contestClash";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { ContestClashRepository } from "../../repository/contestClashRepo";

type Req = {
    clashId: string;
}

type Res = Either<AppError.UnexpectedError | AppError.NotFoundError | Result<string>, Result<void>>;

export class UpdateClashBrackets implements UseCase<Req, Res> {

    private readonly bracketRepo: BracketsRepository;
    private readonly clashRepo: ContestClashRepository;

    constructor(bracketRepo: BracketsRepository, clashRepo: ContestClashRepository) {
        this.bracketRepo = bracketRepo;
        this.clashRepo = clashRepo;
    }

    async execute(request: Req): Promise<Res> {
        let bracket: BracketNode;
        let clash: ContestClash;

        try {
            try {
                bracket = await this.bracketRepo.get(
                    { clashId: request.clashId },
                    true
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const IS_ROOT = bracket.deep == 1;

            if (IS_ROOT) {
                return left(Result.fail<string>("Ultimo partido del draw"));
            }

            const maybeClash = await this.clashRepo.get({
                contestClashId: request.clashId,
            });

            if (maybeClash.isFailure) {
                return left(
                    new AppError.NotFoundError(maybeClash.getErrorValue())
                );
            }

            clash = maybeClash.getValue();

            if (clash.t1WonClash == null) {
                return left(Result.fail<string>("El encuentro no ha terminado"));
            }

            const WINNER_ADVANCE_TO_LEFT_IN_PARENT_NODE =
                bracket.placeThatAdvance % 2 == 0;

            if (WINNER_ADVANCE_TO_LEFT_IN_PARENT_NODE) {
                if (bracket.clash?.t1WonClash) {
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
                if (bracket.clash?.t1WonClash) {
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
