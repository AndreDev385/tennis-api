import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../../users/domain/user";
import { UserRepository } from "../../../users/repositories/userRepo";
import { Club } from "../../domain/club";
import { Player } from "../../domain/player";
import { ClubRepository } from "../../repositories/clubRepo";
import { PlayerRepository } from "../../repositories/playerRepo";
import { CreatePlayerDto } from "./createPlayerDto";
import { CreatePlayerErrors } from "./createPlayerError";

type Response = Either<
    | AppError.UnexpectedError
    | AppError.NotFoundError
    | CreatePlayerErrors.ClubDoesNotExist
    | CreatePlayerErrors.PlayerAlreadyExistError
    | CreatePlayerErrors.UserDoesNotExist
    | CreatePlayerErrors.WrongCode
    | Result<string>,
    Result<void>
>;

export class CreatePlayer
    implements UseCase<CreatePlayerDto, Promise<Response>>
{
    userRepo: UserRepository;
    clubRepo: ClubRepository;
    playerRepo: PlayerRepository;

    constructor(
        userRepo: UserRepository,
        playerRepo: PlayerRepository,
        clubRepo: ClubRepository
    ) {
        this.userRepo = userRepo;
        this.playerRepo = playerRepo;
        this.clubRepo = clubRepo;
    }

    async execute(request: CreatePlayerDto): Promise<Response> {
        let user: User;
        let player: Player;
        let club: Club;

        try {
            try {
                user = await this.userRepo.getUserByUserId(request.userId);
            } catch (error) {
                return left(new CreatePlayerErrors.UserDoesNotExist());
            }

            try {
                club = await this.clubRepo.findById(request.clubId);
            } catch (error) {
                return left(
                    new CreatePlayerErrors.ClubDoesNotExist(request.clubId)
                );
            }

            if (club.code !== request.code) {
                return left(new CreatePlayerErrors.WrongCode(request.code));
            }

            try {
                const alreadyExist = await this.playerRepo.exist(
                    request.userId
                );
                if (alreadyExist) {
                    return left(
                        new CreatePlayerErrors.PlayerAlreadyExistError(
                            user.firstName.value
                        )
                    );
                }
            } catch (error) {
                return left(new AppError.UnexpectedError(error));
            }

            const playerOrError = Player.create({
                userId: user.userId,
                clubId: club.clubId,
                firstName: user.firstName,
                lastName: user.lastName,
            });

            if (playerOrError.isFailure) {
                return left(
                    Result.fail<string>(`${playerOrError.getErrorValue()}`)
                );
            }

            player = playerOrError.getValue();

            user.becomePlayer();
            await this.playerRepo.save(player);
            await this.userRepo.save(user);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
