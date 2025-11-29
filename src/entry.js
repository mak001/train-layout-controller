import WebServer from 'train-controller/server/WebServer';
import IOController from 'train-controller/controller/IOController';
import TrackPowerCommand from 'train-controller/controller/io/commands/TrackPowerCommand';
import { STATE, TRACK } from 'train-controller/enums';
import DataStore from 'train-controller/DataStore';

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

DataStore.controller = controller;
DataStore.server = server;

await controller.isReady();

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

server.start();
