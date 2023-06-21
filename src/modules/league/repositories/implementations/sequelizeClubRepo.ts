import { ClubDto } from "../../dtos/clubDto";
import { ClubRepository } from "../clubRepo";

export class SequelizeClubRepository implements ClubRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async list(): Promise<ClubDto[]> {
        const ClubModel = this.models.ClubModel;

        console.log(ClubModel);

        const list = await ClubModel.findAll({});

        return list;
    }
}
