import { SerialPort } from 'serialport';
import Train from './Train';
import Programmer from './Programmer';

export default class TrainHandler {
  #serialPort;
  #trains = [];
  #programer;

  /**
   * @typedef {Object} Train
   * @property {number} id - Unique identifier for the train
   * @property {string} name - Name of the train
   * 
   * @typedef {Object} TrainHandlerOptions
   * @property {Train[]} trains
   * @property {number} [baudRate] - Baud rate for serial communication (default: 9600)
   * @property {string} port - Serial port path for the controller
   * 
   * @param {TrainHandlerOptions} options 
   */
  constructor(options) {
    this.options = options || {};
    this.baudRate = this.options.baudRate || 9600;

    this.#serialPort = new SerialPort({
      path: this.options.port,
      baudRate: this.baudRate,
    });

    this.options.trains.forEach(train => {
      this.#trains.push(new Train(train, this.#serialPort));
    });

    this.#programer = new Programmer(this.#serialPort);
  }
}
