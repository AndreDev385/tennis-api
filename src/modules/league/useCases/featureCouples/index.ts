import {
    sequelizeClashRepo,
    sequelizeMatchRepo,
    sequelizePlayerRepo,
    sequelizeSeasonRepo,
} from "../../repositories";
import { FeatureCouples } from "./featureCouples";
import { FeatureCouplesController } from "./featureCouplesController";

const featureCouples = new FeatureCouples(
    sequelizeClashRepo,
    sequelizeMatchRepo,
    sequelizePlayerRepo,
    sequelizeSeasonRepo
);
const featureCouplesController = new FeatureCouplesController(featureCouples);

export { featureCouplesController };
