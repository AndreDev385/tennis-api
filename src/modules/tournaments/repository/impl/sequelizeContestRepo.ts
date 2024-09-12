import models from "../../../../shared/infra/database/sequelize/models";
import { GameMode } from "../../../league/domain/gameMode";
import { Contest } from "../../domain/contest";
import { Inscribed } from "../../domain/inscribed";
import { ContestDto } from "../../dtos/contestsDto";
import { ContestMap } from "../../mapper/ContestMap";
import { ContestQuery, ContestRepository } from "../contestRepo";
import { ContestTeamRepository } from "../contestTeamRepo";
import { CoupleRepository } from "../coupleRepo";
import { ParticipantRepo } from "../participantRepo";

export class SequlizeContestRepository implements ContestRepository {
	private readonly participantRepo: ParticipantRepo;
	private readonly coupleRepo: CoupleRepository;
	private readonly teamRepo: ContestTeamRepository;

	constructor(
		participantRepo: ParticipantRepo,
		coupleRepo: CoupleRepository,
		teamRepo: ContestTeamRepository,
	) {
		this.participantRepo = participantRepo;
		this.coupleRepo = coupleRepo;
		this.teamRepo = teamRepo;
	}

	async delete(contestId: string): Promise<void> {
		await models.ContestModel.destroy({ where: { contestId } });
	}

	async list(q: ContestQuery): Promise<ContestDto[]> {
		const contests = await models.ContestModel.findAll({ where: q });

		return contests.map((c) => ContestMap.forQuery(c));
	}

	async get(q: ContestQuery): Promise<Contest> {
		const contestData = await models.ContestModel.findOne({
			where: q,
			include: [
				{
					model: models.ParticipantModel,
					through: { attributes: ["position"] },
					order: [["createdAt", "ASC"]],
				},
				{
					model: models.CoupleModel,
					through: { attributes: ["position"] },
					order: [["createdAt", "ASC"]],
				},
				{
					model: models.ContestTeamModel,
					through: { attributes: ["position"] },
					order: [["createdAt", "ASC"]],
				},
			],
		});

		if (!contestData) {
			throw new Error("Competencia no encontrada");
		}

		let inscribed: Inscribed[] = [];

		if (contestData.mode == GameMode.single) {
			for (const p of contestData.participants ?? []) {
				const participant = await this.participantRepo.get({
					userId: p.userId,
				});
				inscribed.push(
					Inscribed.create({
						position: p.participantInscription.position,
						participant,
					}).getValue(),
				);
			}
		}

		if (contestData.mode == GameMode.double) {
			for (const c of contestData.couples ?? []) {
				const couple = await this.coupleRepo.get({
					coupleId: c.coupleId,
				});
				const mustInscribed = Inscribed.create({
					position: c.coupleInscription.position,
					couple: couple,
				}).getValue();
				inscribed.push(mustInscribed);
			}
		}

		if (contestData.mode == GameMode.team) {
			for (const t of contestData.contestTeams ?? []) {
				const team = await this.teamRepo.get({
					contestTeamId: t.contestTeamId,
				});

				const mustInscribed = Inscribed.create({
					position: t.teamInscription.position,
					team: team.getValue(),
				}).getValue();
				inscribed.push(mustInscribed);
			}
		}

		return ContestMap.toDomain(contestData, inscribed)!;
	}

	async save(contest: Contest): Promise<void> {
		const raw = ContestMap.toPersistance(contest);

		const dbData = await models.ContestModel.findByPk(raw.contestId, {
			include: [
				{
					model: models.ParticipantModel,
					through: { attributes: ["position"] },
				},
				{
					model: models.CoupleModel,
					through: { attributes: ["position"] },
				},
				{
					model: models.ContestTeamModel,
					through: { attributes: ["position"] },
				},
			],
		});

		if (dbData) {
			if (contest.inscribed.getNewItems().length > 0) {
				if (contest.mode.value == GameMode.single) {
					await Promise.all(
						contest.inscribed
							.getItems()
							.map((i) =>
								(dbData as any).addParticipant(
									i.participant!.participantId.id.toString(),
									{ through: { position: i.position } },
								),
							),
					);
				}

				if (contest.mode.value == GameMode.double) {
					await Promise.all(
						contest.inscribed.getItems().map((i) =>
							(dbData as any).addCouple(i.couple!.coupleId.id.toString(), {
								through: { position: i.position },
							}),
						),
					);
				}

				if (contest.mode.value == GameMode.team) {
					await Promise.all(
						contest.inscribed
							.getItems()
							.map((i) =>
								(dbData as any).addContestTeam(
									i.team!.contestTeamId.id.toString(),
									{ through: { position: i.position } },
								),
							),
					);
				}
			}
			if (contest.inscribed.getRemovedItems().length > 0) {
				if (contest.mode.value == GameMode.single) {
					await Promise.all(
						contest.inscribed
							.getRemovedItems()
							.map((i) =>
								(dbData as any).removeParticipant(
									i.participant!.participantId.id.toString(),
									{ through: { position: i.position } },
								),
							),
					);
				}
				if (contest.mode.value == GameMode.double) {
					await Promise.all(
						contest.inscribed.getRemovedItems().map((i) =>
							(dbData as any).removeCouple(i.couple!.coupleId.id.toString(), {
								through: { position: i.position },
							}),
						),
					);
				}

				if (contest.mode.value == GameMode.team) {
					await Promise.all(
						contest.inscribed
							.getRemovedItems()
							.map((i) =>
								(dbData as any).removeContestTeam(
									i.team!.contestTeamId.id.toString(),
									{ through: { position: i.position } },
								),
							),
					);
				}
			}
			await models.ContestModel.update(raw, {
				where: { contestId: raw.contestId },
			});
		} else {
			const instance = await models.ContestModel.create(raw, {
				include: models.ParticipantModel,
			});
			await instance.save();
		}
	}
}
