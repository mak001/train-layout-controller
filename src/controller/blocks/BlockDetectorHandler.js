import * as i2c from 'i2c-bus';

import BlockDetector from './BlockDetector.js';

export default class BlockDetectorHandler {
  #i2cBus;
  #blocks = [];

  /**
   * @typedef {Object} Block
   * @property {number} address - I2C address of the block detector
   * @property {string} name - Name of the block detector
   *
   * @typedef {Object} BlockDetectorHandlerOptions
   * @property {number} [busNumber] - I2C bus number (default: 1)
   * @property {number} [intervalTime] - Interval time in milliseconds for polling (default: 100)
   * @property {Block[]} blocks
   *
   * @param {BlockDetectorHandlerOptions} options
   */
  constructor(options) {
    this.options = options || {};
    this.i2cAddresses = this.options.i2cAddresses;
  }

  /**
   * Initializes the I2C bus and block detectors
   */
  async init() {
    const busNumber = this.options.busNumber || 1;
    this.#i2cBus = await i2c.openPromisified(busNumber);
    this.options.blocks.forEach((block) => {
      this.#blocks.push(new BlockDetector(this.#i2cBus, block.address, block.name));
    });
  }

  /**
   * Polls all block detectors to update their status
   */
  async run() {
    if (!this.#i2cBus) {
      throw new Error('I2C bus is not open. Call init() first.');
    }
    await Promise.all(this.#blocks.map(block => block.run()));
  }

  /**
   * Closes the I2C bus and cleans up resources
   */
  async close() {
    this.#blocks = [];

    if (this.#i2cBus) {
      try {
        await this.#i2cBus.close();
        this.#i2cBus = null;
      } catch (err) {
        console.error('Failed to close I2C bus:', err);
      }
    } else {
      console.warn('I2C bus is not open');
    }
  }

  /**
   * Checks if a block is occupied by its address or name
   *
   * @param {number|string} addressOrName
   * @returns {boolean} True if the block is occupied, false otherwise
   */
  isBockOccupied(addressOrName) {
    const block = this.#blocks.find(b => b.address === addressOrName || b.name === addressOrName);
    if (!block) {
      console.warn(`Block with address or name "${addressOrName}" not found.`);
      return false;
    }
    return block.isOccupied;
  }

  /**
   * Gets the list of block detectors
   *
   * @returns {BlockDetector[]} The list of block detectors
   */
  get blocks() {
    return this.#blocks;
  }
}
