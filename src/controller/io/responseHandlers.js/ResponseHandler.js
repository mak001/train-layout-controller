/* eslint-disable no-unused-vars */

/**
 * Abstract class representing a response handler.
 * Child classes should implement the shouldHandle and handle methods.
 */
export default class ResponseHandler {
  /**
   * Checks if this handler should process the given response.
   * @param {string} response The response to check
   */
  static shouldHandle(response) {
    throw new Error('Child class must implement shouldHandle method');
  }

  /**
   * Handles the given response.
   * @param {string} response The response to handle
   */
  static handle(response) {
    throw new Error('Child class must implement handle method');
  }
}
