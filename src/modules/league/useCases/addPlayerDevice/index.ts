import { sequelizePlayerRepo } from "../../repositories";
import { AddPlayerDevice } from "./addPlayerDevice";
import { AddPlayerDeviceController } from "./addPlayerDeviceController";

const addPlayerDevice = new AddPlayerDevice(sequelizePlayerRepo);

const addPlayerDeviceController = new AddPlayerDeviceController(
    addPlayerDevice
);

export { addPlayerDeviceController };
