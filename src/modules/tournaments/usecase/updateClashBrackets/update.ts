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
        let parentBracket: BracketNode;
        let clash: ContestClash;

        try {
            try {
                bracket = await this.bracketRepo.get(
                    { clashId: request.clashId }
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

            try {
                parentBracket = await this.bracketRepo.get(
                    { id: bracket.parentId!.toString() }
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const WINNER_ADVANCE_TO_LEFT_IN_PARENT_NODE =
                bracket.placeThatAdvance % 2 == 0;

            if (WINNER_ADVANCE_TO_LEFT_IN_PARENT_NODE) {
                if (clash.t1WonClash) {
                    parentBracket.leftPlace.setInscribed(
                        bracket.rightPlace.participant,
                        bracket.rightPlace.couple,
                        bracket.rightPlace.contestTeam
                    );
                } else {
                    parentBracket.leftPlace.setInscribed(
                        bracket.leftPlace.participant,
                        bracket.leftPlace.couple,
                        bracket.leftPlace.contestTeam
                    );
                }
            } else {
                if (clash.t1WonClash) {
                    parentBracket.rightPlace.setInscribed(
                        bracket.rightPlace.participant,
                        bracket.rightPlace.couple,
                        bracket.rightPlace.contestTeam
                    );
                } else {
                    parentBracket.rightPlace.setInscribed(
                        bracket.leftPlace.participant,
                        bracket.leftPlace.couple,
                        bracket.leftPlace.contestTeam
                    );
                }
            }

            await this.bracketRepo.save(parentBracket);

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
