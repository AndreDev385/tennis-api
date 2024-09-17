import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../../league/domain/club";
import { Player } from "../../../league/domain/player";
import { ClubRepository } from "../../../league/repositories/clubRepo";
import { PlayerRepository } from "../../../league/repositories/playerRepo";
import { UserEmail } from "../../../users/domain/email";
import { User } from "../../../users/domain/user";
import { Name } from "../../domain/names";
import { UserPassword } from "../../domain/password";
import { PlayerRegisterRepository } from "../../repositories/playerRegisterRepo";
import { UserRepository } from "../../repositories/userRepo";
import { generatePassword } from "../../services/generatePassword";
import { CreateUserErrors } from "../createUser/createUserErrors";
import { RegisterPlayerRequestDto } from "./registerPlayerDto";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<any>>;

export class RegisterPlayer implements UseCase<any, Response> {
    private readonly userRepo: UserRepository;
    private readonly clubRepo: ClubRepository;
    private readonly playerRegisterRepo: PlayerRegisterRepository;
    private readonly playerRepo: PlayerRepository;

    constructor(
        userRepo: UserRepository,
        playerRepo: PlayerRepository,
        clubRepo: ClubRepository,
        playerRegisterRepo: PlayerRegisterRepository
    ) {
        this.userRepo = userRepo;
        this.playerRepo = playerRepo
        this.clubRepo = clubRepo;
        this.playerRegisterRepo = playerRegisterRepo;
    }

    async execute({
        firstName,
        lastName,
        email,
        clubSymbol,
    }: RegisterPlayerRequestDto): Promise<Response> {
        let user: User;
        let club: Club;
        let player: Player;

        let usersToCreate: User[] = [];
        let playerToCreate: Player[] = [];

        try {
            try {
                club = await this.clubRepo.find({
                    symbol: clubSymbol,
                    isSubscribed: true,
                });
            } catch (error) {
                return left(
                    new AppError.NotFoundError(
                        `${error}, asegurate de que el club ${clubSymbol} se encuentra subscrito`
                    )
                );
            }

            const userResult = this.createUser(firstName, lastName, email);

            if (userResult.isFailure) {
                return left(Result.fail<string>(`${userResult.getErrorValue()}`));
            }

            user = userResult.getValue().user;
            user.provisionalPasswordGranted(userResult.getValue().password);

            const playerResult = Player.create({
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user.userId,
                clubId: club.clubId,
            });

            if (playerResult.isFailure) {
                return left(
                    Result.fail<string>(`${playerResult.getErrorValue()}`)
                );
            }

            player = playerResult.getValue();

            let userAlreadyExist: User;
            let playerAlreadyExist: Player;

            try {
                userAlreadyExist = await this.userRepo.getUserByEmail(
                    user.email!
                );

                try {
                    playerAlreadyExist =
                        await this.playerRepo.getPlayerByUserId(
                            userAlreadyExist.userId.id.toString()
                        );

                    return left(
                        new CreateUserErrors.EmailAlreadyExistsError(
                            user.email!.value
                        )
                    );
                } catch (error) {
                    playerToCreate.push(player);
                }
            } catch (error) {
                usersToCreate.push(user);
                playerToCreate.push(player);
            }

            const result = await this.playerRegisterRepo.registerBulk(usersToCreate, playerToCreate);

            if (result.isFailure) {
                return left(
                    Result.fail<string>(
                        "Ha ocurrido un error al registar al jugador"
                    )
                );
            }

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

    createUser(
        firstName: string,
        lastName: string,
        email: string,
    ): Result<{ user: User, password: string }> {
        const randomPassword = generatePassword();
        const firstNameResult = Name.create({ value: firstName });
        const lastNameResult = Name.create({ value: lastName });
        const emailResult = UserEmail.create(email);
        const passwordResult = UserPassword.create({
            value: randomPassword,
        });

        const dtoResult = Result.combine([
            firstNameResult,
            lastNameResult,
            emailResult,
            passwordResult,
        ]);

        if (dtoResult.isFailure) {
            return Result.fail(dtoResult.getErrorValue() as string);
        }

        const createUserResult = User.create({
            firstName: firstNameResult.getValue(),
            lastName: lastNameResult.getValue(),
            email: emailResult.getValue(),
            password: passwordResult.getValue(),
            isPlayer: true,
        });

        if (createUserResult.isFailure) {
            return Result.fail(`${createUserResult.getErrorValue()}`)
        }

        return Result.ok({ user: createUserResult.getValue(), password: randomPassword })
    }
}
