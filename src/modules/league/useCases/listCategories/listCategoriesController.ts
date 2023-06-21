import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

export class ListCategoriesController extends BaseController {
    useCase: ListCategoriesUseCase;

    constructor(useCase: ListCategoriesUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.useCase.execute();

        if (result.isLeft()) {
            return this.fail(res, "Ha ocurrido un error");
        }

        return this.ok(res, result.value.getValue());
    }
}
