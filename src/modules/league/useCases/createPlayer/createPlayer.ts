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
                club = await this.clubRepo.find({ code: request.code });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                const alreadyExist = await this.playerRepo.getPlayerByUserId(
                    request.userId
                );

                /*
                 * Case: user is a deleted player
                 * restore player and assign clubId
                 */
                if (alreadyExist.isDeleted) {
                    alreadyExist.restore(club.clubId);

                    return right(Result.ok<void>());
                } else {
                    // this user is already a player and is not deleted
                    return left(Result.fail<string>("Este jugador ya esta registrado!"));
                }
            } catch (error) { }

            if (!club.isSubscribed) {
                return left(
                    Result.fail<string>("El club no se encuentra subscrito")
                );
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
