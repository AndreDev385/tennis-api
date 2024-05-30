import path from "path";
import fs from "fs";
import AdmZip from "adm-zip";
import { Request, Response } from "express";

import { exportDatabaseToCSV } from "../database/sequelize/exports/csv";
import { connection } from "../database/sequelize/config/config";

export async function exportSequelizeDb(_: Request, res: Response) {
    try {
        await exportDatabaseToCSV(connection);

        const PATH_TO_CSVS = "../database/sequelize/exports/";

        const files = fs.readdirSync(path.join(__dirname, PATH_TO_CSVS), "utf8")

        const zip = new AdmZip();

        for(const file of files) {
            if (!file.endsWith(".csv")) {
                continue
            }
            zip.addLocalFile(path.join(__dirname, `${PATH_TO_CSVS}${file}`));
        }

        res.setHeader("Content-Type", "application/zip")
        res.setHeader("Content-Disposition", "attachment; filename=database.zip")
        return res.end(zip.toBuffer())
    } catch (e) {
        return res.status(500).json({message: "Ha ocurrido un error"})
    }
}
