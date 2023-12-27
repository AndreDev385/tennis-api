import { CategoryModel } from "../../../../shared/infra/database/sequelize/models/Category";
import { Category } from "../../domain/category";
import { CategoryDto } from "../../dtos/categoryDto";
import { CategoryMap } from "../../mappers/categoryMap";
import { CategoryRepository } from "../categoryRepo";

export class SequelizeCategoryRepository implements CategoryRepository {
    async findById(categoryId: string): Promise<Category> {
        const category = await CategoryModel.findOne({ where: { categoryId } });
        if (!category) {
            throw new Error("Categoria no encontrada.");
        }

        return CategoryMap.toDomain(category)!;
    }

    async list(): Promise<CategoryDto[]> {
        const list = await CategoryModel.findAll({});

        return list;
    }
}
