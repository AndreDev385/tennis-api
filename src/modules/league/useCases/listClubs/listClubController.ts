import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListClubs } from "./listClubsUseCase";

export class ListClubsController extends BaseController {
    useCase: ListClubs;

    constructor(useCase: ListClubs) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.useCase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, "Ha ocurrido un error");
        }

        return this.ok(res, result.value.getValue());
    }
}
