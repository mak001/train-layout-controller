import Command from './Command';

/** Command to list all traversers/turntables
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#i-request-a-list-all-defined-turntables-traversers
 */
class ListTraversersCommand extends Command {
  constructor() {
    super('I');
  }
}

/**
 * Command to request the position of a traverser/turntable
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#i-id-request-position-of-the-specified-turntable-traverser
 */
class TraverserPositionCommand extends Command {
  /**
   * @param {number|string} id The id of the traverser/turntable
   */
  constructor(id) {
    super('I', id);
  }
}

/**
 * Command to rotate a turntable to a specific position
 */
class RotateTurntableCommand extends Command {
  /**
   * @param {number|string} id The id of the traverser/turntable
   * @param {number|string} position The position to rotate to
   * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#i-id-position-rotate-a-dcc-turntable
   */
  constructor(id, position) {
    super('I', id, position);
  }
}

/**
 * Command to rotate an Ex turntable to a specific position and perform an activity
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#i-id-position-activity-rotate-ex-turntable
 * @see https://dcc-ex.com/ex-turntable/test-and-tune.html#ex-turntable-activity-reference
 */
class RotateExTurntableCommand extends Command {
  /**
   * @param {string|number} id The id of the turntable
   * @param {string|number} position The position to rotate to
   * @param {import("../../enums").ACTIVITIES} activity The activity to perform
   */
  constructor(id, position, activity) {
    super('I', id, position, activity);
  }
}

/**
 * Command to get the list of all traversers/turntables
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-o-jo-request-the-list-of-defined-turntables-traversers
 */
class GetTraverserListCommand extends Command {
  constructor() {
    super('JO');
  }
}

/**
 * Command to request the status of a traverser/turntable
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-o-id-jo-id-request-details-of-the-specific-turntable-traverser
 */
class TraverserStatusCommand extends Command {
  /**
   * @param {number|string} id The id of the traverser/turntable
   */
  constructor(id) {
    super('JO', id);
  }
}

/**
 * Command to request the position of a traverser/turntable
 * @see https://dcc-ex.com/reference/software/command-summary-consolidated.html#j-p-id-jp-id-request-all-position-details-of-the-specified-turntable-traverser
 */
class TraverserAllPositionCommand extends Command {
  /**
   * @param {number|string} id The id of the traverser/turntable
   */
  constructor(id) {
    super('JP', id);
  }
}

export default {
  ListTraversersCommand,
  TraverserPositionCommand,
  RotateTurntableCommand,
  RotateExTurntableCommand,
  GetTraverserListCommand,
  TraverserStatusCommand,
  TraverserAllPositionCommand,
};
