import LimitedArray from './LimitedArray';
import { SerialPort } from 'serialport';
const { ReadlineParser } = require('@serialport/parser-readline')

export default class IOController {
  #options;
  #serialPort;
  #parser;

  constructor(options = {}) {
    this.#options = options;
    this.commandHistory = new LimitedArray(options.commandHistorySize || 100);
    this.responseHistory = new LimitedArray(options.responseHistorySize || 100);
    this.#serialPort = new SerialPort({
      path: options.serial.port,
      baudRate: options.serial.baudRate || 9600,
      autoOpen: true,
    });
    this.#parser = this.#serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
    this.#parser.on('data', this.handleResponse.bind(this));
  }

  handleResponse(data) {
    const response = data.trim();
    this.responseHistory.push(response);
    console.log('Received response:', response);
    // TODO
  }

  /**
   * Sends a command to the IO interface
   * @param {import('./commands/Command').default } command The command to send
   * @returns {Promise<void>} Resolves when the command has been sent
   */
  async sendCommand(command) {
    this.commandHistory.push(command);
    this.#serialPort.write(command.nativeCommand(), (err) => {
      if (err) {
        return console.error('Error on write: ', err.message, command.toString());
      }
      console.log('Command sent: ', command.toString());
    });
  }
}
