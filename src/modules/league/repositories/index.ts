import models from "../../../shared/infra/database/sequelize/models/"

import { SequelizeClubRepository } from "./implementations/sequelizeClubRepo"
import { SequelizeCategoryRepository } from "./implementations/sequelizeCategoryRepo"

const sequelizeCategoryRepo = new SequelizeCategoryRepository(models);
const sequelizeClubRepo = new SequelizeClubRepository(models);

export {
    sequelizeClubRepo,
    sequelizeCategoryRepo,
}

