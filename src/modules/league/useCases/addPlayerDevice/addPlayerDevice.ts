import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Player } from "../../domain/player";
import { PlayerRepository } from "../../repositories/playerRepo";

type AddPlayerDeviceReq = {
    token: string;
    userId: string;
};

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class AddPlayerDevice implements UseCase<AddPlayerDeviceReq, Response> {
    private readonly playerRepo: PlayerRepository;

    constructor(repo: PlayerRepository) {
        this.playerRepo = repo;
    }

    async execute(request: AddPlayerDeviceReq): Promise<Response> {
        let player: Player;
        try {
            try {
                player = await this.playerRepo.getPlayerByUserId(request.userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            player.addDevice(request.token);

            await this.playerRepo.save(player);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
