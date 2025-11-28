import IOController from './src/controller/IOController';
import { SetTrainSpeedCommand } from './src/controller/io/commands/TrainCommands';
import TrackPowerCommand from 'src/controller/io/commands/TrackPowerCommand';
import { DIRECTION, STATE, TRACK } from './src/controller/enums';
const timers = require('timers/promises');
const { SERIAL_PORT, STARTING_TRACK_POWER } = process.env;

const controller = new IOController({
  serial: {
    port: SERIAL_PORT || '/dev/ttyUSB0',
    baudRate: 115200,
  },
  commandHistorySize: 50,
  responseHistorySize: 50,
});

await timers.setTimeout(10000);

if (STARTING_TRACK_POWER.toLowerCase() === 'join') {
  await controller.sendCommand(
    new TrackPowerCommand(TRACK.JOIN, STATE.ON),
  );
} else if (STARTING_TRACK_POWER.toLowerCase() === 'off') {
  await controller.sendCommand(
    new TrackPowerCommand(TRACK.ALL, STATE.OFF),
  );
} else if (STARTING_TRACK_POWER.toLowerCase() === 'prog') {
  await controller.sendCommand(
    new TrackPowerCommand(TRACK.PROG, STATE.ON),
  );
} else if (STARTING_TRACK_POWER.toLowerCase() === 'all') {
  await controller.sendCommand(
    new TrackPowerCommand(TRACK.ALL, STATE.ON),
  );
} else { // main only
  await controller.sendCommand(
    new TrackPowerCommand(TRACK.MAIN, STATE.ON),
  );
}

await controller.sendCommand(
  new SetTrainSpeedCommand(4022, 30, DIRECTION.FORWARD),
);
