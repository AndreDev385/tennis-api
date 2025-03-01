import models from "../../../../shared/infra/database/sequelize/models";
import { JourneyDto } from "../../dtos/journeyDto";
import { JourneyRepository } from "../journeyRepo";

export class SequelizeJourneyRepository implements JourneyRepository {
    async list(): Promise<JourneyDto[]> {
        const list = await models.JourneyModel.findAll({
            attributes: ["name"],
        });

        return list;
    }
}
