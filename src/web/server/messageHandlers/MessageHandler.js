/* eslint-disable no-unused-vars */
export default class MessageHandler {
  /**
   * Determines if this handler should process the given message.
   * @param {Object} message - The incoming message object.
   * @returns {boolean} - True if the handler should process the message, false otherwise.
   */
  static shouldHandle(message) {
    throw new Error('Method "shouldHandle" must be implemented in subclass');
  }

  /**
   * Processes the given message.
   * @param {Object} message - The incoming message object.
   */
  static handleMessage(message) {
    throw new Error('Method "handleMessage" must be implemented in subclass');
  }
}
