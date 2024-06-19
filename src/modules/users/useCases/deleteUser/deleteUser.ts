import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Participant } from "../../../tournaments/domain/participant";
import { ParticipantRepo } from "../../../tournaments/repository/participantRepo";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class DeleteUser implements UseCase<string, Response> {
    private userRepo: UserRepository;
    private participantRepo: ParticipantRepo;

    constructor(userRepo: UserRepository, participantRepo: ParticipantRepo) {
        this.userRepo = userRepo;
        this.participantRepo = participantRepo;
    }

    async execute(userId: string): Promise<Response> {
        let user: User;
        let participant: Participant | null = null;

        try {
            try {
                user = await this.userRepo.get({ userId });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (user.isDeleted) {
                return left(
                    Result.fail<string>("El usuario ya se encuentra eliminado")
                );
            }

            try {
                participant = await this.participantRepo.get({ userId });
            } catch (e) { }

            if (!user.isPlayer && !participant) {
                await this.userRepo.delete(user.userId.id.toString());
            } else {
                user.delete();
                participant?.delete();
                await this.userRepo.save(user);
                await this.participantRepo.save(participant!);
            }

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
