import IOController from './src/controller/IOController';

const controller = new IOController({
  serial: {
    port: process.env.SERIAL_PORT || '/dev/ttyUSB0',
    baudRate: 115200,
  },
  commandHistorySize: 50,
  responseHistorySize: 50,
});
