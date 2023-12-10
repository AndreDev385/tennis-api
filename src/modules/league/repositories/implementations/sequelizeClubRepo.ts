import { ClubModel } from "../../../../shared/infra/database/sequelize/models/Club";
import { Club } from "../../domain/club";
import { ClubDto } from "../../dtos/clubDto";
import { ClubMap } from "../../mappers/clubMap";
import { ListQueryDto } from "../../useCases/listClubs/requestListQueryDto";
import { ClubQuery, ClubRepository } from "../clubRepo";

export class SequelizeClubRepository implements ClubRepository {

    async find(query: ClubQuery): Promise<Club> {
        const club = await ClubModel.findOne({ where: query as any });

        if (!club) {
            throw new Error("Club no encontrado");
        }

        return ClubMap.toDomain(club)!;
    }

    async findById(clubId: string): Promise<Club> {
        const club = await ClubModel.findOne({ where: { clubId } });

        if (!club) {
            throw new Error("Club no encontrado");
        }

        return ClubMap.toDomain(club)!;
    }

    async list(query: ListQueryDto): Promise<ClubDto[]> {
        const list = await ClubModel.findAll({
            where: query as any,
            order: [['name', "ASC"]],
        });

        return list;
    }

    async save(club: Club): Promise<void> {
        const raw = ClubMap.toPersistance(club);

        const exist = await ClubModel.findOne({ where: { clubId: raw.clubId } })

        if (!!exist == true) {
            await ClubModel.update(raw, {
                where: { clubId: raw.clubId },
            })
        } else {
            const instance = await ClubModel.create(raw);
            await instance.save();
        }
    }
}
