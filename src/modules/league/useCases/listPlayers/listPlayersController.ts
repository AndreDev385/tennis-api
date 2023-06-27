import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListPlayers } from "./listPlayers";

export class ListPlayerController extends BaseController {
    private usecase: ListPlayers;

    constructor(usecase: ListPlayers) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const query = req.query;

        const result = await this.usecase.execute(query);

        if (result.isLeft()) {
            const error = result.value;
            return this.fail(res, error.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
