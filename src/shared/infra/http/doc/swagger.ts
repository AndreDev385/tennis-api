import path from "path";
import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../../../../package.json";

const apiPath = `${path.join(__dirname, "../api/")}*.ts`;

const userRoutes = `${path.join(__dirname, "../../../../modules/users/infra/http/routes/")}*.ts`;
const userComponents = `${path.join(__dirname, "../../../../modules/users/useCases/")}**/*Dto.ts`;

const leagueRoutes = `${path.join(__dirname, "../../../../modules/league//infra/http/routes/")}*.ts`;
const leageComponents = `${path.join(__dirname, "../../../../modules/league/useCases/")}**/*Dto.ts`;

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Doclick",
            version,
        },
    },
    apis: [apiPath, userRoutes, userComponents, leagueRoutes, leageComponents],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/api/docs.json", (_: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");

        res.send(swaggerSpec);
    });

    console.log(`[App]: Docs avaible at /docs`);
}

export { swaggerDocs };
