/**
 * The base class for commands
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html
 */
export default class Command {
  #command;
  #vars;

  /**
   *@param {string|number} command The command to run
   * @param  {...string|number} vars The vars to pass to the command
   */
  constructor(command, ...vars) {
    this.#command = command;
    this.#vars = vars;
  }

  /**
    * @returns The command to be sent
    */
  get command() {
    return this.#command;
  }

  /**
    * @returns the vars to be sent
    */
  get vars() {
    return this.#vars;
  }

  /**
   * Determines if the command should handle the response
   * @param {string} response The response from the serial port
   * @returns {boolean} True if the command should handle the response
   */
  // eslint-disable-next-line no-unused-vars
  shouldHandleResponse(response) {
    return false;
  }

  /**
   * @param {string} response The response from the serial port
   * @returns {Object} a json formatted response
   */
  formatResponse(response) {
    return { response };
  }

  /**
    * @param {string} command The command
    * @param  {...any} vars The variables of the command
    * @returns The command string without formatting
    */
  static getCommandString(command, vars) {
    if (vars.length) {
      return `${command} ${vars.join(' ')}`;
    }
    return command;
  }

  /**
    * @returns {string} The dcc-ex command string
    */
  get nativeCommand() {
    const commandString = Command.getCommandString(this.#command, this.#vars);
    return `<${commandString}>\n`;
  }

  /**
    * @returns {string} The dcc-ex command sting in html format
    */
  get htmlCommand() {
    const commandString = Command.getCommandString(this.#command, this.#vars);
    return `&lt;${commandString}&gt;`;
  }

  /**
    * @returns {string} A string representation of the command
    */
  toString() {
    return this.constructor.name + ': ' + Command.getCommandString(this.#command, this.#vars);
  }
}
