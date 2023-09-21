import { sequelizeClashRepo, sequelizeMatchRepo, sequelizePlayerRepo } from "../../repositories";
import { FeatureCouples } from "./featureCouples";
import { FeatureCouplesController } from "./featureCouplesController";

const featureCouples = new FeatureCouples(sequelizeClashRepo, sequelizeMatchRepo, sequelizePlayerRepo);
const featureCouplesController = new FeatureCouplesController(featureCouples);

export { featureCouplesController }
