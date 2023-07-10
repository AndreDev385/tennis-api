import { sequelizeJourneyRepo } from "../../repositories";
import { ListJourneys } from "./listJourneys";
import { ListJourneysController } from "./listJourneysController";

const listJourneys = new ListJourneys(sequelizeJourneyRepo);
const listJourneysController = new ListJourneysController(listJourneys);

export { listJourneysController };
