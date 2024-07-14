import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CoupleData } from "../../../../shared/infra/database/sequelize/models/tournaments/Couple";
import { Couple } from "../../domain/couple";
import { Participant } from "../../domain/participant";
import { CoupleRepository } from "../../repository/coupleRepo";
import { ParticipantRepo } from "../../repository/participantRepo";

type Req = CoupleData;

type Res = Either<
	AppError.UnexpectedError | AppError.NotFoundError,
	Result<void>
>;

export class UpdateCouple implements UseCase<Req, Res> {
	private readonly coupleRepo: CoupleRepository;
	private readonly participantRepo: ParticipantRepo;

	constructor(coupleRepo: CoupleRepository, participantRepo: ParticipantRepo) {
		this.coupleRepo = coupleRepo;
		this.participantRepo = participantRepo;
	}

	async execute(request: CoupleData): Promise<Res> {
		let couple: Couple;
		let p1: Participant;
		let p2: Participant;
		try {
			try {
				couple = await this.coupleRepo.get({ coupleId: request.coupleId });
			} catch (e) {
				return left(new AppError.NotFoundError(e));
			}

			try {
				p1 = await this.participantRepo.get({ participantId: request.p1Id });
			} catch (e) {
				left(new AppError.NotFoundError(e));
			}

			try {
				p2 = await this.participantRepo.get({ participantId: request.p2Id });
			} catch (e) {
				left(new AppError.NotFoundError(e));
			}

			couple.setP1(p1!);
			couple.setP2(p2!);

			await this.coupleRepo.save(couple);

			return right(Result.ok());
		} catch (e) {
			return left(new AppError.UnexpectedError(e));
		}
	}
}
