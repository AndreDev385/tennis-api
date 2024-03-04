import path from "path";
import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { Server } from "socket.io";
import history from "connect-history-api-fallback";

import { v1Router } from "./api/v1";
import { environment } from "../../../config";
import { connection } from "../database/sequelize/config/config";

import Sockets from "./sockets";
import { swaggerDocs } from "./doc/swagger";

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

swaggerDocs(app);

app.use(history());
app.use(
    "/public",
    express.static(path.resolve(__dirname, "../../../../../public/"))
);
app.use(
    "/",
    express.static(path.resolve(__dirname, "../../../../../public/admin/dist"))
);

server.listen(environment.port, () => {
    console.log(`[App]: Listening on port ${environment.port}`);

});

Sockets(io);
