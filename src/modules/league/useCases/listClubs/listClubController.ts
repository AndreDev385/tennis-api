import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListClubs } from "./listClubsUseCase";
import { ListQueryDto } from "./requestListQueryDto";

export class ListClubsController extends BaseController {
    useCase: ListClubs;

    constructor(useCase: ListClubs) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {

        const query: ListQueryDto = req.query;

        const result = await this.useCase.execute(query);

        if (result.isLeft()) {
            return this.fail(res, "Ha ocurrido un error");
        }

        return this.ok(res, result.value.getValue());
    }
}
