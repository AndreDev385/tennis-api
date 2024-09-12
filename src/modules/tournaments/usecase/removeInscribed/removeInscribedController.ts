import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { RemoveInscribed } from "./removeInscribed";
import { AppError } from "../../../../shared/core/AppError";

export class RemoveInscribedCtrl extends BaseController {
	private usecase: RemoveInscribed;

	constructor(usecase: RemoveInscribed) {
		super();
		this.usecase = usecase;
	}
	async executeImpl(req: Request, res: Response) {
		const result = await this.usecase.execute(req.body);

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
				case AppError.UnexpectedError:
					return this.fail(res, error.getErrorValue().message);
				case AppError.NotFoundError:
					return this.notFound(res, error.getErrorValue().message);
			}
		}

		return this.ok(res, { message: "Participante eliminado!" });
	}
}
