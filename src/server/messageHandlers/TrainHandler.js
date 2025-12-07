import MessageHandler from 'train-controller/server/messageHandlers/MessageHandler';
import DataStore from 'train-controller/DataStore';
import { SetTrainSpeedCommand, TrainFunctionCommand } from 'train-controller/controller/io/commands/TrainCommands';

export default class TrainHandler extends MessageHandler {
  static shouldHandle(message) {
    return Object.prototype.hasOwnProperty.call(message, 'setCabSpeed') || Object.prototype.hasOwnProperty.call(message, 'setCabFunction');
  }

  static handleMessage(message) {
    if (Object.prototype.hasOwnProperty.call(message, 'setCabSpeed')) {
      const cabSpeedData = message.setCabSpeed;
      const { cab, speed, direction } = cabSpeedData;
      return DataStore.controller.sendCommand(
        new SetTrainSpeedCommand(cab, speed, direction),
      );
    }

    if (Object.prototype.hasOwnProperty.call(message, 'setCabFunction')) {
      const cabFunctionData = message.setCabFunction;
      const { cab, func, state } = cabFunctionData;
      return DataStore.controller.sendCommand(
        new TrainFunctionCommand(cab, func, state),
      );
    }
  }
}
