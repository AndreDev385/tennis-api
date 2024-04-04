import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../../league/domain/club";
import { Player } from "../../../league/domain/player";
import { ClubRepository } from "../../../league/repositories/clubRepo";
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

    constructor(
        userRepo: UserRepository,
        clubRepo: ClubRepository,
        playerRegisterRepo: PlayerRegisterRepository
    ) {
        this.userRepo = userRepo;
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

        const randomPassword = generatePassword();

        try {
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
                return left(Result.fail<string>(dtoResult.getErrorValue()));
            }

            const createUserResult = User.create({
                firstName: firstNameResult.getValue(),
                lastName: lastNameResult.getValue(),
                email: emailResult.getValue(),
                password: passwordResult.getValue(),
                isPlayer: true,
            });

            if (createUserResult.isFailure) {
                return left(
                    Result.fail<string>(`${createUserResult.getErrorValue()}`)
                );
            }

            user = createUserResult.getValue();
            user.provisionalPasswordGranted(randomPassword);

            try {
                const userAlreadyExist = await this.userRepo.getUserByEmail(
                    user.email!
                );
                if (userAlreadyExist) {
                    return left(
                        new CreateUserErrors.EmailAlreadyExistsError(
                            user.email!.value
                        )
                    );
                }
            } catch (error) { }

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

            const playerResult = Player.create({
                firstName: firstNameResult.getValue(),
                lastName: lastNameResult.getValue(),
                clubId: club.clubId,
                userId: user.userId,
            });

            if (playerResult.isFailure) {
                return left(
                    Result.fail<string>(`${playerResult.getErrorValue()}`)
                );
            }

            player = playerResult.getValue();

            const result = await this.playerRegisterRepo.register(user, player);

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
}
