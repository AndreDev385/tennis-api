import { AppError } from "../../../../shared/core/AppError";
import {
    Either,
    Result,
    left,
    right,
} from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../domain/club";
import { Player } from "../../domain/player";
import { ClubRepository } from "../../repositories/clubRepo";
import { PlayerRepository } from "../../repositories/playerRepo";

type Response = Either<
    AppError.NotFoundError | AppError.UnexpectedError | Result<string>,
    Result<void>
>;

type ChangePlayerClubDto = {
    playerId: string;
    clubId: string;
};

export class ChangePlayerClub
    implements UseCase<ChangePlayerClubDto, Response>
{
    private readonly playerRepo: PlayerRepository;
    private readonly clubRepo: ClubRepository;

    constructor(playerRepo: PlayerRepository, clubRepo: ClubRepository) {
        this.playerRepo = playerRepo;
        this.clubRepo = clubRepo;
    }

    async execute(request: ChangePlayerClubDto): Promise<Response> {
        let player: Player;
        let club: Club;
        try {
            try {
                player = await this.playerRepo.getPlayerById(request.playerId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                club = await this.clubRepo.findById(request.clubId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (player.clubId == club.clubId) {
                return left(
                    Result.fail<string>(
                        `${player.firstName} ${player.lastName} ya pertenece al club ${club.name}`
                    )
                );
            }

            player.changeClub(club.clubId);

            await this.playerRepo.save(player);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
