import Command from './Command';

/**
 * Requests a list of trains in the roster, or details about a single train in the roster
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#roster-commands
 */
export default class RequestRosterCommand extends Command {
  /**
   * @param {string|number} [cab] The cab to request details of. If no cab is provided it will get all trains in the roster
   */
  constructor(cab) {
    super('JR', cab);
  }
}
