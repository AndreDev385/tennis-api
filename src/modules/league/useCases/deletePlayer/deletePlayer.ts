import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Player } from "../../domain/player";
import { PlayerRepository } from "../../repositories/playerRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

type DeletePlayerDto = {
    playerId: string;
};

export class DeletePlayer implements UseCase<DeletePlayerDto, Response> {
    private readonly repo: PlayerRepository;

    constructor(repo: PlayerRepository) {
        this.repo = repo;
    }

    async execute(request: DeletePlayerDto): Promise<Response> {
        let player: Player;

        try {
            try {
                player = await this.repo.getPlayerById(request.playerId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            player.delete();

            await this.repo.save(player);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
