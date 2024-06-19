import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetParticipantStats } from "./getParticipantStats";
import { AppError } from "../../../../shared/core/AppError";

export class GetParticipantStatsCtrl extends BaseController {
  private readonly uc: GetParticipantStats;

  constructor(uc: GetParticipantStats) {
    super()
    this.uc = uc;
  }

  async executeImpl(req: Request, res: Response) {

    const { participantId } = req.params;

    const result = await this.uc.execute({ ...req.query, participantId });

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case AppError.NotFoundError:
          return this.notFound(res, error.getErrorValue().message);
        case AppError.UnexpectedError:
          return this.fail(res, error.getErrorValue().message);
      }
    }

    return this.ok(res, result.value);
  }

}
