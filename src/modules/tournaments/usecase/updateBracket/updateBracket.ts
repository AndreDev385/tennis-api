import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import type { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../../league/domain/gameMode";
import { MatchStatuses } from "../../../league/domain/matchStatus";
import type { PlaceDto } from "../../dtos/bracketDto";
import { BracketsRepository } from "../../repository/bracketsRepo";
import { ContestClashRepository } from "../../repository/contestClashRepo";
import { ContestTeamRepository } from "../../repository/contestTeamRepo";
import { CoupleRepository } from "../../repository/coupleRepo";
import { ParticipantRepo } from "../../repository/participantRepo";
import { TournamentMatchRepo } from "../../repository/tournamentMatchRepo";
import { TournamentMatchTrackerRepo } from "../../repository/trackerRepo";

type Req = {
	id: string;
	rightPlace: Omit<PlaceDto, "value">;
	leftPlace: Omit<PlaceDto, "value">;
	mode: string;
};

type Res = Either<
	AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
	Result<void>
>;

export class UpdateBracket implements UseCase<Req, Res> {
	private readonly bracketRepo: BracketsRepository;
	private readonly participantRepo: ParticipantRepo;
	private readonly coupleRepo: CoupleRepository;
	private readonly contestTeamRepo: ContestTeamRepository;
	private readonly matchRepo: TournamentMatchRepo;
	private readonly trackerRepo: TournamentMatchTrackerRepo;
	private readonly clashRepo: ContestClashRepository;

	constructor(
		bracketRepo: BracketsRepository,
		participantRepo: ParticipantRepo,
		coupleRepo: CoupleRepository,
		contestTeamRepo: ContestTeamRepository,
		matchRepo: TournamentMatchRepo,
		trackerRepo: TournamentMatchTrackerRepo,
		clashRepo: ContestClashRepository,
	) {
		this.bracketRepo = bracketRepo;
		this.participantRepo = participantRepo;
		this.coupleRepo = coupleRepo;
		this.contestTeamRepo = contestTeamRepo;
		this.matchRepo = matchRepo;
		this.trackerRepo = trackerRepo;
		this.clashRepo = clashRepo;
	}

	async execute(req: Req): Promise<Res> {
		try {
			try {
				var bracket = await this.bracketRepo.get({ id: req.id });
			} catch (e) {
				return left(new AppError.NotFoundError(e));
			}

			let rightParticipant, leftParticipant;
			let rightCouple, leftCouple;
			let rightTeam, leftTeam;

			if (req.mode == GameMode.single) {
				try {
					rightParticipant = await this.participantRepo.get({
						participantId: req.rightPlace?.participant?.participantId,
					});
				} catch (e) {
					rightParticipant = null;
				}
				try {
					leftParticipant = await this.participantRepo.get({
						participantId: req.leftPlace?.participant?.participantId,
					});
				} catch (e) {
					leftParticipant = null;
				}
			}

			if (req.mode == GameMode.double) {
				try {
					rightCouple = await this.coupleRepo.get({
						coupleId: req.rightPlace?.couple?.coupleId,
					});
				} catch (e) {
					rightCouple = null;
				}
				try {
					leftCouple = await this.coupleRepo.get({
						coupleId: req.leftPlace?.couple?.coupleId,
					});
				} catch (e) {
					leftCouple = null;
				}
			}

			if (req.mode == GameMode.team) {
				if (req.rightPlace.contestTeam) {
					var rightResult = await this.contestTeamRepo.get({
						contestTeamId: req.rightPlace?.contestTeam?.contestTeamId,
					});
					rightTeam = rightResult.isSuccess ? rightResult.getValue() : null;
				}

				if (req.leftPlace.contestTeam) {
					var leftResult = await this.contestTeamRepo.get({
						contestTeamId: req.leftPlace?.contestTeam?.contestTeamId,
					});
					leftTeam = leftResult.isSuccess ? leftResult.getValue() : null;
				}
			}

			if (Object.values(req.rightPlace).some((x) => x)) {
				bracket.rightPlace.setInscribed(
					rightParticipant!,
					rightCouple!,
					rightTeam!,
				);
			}
			if (Object.values(req.leftPlace).some((x) => x)) {
				bracket.leftPlace.setInscribed(
					leftParticipant!,
					leftCouple!,
					leftTeam!,
				);
			}

			if (bracket.matchId) {
				const maybeMatch = await this.matchRepo.get({
					matchId: bracket.matchId?.id.toString(),
				});

				if (maybeMatch.isSuccess) {
					const match = maybeMatch.getValue();

					if (match.status.value != MatchStatuses.Waiting) {
						return left(
							Result.fail<string>(
								"No es posible actualizar una llave con un partido que no se encuentra en espera",
							),
						);
					}

					if (match.mode.value == GameMode.single) {
						match.changePlayer(bracket.rightPlace.participant!, 1);
						match.changePlayer(bracket.leftPlace.participant!, 2);
					}

					if (match.mode.value == GameMode.double) {
						match.changePlayer(bracket.rightPlace.couple!.p1, 1);
						match.changePlayer(bracket.rightPlace.couple!.p2, 3);
						match.changePlayer(bracket.leftPlace.couple!.p1, 2);
						match.changePlayer(bracket.leftPlace.couple!.p2, 4);
					}

					await this.matchRepo.save(match);
					await this.trackerRepo.save(match.tracker!);
				}
			}

			if (bracket.clashId) {
				const maybeClash = await this.clashRepo.get({
					contestClashId: bracket.clashId?.id.toString(),
				});

				if (maybeClash.isSuccess) {
					const clash = maybeClash.getValue();

					if (clash.matchIds.getItems().length > 0) {
						return left(
							Result.fail<string>(
								"No es posible actualizar una llave de equipos que ya tiene partidos creados",
							),
						);
					}

					clash.changeTeam(bracket.rightPlace.contestTeam!, 1);
					clash.changeTeam(bracket.leftPlace.contestTeam!, 2);
					await this.clashRepo.save(clash);
				}
			}

			await this.bracketRepo.save(bracket);

			return right(Result.ok());
		} catch (e) {
			return left(new AppError.UnexpectedError(e));
		}
	}
}
