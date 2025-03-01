import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateCouple } from "./updateCouple";
import { AppError } from "../../../../shared/core/AppError";

export class UpdateCoupleCtrl extends BaseController {
	private readonly uc: UpdateCouple;

	constructor(uc: UpdateCouple) {
		super();
		this.uc = uc;
	}

	async executeImpl(req: Request, res: Response) {
		const result = await this.uc.execute(req.body);

		if (result.isLeft()) {
			const error = result.value;
			switch (error.constructor) {
				case AppError.UnexpectedError:
					return this.fail(res, error.getErrorValue().message);
				case AppError.NotFoundError:
					return this.notFound(res, error.getErrorValue().message);
			}
		}

		return this.ok(res, { messsage: "Pareja actualizada con exito" });
	}
}
