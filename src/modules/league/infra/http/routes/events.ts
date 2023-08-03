import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { uploadImageCloudinary } from "../../../services";
import { createClubEventController } from "../../../useCases/createClubEvent";

const eventRouter = express.Router();

eventRouter.post(
    "/",
    middleware.uploadImageHandler.single("image"),
    async (req, res) => {
        try {
            console.log("FILE", req.file);
            console.log(typeof req.file);

            const result = await uploadImageCloudinary.upload(req.file?.path);

            console.log("image url", result);

            res.send("Ok");
        } catch (error) {
            console.log(error);
        }
    }
);

eventRouter.post(
    "/usecase",
    middleware.adminAuthenticated(),
    middleware.uploadImageHandler.single("image"),
    async (req, res) => createClubEventController.execute(req, res)
);

export { eventRouter };
