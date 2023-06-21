import { CategoryDto } from "../dtos/categoryDto";

export interface CategoryRepository {
    list(): Promise<Array<CategoryDto>>
}
