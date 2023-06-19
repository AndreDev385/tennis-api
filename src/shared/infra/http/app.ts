import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { v1Router } from "./api/v1";
import { environment } from "../../../config";
import { connection } from "../database/sequelize/config/config";

const origin = {
    origin: "*",
};

const app = express();

(async () => connection.sync())();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));

app.use("/api/v1", v1Router);

app.listen(environment.port, () => {
    console.log(`[App]: Listening on port ${environment.port}`);
});
