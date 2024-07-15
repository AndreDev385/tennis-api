import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CI } from "../../../users/domain/ci";
import { Name } from "../../../users/domain/names";
import { User } from "../../../users/domain/user";
import { UserRepository } from "../../../users/repositories/userRepo";
import { Participant } from "../../domain/participant";
import { ParticipantRepo } from "../../repository/participantRepo";

type CreateParticipantData = {
	firstName: string;
	lastName: string;
	ci: string;
};

type Req = CreateParticipantData;

type Res = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class CreateParticipant implements UseCase<Req, Res> {
	private readonly participantRepo: ParticipantRepo;
	private readonly userRepo: UserRepository;

	constructor(participantRepo: ParticipantRepo, userRepo: UserRepository) {
		this.participantRepo = participantRepo;
		this.userRepo = userRepo;
	}

	async execute(request: CreateParticipantData): Promise<Res> {
		let user: User;
		let participant: Participant;

		try {
			try {
				user = await this.userRepo.get({ ci: request.ci });
			} catch (e) {
				const mustFirstName = Name.create({
					value: request.firstName.trim(),
				});
				const mustLastName = Name.create({ value: request.lastName.trim() });
				const mustCI = CI.create({ value: request.ci });

				const result = Result.combine([mustFirstName, mustLastName, mustCI]);

				if (result.isFailure) {
					return left(result);
				}

				const mustUser = User.create({
					firstName: mustFirstName.getValue(),
					lastName: mustLastName.getValue(),
					ci: mustCI.getValue(),
				});

				if (mustUser.isFailure) {
					throw new Error(`${mustUser.getErrorValue()}`);
				}

				user = mustUser.getValue();
				await this.userRepo.save(mustUser.getValue());
			}

			try {
				await this.participantRepo.get({
					userId: user.userId.id.toString(),
				});

				return left(Result.fail<string>("Este participante ya existe"));
			} catch (_) {
				participant = Participant.create({
					user,
				}).getValue();
				await this.participantRepo.save(participant);
			}

			return right(Result.ok());
		} catch (e) {
			return left(new AppError.UnexpectedError(e));
		}
	}
}
