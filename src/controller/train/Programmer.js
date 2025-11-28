export default class Programmer {
  #serialPort;

  /**
   * @param {Object} serialPort - The SerialPort instance
   */
  constructor(serialPort) {
    this.#serialPort = serialPort;
    serialPort.write('<R>');
  }
}
