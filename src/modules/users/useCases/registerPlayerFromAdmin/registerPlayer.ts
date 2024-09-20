import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Club } from "../../../league/domain/club";
import { Player } from "../../../league/domain/player";
import { ClubRepository } from "../../../league/repositories/clubRepo";
import { PlayerRepository } from "../../../league/repositories/playerRepo";
import { User } from "../../../users/domain/user";
import { CI } from "../../domain/ci";
import { Name } from "../../domain/names";
import { UserPassword } from "../../domain/password";
import { PlayerRegisterRepository } from "../../repositories/playerRegisterRepo";
import { UserRepository } from "../../repositories/userRepo";
import { generatePassword } from "../../services/generatePassword";
import { RegisterPlayerRequestDto } from "./registerPlayerDto";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class RegisterPlayer implements UseCase<RegisterPlayerRequestDto, Response> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly playerRepo: PlayerRepository,
        private readonly clubRepo: ClubRepository,
        private readonly playerRegisterRepo: PlayerRegisterRepository
    ) {
        this.userRepo = userRepo;
        this.playerRepo = playerRepo
        this.clubRepo = clubRepo;
        this.playerRegisterRepo = playerRegisterRepo;
    }

    async execute({
        firstName,
        lastName,
        ci,
        clubSymbol,
    }: RegisterPlayerRequestDto): Promise<Response> {
        let user: User;
        let club: Club;

        let userAlreadyExist: User;
        let playerAlreadyExist: Player;

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

            const randomPassword = generatePassword();
            const userResult = createUser({ firstName, lastName, password: randomPassword, ciString: ci });
            if (userResult.isFailure) {
                return left(Result.fail<string>(`${userResult.getErrorValue()}`));
            }
            user = userResult.getValue();
            user.provisionalPasswordGranted(randomPassword);

            try {
                userAlreadyExist = await this.userRepo.get({ ci });

                // User already exist
                try {
                    playerAlreadyExist =
                        await this.playerRepo.getPlayerByUserId(
                            userAlreadyExist.userId.id.toString()
                        );

                    // Player already exist
                    if (playerAlreadyExist.isDeleted) {
                        playerAlreadyExist.restore(club.clubId);

                        await this.playerRepo.save(playerAlreadyExist);
                        return right(Result.ok())
                    }

                    return left(Result.fail<string>(`El usuario ${userAlreadyExist.ci?.value} ya se encuentra registrado como jugador`));
                } catch (error) {
                    // player doesn't exist
                    const playerResult = Player.create({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        clubId: club.clubId,
                        userId: userAlreadyExist.userId,
                    })

                    if (playerResult.isFailure) {
                        return left(Result.fail<string>(`${playerResult.getErrorValue()}`))
                    }
                    await this.playerRepo.save(playerResult.getValue());
                    return right(Result.ok<void>());
                }
            } catch (error) { }
            // user doesn't exist

            const playerResult = Player.create({
                firstName: user.firstName,
                lastName: user.lastName,
                clubId: club.clubId,
                userId: user.userId,
            })

            if (playerResult.isFailure) {
                return left(Result.fail<string>(`${playerResult.getErrorValue()}`))
            }

            const result = await this.playerRegisterRepo.register(user, playerResult.getValue());

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

export function createUser({
    firstName,
    lastName,
    password,
    ciString,
}: {
    firstName: string,
    lastName: string,
    password: string,
    ciString: string,
}): Result<User> {
    const firstNameResult = Name.create({ value: firstName });
    const lastNameResult = Name.create({ value: lastName });
    const passwordResult = UserPassword.create({
        value: password,
    });
    const ci = CI.create({ value: ciString });

    const dtoResult = Result.combine([
        firstNameResult,
        lastNameResult,
        passwordResult,
        ci,
    ]);

    if (dtoResult.isFailure) {
        return Result.fail(dtoResult.getErrorValue() as string);
    }

    const createUserResult = User.create({
        firstName: firstNameResult.getValue(),
        lastName: lastNameResult.getValue(),
        ci: ci.getValue(),
        password: passwordResult.getValue(),
        isPlayer: true,
    });

    if (createUserResult.isFailure) {
        return Result.fail(`${createUserResult.getErrorValue()}`)
    }

    return Result.ok(createUserResult.getValue())
}
