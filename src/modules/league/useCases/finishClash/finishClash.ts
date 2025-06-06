import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { MatchStatuses } from "../../domain/matchStatus";
import { ClashRepository } from "../../repositories/clashRepo";
import { FinishClashRequest } from "./finishClashDtos";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class FinishClash implements UseCase<any, Response> {
    private clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(request: FinishClashRequest): Promise<Response> {
        let clash: Clash;
        const MATCH_PER_CLASH = 5;

        try {
            try {
                clash = await this.clashRepo.getClashById(request.clashId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            let matchFinished = clash.matchs.filter((m) => m.status.value == MatchStatuses.Finished || m.status.value == MatchStatuses.Canceled);

            if (matchFinished.length < MATCH_PER_CLASH) {
                console.log(`Aun quedan partidos por terminar (${MATCH_PER_CLASH - matchFinished.length})`)
                return left(
                    Result.fail<string>(
                        `Aun quedan partidos por terminar (${MATCH_PER_CLASH - matchFinished.length
                        })`
                    )
                );
            }

            clash.finishClash();

            await this.clashRepo.save(clash);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
