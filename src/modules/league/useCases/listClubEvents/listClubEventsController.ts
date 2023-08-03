import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListClubEvents } from "./listClubEvents";

export class ListClubEventsController extends BaseController {
    private usecase: ListClubEvents;

    constructor(usecase: ListClubEvents) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
