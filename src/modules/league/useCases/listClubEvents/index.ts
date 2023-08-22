import { sequelizeClubEventRepo } from "../../repositories";
import { ListClubEvents } from "./listClubEvents";
import { ListClubEventsController } from "./listClubEventsController"

const listClubEvents = new ListClubEvents(sequelizeClubEventRepo)
const listClubEventsController = new ListClubEventsController(listClubEvents);

export { listClubEventsController }
