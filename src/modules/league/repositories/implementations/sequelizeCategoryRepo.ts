import { CategoryDto } from "../../dtos/categoryDto";
import { CategoryRepository } from "../categoryRepo";

export class SequelizeCategoryRepository implements CategoryRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async list(): Promise<CategoryDto[]> {
        const CategoryModel = this.models.CategoryModel;

        const list = await CategoryModel.findAll({});

        return list;
    }
}
