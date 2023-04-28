import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ForgetPasswordUseCase } from "./forget-password-use-case";
import { ForgetPasswordDto } from "./forget-password-dto";

export class ForgetPasswordController extends BaseController {
    private useCase: ForgetPasswordUseCase;

    constructor(useCase: ForgetPasswordUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {
        let dto: ForgetPasswordDto = req.body;

        try {
            await this.useCase.execute(dto);
            this.ok(res);
        } catch (e) {
            this.fail(res, e);
        }
    }
}
