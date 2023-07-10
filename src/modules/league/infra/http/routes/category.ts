import express from "express";
import { listCategoriesController } from "../../../useCases/listCategories";

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) =>
    listCategoriesController.execute(req, res)
);

export { categoryRouter };
