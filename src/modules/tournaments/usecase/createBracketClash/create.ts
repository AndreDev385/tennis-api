import { AppError } from "../../../../shared/core/AppError";
import {
    Either,
    Result,
    left,
    right,
} from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BracketNode } from "../../domain/brackets";
import { ContestClash } from "../../domain/contestClash";
import { TournamentMatchesIds } from "../../domain/tournamentMatches";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { ContestClashRepository } from "../../repository/contestClashRepo";

type Req = {
    bracketId: string;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class CreateBracketClash implements UseCase<Req, Res> {
    private readonly repo: ContestClashRepository;
    private readonly bracketRepo: BracketsRepository;

    constructor(repo: ContestClashRepository, bracketRepo: BracketsRepository) {
        this.repo = repo;
        this.bracketRepo = bracketRepo;
    }

    async execute(request: Req): Promise<Res> {
        let bracket: BracketNode;
        let clash: ContestClash;
        try {
            bracket = await this.bracketRepo.get(
                { id: request.bracketId },
                false
            );
        } catch (error) {
            return left(new AppError.NotFoundError(error));
        }

        const INCOMPLETE_BRACKET =
            !bracket.rightPlace.contestTeam ||
            !bracket.leftPlace.contestTeam;

        if (INCOMPLETE_BRACKET) {
            return left(
                Result.fail<string>(
                    "No se puede crear el partido de la llave seleccionada"
                )
            );
        }

        const maybeClash = ContestClash.create({
            matchIds: TournamentMatchesIds.create([]),
            team1: bracket.rightPlace.contestTeam!,
            team2: bracket.leftPlace.contestTeam!,
            contestId: bracket.contestId,
            isFinish: false,
        });

        if (maybeClash.isFailure) {
            return left(
                Result.fail<string>(`${maybeClash.getErrorValue()}`)
            );
        }

        clash = maybeClash.getValue();

        const result = await this.repo.save(clash);

        if (result.isFailure) {
            return left(new AppError.UnexpectedError(result.getErrorValue()));
        }

        return right(Result.ok());
    }
}
