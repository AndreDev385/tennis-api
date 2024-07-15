import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { PaginateCouples } from "./paginateCouples";

export class PaginateCouplesCtrl extends BaseController {
	private readonly uc: PaginateCouples;

	constructor(uc: PaginateCouples) {
		super();

		this.uc = uc;
	}

	async executeImpl(req: Request, res: Response) {
		const result = await this.uc.execute(req.query);

		if (result.isLeft()) {
			return this.fail(res, result.value.getErrorValue().message);
		}

		return this.ok(res, result.value.getValue());
	}
}
