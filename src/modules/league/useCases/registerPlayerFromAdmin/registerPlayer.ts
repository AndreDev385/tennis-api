import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { UserEmail } from '../../../users/domain/email';
import { Name } from '../../../users/domain/names';
import { UserPassword } from '../../../users/domain/password';
import { User } from '../../../users/domain/user';
import { UserRepository } from '../../../users/repositories/userRepo';
import { generatePassword } from '../../../users/services/generatePassword';
import { RegisterPlayerRequestDto } from '../../../users/useCases/registerPlayerFromAdmin/registerPlayerDto';
import { Club } from '../../domain/club';
import { Player } from '../../domain/player';
import { ClubRepository } from '../../repositories/clubRepo';
import { PlayerRepository } from '../../repositories/playerRepo';

type Response = Either<AppError.UnexpectedError | Result<string>, Result<any>>;

export class RegisterPlayer implements UseCase<any, Response> {
  private readonly userRepo: UserRepository;
  private readonly playerRepo: PlayerRepository;
  private readonly clubRepo: ClubRepository;

  constructor(
    userRepo: UserRepository,
    playerRepo: PlayerRepository,
    clubRepo: ClubRepository
  ) {
    this.clubRepo = clubRepo;
    this.userRepo = userRepo;
    this.playerRepo = playerRepo;
  }

  async execute(request: RegisterPlayerRequestDto): Promise<Response> {
    let user: User;
    let club: Club;
    let player: Player;

    try {
      const firstNameOrError = Name.create({
        value: request.firstName,
      });
      const lastNameOrError = Name.create({
        value: request.lastName,
      });
      const emailOrError = UserEmail.create(request.email);

      const dto = Result.combine([firstNameOrError, lastNameOrError, emailOrError]);

      if (dto.isFailure) {
        return left(Result.fail<string>(dto.getErrorValue()));
      }

      const randomPassword = generatePassword();
      const password = UserPassword.create({
        value: randomPassword,
      }).getValue();

      const userOrError = User.create({
        firstName: firstNameOrError.getValue(),
        lastName: lastNameOrError.getValue(),
        email: emailOrError.getValue(),
        password,
      });

      if (userOrError.isFailure) {
        return left(Result.fail<string>(`${userOrError.getErrorValue()}`));
      }

      user = userOrError.getValue();
      user.becomePlayer();

      try {
        await this.userRepo.save(user);
      } catch (error) {
        return left(new AppError.UnexpectedError(error));
      }

      try {
        club = await this.clubRepo.find({ symbol: request.clubSymbol });
      } catch (error) {
        return left(new AppError.NotFoundError(error));
      }

      const playerOrError = Player.create({
        userId: user.userId,
        clubId: club.clubId,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      if (playerOrError.isFailure) {
        return left(Result.fail<string>(`${playerOrError.getErrorValue()}`));
      }

      player = playerOrError.getValue();

      try {
        await this.playerRepo.save(player);
      } catch (error) {
        return left(new AppError.UnexpectedError(error));
      }

      return right(Result.ok());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
