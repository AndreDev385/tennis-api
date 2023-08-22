import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CategoryId } from "./categoryId";

interface CategoryProps {
    name: string;
    fullName: string;
}

export class Category extends Entity<CategoryProps> {
    get categoryId(): CategoryId {
        return CategoryId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get fullName(): string {
        return this.props.fullName;
    }

    private constructor(props: CategoryProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: CategoryProps,
        id?: UniqueEntityID,
    ): Result<Category> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "nombre" },
            { argument: props.name, argumentName: "nombre completo" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Category>(guardResult.getErrorValue());
        }

        const category = new Category(props, id);

        return Result.ok<Category>(category);
    }
}
