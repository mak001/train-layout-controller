export default class BlockDetector {
  #i2cBus;
  #address;
  #name;

  /**
   * Indicates whether the block is currently occupied
   * @type {boolean}
   */
  isOccupied = false;

  /**
   * @param {Object} i2cBus - The I2C bus instance
   * @param {number} address - I2C address of the block detector
   * @param {string} name - Name of the block detector
   */
  constructor(i2cBus, address, name) {
    this.#i2cBus = i2cBus;
    this.#address = address;
    this.#name = name || `BlockDetector-${address}`;
  }

  /**
   * Polls the block detector to update its status
   */
  async run() {
    try {
      const data = await this.#i2cBus.readByte(this.#address, 0x00);
      this.isOccupied = (data & 0x01) === 0x01; // Assuming LSB indicates block presence
    } catch (err) {
      console.error(`Error reading from ${this.#name} (${this.#address}):`, err);
    }
  }

  /**
   * Gets the name of the block detector
   * @type {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * Gets the I2C address of the block detector
   * @type {number}
   */
  get address() {
    return this.#address;
  }
}
