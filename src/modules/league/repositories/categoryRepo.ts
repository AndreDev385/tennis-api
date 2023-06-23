import { Category } from "../domain/category";
import { CategoryDto } from "../dtos/categoryDto";

export interface CategoryRepository {
    list(): Promise<Array<CategoryDto>>
    findById(categoryId: string): Promise<Category>
}
