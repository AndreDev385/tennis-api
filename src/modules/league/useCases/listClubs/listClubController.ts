import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListClubsUseCase } from "./listClubsUseCase";

export class ListClubsController extends BaseController {
    useCase: ListClubsUseCase;

    constructor(useCase: ListClubsUseCase) {
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
