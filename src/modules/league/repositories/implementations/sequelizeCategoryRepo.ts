import { Category } from "../../domain/category";
import { CategoryDto } from "../../dtos/categoryDto";
import { CategoryMap } from "../../mappers/categoryMap";
import { CategoryRepository } from "../categoryRepo";

export class SequelizeCategoryRepository implements CategoryRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async findById(categoryId: string): Promise<Category> {
        const CategoryModel = this.models.CategoryModel;

        const category = await CategoryModel.findOne({ where: { categoryId } });
        if (!category) {
            throw new Error("Categoria no encontrada.");
        }

        return CategoryMap.toDomain(category);
    }

    async list(): Promise<CategoryDto[]> {
        const CategoryModel = this.models.CategoryModel;

        const list = await CategoryModel.findAll({});

        return list;
    }
}
