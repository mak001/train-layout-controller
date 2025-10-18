import LimitedArray from './io/LimitedArray';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import TrackPowerHandler from './io/responseHandlers.js/TrackPowerHandler';

export default class IOController {
  #options;
  #serialPort;
  #parser;
  #handlers;

  constructor(options = {}) {
    this.#options = options;
    this.commandHistory = new LimitedArray(options.commandHistorySize || 1000);
    this.responseHistory = new LimitedArray(options.responseHistorySize || 1000);

    this.handlers = options.responseHandlers || [];
    this.handlers.push(
      TrackPowerHandler,
    );

    this.#serialPort = new SerialPort({
      path: options.serial.port,
      baudRate: options.serial.baudRate || 9600,
      autoOpen: true,
    });
    this.#parser = this.#serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
    this.#parser.on('data', this.handleResponse.bind(this));
  }

  isValidResponse(response) {
    return response.length > 0 && response.startsWith('<') && response.endsWith('>');
  }

  handleResponse(data) {
    const response = data.trim();
    if (!this.isValidResponse(response)) {
      console.warn('Invalid response received:', response);
      return;
    }

    this.responseHistory.push(response);
    console.log('Received response:', response);

    const trimmedResponse = response.replace('<', '').replace('>', '').trim();
    for (const Handler of this.handlers) {
      if (Handler.shouldHandle(trimmedResponse)) {
        console.log(`Handling response with ${Handler.name}`);
        Handler.handle(trimmedResponse);
      }
    }
  }

  /**
   * Sends a command to the IO interface
   * @param {import('./io/commands/Command').default } command The command to send
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
