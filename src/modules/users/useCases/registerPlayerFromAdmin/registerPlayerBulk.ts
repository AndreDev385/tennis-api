import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../../league/domain/club";
import { Player } from "../../../league/domain/player";
import { ClubRepository } from "../../../league/repositories/clubRepo";
import { PlayerRepository } from "../../../league/repositories/playerRepo";
import { User } from "../../domain/user";
import { PlayerRegisterRepository } from "../../repositories/playerRegisterRepo";
import { UserRepository } from "../../repositories/userRepo";
import { generatePassword } from "../../services/generatePassword";
import { CreateUserErrors } from "../createUser/createUserErrors";
import { createUser } from "./registerPlayer";
import { RegisterPlayerRequestDto } from "./registerPlayerDto";

type Response = Either<
  | AppError.UnexpectedError
  | CreateUserErrors.EmailAlreadyExistsError
  | Result<string>,
  Result<any>
>;

export class RegisterPlayerBulk implements UseCase<any, Response> {
  private readonly userRepo: UserRepository;
  private readonly clubRepo: ClubRepository;
  private readonly playerRepo: PlayerRepository;
  private readonly playerRegisterRepo: PlayerRegisterRepository;

  constructor(
    userRepo: UserRepository,
    clubRepo: ClubRepository,
    playerRepo: PlayerRepository,
    playerRegisterRepo: PlayerRegisterRepository,
  ) {
    this.userRepo = userRepo;
    this.clubRepo = clubRepo;
    this.playerRepo = playerRepo;
    this.playerRegisterRepo = playerRegisterRepo;
  }

  async execute(request: Array<RegisterPlayerRequestDto>): Promise<Response> {
    let users: Array<User> = [];
    let players: Array<Player> = [];
    try {
      for (const dto of request) {
        let user: User;
        let club: Club;
        let player: Player;

        try {
          club = await this.clubRepo.find({
            symbol: dto.clubSymbol,
            isSubscribed: true,
          });
        } catch (error) {
          return left(
            new AppError.NotFoundError(
              `${error}, asegurate de que el club ${dto.clubSymbol} se encuentra subscrito`,
            ),
          );
        }

        const randomPassword = generatePassword();
        const userResult = createUser({
          firstName: dto.firstName,
          lastName: dto.lastName,
          password: randomPassword,
          ciString: dto.ci,
        });
        if (userResult.isFailure) {
          return left(Result.fail<string>(`${userResult.getErrorValue()}`));
        }
        user = userResult.getValue();
        user.provisionalPasswordGranted(randomPassword);
        user.becomePlayer();

        let userAlreadyExist: User;
        let playerAlreadyExist: Player;

        try {
          userAlreadyExist = await this.userRepo.get({ ci: dto.ci });

          try {
            playerAlreadyExist = await this.playerRepo.getPlayerByUserId(
              userAlreadyExist.userId.id.toString(),
            );

            // both user and player already exist
            return left(
              Result.fail<string>(
                `El usuario ${userAlreadyExist.ci?.value} ya se encuentra registrado como jugador`,
              ),
            );
          } catch (error) {
            // user exist but player dont
            userAlreadyExist.becomePlayer();
            const playerResult = Player.create({
              firstName: userAlreadyExist.firstName,
              lastName: userAlreadyExist.lastName,
              clubId: club.clubId,
              userId: userAlreadyExist.userId,
            });

            if (playerResult.isFailure) {
              return left(
                Result.fail<string>(`${playerResult.getErrorValue()}`),
              );
            }
            player = playerResult.getValue();
            players.push(player);
          }
        } catch (error) {
          // both user and player dont exist
          const playerResult = Player.create({
            firstName: user.firstName,
            lastName: user.lastName,
            clubId: club.clubId,
            userId: user.userId,
          });

          if (playerResult.isFailure) {
            return left(Result.fail<string>(`${playerResult.getErrorValue()}`));
          }
          player = playerResult.getValue();
          users.push(user);
          players.push(player);
        }
      }

      const result = await this.playerRegisterRepo.registerBulk(users, players);

      if (result.isFailure) {
        return left(
          Result.fail<string>(
            "Ha ocurrido un error al registar a los jugadores",
          ),
        );
      }

      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
