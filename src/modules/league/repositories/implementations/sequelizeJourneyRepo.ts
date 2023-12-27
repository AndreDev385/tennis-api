import { JourneyModel } from "../../../../shared/infra/database/sequelize/models/Journey";
import { JourneyDto } from "../../dtos/journeyDto";
import { JourneyRepository } from "../journeyRepo";

export class SequelizeJourneyRepository implements JourneyRepository {

    async list(): Promise<JourneyDto[]> {
        const list = await JourneyModel.findAll({ attributes: ["name"] });

        return list;
    }
}
