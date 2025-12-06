import MessageHandler from 'train-controller/server/messageHandlers/MessageHandler';
import DataStore from 'train-controller/DataStore';
import { SetTrainSpeedCommand } from 'train-controller/controller/io/commands/TrainCommands';

export default class TrainHandler extends MessageHandler {
  static shouldHandle(message) {
    return Object.prototype.hasOwnProperty.call(message, 'setCabSpeed');
  }

  static handleMessage(message) {
    const cabSpeedData = message.setCabSpeed;
    const { cab, speed, direction } = cabSpeedData;
    return DataStore.controller.sendCommand(
      new SetTrainSpeedCommand(cab, speed, direction),
    );
  }
}
