import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Match } from "../../domain/match";
import { MatchRepository } from "../../repositories/matchRepo";
import { UpdateMatchDto } from "./updateMatchDto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class UpdateMatch implements UseCase<UpdateMatchDto, Response> {
    private readonly matchRepo: MatchRepository;

    constructor(matchRepo: MatchRepository) {
        this.matchRepo = matchRepo;
    }

    async execute(request: UpdateMatchDto): Promise<Response> {
        let match: Match;
        try {
            try {
                match = await this.matchRepo.getMatchById(request.matchId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const mustNewMatch = Match.create(
                {
                    mode: match.mode,
                    sets: match.sets,
                    clashId: match.clashId,
                    player1: match.player1,
                    player2: request.player2,
                    player3: match.player3,
                    player4: request.player4,
                    surface: match.surface,
                    status: match.status,
                    category: match.category,
                    address: match.address,
                    tracker: match.tracker,
                    matchWon: match.matchWon,
                    createdAt: match.createdAt,
                    updatedAt: match.updatedAt,
                    gamesPerSet: match.gamesPerSet,
                    setsQuantity: match.setsQuantity,
                    superTieBreak: match.superTieBreak,
                },
                match.matchId.id
            );

            if (mustNewMatch.isFailure) {
                return left(
                    Result.fail<string>(`${mustNewMatch.getErrorValue()}`)
                );
            }

            await this.matchRepo.save(mustNewMatch.getValue());

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
