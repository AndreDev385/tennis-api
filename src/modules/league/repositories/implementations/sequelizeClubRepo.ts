import { Club } from "../../domain/club";
import { ClubDto } from "../../dtos/clubDto";
import { ClubMap } from "../../mappers/clubMap";
import { ClubRepository } from "../clubRepo";

export class SequelizeClubRepository implements ClubRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async findById(clubId: string): Promise<Club> {
        const ClubModel = this.models.ClubModel;

        const club = await ClubModel.findOne({ where: { clubId } });

        if (!club) {
            throw new Error("Club no encontrado");
        }

        return ClubMap.toDomain(club);
    }

    async list(query: any = {}): Promise<ClubDto[]> {
        const ClubModel = this.models.ClubModel;

        const list = await ClubModel.findAll(query);

        return list;
    }
}
