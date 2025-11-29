import LimitedArray from './io/LimitedArray';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import TrackPowerHandler from './io/responseHandlers/TrackPowerHandler';
import DataStore from 'src/DataStore.js';

export default class IOController {
  #options;
  #serialPort;
  #parser;
  #handlers;
  #readyPromise;
  #readyResolve;
  #ready = false;

  #commandPromiseResolves = new Map();

  constructor(options = {}) {
    this.#readyPromise = new Promise((resolve) => {
      this.#readyResolve = resolve;
    });
    this.#options = options;
    this.commandHistory = new LimitedArray(options.commandHistorySize || 1000);
    this.responseHistory = new LimitedArray(options.responseHistorySize || 1000);

    this.#handlers = options.responseHandlers || [];
    this.#handlers.push(
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

  isReady() {
    return this.#readyPromise;
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
    if (!this.#ready && trimmedResponse[0] === 'p') {
      this.#ready = true;
      this.#readyResolve();
    }

    for (const [command, resolve] of this.#commandPromiseResolves) {
      if (command.shouldHandleResponse(trimmedResponse)) {
        const formatedResponse = command.formatResponse(trimmedResponse);
        console.log(formatedResponse);
        resolve(formatedResponse);
        this.#commandPromiseResolves.delete(command);
      }
    }

    for (const Handler of this.#handlers) {
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
    console.log('Sending command:', command.toString());
    this.commandHistory.push(command);
    const promise = new Promise((resolve) => {
      this.#commandPromiseResolves.set(command, resolve);
    });

    this.#serialPort.write(command.nativeCommand, (err) => {
      if (err) {
        return console.error('Error on write: ', err.message, command.toString());
      }
      console.log('Command sent: ', command.nativeCommand);
    });
    return promise;
  }
}
