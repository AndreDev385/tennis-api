import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Category } from "../domain/category";
import { CategoryDto } from "../dtos/categoryDto";

export class CategoryMap implements Mapper<Category> {
    public static toDomain(raw: CategoryDto): Category {

        const categoryOrError = Category.create(
            { name: raw.name, fullName: raw.fullName },
            new UniqueEntityID(raw.categoryId)
        );

        categoryOrError.isFailure ? console.log(categoryOrError.getErrorValue()) : "";

        return categoryOrError.isSuccess ? categoryOrError.getValue() : null;
    }

    public static toDto(category: Category): CategoryDto {
        return {
            name: category.name,
            fullName: category.fullName,
            categoryId: category.categoryId.id.toString(),
        };
    }
}
