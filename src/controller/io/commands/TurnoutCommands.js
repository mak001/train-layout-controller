import Command from './Command';

/**
 * Command to request the list of all turnouts and states
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#t-request-a-list-all-defined-turnouts-points
 */
class RequestTurnoutListCommand extends Command {
  constructor() {
    super('T');
  }
}

/** Command to throw or close a turnout
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#t-id-state-throw-or-close-a-defined-turnout-point
 */
class ThrowTurnoutCommand extends Command {
  /**
   * @param {number|string} id The id of the turnout
   * @param {import("../../enums.js").TURNOUT_STATE} state The state to set the turnout to
   */
  constructor(id, state) {
    super('T', id, state);
  }
}

/**
 * Command to request the status of a turnout
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-t-id-jt-id-request-details-of-a-specific-turnout-point
 */
class TurnoutStatusCommand extends Command {
  /**
   * @param {number|string} id The id of the turnout
   */
  constructor(id) {
    super('JT', id);
  }
}

/**
 * Command to list all turnout ids
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-t-jt-request-the-list-of-defined-turnout-point-ids
 */
class ListTurnoutsCommand extends Command {
  constructor() {
    super('JT');
  }
}

export default {
  RequestTurnoutListCommand,
  ThrowTurnoutCommand,
  TurnoutStatusCommand,
  ListTurnoutsCommand,
};
