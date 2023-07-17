import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { Server } from "socket.io";

import { v1Router } from "./api/v1";
import { environment } from "../../../config";
import { connection } from "../database/sequelize/config/config";

import Sockets from "./sockets"

const origin = {
    origin: "*",
};

const app = express();
const server = http.createServer(app);
const io = new Server(server);

(async () => connection.sync({ alter: true }))();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));

app.use("/api/v1", v1Router);


server.listen(environment.port, () => {
    console.log(`[App]: Listening on port ${environment.port}`);
});

Sockets(io);
