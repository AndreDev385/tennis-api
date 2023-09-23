import { sequelizeClubEventRepo } from "../../repositories";
import { DeleteEvent } from "./deleteEvent";
import { DeleteEventController } from "./deleteEventController";

const deleteEvent = new DeleteEvent(sequelizeClubEventRepo);
const deleteEventController = new DeleteEventController(deleteEvent);

export { deleteEventController }
