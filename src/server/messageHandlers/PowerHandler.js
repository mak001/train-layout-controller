import MessageHandler from 'train-controller/server/messageHandlers/MessageHandler';
import DataStore from 'train-controller/DataStore';
import { TRACK, STATE } from 'train-controller/enums';
import TrackPowerCommand from 'train-controller/controller/io/commands/TrackPowerCommand';

export default class PowerHandler extends MessageHandler {
  static shouldHandle(message) {
    return Object.prototype.hasOwnProperty.call(message, 'power');
  }

  static handleMessage(message) {
    const powerData = message.power;
    if (Object.prototype.hasOwnProperty.call(powerData, 'MAIN') && powerData.MAIN !== DataStore.store.power.MAIN) {
      return DataStore.controller.sendCommand(
        new TrackPowerCommand(TRACK.MAIN, powerData.MAIN === 1 ? STATE.ON : STATE.OFF),
      );
    }

    if (Object.prototype.hasOwnProperty.call(powerData, 'PROG') && powerData.PROG !== DataStore.store.power.PROG) {
      return DataStore.controller.sendCommand(
        new TrackPowerCommand(TRACK.PROG, powerData.PROG === 1 ? STATE.ON : STATE.OFF),
      );
    }
    // Implement logic to process the message
  }
}
