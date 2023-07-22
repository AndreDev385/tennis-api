import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { uploadImageCloudinary } from '../../../services';

const eventRouter = express.Router();

eventRouter.post("/", middleware.uploadImageHandler.single('image'), async (req, res) => {
    try {
        console.log("FILE", req.file);

        const result = await uploadImageCloudinary.upload(req.file?.path)

        console.log("Result", result);

        res.send("Ok");
    } catch (error) {
        console.log(error)
    }
})

export { eventRouter };
