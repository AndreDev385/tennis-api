import { AppError } from "../../../../shared/core/AppError";
import { Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserPassword } from "../../domain/password";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";
import { ChangeForgotterPasswordRequest } from "./dto";

export class ChangeForgottenPassword
    implements UseCase<ChangeForgotterPasswordRequest, any>
{
    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request: ChangeForgotterPasswordRequest) {
        let user: User;

        try {
            try {
                user = await this.userRepo.getUserByRecoveryPasswordCode(
                    request.code
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const passwordOrError = UserPassword.create({
                value: request.newPassword,
            });

            if (passwordOrError.isFailure) {
                return left(Result.fail(`${passwordOrError.getErrorValue()}`));
            }

            user.changePassword(passwordOrError.getValue());

            await this.userRepo.save(user);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
