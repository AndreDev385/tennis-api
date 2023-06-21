import { sequelizeCategoryRepo } from "../../repositories";
import { ListCategoriesController } from "./listCategoriesController";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

const listCategoriesUseCase = new ListCategoriesUseCase(sequelizeCategoryRepo);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export {
    listCategoriesController,
}
