import { sequelizeClashRepo, sequelizeMatchRepo, sequelizePlayerRepo } from "../../repositories";
import { FeaturePlayers } from "./featurePlayers";
import { FeaturePlayersController } from "./featurePlayersController";

const featurePlayers = new FeaturePlayers(sequelizeClashRepo, sequelizeMatchRepo, sequelizePlayerRepo);
const featurePlayersController = new FeaturePlayersController(featurePlayers);

export { featurePlayersController }; 
