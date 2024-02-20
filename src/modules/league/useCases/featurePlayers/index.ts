import {
    sequelizeClashRepo,
    sequelizeMatchRepo,
    sequelizePlayerRepo,
    sequelizeSeasonRepo,
} from "../../repositories";
import { FeaturePlayers } from "./featurePlayers";
import { FeaturePlayersController } from "./featurePlayersController";

const featurePlayers = new FeaturePlayers(
    sequelizeClashRepo,
    sequelizeMatchRepo,
    sequelizePlayerRepo,
    sequelizeSeasonRepo
);
const featurePlayersController = new FeaturePlayersController(featurePlayers);

export { featurePlayersController };
