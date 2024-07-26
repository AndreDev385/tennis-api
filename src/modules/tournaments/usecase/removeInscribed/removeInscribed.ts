import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Contest } from "../../domain/contest";
import { ContestTeam } from "../../domain/contestTeam";
import { Couple } from "../../domain/couple";
import { Inscribed } from "../../domain/inscribed";
import { Participant } from "../../domain/participant";
import { ContestTeamDto } from "../../dtos/contestTeamDto";
import { CoupleDto } from "../../dtos/coupleDto";
import { ParticipantDto } from "../../dtos/participantDto";
import { ContestRepository } from "../../repository/contestRepo";
import { ContestTeamRepository } from "../../repository/contestTeamRepo";
import { CoupleRepository } from "../../repository/coupleRepo";
import { ParticipantRepo } from "../../repository/participantRepo";

type Res = Either<
	AppError.UnexpectedError | AppError.NotFoundError,
	Result<void>
>;

type Req = {
	contestId: string;
	inscribed: {
		position?: number | null;
		participant?: ParticipantDto | null;
		couple?: CoupleDto | null;
		contestTeam?: ContestTeamDto | null;
	};
};

export class RemoveInscribed implements UseCase<Req, Res> {
	private readonly contestRepo: ContestRepository;
	private readonly participantRepo: ParticipantRepo;
	private readonly coupleRepo: CoupleRepository;
	private readonly contestTeamRepo: ContestTeamRepository;

	constructor(
		contestRepo: ContestRepository,
		participantRepo: ParticipantRepo,
		coupleRepo: CoupleRepository,
		contestTeamRepo: ContestTeamRepository,
	) {
		this.contestRepo = contestRepo;
		this.participantRepo = participantRepo;
		this.coupleRepo = coupleRepo;
		this.contestTeamRepo = contestTeamRepo;
	}

	async execute({ contestId, inscribed }: Req): Promise<Res> {
		let contest: Contest;
		let participant: Participant | null;
		let couple: Couple | null;
		let contestTeam: ContestTeam | null;

		console.log(inscribed.contestTeam, "TEAM");

		try {
			try {
				contest = await this.contestRepo.get({
					contestId,
				});
			} catch (e) {
				return left(new AppError.NotFoundError(e));
			}

			try {
				participant = await this.participantRepo.get({
					participantId: inscribed.participant?.participantId,
				});
			} catch (e) {}

			try {
				couple = await this.coupleRepo.get({
					coupleId: inscribed.couple?.coupleId,
				});
			} catch (e) {}

			try {
				const teamResult = await this.contestTeamRepo.get({
					contestTeamId: inscribed.contestTeam?.contestTeamId,
				});
				console.log(teamResult);
				if (teamResult.isSuccess) {
					contestTeam = teamResult.getValue();
					console.log(contestTeam);
				}
			} catch (e) {}

			const inscribedObj = Inscribed.create({
				position: inscribed.position,
				team: contestTeam!,
				couple: couple!,
				participant: participant!,
			});

			if (inscribedObj.isFailure) {
				return left(new AppError.NotFoundError("Participante no encontrado"));
			}

			console.log(contest.inscribed, "BEFORE");

			console.log(inscribedObj.getValue(), "VALUE TO DELTE");

			contest.removeInscribed([inscribedObj.getValue()]);

			console.log(contest.inscribed, "AFTER");

			await this.contestRepo.save(contest);

			return right(Result.ok());
		} catch (e) {
			return left(new AppError.UnexpectedError(e));
		}
	}
}
