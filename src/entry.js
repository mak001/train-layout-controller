import WebServer from './web/server/WebServer';
import IOController from './controller/IOController';
import TrackPowerCommand from './controller/io/commands/TrackPowerCommand';
import { STATE, TRACK } from './controller/enums';

const { SERIAL_PORT, STARTING_TRACK_POWER, BAUD_RATE } = process.env;

const server = new WebServer();
const controller = new IOController({
  serial: {
    port: SERIAL_PORT || '/dev/ttyUSB0',
    baudRate: BAUD_RATE || 115200,
  },
  commandHistorySize: 50,
  responseHistorySize: 50,
});

await controller.isReady();

if (STARTING_TRACK_POWER.toLowerCase() === 'join') {
  controller.sendCommand(
    new TrackPowerCommand(TRACK.JOIN, STATE.ON),
  );
} else if (STARTING_TRACK_POWER.toLowerCase() === 'off') {
  controller.sendCommand(
    new TrackPowerCommand(TRACK.ALL, STATE.OFF),
  );
} else if (STARTING_TRACK_POWER.toLowerCase() === 'prog') {
  controller.sendCommand(
    new TrackPowerCommand(TRACK.PROG, STATE.ON),
  );
} else if (STARTING_TRACK_POWER.toLowerCase() === 'all') {
  controller.sendCommand(
    new TrackPowerCommand(TRACK.ALL, STATE.ON),
  );
} else { // main only
  controller.sendCommand(
    new TrackPowerCommand(TRACK.MAIN, STATE.ON),
  );
}

server.start();
