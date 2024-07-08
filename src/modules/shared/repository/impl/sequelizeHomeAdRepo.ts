import models from "../../../../shared/infra/database/sequelize/models";
import { HomeAdDto } from "../../dtos/homeAdDto";
import { HomeAdRepository } from "../homeAdRepo";

export class SequelizeHomeAdRepository implements HomeAdRepository {
	async save(ad: HomeAdDto): Promise<void> {
		let instance = await models.HomeAdModel.create(ad);
		await instance.save();
	}

	async list(): Promise<HomeAdDto[]> {
		return (await models.HomeAdModel.findAll()) as HomeAdDto[];
	}

	async delete(id: number): Promise<void> {
		const rows = await models.HomeAdModel.destroy({ where: { id } });
		if (rows == 0) {
			throw new Error("Ad no encontrada");
		}
	}
}
