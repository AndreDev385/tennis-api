import models from "../../../shared/infra/database/sequelize/models/index";
import { SequelizeUserRepo } from "./implementations/sequelizeUserRepo"

const sequelizeUserRepo = new SequelizeUserRepo(models);

export { sequelizeUserRepo }
