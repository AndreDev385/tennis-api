import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../../users/domain/user";
import { UserRepository } from "../../../users/repositories/userRepo";
import { Player } from "../../domain/player";
import { PlayerDto } from "../../dtos/playerDto";
import { PlayerMap } from "../../mappers/playerMap";
import { PlayerRepository } from "../../repositories/playerRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<PlayerDto>
>;

export class GetPlayerByUserId implements UseCase<string, Promise<Response>> {
    private userRepo: UserRepository;
    private playerRepo: PlayerRepository;

    constructor(userRepo: UserRepository, playerRepo: PlayerRepository) {
        this.userRepo = userRepo;
        this.playerRepo = playerRepo;
    }

    async execute(userId: string): Promise<Response> {
        let user: User;
        let player: Player;

        try {
            try {
                user = await this.userRepo.get({ userId });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                player = await this.playerRepo.getPlayerByUserId(userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const dto = PlayerMap.toDto(player);

            return right(Result.ok(dto));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
