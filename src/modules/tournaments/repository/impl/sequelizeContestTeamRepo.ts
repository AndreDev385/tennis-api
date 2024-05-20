import models from "../../../../shared/infra/database/sequelize/models";
import { Result } from "../../../../shared/core/Result";
import { ContestTeam } from "../../domain/contestTeam";
import { ContestTeamQuery, ContestTeamRepository } from "../contestTeamRepo";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { ParticipantsIds } from "../../domain/participantsIds";
import { ParticipantId } from "../../domain/participantId";
import { ContestId } from "../../domain/contestId";

export class SequelizeContestTeamRepository implements ContestTeamRepository {
    async get(q: ContestTeamQuery): Promise<Result<ContestTeam>> {
        const data = await models.ContestTeamModel.findOne({
            where: q,
        });

        if (!data) {
            return Result.fail("Equipo no encontrado");
        }

        return ContestTeam.create(
            {
                contestId: ContestId.create(
                    new UniqueEntityID(data.contestId)
                ).getValue(),
                name: data.name,
                participantsIds: ParticipantsIds.create(
                    data.participantsIds.map((id) =>
                        ParticipantId.create(new UniqueEntityID(id)).getValue()
                    )
                ),
            },
            new UniqueEntityID(data.contestTeamId)
        );
    }
    async save(team: ContestTeam): Promise<Result<void>> {
        try {
            const exist = await models.ContestTeamModel.findOne({
                where: { contestTeamId: team.contestTeamId.id.toString() },
            });

            const raw = {
                contestTeamId: team.contestTeamId.id.toString(),
                contestId: team.contestId.id.toString(),
                name: team.name,
                participantsIds: team.participantsIds
                    .getItems()
                    .map((i) => i.id.toString()),
            };

            if (exist) {
                await models.ContestTeamModel.update(raw, {
                    where: { contestTeamId: team.contestTeamId.id.toString() },
                });
            } else {
                const instance = await models.ContestTeamModel.create(raw);
                await instance.save();
            }

            return Result.ok();
        } catch (error) {
            console.log(`SAVE TEAM ${error}`);
            return Result.fail("Error al guardar equipo");
        }
    }

    async list(q: ContestTeamQuery): Promise<ContestTeam[]> {
        const list = await models.ContestTeamModel.findAll({ where: q });

        return list.map((r) =>
            ContestTeam.create(
                {
                    contestId: ContestId.create(
                        new UniqueEntityID(r.contestId)
                    ).getValue(),
                    name: r.name,
                    participantsIds: ParticipantsIds.create(
                        r.participantsIds.map((id) =>
                            ParticipantId.create(
                                new UniqueEntityID(id)
                            ).getValue()
                        )
                    ),
                },
                new UniqueEntityID(r.contestTeamId)
            ).getValue()
        );
    }

    async delete(q: ContestTeamQuery): Promise<Result<number>> {
        try {
            const rows = await models.ContestTeamModel.destroy({ where: q });

            return Result.ok(rows);
        } catch (error) {
            return Result.fail("Error al eliminar el equipo");
        }
    }
}
