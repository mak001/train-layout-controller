import IOController from './src/controller/IOController';
import { SetTrainSpeedCommand } from './src/controller/io/commands/TrainCommands';
import { DIRECTION } from './src/controller/enums';
const timers = require('timers/promises');

const controller = new IOController({
  serial: {
    port: process.env.SERIAL_PORT || '/dev/ttyUSB0',
    baudRate: 115200,
  },
  commandHistorySize: 50,
  responseHistorySize: 50,
});

await timers.setTimeout(10000);
controller.sendCommand(
  new SetTrainSpeedCommand(4022, 30, DIRECTION.FORWARD),
);