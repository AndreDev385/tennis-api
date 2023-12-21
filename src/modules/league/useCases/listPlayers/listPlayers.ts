import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Player } from "../../domain/player";
import { PlayerDto } from "../../dtos/playerDto";
import { PlayerMap } from "../../mappers/playerMap";
import { PlayerQuery, PlayerRepository } from "../../repositories/playerRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<PlayerDto>>>;

export class ListPlayers implements UseCase<any, Promise<Response>> {
    private playerRepo: PlayerRepository;

    constructor(playerRepo: PlayerRepository) {
        this.playerRepo = playerRepo;
    }

    async execute(request?: any): Promise<Response> {
        const query: PlayerQuery = {};

        for (const [key, value] of Object.entries(request)) {
            if (key == "clubId") {
                query.clubId = value as string;
            }
            if (key == "includeDeleted") {
                query.includeDeleted = true;
            }
        }

        try {
            const domainList = await this.playerRepo.list(query);

            const dtoList = domainList.map((p: Player) => PlayerMap.toDto(p));

            return right(Result.ok(dtoList));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
