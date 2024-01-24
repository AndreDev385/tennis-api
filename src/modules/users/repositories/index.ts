import { SequelizePlayerRegisterRepository } from "./implementations/sequelizePlayerRegisterRepo";
import { SequelizeUserRepo } from "./implementations/sequelizeUserRepo";

const sequelizeUserRepo = new SequelizeUserRepo();
const sequelizePlayerRegisterRepo = new SequelizePlayerRegisterRepository();

export { sequelizeUserRepo, sequelizePlayerRegisterRepo };
