import express from "express";
import { createClashController } from "../../../useCases/createClash";
import { listClashController } from "../../../useCases/listClash";
import { getClashByIdController } from "../../../useCases/getClashById";
import { finishClashController } from "../../../useCases/finishClash";
import { paginateClashController } from "../../../useCases/paginateClash";
import { deleteClashController } from "../../../useCases/deleteClash";
import { middleware } from "../../../../../shared/infra/http";

const clashRouter = express.Router();

clashRouter.post("/", (req, res) => createClashController.execute(req, res));
clashRouter.put("/finish", (req, res) => finishClashController.execute(req, res));
clashRouter.get("/", (req, res) => listClashController.execute(req, res));
clashRouter.get("/paginate", (req, res) => paginateClashController.execute(req, res));
clashRouter.get("/:clashId", (req, res) => getClashByIdController.execute(req, res));
clashRouter.delete(
    "/:clashId",
    middleware.adminAuthenticated(),
    (req, res) => deleteClashController.execute(req, res)
);

export { clashRouter };
