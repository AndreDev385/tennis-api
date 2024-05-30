import { Sequelize } from "sequelize";
import { promises } from 'fs'
import path from "path";

interface ModelAttributes {
    [key: string]: string | number | Date | any; // Allow for various data types
}

interface CsvDataRow {
    [key: string]: string;
}

const escapeForCSV = (value: any): string => {
    if (typeof value !== "string") {
        value = String(value);
    }
    return value.replace(/"/g, '""').replace(/\r?\n|\r/g, '\\n');
}

function buildCSVHeader(fields: string[]): string {
    return fields.map(escapeForCSV).join(',');
}

function buildCSVDataRow(record: CsvDataRow, fields: string[]): string {
    return fields.map(field => escapeForCSV(record[field])).join(',');
}


export async function exportDatabaseToCSV(sequelize: Sequelize) {

    const models = sequelize.models;

    for (const [_, model] of Object.entries(models)) {
        const tableName = model.name;
        const csvData: string[] = [];

        const fields = Object.keys(model.getAttributes() as ModelAttributes);

        csvData.push(buildCSVHeader(fields));

        const records = await model.findAll();

        for (const record of records) {
            csvData.push(buildCSVDataRow(record.dataValues as CsvDataRow, fields));
        }

        const csvContent = csvData.join('\n');

        await promises.writeFile(path.join(__dirname, `./${tableName}.csv`), csvContent , 'utf8');
    }
}
