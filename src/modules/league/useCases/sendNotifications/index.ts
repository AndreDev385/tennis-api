import { sequelizePlayerRepo } from "../../repositories";
import { SendClubNotificationController } from "./sendClubNotificationController";
import { SendNotifications } from "./sendNotifications";

const sendNotifications = new SendNotifications(sequelizePlayerRepo);
const sendClubNotificationsController = new SendClubNotificationController(
    sendNotifications
);

export { sendNotifications, sendClubNotificationsController };
