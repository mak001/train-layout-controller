

export default class Train {
  #id;
  #name;
  #port;
  #currentBlocks = [];
  #speed = 0;
  #direction = 1; // 1 is forward, 0 is reverse
  #emergencyStop = false;

  /**
   * @typedef {Object} TrainOptions
   * @property {number} id - Unique identifier for the train
   * @property {string} name - Name of the train
   * 
   * @param {TrainOptions} options 
   */
  constructor(options, port) {
    this.options = options || {};
    this.#id = this.options.id;
    this.#name = this.options.name || `Train-${this.#id}`;
    this.#port = port;
  }

  /**
   * Gets the unique identifier of the train
   * @type {number}
   */
  get id() {
    return this.#id;
  }

  /**
   * Gets the name of the train
   * @type {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * Gets the list of blocks currently occupied by the train
   * @type {Array}
   */
  get currentBlocks() {
    return this.#currentBlocks;
  }

  /**
   * Sets the list of blocks currently occupied by the train
   * @param {Array} blocks
   */
  set currentBlocks(blocks) {
    this.#currentBlocks = blocks;
  }

  /**
   * Gets the current direction of the train
   * @type {number} 1 is forward, 0 is reverse
   */
  get dir() {
    return this.#direction;
  }

  /**
   * Gets the current speed of the train
   * @type {number}
   */
  get speed() {
    return this.#speed;
  }

  get speedPercentage() {
    return Math.floor((this.#speed / 127) * 100);
  }

  /**
   * Sets the speed of the train
   * @param {number} speed - Speed value (0-100)
   */
  set speed(speed) {
    if (!this.#port) {
      console.error('Serial port is not open');
      return;
    }

    const clampedPassedSpeed = Math.min(Math.abs(speed), 100);
    this.#speed = Math.floor(127 * (clampedPassedSpeed / 100));
    this.#direction = speed >= 0 ? 1 : 0;

    this.sendCommand(`<t ${this.#id} ${this.#speed} ${this.#direction}>`);
  }

  /**
   * 
   * @param {number} speed 
   */
  updateSpeedAndDirection(speedAndDirection) {
    if (speedAndDirection < 0 || speedAndDirection > 255) {
      throw new Error('Speed and direction must be between 0 and 255');
    }
    this.#direction = speedAndDirection >= 130 ? 1 : 0;
    this.#emergencyStop = speedAndDirection === 1 || speedAndDirection === 129;
    this.#speed = this.#direction === 1 ? 
      speedAndDirection - 1 :
      speedAndDirection - 129;
  }

  /**
   * Sends a command to the train controller via serial port
   * @param {string} command
   */
  sendCommand(command) {
    if (!this.#port) {
      console.error('Serial port is not open');
      return;
    }
    this.#port.write(command, (err) => {
      if (err) {
        return console.error('Error on write: ', err.message);
      }
      console.log('Command sent: ', command);
    });
  }
}
